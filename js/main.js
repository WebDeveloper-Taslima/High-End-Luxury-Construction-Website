/* ==========================================================================
   Inverloch Builders & Bass Coast Builders - Interactive JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initModals();
  initVideoPlayer();
  initSuburbSelector();
  initFormHandler();
});

/* --- 1. Sticky Navigation Header --- */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- 2. Modal Controller (Discovery Call & Video Lightbox) --- */
function initModals() {
  const discoveryModal = document.getElementById('discoveryModal');
  const videoModal = document.getElementById('videoModal');
  const modalOpenBtns = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtns = document.querySelectorAll('.modal-close, [data-close-modal]');

  // Open Modal
  modalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute('data-open-modal');
      const targetModal = document.getElementById(targetModalId);
      if (targetModal) {
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close Modals
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close on Backdrop Click
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  function closeAllModals() {
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.classList.remove('active');
    });
    document.body.style.overflow = '';
    
    // Stop video playback if active
    const videoIframe = document.querySelector('#videoModal iframe');
    if (videoIframe) {
      videoIframe.src = videoIframe.src; // resets embed
    }
  }
}

/* --- 3. Video Testimonial Lightbox --- */
function initVideoPlayer() {
  const playBtn = document.getElementById('playTestimonialVideo');
  const videoModal = document.getElementById('videoModal');
  const videoIframe = document.getElementById('testimonialIframe');

  if (!playBtn || !videoModal) return;

  playBtn.addEventListener('click', () => {
    const videoUrl = playBtn.getAttribute('data-video-url') || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    if (videoIframe) {
      videoIframe.src = videoUrl;
    }
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

/* --- 4. Suburb Location Landing Page Data Switcher --- */
function initSuburbSelector() {
  const suburbTitle = document.getElementById('suburbTitle');
  const suburbMetaDescription = document.getElementById('suburbMetaDescription');
  const suburbBadge = document.getElementById('suburbBadge');

  if (!suburbTitle) return; // Not on suburb template page

  // Parse URL parameter: suburb.html?suburb=Cape%20Paterson
  const urlParams = new URLSearchParams(window.location.search);
  const currentSuburb = urlParams.get('suburb') || 'Cape Paterson';

  const suburbData = {
    'Inverloch': {
      title: 'Luxury Home Builders & Renovations in Inverloch',
      tagline: 'Premier Coastal Builders in Inverloch',
      description: 'Crafting bespoke luxury homes, high-end architectural renovations, and coastal extensions across Inverloch and surrounding coastal estates.'
    },
    'Wonthaggi': {
      title: 'Custom New Homes & Extensions in Wonthaggi',
      tagline: 'Expert Home Builders in Wonthaggi',
      description: 'Transforming residential properties in Wonthaggi with custom architectural designs, premium craftsmanship, and seamless project management.'
    },
    'Cape Paterson': {
      title: 'Architectural Coastal Homes in Cape Paterson',
      tagline: 'Bespoke Coastal Builders in Cape Paterson',
      description: 'Specializing in eco-friendly coastal builds, modern cliffside renovations, and high-end architectural living in Cape Paterson.'
    },
    'Venus Bay': {
      title: 'Luxury Renovations & Custom Builds in Venus Bay',
      tagline: 'Trusted Custom Builders in Venus Bay',
      description: 'Elevating coastal living in Venus Bay with custom architectural renovations, deck extensions, and luxury new home constructions.'
    },
    'Phillip Island': {
      title: 'Premium Home Builders & Extensions in Phillip Island',
      tagline: 'Island Builders of Distinction',
      description: 'Designing and building high-end waterfront residences and modern architectural transformations throughout Phillip Island.'
    },
    'Cowes': {
      title: 'Bespoke Builders & Home Renovations in Cowes',
      tagline: 'High-End Coastal Living in Cowes',
      description: 'Crafting exceptional custom homes and luxury kitchen/bathroom renovations tailored to the coastal lifestyle of Cowes.'
    }
  };

  const data = suburbData[currentSuburb] || {
    title: `Bespoke Custom Builders & Renovations in ${currentSuburb}`,
    tagline: `Premier Builders in ${currentSuburb}`,
    description: `Delivering high-end architectural builds, luxury renovations, and custom residential craftsmanship in ${currentSuburb} and the Bass Coast region.`
  };

  // Update Page Elements
  document.title = `${data.title} | Inverloch Builders`;
  suburbTitle.innerText = data.title;
  if (suburbBadge) suburbBadge.innerText = data.tagline;
  if (suburbMetaDescription) suburbMetaDescription.innerText = data.description;
}

/* --- 5. Form Handling --- */
function initFormHandler() {
  const form = document.getElementById('discoveryForm');
  const formSuccess = document.getElementById('formSuccessMsg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerText;

    btn.innerText = 'Submitting...';
    btn.disabled = true;

    setTimeout(() => {
      form.reset();
      btn.innerText = originalText;
      btn.disabled = false;
      if (formSuccess) {
        formSuccess.style.display = 'block';
        setTimeout(() => {
          formSuccess.style.display = 'none';
          document.getElementById('discoveryModal').classList.remove('active');
          document.body.style.overflow = '';
        }, 2000);
      } else {
        alert('Thank you! Your Discovery Call request has been received. We will contact you within 24 hours.');
        document.getElementById('discoveryModal').classList.remove('active');
        document.body.style.overflow = '';
      }
    }, 1000);
  });
}
