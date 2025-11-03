(function () {
  // Create the button UI once
  function ensureButtons() {
    if (document.querySelector(".font-buttons")) return;

    const container = document.createElement("div");
    container.className = "font-buttons";
    container.innerHTML = `
      <button type="button" id="decrease-font" aria-label="Decrease font size">A-</button>
      <button type="button" id="increase-font" aria-label="Increase font size">A+</button>
    `;
    document.body.appendChild(container);

    document.getElementById("increase-font").addEventListener("click", () => {
      const next = Math.min(getScale() + 0.1, 1.8);
      setScale(next);
    });
    document.getElementById("decrease-font").addEventListener("click", () => {
      const next = Math.max(getScale() - 0.1, 0.8);
      setScale(next);
    });
  }

  function getScale() {
    return parseFloat(localStorage.getItem("fontScale") || "1");
  }

  function setScale(value) {
    document.documentElement.style.setProperty("--user-font-scale", String(value));
    localStorage.setItem("fontScale", String(value));
  }

  // Initial apply
  function apply() {
    setScale(getScale());
    ensureButtons();
  }

  // Run on first load
  document.addEventListener("DOMContentLoaded", apply);

  // Run on every Material page switch (instant navigation)
  if (window.document$) {
    window.document$.subscribe(() => {
      apply();
    });
  }
})();
