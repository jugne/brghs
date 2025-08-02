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
  
/* ===== Gallery Tabs/Subtabs ===== */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const subtabGroups = {
    chalet: document.getElementById('chalet-subtabs'),
    activities: document.getElementById('activities-subtabs'),
    events: document.getElementById('events-subtabs')
  };

  // Show only chalet subtabs on load
  Object.entries(subtabGroups).forEach(([key, group]) => {
    if (!group) return;
    group.style.display = key === 'chalet' ? 'flex' : 'none';
  });

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.dataset.category;
      Object.entries(subtabGroups).forEach(([key, group]) => {
        if (group) group.style.display = key === category ? 'flex' : 'none';
      });
      // Make sure any currently open modal is closed when switching categories
    closeModal();  // safe even if already closed
    });
  });

  document.querySelectorAll('.subtab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openGallery(btn.dataset.subcategory);
    });
  });

  /* ===== Modal elements ===== */
  const galleryModal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-image');
  const modalCaption = document.getElementById('modal-caption');
  const modalPrev = document.getElementById('modal-prev');
  const modalNext = document.getElementById('modal-next');
  const modalClose = document.querySelector('#gallery-modal .close-modal');

  let currentGallery = [];
  let currentIndex = 0;

  function showModalImage(i) {
    if (!currentGallery.length) return;
    const img = currentGallery[i];
    modalImg.src = img.src;
    modalImg.alt = img.caption || 'Gallery image';
    modalCaption.textContent = img.caption || '';
  }

  function openGallery(key) {
    currentGallery = galleryImages[key] || [];
    currentIndex = 0;
    if (!currentGallery.length) return;
    showModalImage(currentIndex);
    galleryModal.style.display = 'flex';
    modalImg.focus();
  }

  function closeModal() {
    galleryModal.style.display = 'none';
  }

  function nextImage(delta) {
    if (!currentGallery.length) return;
    currentIndex = (currentIndex + delta + currentGallery.length) % currentGallery.length;
    showModalImage(currentIndex);
  }

  modalPrev.addEventListener('click', () => nextImage(-1));
  modalNext.addEventListener('click', () => nextImage(1));
  modalClose.addEventListener('click', closeModal);
  galleryModal.addEventListener('click', e => {
    if (e.target === galleryModal) closeModal();
  });
  document.addEventListener('keydown', e => {
    if (galleryModal.style.display === 'flex') {
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') nextImage(-1);
      if (e.key === 'ArrowRight') nextImage(1);
    }
  });

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
    { src: 'images/chalet/dining/dine1.jpeg', caption: 'Dining room and recreation room' },
    { src: 'images/chalet/dining/dine2.jpeg', caption: 'Dining and recreation room with amazing views of the surrounding mountains.' },
    { src: 'images/chalet/dining/dine3.jpeg', caption: 'Cozy dining and lounge with stunning panoramic views that delight in all weather. There is also the possibility to watch movies together on the large screen in the evening. Great selection of DVDs available.' },
    { src: 'images/chalet/dining/dine4.jpeg', caption: 'Dining room and recreation room' },
    { src: 'images/chalet/dining/dine5.jpeg', caption: 'In the common room, there are two heavy-duty hooks for an indoor swing. Swing available.' },
    { src: 'images/chalet/dining/dine6.jpeg', caption: 'Dining and lounge with game table and large selection of communal games and puzzles.' },
    { src: 'images/chalet/dining/dine7.jpeg', caption: 'Cutlery, fondue forks and napkins.' },
    { src: 'images/chalet/dining/dine8.jpeg', caption: 'Plates, cups, and glasses.' }
  ],
  'chalet-kitchen': [
    { src: 'images/chalet/kitchen/kitchen1.jpeg', caption: 'The kitchen. Plenty of space to get creativeand cook delicious things together!' },
    { src: 'images/chalet/kitchen/kitchen3.jpeg', caption: 'Fully equipped kitchen with 6-burner stove and oven – both gas-powered.' },
    { src: 'images/chalet/kitchen/kitchen2.jpeg', caption: 'Practical pass to the cooking and scullery.' },
    { src: 'images/chalet/kitchen/kitchen4.jpeg', caption: 'Hot water for the dishwashing (or shower) is available if the boiler was heated in time with the help of the wood stove.' },
    { src: 'images/chalet/kitchen/kitchen5.jpeg', caption: 'For the washing up: at the back is the the wood-burning stove with the hot water boiler hanging over it. The cozy rocking chair is great for watching and distributing good advice ;)' },
    { src: 'images/chalet/kitchen/kitchen6.jpeg', caption: 'More wood to heat up is available outside in the shed.' }
  ],
  'chalet-bathrooms': [
    { src: 'images/chalet/bathroom/bath1.jpeg', caption: 'Basement: toilets and shower facilities.' },
    { src: 'images/chalet/bathroom/bath2.jpeg', caption: "Women's toilet: washbasin, 2 toilets and shower facilities. NOTE: risk of slipping with wet floor!" },
    { src: 'images/chalet/bathroom/bath3.jpeg', caption: "Women's Toilet: Sink and Toilet" },
    { src: 'images/chalet/bathroom/bath4.jpeg', caption: 'Shower option. Either cold. Or warm - if you have heated the wood stove in the kitchen in time.' },
    { src: 'images/chalet/bathroom/bath5.jpeg', caption: "Men's toilet: washbasin, 2 toilets, 2 pissoirs. NOTE: risk of slipping with wet floor!" }
  ],
  'chalet-outside': [
    { src: 'images/chalet/outside/outside1.jpeg', caption: 'Bärghus am Musersbergli - beautifully located, with wonderful views of nature.'},
    { src: 'images/chalet/outside/outside2.jpeg', caption: 'Panoramic view of Schopfenspitz, Combiflüh, Chörblispitz and the Euschelspass with the Ritzli-Alp' },
    { src: 'images/chalet/outside/outside3.jpeg', caption: 'Patio and garden with the view towards the chairlift.' },
    { src: 'images/chalet/outside/outside4.jpeg', caption: 'A public playground right next door.' }
  ],
  'chalet-all': [],
  'activities-climbing': [
    { src: 'images/activities/climbing/climbing1.jpeg', caption: 'Many climbing routes within the walking distance the Gastlosen mountain range!' },
    { src: 'images/activities/climbing/climbing2.jpeg', caption: 'Many climbing routes within the walking distance on the Gastlosen mountain range!' }
  ],
  'activities-hiking': [
    { src: 'images/activities/hiking/hiking1.jpeg', caption: 'Hiking for all levels right at the doorstep!' },
    { src: 'images/activities/hiking/hiking2.jpeg', caption: 'Hiking for all levels right at the doorstep!' },
    { src: 'images/activities/hiking/hiking3.jpeg', caption: 'HHiking for all levels right at the doorstep!' },
    { src: 'images/activities/hiking/hiking4.jpeg', caption: 'Hiking for all levels right at the doorstep!' },
    { src: 'images/activities/hiking/hiking6.jpeg', caption: 'Hiking for all levels right at the doorstep!' },
    { src: 'images/activities/hiking/bird.jpeg', caption: 'Oportunities for bird-watching.' },
    { src: 'images/activities/hiking/flower.jpeg', caption: 'Spring is ideal for flower trails!' }
  ],
  'activities-paragliding': [
    { src: 'images/activities/paragliding/para1.jpeg', caption: 'Bärghus is a popular spot for paragliders!' },
    { src: 'images/activities/paragliding/para1.jpeg', caption: 'Paragliding directly from the Bärghus.' }
  ],
  'activities-skiing': [
    { src: 'images/activities/skiing/ski1.jpeg', caption: 'Ski in and out!' },
    { src: 'images/activities/skiing/ski2.jpeg', caption: 'Many skiing routes as well as begginer classes available in Jaun!' }
  ],
  'activities-all': [],
  'events-workshops': [
    { src: 'images/events/workshop/workshop1.jpeg', caption: 'Organise an outdoor retreat for your clients or colleagues!' },
    { src: 'images/events/workshop/workshop2.jpeg', caption: 'Fascilities for presentations inside and breathtaking nature outside!' },
    { src: 'images/events/workshop/workshop3.jpeg', caption: 'With more people, tents may be pitched in the garden.' }
  ],
  'events-celebrations': [
    { src: 'images/events/celebration/celebrate1.JPG', caption: 'Bärghus is cosy and romantic place for your celebrations!' },
    { src: 'images/events/celebration/celebrate2.JPG', caption: 'We have all you need for a meeting with friends' }
  ],
  'events-all': []
};

galleryImages['chalet-all'] = [
  ...galleryImages['chalet-rooms'],
  ...galleryImages['chalet-dining'],
  ...galleryImages['chalet-kitchen'],
  ...galleryImages['chalet-bathrooms'],
  ...galleryImages['chalet-outside']
];

galleryImages['activities-all'] = [
  ...galleryImages['activities-hiking'],
  ...galleryImages['activities-climbing'],
  ...galleryImages['activities-paragliding'],
  ...galleryImages['activities-skiing']
];

galleryImages['events-all'] = [
  ...galleryImages['events-workshops'],
  ...galleryImages['events-celebrations']
];
  
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


const translations = {
  en: {
    nav: {
      about: "About",
      gallery: "Gallery",
      guesthaus: "Guesthaus",
      facilities: "Facilities",
      pricing: "Pricing",
      booking: "Booking",
      weather: "Weather",
      directions: "Getting There",
      language: "Language"
    },
    buttons: {
        bookNow: "Book Now",
        contact: "Contact Us"
      },
    text: {
      see: "See ",
      here: "here",
      open: "RESTAURANT OPEN:",
      openDate: " July 26th - August 11th!"
    },
    links:{
      chairlift: " Gastlosen-Express chairlift",
      tour: "the Gastlosen Tour."
    },
    section: {
        about: {
          title1: "Bärghus Musersbergli",
          subtitle1: "Guesthaus",
          subtitle2: "The Inn",
          text1: "Bärghus Musersbergli is a traditional alpine guesthouse situated at 1600 m altitude. Nestled in the typical alpine landscape, you can enjoy the beautiful nature of the Swiss Pre-Alps here. The Bärghus sits right beside the",
          text2: ", which marks the start of the scenic alpine hiking trail ",
          text3: "The first section of the route (about 600 metres) follows a panoramic path — wide and gently sloping — making it ideal for seniors, families with small children, or anyone looking for a relaxed walk. At the viewpoint, hikers are rewarded with a breathtaking panorama of the Gastlosen mountain range.",
          text4: "The Bärghus is an ideal place for people who want to spend quality time together and away from the hustle and bustle of everyday life. It can host up to 10 people overnight in the attic, with an option to pitch your own tent for larger groups. The entirety of the first floor is occupied by full scale kitchen and a dinning area for up to 50 people, suitable for cosy private groups as well as workshops and events.",
          text5: "facilities",
          text6: " and ",
          text7: "gallery",
          text8: "to learn more about our offer.",
          text9: "Bärghus Musersbergli is only available for rent when it is not being operated as an inn.",
          text10: " to inquire about the availability.",
          text11: "Booking for larger groups and events only possible via email, not AirBnB!",
          text12: "In certain times the Bärghus also operates as an inn. We offer simple but delicious and filling menu, together with cold and hot drinks to refresh you after a hike or warm up during a skiing break!"
        },
        gallery: {
          title: "Gallery",
          chalet: "Chalet",
          activities: "Activities",
          events: "Events",
          chAll: "All",
          rooms: "Rooms",
          dining: "Dining",
          kitchen: "Kitchen",
          bathrooms: "Bathrooms",
          outside: "Outside",
          actAll: "All",
          hiking: "Hiking",
          climbing: "Climbing",
          paragliding: "Paragliding",
          skiing: "Skiing",
          eventsAll: "All",
          workshops: "Workshops",
          celebrations: "Celebrations"
        },
        facilities: {
          title: "Facilities",
          subtitle1: "Ground Floor",
          subtitle2: "Basement",
          subtitle3: "Attic (3 rooms)",
          subtitle4: "Other things to note",
          text1: "Below is the overview of our guesthaus facilities. If you have any special questions, please contact us by email.",
          text2: "Linen for the double bed available. Please bring your own sleeping bags and bedding for the mattresses / camp beds.",
          list: {
            dining: "Dining and recreation room with several large wooden tables (50 people).",
            kitchen: "Fully equiped kitchen with central gas stove. ",
            games: "Screen+DVD player (DVDs in the attic), gaming table+games.",
            toilet: "2 ladies and 2 men's toilets (+ 2 pissoirs).",
            shower: "Shower in the women's toilets.",
            lounge: "Lounge with sleeping space on provided mattresses / camp beds (5 people). Also a couch, an armchair and a small table. Storage space and a cupboard.",
            room1: "Room with double bed and space to hang clothes.",
            room2: "Room with sleeping space on provided mattresses / camp beds (3 people). A small table and a shelf.",
            atticLight: "In the attic only mobile LED lamps - no permanently installed ceiling lights - and few outlets available.",
            access: "Limited accessibility – stairs to the attic and bathroom.",
            wifi: "No Wi-Fi/ Internet or TV connection available.",
            heating: "Heating only by the oil heater in the ground floor."
          }
        },
        pricing: {
          title: "Pricing",
          text: "Price list below is intended for small group (up to 10 people) stays. Contact us directly for the rates for events and other special requests.",
          table: {
            rate: "Rate",
            price: "Price/Night",
            base: "Base rate (1-2 guests)",
            extra: "Per person surcharge (from 3rd guest)",
            pets: "Pet surcharge (total*)",
            more1: "Min. number of nights: 3.",
            more2: "Max. number of guests sleeping inside the chalet: 10.",
            more3: "Children under 2 stay for free.",
            more4: "* Let us know if you are bringing more than 2 pets."
          }
        },
        weather: {
          title: "Current Weather"
        },
        directions: {
          title: "Getting There",
          subtitle1: "Switzerland – Canton of Freiburg – Jauntal – Jaun",
          subtitle2: "By public transport",
          subtitle3: "By car",
          text1: "Take the PostBus to the stop ",
          text2: "Jaun, Bergbahnen",
          text3: ". From there walk about 500 m. to the Jaun Gastlosen-Express chairlift. The chairlift takes you up to the mountain station in 10 minutes. Chairlift tickets: on site or online via ",
          text4: ". From the mountain station it is only 100 m to the Bärghus.",
          text5: "In winter:",
          text6: " Arrive at the Jaun Gastlosen-Express chairlift station and leave the car in its parking lot. THe parking can be paid by the PayByPhone APP. From there follow the same directions as above.",
          text7: "In summer:",
          text8: " with our exception permit, there is also the possibility to drive directly up to Bärghus (6 km of gravel mountain road, 20-30 min).",
          text9: "Attention:",
          text10: " Narrow mountain road! And from 10 am to 5 pm there is oncoming traffic by hikers, cyclists and scooters. Always drive carefully and carefully!"
          
          
        },
        booking: {
          title: "Book Your Stay",
          email: "Email Us",
          airbnb: "Book on Airbnb",
          airbnbLink: "Go to Airbnb"
        }
      }
    // ... other sections ...
  },
  de: {
    nav: {
      about: "Über uns",
      gallery: "Galerie",
      guesthaus: "Gasthaus",
      facilities: "Ausstattung",
      pricing: "Preise",
      booking: "Buchung",
      weather: "Wetter",
      directions: "Anreise",
      language: "Sprache"
    }
  },
  fr: {
    nav: {
      about: "À propos",
      gallery: "Galerie",
      guesthaus: "Maison d'hôtes",
      facilities: "Installations",
      pricing: "Tarifs",
      booking: "Réservation",
      weather: "Météo",
      directions: "Comment venir",
      language: "Langue"
    }
  }
};





function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = key.split('.').reduce((obj, k) => obj?.[k], translations[lang]);
    if (text) el.textContent = text;
  });
}

document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const lang = btn.getAttribute('data-lang');
    applyTranslations(lang);
    localStorage.setItem('preferredLang', lang);
  });
});

// Auto-load saved language
const savedLang = localStorage.getItem('preferredLang') || 'en';
applyTranslations(savedLang);


});


