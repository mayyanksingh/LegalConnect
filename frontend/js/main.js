/**
 * LegalConnect - Modern Legal Technology Platform
 * Main Client-Side JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Navbar Sticky & Scroll Effects
  const navbar = document.querySelector('.navbar');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scroll to Top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Mobile Drawer Navigation
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
  const drawerCloseBtn = document.querySelector('.drawer-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const openMobileNav = () => {
    mobileDrawer?.classList.add('open');
    mobileNavOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileNav = () => {
    mobileDrawer?.classList.remove('open');
    mobileNavOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  };

  mobileToggle?.addEventListener('click', openMobileNav);
  drawerCloseBtn?.addEventListener('click', closeMobileNav);
  mobileNavOverlay?.addEventListener('click', closeMobileNav);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileNav();
    });
  });

  // 3. Navigation Active Link Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  const highlightNavOnScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  // 4. Tab Switching for "How It Works" Section
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show targeted tab content
      tabContents.forEach(content => {
        if (content.id === targetTab) {
          content.classList.add('active');
        } else {
          content.classList.remove('active');
        }
      });

      // Refresh icons if needed
      if (window.lucide) {
        window.lucide.createIcons();
      }
    });
  });

  // 5. Modal Functionality (Get Started / Schedule Demo)
  const modalBackdrop = document.getElementById('getStartedModal');
  const modalOpenTriggers = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtn = modalBackdrop?.querySelector('.modal-close-btn');
  const roleChoices = modalBackdrop?.querySelectorAll('.role-choice-card');
  const modalRoleInput = document.getElementById('selectedRoleInput');

  const openModal = () => {
    modalBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalOpenTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Optional: check if trigger passes default role
      const preRole = btn.getAttribute('data-role');
      if (preRole && roleChoices) {
        roleChoices.forEach(card => {
          if (card.getAttribute('data-role') === preRole) {
            card.classList.add('selected');
            if (modalRoleInput) modalRoleInput.value = preRole;
          } else {
            card.classList.remove('selected');
          }
        });
      }
      openModal();
    });
  });

  modalCloseBtn?.addEventListener('click', closeModal);

  modalBackdrop?.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  // Role Selection inside Modal
  roleChoices?.forEach(choice => {
    choice.addEventListener('click', () => {
      roleChoices.forEach(c => c.classList.remove('selected'));
      choice.classList.add('selected');
      const selectedRole = choice.getAttribute('data-role');
      if (modalRoleInput) modalRoleInput.value = selectedRole;
    });
  });

  // Handle Modal Form Submit
  const modalForm = document.getElementById('modalOnboardForm');
  const modalSuccessMsg = document.getElementById('modalSuccessMsg');

  modalForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = modalForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<span>Processing...</span>';
    submitBtn.disabled = true;

    // Simulate clean client response and redirect to chosen portal
    const selectedRole = modalRoleInput ? modalRoleInput.value : 'lawyer';

    setTimeout(() => {
      if (modalSuccessMsg) {
        modalSuccessMsg.style.display = 'block';
        modalSuccessMsg.textContent = selectedRole === 'citizen'
          ? 'Entering Citizen Legal Assistance Portal...'
          : 'Redirecting to Lawyer Authentication...';
      }
      modalForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        closeModal();
        if (modalSuccessMsg) modalSuccessMsg.style.display = 'none';
        window.location.href = selectedRole === 'citizen' ? 'citizen.html' : 'lawyer-auth.html';
      }, 700);
    }, 400);
  });

  // 6. Contact Form Validation & Submission
  const contactForm = document.getElementById('contactForm');
  const contactStatusMsg = document.getElementById('contactStatusMsg');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const phoneInput = document.getElementById('contactPhone');
    const messageInput = document.getElementById('contactMessage');
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    // Indian Phone format validation (optional 10 digits check)
    const phoneVal = phoneInput.value.trim().replace(/\D/g, '');
    if (phoneVal && phoneVal.length < 10) {
      alert('Please provide a valid 10-digit Indian contact number.');
      return;
    }

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending Message...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      contactForm.reset();
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;

      if (contactStatusMsg) {
        contactStatusMsg.className = 'form-status-msg success';
        contactStatusMsg.innerHTML = '<strong>Message Received!</strong> Our legal-tech support team will reach out within 1 business day.';
        contactStatusMsg.style.display = 'block';

        setTimeout(() => {
          contactStatusMsg.style.display = 'none';
        }, 5000);
      }
    }, 600);
  });

  // 7. Newsletter Form Submission
  const newsletterForm = document.getElementById('newsletterForm');
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input[type="email"]');
    if (input && input.value.trim()) {
      alert('Thank you for subscribing to LegalConnect Indian Legal Tech Dispatch!');
      newsletterForm.reset();
    }
  });

  // Close modal or drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeMobileNav();
    }
  });
});
