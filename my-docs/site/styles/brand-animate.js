(function () {
  function animateBrand() {
    const nodes = document.querySelectorAll('.md-header__title .md-ellipsis, .md-search__title');
    nodes.forEach(el => {
      if (!el || el.dataset.brandAnimated === '1') return;
      const text = el.textContent.trim().toUpperCase(); // force uppercase visually
      el.dataset.brandAnimated = '1';
      el.innerHTML = [...text]
        .map((ch, i) => `<span class="brand-ch" style="--i:${i}">${ch}</span>`)
        .join('');
    });
  }

  document.addEventListener('DOMContentLoaded', animateBrand);
  if (window.document$) window.document$.subscribe(animateBrand);
})();
