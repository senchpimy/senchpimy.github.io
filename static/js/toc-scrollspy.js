document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting) {
        document.querySelectorAll('.sidebar-toc nav a').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  // Track all headers that have an id and are inside the main article
  const headers = document.querySelectorAll('.main-article h1, .main-article h2, .main-article h3, .main-article h4, .main-article h5, .main-article h6');
  headers.forEach(header => {
    if (header.id) {
      observer.observe(header);
    }
  });
});
