---
hide: [navigation, toc]
---

<!-- ==================== SCRIPTS ==================== -->
<script>
  document.documentElement.classList.add('home-page');

  // Align hero to header grid left edge
  (function () {
    function alignHeroToHeader() {
      const headerInner = document.querySelector('.md-header__inner');
      if (!headerInner) return;
      const left = Math.round(headerInner.getBoundingClientRect().left);
      document.documentElement.style.setProperty('--hero-left', left + 'px');
    }
    alignHeroToHeader();
    window.addEventListener('load', alignHeroToHeader);
    window.addEventListener('resize', alignHeroToHeader);
  })();

  // ---------- Floating particle field ----------
  (function () {
    const canvas = document.createElement('canvas');
    canvas.classList.add('particle-layer');
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    const DPR           = Math.min(window.devicePixelRatio || 1, 2);
    const COUNT_DESKTOP = 175;
    const COUNT_MOBILE  = 50;
    const COLOR         = 'rgba(255, 255, 255, 0.28)';
    const R_MIN         = 1;
    const R_MAX         = 3;
    const SPEED_BASE    = 0.60;
    const NOISE         = 0.0135;
    const FRICTION      = 0.995;
    const MAX_SPEED     = 0.8;
    const REPULSE_R     = 180;
    const REPULSE_FORCE = 0.55;
    const BURST_FORCE   = 1.45;
    const BURST_DECAY   = 0.95;

    let w, h, W, H, particles = [], burst = 0;
    let mx = -9999, my = -9999;

    function isMobile() {
      return window.matchMedia('(max-width: 768px)').matches;
    }

    function resize() {
      w = window.innerWidth;
      h = window.innerHeight;
      W = Math.floor(w * DPR);
      H = Math.floor(h * DPR);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      const COUNT = (isMobile() ? COUNT_MOBILE : COUNT_DESKTOP);
      particles = Array.from({ length: COUNT }, () => ({
        x : Math.random() * w,
        y : Math.random() * h,
        vx: (Math.random() - 0.5) * SPEED_BASE,
        vy: (Math.random() - 0.5) * SPEED_BASE,
        r : R_MIN + Math.random() * (R_MAX - R_MIN)
      }));
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; }, { passive: true });
    window.addEventListener('mousedown', () => { burst = BURST_FORCE; });
    window.addEventListener('touchstart', e => {
      if (e.touches && e.touches[0]) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }
      burst = BURST_FORCE;
    }, { passive: true });

    function step() {
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx*dx + dy*dy;

        if (d2 < REPULSE_R * REPULSE_R) {
          const d = Math.sqrt(d2) || 0.0001;
          const push = (REPULSE_FORCE + burst) * (1 - d / REPULSE_R);
          p.vx += (dx / d) * push * 0.08;
          p.vy += (dy / d) * push * 0.08;
        }

        p.vx += (Math.random() - 0.5) * NOISE;
        p.vy += (Math.random() - 0.5) * NOISE;

        const sp2 = p.vx*p.vx + p.vy*p.vy;
        if (sp2 > MAX_SPEED*MAX_SPEED) {
          const s = Math.sqrt(sp2);
          p.vx = (p.vx / s) * MAX_SPEED;
          p.vy = (p.vy / s) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= FRICTION;
        p.vy *= FRICTION;

        if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h;

        ctx.beginPath();
        ctx.arc(p.x * DPR, p.y * DPR, p.r * DPR, 0, Math.PI * 2);
        ctx.fillStyle = COLOR;
        ctx.fill();
      }

      if (burst > 0.001) burst *= BURST_DECAY; else burst = 0;
      requestAnimationFrame(step);
    }
    step();
  })();

  // ---------- Random flashlight sweep on "Get Started" button ----------
  (function () {
    function scheduleFlash(btn) {
      const nextIn = 2000 + Math.random() * 6000; // 2–3s
      setTimeout(() => {
        if (!btn) return;
        btn.classList.add('flash');
        // run the sweep for ~700ms, then remove class
        setTimeout(() => {
          btn.classList.remove('flash');
          scheduleFlash(btn); // schedule next one
        }, 700);
      }, nextIn);
    }

    window.addEventListener('DOMContentLoaded', () => {
      const btn = document.querySelector('html.home-page .home-hero .buttons a:first-child');
      if (btn) scheduleFlash(btn);
    });
  })();
</script>

<!-- ==================== STYLES ==================== -->
<style>
html.home-page .md-header,
html.home-page .md-header__inner,
html.home-page .md-tabs,
html.home-page .md-tabs__inner,
html.home-page .md-tabs__list {
  background: transparent !important;
  box-shadow: none !important;
}

/* Hide auto H1 */
html.home-page .md-content__inner h1:first-of-type {
  opacity:0 !important;
  visibility:hidden !important;
}

/* Background layers */
html.home-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("/assets/home-bg.png") center/cover no-repeat;
  z-index: -4;
}
html.home-page::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: -3;
  pointer-events: none;
  background:
    radial-gradient(900px 600px at 14% 82%,
      rgba(0,0,0,0.70) 0%,
      rgba(0,0,0,0.60) 35%,
      rgba(0,0,0,0.30) 60%,
      rgba(0,0,0,0.00) 100%),
    linear-gradient(to right,
      rgba(0,0,0,0.00) 40%,
      rgba(0,0,0,0.75) 100%);
}

/* Particles */
canvas.particle-layer {
  position: fixed;
  inset: 0;
  z-index: -2;
  pointer-events: none;
}

/* Hero */
html.home-page .home-hero {
  position: fixed;
  left: var(--hero-left, 24px);
  bottom: 4rem;
  max-width: 70ch;
  color: #fff;
  text-shadow: 0 3px 8px rgba(0,0,0,.45);
}

/* Floating title animation */
@keyframes floatWord {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

/* Vorcas font (local files) */
@font-face {
  font-family: "Vorcas";
  src:
    url("/assets/fonts/Vorcas.woff2") format("woff2"),
    url("/assets/fonts/Vorcas.woff") format("woff");
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

html.home-page .float-word {
  display: inline-block;
  animation: floatWord 5s ease-in-out infinite;
  font-family: 'Vorcas', sans-serif !important;
  font-size: 1.8rem !important;
  color: #f2f6a0 !important;
}
html.home-page .float-word:nth-child(1){animation-delay:0s;}
html.home-page .float-word:nth-child(2){animation-delay:.9s;}
html.home-page .float-word:nth-child(3){animation-delay:1.8s;}
html.home-page .float-word:nth-child(4){animation-delay:.5s;}

/* Hero title font */
html.home-page {
  --md-text-font: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
  --md-headline-font: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif !important;
}
html.home-page .home-hero h2 {
  margin: 0 0 .5rem 0;
  font-family: var(--md-headline-font), sans-serif !important;
  font-weight: 700 !important;
  font-size: clamp(1.4rem, 2vw + 0.6rem, 1.9rem);
  color: #f2f6a0 !important;
  text-shadow: 2px 1px 4px rgba(0, 0, 0, 0.4);
}

/* Subheading */
html.home-page .home-hero h3 {
  margin: .25rem 0 0 0;
  font-weight: 400;
  opacity: .9;
  font-size: 1.15rem;
  line-height: 1.5;
}

/* Stelios link */
html.home-page .home-hero a {
  color: #b0d2ddff !important;
  text-decoration: none !important;
}
html.home-page .home-hero a:hover { color: #ffffffff !important; }

/* Buttons wrapper */
html.home-page .home-hero .buttons {
  margin-top: 1.75rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  text-shadow: 0 1px 4px rgba(0,0,0,0.4);
  font-size: 0.7rem;
}

/* === Get Started (with internal flashlight sweep) === */
@keyframes sweep {
  from { background-position: -150% 0; }
  to   { background-position: 150% 0; }
}
html.home-page .home-hero .buttons a:first-child {
  position: relative;
  display: inline-block;
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: .45rem .95rem;
  font-weight: 500;
  transition: all .3s ease;

  /* base fill + beam (stopped off-canvas by default) */
  background:
    linear-gradient(120deg,
      rgba(255,255,255,0.00) 0%,
      rgba(255,255,255,0.25) 50%,
      rgba(255,255,255,0.00) 100%) 0 0 / 250% 100% no-repeat,
    oklch(27.7% 0.046 192.524 / 0.5);
  background-position: -150% 0, 0 0;
  overflow: hidden;
}

/* Flash class triggers a quick sweep */
html.home-page .home-hero .buttons a:first-child.flash {
  animation: sweep 0.7s ease-out forwards;
}

/* Hover state (stronger fill, immediate sweep restart) */
html.home-page .home-hero .buttons a:first-child:hover {
  background:
    linear-gradient(120deg,
      rgba(255,255,255,0.10) 0%,
      rgba(255,255,255,0.40) 50%,
      rgba(255,255,255,0.10) 100%) 0 0 / 250% 100% no-repeat,
    oklch(27.7% 0.046 192.524 / 0.9);
  background-position: -150% 0, 0 0;
  transform: translateY(-1px);
}

/* About */
html.home-page .home-hero .buttons a:last-child {
  background: transparent;
  color: oklch(27.7% 0.046 192.524 / 0.95);
  border: 2px solid oklch(27.7% 0.046 192.524 / 0.95);
  border-radius: 16px;
  padding: .45rem .95rem;
  font-weight: 500;
  transition: all .3s ease;
}
html.home-page .home-hero .buttons a:last-child:hover {
  background: #121827 !important;
  color: #e7f694ff !important;
  transform: translateY(-1px);
}

/* Ship lights */
.ship-light {
  position: fixed;
  width: 10px; height: 10px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
  background:
    radial-gradient(circle, rgba(255,220,120,0.95) 0%, rgba(255,180,60,0.6) 40%, rgba(255,150,0,0) 70%);
  box-shadow:
    0 0 8px rgba(255,190,80,0.9),
    0 0 16px rgba(255,160,40,0.7),
    0 0 28px rgba(255,140,0,0.45);
  animation: thruster 1.6s ease-in-out infinite;
  transform: translate(-50%, -50%);
}
@keyframes thruster {
  0%,100%{opacity:0.85;transform:translate(-50%,-50%) scale(1.0);}
  50%{opacity:0.45;transform:translate(-50%,-50%) scale(0.92);}
}
.ship-light.one { right: 5vw; bottom: 7vh; }
.ship-light.two { right: 6.5vw; bottom: 5.5vh; animation-delay: .35s; opacity: .85; }
.ship-light.three { right: 2vw; top: 2vh; animation-delay: .35s; opacity: .1; animation-duration: 3s; }

html.home-page .md-footer { display: none !important; }

/* Hide footer & floating controls on home page */
html.home-page .md-footer,
html.home-page .bottom-controls,
html.home-page .bottom-controls-left {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}

/* === Mobile tweaks (phones) === */
@media (max-width: 640px) {
  html.home-page .home-hero{
    left: 1rem;
    right: 1rem;
    bottom: 2rem;
    max-width: none;
  }

  html.home-page .home-hero h2{ font-size: clamp(1.1rem, 6vw, 1.6rem); }
  html.home-page .home-hero h3{ font-size: 0.95rem; line-height: 1.45; }

  html.home-page .home-hero .buttons{ gap: .6rem; }
  html.home-page .home-hero .buttons a{ padding: .4rem .8rem; font-weight: 700; font-size: .9rem; }

  canvas.particle-layer{ opacity: .6; }
  .ship-light.two, .ship-light.three{ display: none; }
}

/* ultra-small phones */
@media (max-width: 360px){
  html.home-page .home-hero h2{ font-size: 1.2rem; }
  html.home-page .home-hero h3{ font-size: 0.9rem; }
}

/* Stelios link hover */
html.home-page .stelios-link { color: #f5f5f5 !important; text-decoration: none !important; font-weight: 500; transition: color 0.25s ease; }
html.home-page .stelios-link:hover { color: #14b8a6 !important; }
</style>

<!-- ==================== HERO ==================== -->
<div class="home-hero">
  <h2>
    <span class="float-word">DEVELOPERS</span>
    <span class="float-word">LAB</span>
  </h2>
  <h3 style="font-size: 1rem; line-height: 1.5; font-weight: 500; color: #c5efff;">
    Exploring the future of code, cloud, and AI through practical modules and continuous learning, curated by
    <a class="stelios-link" href="https://www.linkedin.com/in/stelios-sotiriadis/" target="_blank" rel="noopener noreferrer">Stelios</a>.
  </h3>

  <div class="buttons">
    <a href="cloud-computing/welcome/">Get Started</a>
    <a href="about/">About</a>
  </div>
</div>

<div class="ship-light one"></div>
<div class="ship-light two"></div>
<div class="ship-light three"></div>
