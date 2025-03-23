document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileNav = document.querySelector('.mobile-nav');

  mobileMenuButton.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
  });

  // Smooth scrolling for navigation links and buttons
  const navLinks = document.querySelectorAll('.nav-link');
  const scrollButtons = document.querySelectorAll('button[data-target]');
  
  // Function to handle scrolling
  function handleScroll(targetId) {
    // Close mobile menu if open
    if (mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
    }
    
    // If target is "top", scroll to top of page
    if (targetId === 'top') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }
    
    // Otherwise scroll to the target section
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      // Calculate header height for offset
      const headerHeight = document.querySelector('.header').offsetHeight;
      
      // Scroll to section with offset for fixed header
      window.scrollTo({
        top: targetSection.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  }
  
  // Add click event to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      handleScroll(targetId);
    });
  });
  
  // Add click event to other buttons with data-target attribute
  scrollButtons.forEach(button => {
    if (!button.classList.contains('nav-link')) { // Avoid duplicating event listeners for nav links
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('data-target');
        handleScroll(targetId);
      });
    }
  });

  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollPosition = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    // Check if we're at the top of the page
    if (scrollPosition < 100) {
      document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('data-target') === 'top') {
          link.style.color = 'var(--primary)';
        } else {
          link.style.color = '';
        }
      });
      return;
    }
    
    // Otherwise check which section is in view
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100; // Add some buffer
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[data-target="${sectionId}"]`).forEach(link => {
          link.style.color = 'var(--primary)';
        });
      } else {
        document.querySelectorAll(`.nav-link[data-target="${sectionId}"]`).forEach(link => {
          link.style.color = '';
        });
      }
    });
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // Initial call to highlight the current section
  highlightNavigation();
});