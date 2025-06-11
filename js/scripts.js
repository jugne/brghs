document.addEventListener('DOMContentLoaded', () => {
  // === Mobile Menu ===
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('show'));

  // === Navbar Scroll Shadow ===
  window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 10);
  });

  // === Mobile Tap Toggle for Activity Cards ===
  document.querySelectorAll('.activity-tile').forEach(tile => {
    tile.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        tile.classList.toggle('toggled');
      }
    });
  });

  // === Carousel (Main Gallery) ===
  let current = 0;
  const imgs = document.querySelectorAll('.carousel-image');
  if (imgs.length) {
    document.getElementById('next').addEventListener('click', () => {
      imgs[current].classList.remove('active');
      current = (current + 1) % imgs.length;
      imgs[current].classList.add('active');
    });

    document.getElementById('prev').addEventListener('click', () => {
      imgs[current].classList.remove('active');
      current = (current - 1 + imgs.length) % imgs.length;
      imgs[current].classList.add('active');
    });
  }

  // === Form Submit ===
  const form = document.getElementById('booking-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert("Thanks for booking! We'll get back to you.");
      e.target.reset();
    });
  }

  // === Dark Mode Toggle ===
  const darkBtn = document.getElementById('dark-mode-toggle');
  if (darkBtn) {
    darkBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      darkBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    });
  }

  // === Gallery Modal ===
  const galleryImages = {
  chalet: [
    { src: 'images/gallery/chalet1.jpg', caption: 'Our snowy chalet during golden hour' },
    { src: 'images/gallery/chalet2.jpg', caption: 'View from the balcony on a clear day' }
  ],
  nature: [
    { src: 'images/gallery/chalet1.jpg', caption: 'Morning mist over the trees' },
    { src: 'images/gallery/chalet2.jpg', caption: '' } // no caption shown
  ]
  };

  let modal = document.getElementById('gallery-modal');
  let modalImage = document.getElementById('modal-image');
  let currentIndex = 0;
  let currentCategory = '';

function showModalImage() {
  const imageObj = galleryImages[currentCategory][currentIndex];
  modalImage.src = imageObj.src;
  document.getElementById('modal-caption').textContent = imageObj.caption || '';
}


  function closeModal() {
    modal.style.display = 'none';
  }

  document.querySelectorAll('.gallery-category').forEach(cat => {
    cat.addEventListener('click', () => {
      currentCategory = cat.dataset.category;
      currentIndex = 0;
      showModalImage();
      modal.style.display = 'flex';
    });
  });

  document.getElementById('modal-next').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages[currentCategory].length;
    showModalImage();
  });

  document.getElementById('modal-prev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages[currentCategory].length) % galleryImages[currentCategory].length;
    showModalImage();
  });

  document.querySelector('.close-modal').addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
      if (e.key === 'ArrowRight') document.getElementById('modal-next').click();
      if (e.key === 'ArrowLeft') document.getElementById('modal-prev').click();
      if (e.key === 'Escape') closeModal();
    }
  });
  
  // Email Obfuscation
const emailContainer = document.getElementById('email-link-container');
if (emailContainer) {
  const user = 'stay';
  const domain = 'mountainescape.com';
  const fullEmail = `${user}@${domain}`;
  const link = document.createElement('a');
  link.href = `mailto:${fullEmail}`;
  link.textContent = 'Send Email';
  link.className = 'btn-primary';
  emailContainer.appendChild(link);
}

});
