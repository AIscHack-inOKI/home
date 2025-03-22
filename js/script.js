document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav');
  
    mobileMenuButton.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (mobileNav.classList.contains('active')) {
          mobileNav.classList.remove('active');
        }
        
        const targetId = this.getAttribute('data-target');
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
      });
    });
  
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
      const scrollPosition = window.scrollY;
      const headerHeight = document.querySelector('.header').offsetHeight;
      
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