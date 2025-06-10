document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('show');
  });
  
  // Mobile-friendly activity tile toggle
document.querySelectorAll('.activity-tile').forEach(tile => {
  tile.addEventListener('click', function (e) {
    // Only activate on touch devices
    if (window.innerWidth <= 768) {
      e.preventDefault();
      this.classList.toggle('toggled');
    }
  });
});

  let current = 0;
  const images = document.querySelectorAll('.carousel-image');
  const total = images.length;

  document.getElementById('next').addEventListener('click', () => {
    images[current].classList.remove('active');
    current = (current + 1) % total;
    images[current].classList.add('active');
  });

  document.getElementById('prev').addEventListener('click', () => {
    images[current].classList.remove('active');
    current = (current - 1 + total) % total;
    images[current].classList.add('active');
  });

  document.getElementById('booking-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Thank you for your booking request! We'll contact you soon.");
    e.target.reset();
  });
});

