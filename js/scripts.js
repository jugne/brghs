// Robust Modular JavaScript (ES6+)
document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  menuToggle?.addEventListener("click", () => {
    navLinks?.classList.toggle("show");
  });

  // Dark Mode Toggle
  const darkToggle = document.getElementById("dark-mode-toggle");
  darkToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Scroll-triggered Nav Styling
  const nav = document.querySelector("nav");
  const hero = document.querySelector(".hero");
  if (nav && hero) {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        nav.classList.toggle("scrolled", !entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    navObserver.observe(hero);
  }

  // Collapsible Sections
  document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.target);
      if (target) {
        target.classList.toggle("collapsed");
      }
    });
  });

  // Gallery Modal
  const galleryModal = document.getElementById("gallery-modal");
  const modalImage = document.getElementById("modal-image");
  const modalCaption = document.getElementById("modal-caption");
  let currentGallery = [];
  let currentIndex = 0;

  const openModal = (images, index = 0) => {
    if (!galleryModal || !modalImage || !modalCaption) return;
    currentGallery = images;
    currentIndex = index;
    modalImage.src = images[index].src;
    modalImage.alt = images[index].alt || "Gallery image";
    modalCaption.textContent = images[index].caption || "";
    galleryModal.style.display = "flex";
  };

  const closeModal = () => {
    if (galleryModal) galleryModal.style.display = "none";
  };

  const showImage = index => {
    if (!modalImage || !modalCaption || currentGallery.length === 0) return;
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    modalImage.src = currentGallery[currentIndex].src;
    modalCaption.textContent = currentGallery[currentIndex].caption || "";
  };

  document.querySelector(".close-modal")?.addEventListener("click", closeModal);
  document.getElementById("modal-prev")?.addEventListener("click", () => showImage(currentIndex - 1));
  document.getElementById("modal-next")?.addEventListener("click", () => showImage(currentIndex + 1));

  // Working Gallery Trigger
  document.querySelectorAll(".gallery-category").forEach((cat, i) => {
    cat.addEventListener("click", () => {
      const category = cat.dataset.category;
      // Hardcoded demo, replace with real images per category
      const images = [
        { src: `images/${category}/1.jpg`, caption: `${category} photo 1` },
        { src: `images/${category}/2.jpg`, caption: `${category} photo 2` },
        { src: `images/${category}/3.jpg`, caption: `${category} photo 3` },
      ];
      openModal(images, 0);
    });
  });
});
