document.addEventListener('DOMContentLoaded', () => {
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

