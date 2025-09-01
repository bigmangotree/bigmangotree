// Modal functionality
(function () {
  document.addEventListener('click', function (e) {
    const openEl = e.target.closest('[data-modal-open]');
    if (openEl) {
      e.preventDefault();
      const selector = openEl.getAttribute('data-modal-open');
      const modal = document.querySelector(selector);
      if (modal) {
        modal.setAttribute('aria-hidden', 'false');
      }
    }

    const closeEl = e.target.closest('[data-modal-close]');
    if (closeEl) {
      e.preventDefault();
      const modal = e.target.closest('.modal-overlay');
      if (modal) {
        modal.setAttribute('aria-hidden', 'true');
      }
    }
  });
})();

// Scroll to top
const scrollTopBtn = document.getElementById("scrollTopBtn");
if (scrollTopBtn) {
  window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  };

  scrollTopBtn.onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
}