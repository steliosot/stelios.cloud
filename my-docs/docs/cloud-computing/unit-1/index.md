---
hide:
  - navigation
  - toc
---

### hello

<p style="font-family: 'Vorcas', sans-serif; font-size: 1.2rem; color: #f2f6a0;">
  hi there
</p>

<link href="https://fonts.cdnfonts.com/css/vorcas" rel="stylesheet">

<!-- === MUSIC: plays only on this page; fades out on navigation === -->
<script>
(function () {
  // Only run on the home page
  if (!document.documentElement.classList.contains('home-page')) return;

  // ---- Config ----
  const AUDIO_SRC   = '/assets/audio/gravity.mp3'; // <- put your file here
  const MAX_VOLUME  = 0.35;     // target volume when playing
  const FADE_IN_MS  = 1200;     // fade in duration
  const FADE_OUT_MS = 600;      // fade out duration

  // ---- Create audio element programmatically ----
  const audio = new Audio(AUDIO_SRC);
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = 0;

  let hasUserInteracted = false;
  let isFading = false;

  function fadeTo(target, ms) {
    return new Promise(resolve => {
      const start = performance.now();
      const v0 = audio.volume;
      const dv = target - v0;
      isFading = true;

      function step(t) {
        const p = Math.min(1, (t - start) / ms);
        audio.volume = v0 + dv * p;
        if (p < 1) requestAnimationFrame(step);
        else { isFading = false; resolve(); }
      }
      requestAnimationFrame(step);
    });
  }

  async function startMusic() {
    try {
      await audio.play();
      await fadeTo(MAX_VOLUME, FADE_IN_MS);
      toggleBtn.setAttribute('data-state', 'playing');
      toggleBtn.textContent = '⏸︎ Music';
    } catch (e) {
      // autoplay blocked until user gesture — we’ll retry on next click
    }
  }

  async function pauseMusic(withFade = true) {
    if (withFade) await fadeTo(0, FADE_OUT_MS);
    audio.pause();
    toggleBtn.setAttribute('data-state', 'paused');
    toggleBtn.textContent = '▶︎ Music';
  }

  // ---- UI: small floating toggle button ----
  const toggleBtn = document.createElement('button');
  toggleBtn.className = 'music-toggle';
  toggleBtn.type = 'button';
  toggleBtn.textContent = '▶︎ Music';
  toggleBtn.setAttribute('data-state', 'paused');
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', async (e) => {
    e.stopPropagation();
    hasUserInteracted = true;
    if (audio.paused && !isFading) startMusic();
    else if (!audio.paused && !isFading) pauseMusic(true);
  }, { passive: true });

  // First user gesture anywhere on the page starts music (if paused)
  const userKick = async () => {
    if (!hasUserInteracted) {
      hasUserInteracted = true;
      if (audio.paused) startMusic();
    }
    // after we’ve started once, no need to keep these listeners
    window.removeEventListener('click', userKick, true);
    window.removeEventListener('keydown', userKick, true);
    window.removeEventListener('touchstart', userKick, true);
  };
  window.addEventListener('click', userKick, true);
  window.addEventListener('keydown', userKick, true);
  window.addEventListener('touchstart', userKick, true);

  // ---- Fade out on internal navigation, then follow link ----
  document.addEventListener('click', async (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    // same-origin internal links only
    const sameOrigin = a.origin === location.origin;
    const newTab = a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    if (!sameOrigin || newTab) return;

    if (!audio.paused) {
      e.preventDefault();
      await pauseMusic(true);
      window.location.href = a.href;
    }
  });

  // Safety: fade when tab is hidden; resume when visible (if user started it)
  document.addEventListener('visibilitychange', async () => {
    if (document.hidden) {
      if (!audio.paused) await pauseMusic(true);
    } else if (hasUserInteracted && audio.paused) {
      // don’t auto-play on visibility, wait for user toggle or next click
    }
  });

  // Safety: on page unload, try to fade quickly
  window.addEventListener('pagehide', () => { if (!audio.paused) audio.volume = 0; }, { passive: true });
})();
</script>

<style>
/* Tiny pill toggle, bottom-left; only on the home page */
html.home-page .music-toggle{
  position: fixed;
  left: 1rem;
  bottom: 1rem;
  z-index: 10;
  padding: .4rem .7rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,.35);
  background: rgba(15, 23, 42, .55);
  color: #f8fafc;
  backdrop-filter: blur(6px);
  cursor: pointer;
  font-size: .85rem;
  line-height: 1;
  box-shadow: 0 4px 14px rgba(0,0,0,.25);
  transition: transform .15s ease, background .2s ease, border-color .2s ease;
}
html.home-page .music-toggle:hover{
  transform: translateY(-1px);
  background: rgba(15, 23, 42, .75);
  border-color: rgba(255,255,255,.55);
}
</style>
