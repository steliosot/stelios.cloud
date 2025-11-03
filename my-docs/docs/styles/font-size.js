(function () {
  /* ========= Right Menu (TOC) Toggle ========= */
  function isTocHidden() {
    return document.body.classList.contains("hide-toc");
  }

  function setTocHidden(hidden) {
    document.body.classList.toggle("hide-toc", hidden);
    localStorage.setItem("tocHidden", hidden ? "1" : "0");

    const btn = document.getElementById("toggle-toc");
    if (btn) btn.textContent = hidden ? "←" : "→"; // same arrows as left toggle
  }

  function restoreTocHidden() {
    const saved = localStorage.getItem("tocHidden");
    setTocHidden(saved === "1");
  }

  /* ========= Font Scaling ========= */
  function getScale() {
    return parseFloat(localStorage.getItem("fontScale") || "1");
  }

  function setScale(value) {
    document.documentElement.style.setProperty("--user-font-scale", String(value));
    localStorage.setItem("fontScale", String(value));
  }

  /* ========= Build UI ========= */
  function ensureButtons() {
    if (document.querySelector(".font-buttons")) return;

    const container = document.createElement("div");
    container.className = "font-buttons";

    // 1️⃣ TOC Toggle Button (first)
    const tocBtn = document.createElement("button");
    tocBtn.id = "toggle-toc";
    tocBtn.type = "button";
    tocBtn.setAttribute("aria-label", "Toggle right menu");
    tocBtn.textContent = "→"; // default: TOC visible, click hides it
    container.appendChild(tocBtn);

    // 2️⃣ Font size decrease
    const decBtn = document.createElement("button");
    decBtn.id = "decrease-font";
    decBtn.type = "button";
    decBtn.setAttribute("aria-label", "Decrease font size");
    decBtn.textContent = "A-";
    container.appendChild(decBtn);

    // 3️⃣ Font size increase
    const incBtn = document.createElement("button");
    incBtn.id = "increase-font";
    incBtn.type = "button";
    incBtn.setAttribute("aria-label", "Increase font size");
    incBtn.textContent = "A+";
    container.appendChild(incBtn);

    document.body.appendChild(container);

    // Event listeners
    incBtn.addEventListener("click", () => {
      const next = Math.min(getScale() + 0.1, 1.8);
      setScale(next);
    });

    decBtn.addEventListener("click", () => {
      const next = Math.max(getScale() - 0.1, 0.8);
      setScale(next);
    });

    tocBtn.addEventListener("click", () => {
      setTocHidden(!isTocHidden());
    });
  }

  /* ========= Init ========= */
  function apply() {
    setScale(getScale());
    ensureButtons();
    restoreTocHidden(); // set saved state + correct arrow
  }

  document.addEventListener("DOMContentLoaded", apply);

  if (window.document$) {
    window.document$.subscribe(() => {
      apply();
    });
  }
})();
