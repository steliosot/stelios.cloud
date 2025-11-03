(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".md-header__title");
    if (title && !title.querySelector("a")) {
      const link = document.createElement("a");
      link.href = "/";                // go to root (index.md)
      link.style.textDecoration = "none";
      link.style.color = "inherit";
      link.innerHTML = title.innerHTML; // keep same text
      title.innerHTML = "";
      title.appendChild(link);
    }
  });
})();

(function () {
  function linkTitleToHome() {
    const logo = document.querySelector("a.md-logo");
    const titleWrap = document.querySelector(".md-header__title");
    const titleText = titleWrap && titleWrap.querySelector(".md-ellipsis");

    if (!logo || !titleWrap || !titleText) return;

    // If already linked, skip
    if (titleText.closest("a")) return;

    const a = document.createElement("a");
    a.href = logo.getAttribute("href") || "/";
    a.style.textDecoration = "none";
    a.style.color = "inherit";

    // Move the text span into the link
    titleWrap.replaceChild(a, titleText);
    a.appendChild(titleText);
  }

  document.addEventListener("DOMContentLoaded", linkTitleToHome);
  if (window.document$) window.document$.subscribe(linkTitleToHome); // SPA nav
})();
