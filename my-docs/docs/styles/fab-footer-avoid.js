(function () {
  const BASE_PX = 56;     // ~3.5rem default distance from viewport bottom
  const MARGIN_PX = 12;   // extra breathing room above the footer

  function footerRect() {
    // Prefer the main footer; fall back to footer-meta if needed
    const f = document.querySelector(".md-footer") || document.querySelector(".md-footer-meta");
    return f ? f.getBoundingClientRect() : null;
  }

  function setFabBottom(px) {
    document.documentElement.style.setProperty("--fab-bottom", px + "px");
  }

  function update() {
    // If footer is hidden (e.g., on home), just keep the base offset
    const rect = footerRect();
    if (!rect || rect.height === 0 || rect.top >= window.innerHeight) {
      setFabBottom(BASE_PX);
      return;
    }

    // How much is the footer overlapping the viewport from the bottom?
    const overlap = Math.max(0, window.innerHeight - rect.top);
    // Lift our controls by that overlap + margin, on top of the base
    setFabBottom(BASE_PX + overlap + MARGIN_PX);
  }

  // Run on load, scroll, and resize
  const apply = () => update();
  window.addEventListener("scroll", apply, { passive: true });
  window.addEventListener("resize", apply, { passive: true });

  // MkDocs Material SPA: re-run on page change
  if (window.document$) {
    window.document$.subscribe(() => setTimeout(apply, 0));
  }

  // Initial
  document.addEventListener("DOMContentLoaded", apply);
})();
