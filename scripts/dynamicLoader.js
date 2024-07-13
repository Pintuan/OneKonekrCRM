document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('content');
    const cache = {};
  
    async function loadContent(page) {
      const url = `/src/modules/admin/${page}.astro`;
  
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
      const page = event.currentTarget.getAttribute('href');
      history.pushState(null, '', page);
      loadContent(page);
    }
  
    document.querySelectorAll('a[data-link]').forEach(link => {
      link.addEventListener('click', handleLinkClick);
    });
  
    window.addEventListener('popstate', () => {
      loadContent(window.location.pathname.substring(1)); // Trim the leading slash
    });
  });
  