document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileNav = document.querySelector('.mobile-nav');

  mobileMenuButton.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
  });

  // Function to handle scrolling
  function scrollToSection(targetId) {
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
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      scrollToSection(targetId);
    });
  });
  
  // Add click event to the hero button
  const heroButton = document.querySelector('.hero .button[data-target]');
  if (heroButton) {
    heroButton.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      scrollToSection(targetId);
    });
  }

  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');
  
  function highlightNavigation() {
    const scrollPosition = window.scrollY;
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    // Reset all navigation links to default color first
    document.querySelectorAll('.nav-link').forEach(link => {
      link.style.color = '';
    });
    
    // Check if we're at the top of the page
    if (scrollPosition < 100) {
      document.querySelectorAll('.nav-link[data-target="top"]').forEach(link => {
        link.style.color = 'var(--primary)';
      });
      return;
    }
    
    // Check which section is in view and highlight corresponding nav link
    let activeSection = false;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100; // Add some buffer
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll(`.nav-link[data-target="${sectionId}"]`).forEach(link => {
          link.style.color = 'var(--primary)';
        });
        activeSection = true;
      }
    });
    
    // If no section is active and we're not at the top, don't highlight any link
    if (!activeSection && scrollPosition >= 100) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.style.color = '';
      });
    }
  }
  
  window.addEventListener('scroll', highlightNavigation);
  
  // Initial call to highlight the current section
  highlightNavigation();
});