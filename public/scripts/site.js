// Fade-in animations for any section with `.fade-in`
document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip animations entirely
    document.querySelectorAll('.fade-in').forEach(el => {
      el.classList.remove('opacity-0', 'translate-y-6');
      el.classList.add('opacity-100');
    });
    return;
  }

  const observer = new IntersectionObserver((entries, observerRef) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'translate-y-6');
        entry.target.classList.add('opacity-100', 'transition-opacity', 'duration-1000');
        observerRef.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
});
