document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle.classList.toggle('open');
      nav.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target)) {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      }
    });

    // Close menu when link clicked
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        toggle.classList.remove('open');
        nav.classList.remove('open');
      });
    });
  }

  // Active section highlighting on scroll
  const sections = document.querySelectorAll('section[id], main[id="top"]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  if (sections.length > 0 && navLinks.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }
});
