document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a[data-link]');

  links.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      const urlParams = new URLSearchParams(event.currentTarget.search);
      const page = urlParams.get('page');
      history.pushState(null, '', event.currentTarget.href);
      loadContent(page);
    });
  });

  window.addEventListener('popstate', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page');
    loadContent(page);
  });

  function loadContent(page) {
    const event = new CustomEvent('pagechange', { detail: { page } });
    window.dispatchEvent(event);
  }

  // Initial load
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get('page');
  if (page) {
    loadContent(page);
  }
});
