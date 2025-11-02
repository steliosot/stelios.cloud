---
hide: [navigation, toc]
---

<!-- ==================== SCRIPTS ==================== -->
<script>
  // Flag this page as 'home' (used by CSS)
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
    requestAnimationFrame(alignHeroToHeader);
    setTimeout(alignHeroToHeader, 50);
    setTimeout(alignHeroToHeader, 250);
  })();

  // ---------- Parallax background (mouse move) ----------
  (function () {
    const html = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      html.style.setProperty('--bg-x', '50%');
      html.style.setProperty('--bg-y', '50%');
      return;
    }
    let targetX = 50, targetY = 50;
    let posX = 50, posY = 50;
    const ease = 0.08;

    function onMove(e) {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const mx = e.clientX / w;
      const my = e.clientY / h;
      targetX = 50 + (mx - 0.5) * 8; // horizontal range
      targetY = 50 + (my - 0.5) * 5; // vertical range
    }

    function raf() {
      posX += (targetX - posX) * ease;
      posY += (targetY - posY) * ease;
      html.style.setProperty('--bg-x', posX.toFixed(2) + '%');
      html.style.setProperty('--bg-y', posY.toFixed(2) + '%');
      requestAnimationFrame(raf);
    }

    html.style.setProperty('--bg-x', '50%');
    html.style.setProperty('--bg-y', '50%');

    if (html.classList.contains('home-page')) {
      window.addEventListener('mousemove', onMove, { passive: true });
      requestAnimationFrame(raf);
    }
  })();

  // ---------- Cursor spotlight (darkens outside area) ----------
  (function () {
    const html = document.documentElement;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // compute a sensible spotlight radius based on viewport
    function computeR() {
      return Math.min(240, Math.max(140, Math.floor(Math.min(innerWidth, innerHeight) * 0.18)));
    }
    html.style.setProperty('--r', computeR() + 'px');

    let tx = innerWidth / 2, ty = innerHeight / 2;
    let x = tx, y = ty;
    const ease = 0.12;

    function onMove(e) {
      tx = e.clientX;
      ty = e.clientY;
    }

    function tick() {
      x += (tx - x) * ease;
      y += (ty - y) * ease;
      html.style.setProperty('--mx', x.toFixed(1) + 'px');
      html.style.setProperty('--my', y.toFixed(1) + 'px');
      requestAnimationFrame(tick);
    }

    if (!reduce && html.classList.contains('home-page')) {
      window.addEventListener('mousemove', onMove, { passive: true });
      requestAnimationFrame(tick);
    } else {
      html.style.setProperty('--mx', '50%');
      html.style.setProperty('--my', '50%');
    }

    window.addEventListener('resize', () => {
      html.style.setProperty('--r', computeR() + 'px');
    }, { passive: true });
  })();
</script>

<!-- ==================== STYLES ==================== -->
<style>
/* Transparent header on home */
html.home-page .md-header,
html.home-page .md-header__inner,
html.home-page .md-tabs,
html.home-page .md-tabs__inner,
html.home-page .md-tabs__list {
  background: transparent !important;
  box-shadow: none !important;
}

/* Search bar: transparent glass + 8px radius; icon half size; color #C4CAD1 */
html.home-page .md-search__form {
  background: rgba(255,255,255,.15) !important;
  border-radius: 8px !important;
  border: none !important;
  transition: background-color .3s ease;
}
html.home-page .md-search__form:hover,
html.home-page .md-search__form:focus-within {
  background: rgba(255,255,255,.25) !important;
}
html.home-page .md-search__input,
html.home-page .md-search__icon {
  color: #C4CAD1 !important;
}
html.home-page .md-search__icon { transform: scale(.5); transform-origin: center; }

/* Hide automatic "Home" H1 */
html.home-page .md-content__inner h1:first-of-type { opacity:0 !important; visibility:hidden !important; }

/* ========== FULL-SCREEN BACKGROUND LAYERS ========== */
/* Image layer (below spotlight) */
html.home-page::before {
  content: "";
  position: fixed;
  inset: 0;
  background: url("/assets/home-bg.png") center/cover no-repeat;
  background-position: var(--bg-x, 50%) var(--bg-y, 50%);
  z-index: -2;
  will-change: background-position;
}

/* Spotlight overlay (hole around cursor, darker elsewhere) */
html.home-page::after {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: -1;
  background:
    radial-gradient(
      circle at var(--mx, 50%) var(--my, 50%),
      rgba(0,0,0,0) 0,
      rgba(0,0,0,0) var(--r, 160px),
      rgba(0,0,0,.45) calc(var(--r, 160px) + 1px)
    );
}

/* ========== HERO ========== */
html.home-page .home-hero {
  position: fixed;
  left: var(--hero-left, 24px);
  bottom: 4rem;
  max-width: 70ch;
  color: #fff;
  text-shadow: 0 3px 8px rgba(0,0,0,.45);
  z-index: 0;
}
html.home-page .home-hero h2 {
  margin: 0 0 .5rem 0; font-weight: 700; font-size: 1.75rem;
}
html.home-page .home-hero h3 {
  margin: .25rem 0 0 0; font-weight: 400; opacity: .9; font-size: 1.15rem; line-height: 1.5;
}

/* Buttons */
html.home-page .home-hero .buttons {
  margin-top: 1.75rem; display: flex; gap: 1rem; flex-wrap: wrap;
}
html.home-page .home-hero .buttons a {
  text-decoration: none; font-weight: 700; letter-spacing: .5px;
  border-radius: 8px; padding: .37rem .83rem;
  border: 2px solid #14b8a6; color: #fff; background: transparent;
  transition: background-color .35s ease, transform .25s ease;
}
html.home-page .home-hero .buttons a:hover,
html.home-page .home-hero .buttons a:focus {
  background: rgba(15,23,42,.75) !important; border-color:#14b8a6 !important; transform: translateY(-1px);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  html.home-page .home-hero { left: 1rem; right: 1rem; bottom: 2rem; }
  html.home-page .home-hero .buttons { justify-content: center; }
}

/* Hide footer on home */
html.home-page .md-footer { display: none !important; }
</style>

<!-- ==================== HERO CONTENT ==================== -->
<div class="home-hero">
  <h2>Welcome to Developers Lab</h2>
  <h3>
    Exploring the future of code, cloud, and AI through practical modules and continuous learning, curated by
    <a href="https://www.linkedin.com/in/stelios-sotiriadis/" target="_blank" rel="noopener noreferrer">Stelios</a>.
  </h3>

  <div class="buttons">
    <a class="md-button" href="cloud-computing/welcome/">Cloud Computing</a>
    <a class="md-button" href="big-data/welcome/">Big Data</a>
    <a class="md-button" href="about/">About</a>
  </div>
</div>
