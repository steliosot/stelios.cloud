document.addEventListener("DOMContentLoaded", function () {
  const terms = document.querySelectorAll(".termynal");
  terms.forEach(el => {
    new Termynal(el, { startDelay: 600 });
  });
});
