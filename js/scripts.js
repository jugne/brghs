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
  'chalet-rooms': [
    { src: 'images/chalet/rooms/bd1.jpeg', caption: 'Bedroom 1: Queen bed, bed linens, iron, hangers and clothing storage.' },
    { src: 'images/chalet/rooms/bd2_1.jpeg', caption: 'Bedroom 2: Small table, DvDs and CDs for entertainment.' },
    { src: 'images/chalet/rooms/bd2_2.jpeg', caption: 'Bedroom 2: 3 single camping beds with self-inflatable mattresses. Bring your own sleeping bags!' },
    { src: 'images/chalet/rooms/bd2_3.jpeg', caption: 'Bedroom 2: 3 single camping beds with self-inflatable mattresses. Bring your own sleeping bags!' },
    { src: 'images/chalet/rooms/bd3_1.jpeg', caption: 'Bedroom 3: Use this room as living room or bedroom (5 people).' },
    { src: 'images/chalet/rooms/bd3_2.jpeg', caption: 'Bedroom 3: Attic view from the entrance to the second floor.' },
    { src: 'images/chalet/rooms/bd3_4.jpeg', caption: 'Bedroom 3: 5 people can sleep on very comfortable self-inflatable mattresses. Camp beds also available. Bring your own sleeping bags!'},
    { src: 'images/chalet/rooms/bd3_3.jpeg', caption: 'Bedroom 3: Indoor swing for young and old (swing available).'}
  ],
  'chalet-dining': [
    { src: 'images/chalet/dining/dine1.jpeg', caption: 'Rustic dining table' }
  ],
  'chalet-kitchen': [
    { src: 'images/chalet/kitchen/kitchen1.jpeg', caption: 'Modern kitchen' }
  ],
  'chalet-bathrooms': [
    { src: 'images/chalet/bathroom/bath1.jpeg', caption: 'Spa-style bathroom' }
  ],
  'chalet-garden': [
    { src: 'images/chalet/outside/outside1.jpeg', caption: 'Mountain view garden' }
  ],
  'chalet-all': [],
  'nature': [
    { src: 'images/nature1.jpg', caption: 'Valley panorama' },
    { src: 'images/nature2.jpg', caption: 'Alpine trail' }
  ]
};

galleryImages['chalet-all'] = [
  ...galleryImages['chalet-rooms'],
  ...galleryImages['chalet-dining'],
  ...galleryImages['chalet-kitchen'],
  ...galleryImages['chalet-bathrooms'],
  ...galleryImages['chalet-garden']
];

  
// — IMAGE DATA FOR GALLERY

let currentGallery = [];
let currentIndex = 0;

// ✅ Modal Controls
function openGallery(key) {
  currentGallery = galleryImages[key] || [];
  if (currentGallery.length) {
    currentIndex = 0;
    showModalImage(currentIndex);
    document.getElementById('gallery-modal').style.display = 'flex';
  }
}

function showModalImage(index) {
  const modalImg = document.getElementById('modal-image');
  const caption = document.getElementById('modal-caption');
  const { src, caption: text } = currentGallery[index];
  modalImg.src = src;
  caption.textContent = text || `Image ${index + 1} of ${currentGallery.length}`;
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

// ✅ Event Listeners

// Tab buttons
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.getAttribute('data-category');
    document.getElementById('chalet-subtabs').style.display = (cat === 'chalet') ? 'flex' : 'none';
    openGallery(`${cat}-all`);
  });
});

// Subtab buttons
document.querySelectorAll('.subtab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sub = btn.getAttribute('data-subcategory');
    openGallery(sub);
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


