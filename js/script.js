/**
 * SHARIQON TECHNOLOGIES — Website Interactions & Core Logic
 * Brand: SHARIQON TECHNOLOGIES | Powering the Digital Future
 * WhatsApp: +91 9058867374
 * Instagram: @shariqon.technologies
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Sticky Navbar on Scroll
  const header = document.querySelector('.header');
  const handleScrollHeader = () => {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollHeader, { passive: true });
  handleScrollHeader();

  // 3. Mobile Navigation Menu Toggle & Accessible Drawer
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });

    // Close drawer when clicking any link inside
    const navLinks = navMenu.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-link, .btn');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });
  }

  // 4. Mobile Services Dropdown Toggle
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownParent = dropdownToggle ? dropdownToggle.closest('.nav-item') : null;
  if (dropdownToggle && dropdownParent) {
    dropdownToggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 992) {
        e.preventDefault();
        dropdownParent.classList.toggle('dropdown-open');
      }
    });
  }

  // 5. Back-to-Top Button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Portfolio Category Filter
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        portfolioCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(16px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 7. Accessible FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Optional: close other FAQ items for clean single-expanded experience
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
            otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            otherItem.querySelector('.faq-answer').style.maxHeight = null;
          }
        });

        if (isActive) {
          item.classList.remove('active');
          questionBtn.setAttribute('aria-expanded', 'false');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
          answer.style.maxHeight = answer.scrollHeight + 32 + 'px';
        }
      });
    }
  });

  // 8. Contact Form Client-side Validation & WhatsApp Quick Dispatch
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;
      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const phoneInput = document.getElementById('form-phone');
      const serviceInput = document.getElementById('form-service');
      const budgetInput = document.getElementById('form-budget');
      const messageInput = document.getElementById('form-message');
      const statusAlert = document.getElementById('form-status');

      // Clear previous error states
      [nameInput, emailInput, phoneInput, serviceInput, messageInput].forEach(input => {
        if (input) input.classList.remove('error');
      });

      // Name validation
      if (!nameInput || nameInput.value.trim().length < 2) {
        if (nameInput) nameInput.classList.add('error');
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
        if (emailInput) emailInput.classList.add('error');
        isValid = false;
      }

      // Phone validation (digits check)
      const phoneVal = phoneInput ? phoneInput.value.trim().replace(/[\s-()+]/g, '') : '';
      if (!phoneInput || phoneVal.length < 8) {
        if (phoneInput) phoneInput.classList.add('error');
        isValid = false;
      }

      // Service selection validation
      if (!serviceInput || !serviceInput.value) {
        if (serviceInput) serviceInput.classList.add('error');
        isValid = false;
      }

      // Message validation
      if (!messageInput || messageInput.value.trim().length < 10) {
        if (messageInput) messageInput.classList.add('error');
        isValid = false;
      }

      if (!isValid) {
        const firstError = contactForm.querySelector('.form-control.error');
        if (firstError) firstError.focus();
        return;
      }

      // Form validation passed!
      const userName = nameInput.value.trim();
      const userEmail = emailInput.value.trim();
      const userPhone = phoneInput.value.trim();
      const userService = serviceInput.options[serviceInput.selectedIndex].text;
      const userBudget = budgetInput ? budgetInput.value.trim() : 'Flexible';
      const userMsg = messageInput.value.trim();

      // Display success message
      if (statusAlert) {
        statusAlert.className = 'form-status-alert success';
        statusAlert.innerHTML = `
          <strong><i class="fa-solid fa-circle-check"></i> Thank you, ${userName}!</strong><br>
          Your project inquiry for <em>${userService}</em> has been prepared. Our senior technology team will reach out to you within 24 hours.
          <div style="margin-top: 14px;">
            <a href="https://wa.me/919058867374?text=${encodeURIComponent(`Hello SHARIQON TECHNOLOGIES,\n\nName: ${userName}\nEmail: ${userEmail}\nPhone: ${userPhone}\nService: ${userService}\nBudget: ${userBudget}\nProject Details: ${userMsg}`)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-sm" style="display: inline-flex; margin-top: 4px;">
              <i class="fa-brands fa-whatsapp"></i> Instant Connect on WhatsApp
            </a>
          </div>
        `;
        statusAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }

      // Reset form fields
      contactForm.reset();
    });

    // Real-time error clearance on input
    const inputs = contactForm.querySelectorAll('.form-control');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          input.classList.remove('error');
        }
      });
    });
  }

  // 9. Scroll-triggered Reveal Animations
  const revealElements = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is unsupported
    revealElements.forEach(el => el.classList.add('revealed'));
  }
});
