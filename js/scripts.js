document.addEventListener('DOMContentLoaded', () => {
  // === Mobile Menu ===
  const menuToggle = document.getElementById('menu-toggle');
  
    const navLinks = document.getElementById('nav-links');
const toggleBtn = document.getElementById('menu-toggle');

toggleBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
  });
});

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
  
  document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('nav-links');
  const toggleBtn = document.getElementById('menu-toggle');

  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('show');
    });
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
  
// IMAGES DATA STRUCTURE
const galleryImages = {
  'chalet-rooms': [
    'images/chalet/rooms1.jpg',
    'images/chalet/rooms2.jpg'
  ],
  'chalet-kitchen': [
    'images/chalet/kitchen1.jpg'
  ],
  'chalet-bathrooms': [
    'images/chalet/bathrooms1.jpg'
  ],
  'chalet-garden': [
    'images/chalet/garden1.jpg'
  ],
  'nature': [
    'images/nature1.jpg',
    'images/nature2.jpg'
  ]
};

// MODAL FUNCTIONALITY
let currentGallery = [];
let currentIndex = 0;

function openGallery(key) {
  if (key === 'chalet') {
    currentGallery = [
      ...galleryImages['chalet-rooms'],
      ...galleryImages['chalet-kitchen'],
      ...galleryImages['chalet-bathrooms'],
      ...galleryImages['chalet-garden']
    ];
  } else {
    currentGallery = galleryImages[key] || [];
  }

  if (currentGallery.length > 0) {
    currentIndex = 0;
    showModalImage(currentIndex);
    document.getElementById('gallery-modal').style.display = 'flex';
  }
}

function showModalImage(index) {
  const modalImg = document.getElementById('modal-image');
  const caption = document.getElementById('modal-caption');
  modalImg.src = currentGallery[index];
  caption.textContent = `Image ${index + 1} of ${currentGallery.length}`;
}

document.getElementById('modal-next').onclick = () => {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showModalImage(currentIndex);
};

document.getElementById('modal-prev').onclick = () => {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showModalImage(currentIndex);
};

document.querySelector('.close-modal').onclick = () => {
  document.getElementById('gallery-modal').style.display = 'none';
};

// GALLERY EVENT LISTENERS
document.querySelectorAll('.gallery-category').forEach(el => {
  el.addEventListener('click', () => {
    const cat = el.getAttribute('data-category');
    openGallery(cat);
  });
});

document.querySelectorAll('.gallery-subcategory').forEach(el => {
  el.addEventListener('click', (e) => {
    e.stopPropagation(); // prevent triggering parent click
    const sub = el.getAttribute('data-subcategory');
    openGallery(`chalet-${sub}`);
  });
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

// Toggle for collapsible activities
document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = btn.dataset.target;
    const section = document.getElementById(targetId);
    section.classList.toggle('collapsed');
    const isOpen = !section.classList.contains('collapsed');
    btn.textContent = `${targetId.charAt(0).toUpperCase() + targetId.slice(1)} ${isOpen ? '▾' : '▸'}`;
  });
});






});


