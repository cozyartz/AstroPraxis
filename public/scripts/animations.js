// Modern Animation System for AstroPraxis
// Combines GSAP, Lenis, and AOS for incredible user experience

// Import required libraries (loaded via CDN in HTML)
let gsap, ScrollTrigger, Lenis, AOS;

// Initialize Lenis smooth scrolling
function initSmoothScrolling() {
  if (typeof window !== 'undefined' && window.Lenis) {
    const lenis = new window.Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Update ScrollTrigger when Lenis scrolls
    lenis.on('scroll', () => {
      if (window.ScrollTrigger) {
        window.ScrollTrigger.update();
      }
    });

    console.log('✨ Lenis smooth scrolling initialized');
    return lenis;
  }
}

// Initialize GSAP animations
function initGSAPAnimations() {
  if (typeof window !== 'undefined' && window.gsap && window.ScrollTrigger) {
    gsap = window.gsap;
    ScrollTrigger = window.ScrollTrigger;
    
    gsap.registerPlugin(ScrollTrigger);

    // Hero text reveal animation
    gsap.from('.hero-title', {
      duration: 1.5,
      y: 100,
      opacity: 0,
      ease: 'power4.out',
      delay: 0.2
    });

    gsap.from('.hero-subtitle', {
      duration: 1.2,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.5
    });

    // Stagger animation for cards
    gsap.from('.glass-card', {
      scrollTrigger: {
        trigger: '.glass-card',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.8,
      y: 60,
      opacity: 0,
      stagger: 0.15,
      ease: 'power3.out'
    });

    // Parallax effect for background elements
    gsap.to('.parallax-slow', {
      scrollTrigger: {
        trigger: '.parallax-slow',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      },
      y: -100,
      ease: 'none'
    });

    gsap.to('.parallax-fast', {
      scrollTrigger: {
        trigger: '.parallax-fast',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      },
      y: -200,
      ease: 'none'
    });

    // Magnetic hover effect for buttons
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(btn, {
          duration: 0.3,
          x: x * 0.3,
          y: y * 0.3,
          ease: 'power2.out'
        });
      });

      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
          duration: 0.5,
          x: 0,
          y: 0,
          ease: 'elastic.out(1, 0.5)'
        });
      });
    });

    // Text reveal animation
    gsap.utils.toArray('.text-reveal').forEach(text => {
      gsap.from(text, {
        scrollTrigger: {
          trigger: text,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        },
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
      });
    });

    // Scale in animation for icons
    gsap.from('.scale-in-icon', {
      scrollTrigger: {
        trigger: '.scale-in-icon',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      duration: 0.6,
      scale: 0,
      rotation: 180,
      ease: 'back.out(1.7)',
      stagger: 0.1
    });

    console.log('🎯 GSAP animations initialized');
  }
}

// Initialize AOS (Animate On Scroll)
function initAOS() {
  if (typeof window !== 'undefined' && window.AOS) {
    AOS = window.AOS;
    
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
      delay: 0,
      anchorPlacement: 'top-bottom'
    });

    console.log('🌟 AOS animations initialized');
  }
}

// Intersection Observer for custom animations
function initIntersectionObserver() {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          entry.target.classList.remove('animate-out');
        } else {
          entry.target.classList.remove('animate-in');
          entry.target.classList.add('animate-out');
        }
      });
    }, observerOptions);

    // Observe elements with the 'observe-me' class
    document.querySelectorAll('.observe-me').forEach(el => {
      observer.observe(el);
    });

    console.log('👁️ Intersection Observer initialized');
  }
}

// Modern cursor effects
function initCursorEffects() {
  if (typeof window !== 'undefined' && window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.innerHTML = '<div class="cursor-dot"></div>';
    document.body.appendChild(cursor);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.transform = `translate(${cursorX - 20}px, ${cursorY - 20}px)`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor interactions
    document.querySelectorAll('a, button, .clickable').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    console.log('🖱️ Custom cursor initialized');
  }
}

// Add floating particles
function initFloatingParticles() {
  const particleContainer = document.createElement('div');
  particleContainer.className = 'particle-container';
  document.body.appendChild(particleContainer);

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particleContainer.appendChild(particle);
  }

  console.log('✨ Floating particles initialized');
}

// Initialize all animations when DOM is loaded
function initializeAnimations() {
  // Wait for all libraries to load
  setTimeout(() => {
    initSmoothScrolling();
    initGSAPAnimations();
    initAOS();
    initIntersectionObserver();
    initCursorEffects();
    initFloatingParticles();
    
    console.log('🚀 All animations initialized successfully!');
  }, 100);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAnimations);
} else {
  initializeAnimations();
}

// Export for manual initialization if needed
window.AstroPraxisAnimations = {
  init: initializeAnimations,
  lenis: null,
  gsap: null,
  aos: null
};