(function () {
  // ---------- Config ----------
  const BASE_PX = 48;
  const MARGIN_PX = 12;
  const MIN_SCALE = 0.7;   // was 0.8 → allow one more A− step
  const MAX_SCALE = 1.4;
  const STEP = 0.05;

  // Force both menus open on every load (set to false to keep persistence)
  const FORCE_OPEN_ON_LOAD = true;

  // ---------- Footer avoidance ----------
  function footerRect() {
    const f = document.querySelector(".md-footer") || document.querySelector(".md-footer-meta");
    return f ? f.getBoundingClientRect() : null;
  }
  function setFabBottom(px) {
    document.documentElement.style.setProperty("--fab-bottom", px + "px");
  }
  function computeFab() {
    const rect = footerRect();
    if (!rect || rect.height === 0 || rect.top >= window.innerHeight) return BASE_PX;
    const overlap = Math.max(0, window.innerHeight - rect.top);
    return BASE_PX + overlap + MARGIN_PX;
  }
  function updateFab() { setFabBottom(computeFab()); }

  // ---------- State ----------
  const S = {
    get scale() {
      const v = parseFloat(localStorage.getItem("fontScale"));
      return Number.isFinite(v) ? v : 1;
    },
    set scale(v) {
      const nv = Math.max(MIN_SCALE, Math.min(MAX_SCALE, v));
      localStorage.setItem("fontScale", nv.toString());
      document.documentElement.style.setProperty("--user-font-scale", nv);
    },
    get hideLeft()  { return localStorage.getItem("hideLeft")  === "1"; },
    set hideLeft(b)  {
      localStorage.setItem("hideLeft", b ? "1" : "0");
      document.body.classList.toggle("hide-left",  b);
    },
    get hideRight() { return localStorage.getItem("hideRight") === "1"; },
    set hideRight(b) {
      localStorage.setItem("hideRight", b ? "1" : "0");
      document.body.classList.toggle("hide-right", b);
    },
  };

  // ---------- Actions ----------
  function decFont() { S.scale = S.scale - STEP; }
  function incFont() { S.scale = S.scale + STEP; }
  function toggleLeft()  { S.hideLeft  = !S.hideLeft;  syncLabels(); }
  function toggleRight() { S.hideRight = !S.hideRight; syncLabels(); }

  // ---------- UI ----------
  function ensureDocks() {
    // LEFT dock → toggles LEFT sidebar
    if (!document.querySelector(".bottom-controls-left")) {
      const dockL = document.createElement("div");
      dockL.className = "bottom-controls-left";
      dockL.innerHTML = `
        <button type="button" class="ctrl btn-left" title="Hide left menu" aria-pressed="false">
          <span class="material-symbols-outlined">menu_open</span>
        </button>
      `;
      document.body.appendChild(dockL);
      dockL.querySelector(".btn-left").addEventListener("click", toggleLeft);
    }

    // RIGHT dock → toggles RIGHT TOC + font controls
    if (!document.querySelector(".bottom-controls")) {
      const dockR = document.createElement("div");
      dockR.className = "bottom-controls";
      dockR.innerHTML = `
        <button type="button" class="ctrl btn-right" title="Hide right menu" aria-pressed="false">
          <span class="material-symbols-outlined">menu_open</span>
        </button>
        <button type="button" class="ctrl btn-dec" title="Decrease text size">
          <span class="material-symbols-outlined">text_decrease</span>
        </button>
        <button type="button" class="ctrl btn-inc" title="Increase text size">
          <span class="material-symbols-outlined">text_increase</span>
        </button>
      `;
      document.body.appendChild(dockR);
      dockR.querySelector(".btn-right").addEventListener("click", toggleRight);
      dockR.querySelector(".btn-dec").addEventListener("click", decFont);
      dockR.querySelector(".btn-inc").addEventListener("click", incFont);
    }
  }

  function syncLabels() {
    const left  = document.querySelector(".btn-left");
    const right = document.querySelector(".btn-right");

    if (left) {
      const icon = left.querySelector(".material-symbols-outlined");
      icon.textContent = S.hideLeft ? "menu" : "menu_open";
      left.title = S.hideLeft ? "Show menu" : "Hide menu";
    }
    if (right) {
      const icon = right.querySelector(".material-symbols-outlined");
      icon.textContent = S.hideRight ? "menu" : "menu_open";
      right.title = S.hideRight ? "Show table of contents" : "Hide table of contents";
    }
  }

  // ---------- Boot ----------
  function init() {
    ensureDocks();

    // Default to both menus OPEN
    if (FORCE_OPEN_ON_LOAD) {
      localStorage.setItem("hideLeft", "0");
      localStorage.setItem("hideRight", "1");
    } else {
      // If keys don't exist yet, initialize as open
      if (localStorage.getItem("hideLeft") === null)  localStorage.setItem("hideLeft", "0");
      if (localStorage.getItem("hideRight") === null) localStorage.setItem("hideRight", "0");
    }

    // Apply state
    document.body.classList.toggle("hide-left",  localStorage.getItem("hideLeft")  === "1");
    document.body.classList.toggle("hide-right", localStorage.getItem("hideRight") === "1");

    syncLabels();
    updateFab();
  }

  document.addEventListener("DOMContentLoaded", init);
  window.addEventListener("load", updateFab);
  window.addEventListener("resize", updateFab, { passive: true });
  window.addEventListener("scroll", updateFab, { passive: true });

  // MkDocs Material SPA navigations
  if (window.document$) {
    window.document$.subscribe(() => {
      requestAnimationFrame(() => setTimeout(init, 0));
    });
  }
})();


document.addEventListener("click", e => {
  const el = e.target.closest(".md-header__title .md-ellipsis");
  if (el) window.location.href = "/";
});
