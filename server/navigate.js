document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const cache = {};
  
    async function loadContent(url) {
      if (cache[url]) {
        updateContent(cache[url]);
        return;
      }
  
      try {
        const response = await fetch(url);
        if (response.ok) {
          const html = await response.text();
          cache[url] = html;
          updateContent(html);
        } else {
          console.error('Error loading content:', response.statusText);
          contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
          document.title = 'Error';
        }
      } catch (error) {
        console.error('Error loading content:', error);
        contentDiv.innerHTML = '<p>Error loading content. Please try again later.</p>';
        document.title = 'Error';
      }
    }
  
    function updateContent(html) {
      contentDiv.innerHTML = html;
      const titleElement = contentDiv.querySelector('[data-title]');
      if (titleElement) {
        document.title = titleElement.getAttribute('data-title');
      }
    }
  
    function handleLinkClick(event) {
      event.preventDefault();
      const url = event.currentTarget.getAttribute('href');
      history.pushState(null, '', url);
      loadContent(url);
    }
  
    document.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
  
    window.addEventListener('popstate', () => {
      loadContent(window.location.pathname);
    });
  
  });
  