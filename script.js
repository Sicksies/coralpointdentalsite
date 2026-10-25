/* Coral Point Dental — Site Script */

/* ── Service data ── */
const SERVICES = [
  {
    title: 'Cleanings & Prevention',
    icon: 'icon-smile',
    tintBg: 'var(--teal-200)',
    tintFg: 'var(--teal-700)',
    placeholderColor: 'var(--teal-200)',
    placeholderText: 'hygienist performing a routine cleaning',
    desc: 'Twice-a-year cleanings, digital X-rays, oral cancer screenings and sealants — all designed to catch small issues before they become big ones. Our hygienists take their time and keep the whole visit comfortable.',
  },
  {
    title: 'Cosmetic & Whitening',
    icon: 'icon-sparkle',
    tintBg: 'var(--coral-200)',
    tintFg: 'var(--coral-700)',
    placeholderColor: 'var(--coral-200)',
    placeholderText: 'before-and-after of a brightened smile',
    desc: 'Professional whitening, porcelain veneers and tooth-colored bonding to refine the shape, shade and symmetry of your smile. We preview every cosmetic plan with you before we begin.',
  },
  {
    title: 'Crowns & Restorations',
    icon: 'icon-tooth',
    tintBg: 'var(--ocean-200)',
    tintFg: 'var(--ocean-700)',
    placeholderColor: 'var(--ocean-200)',
    placeholderText: 'close-up of a finished porcelain crown',
    desc: 'Custom crowns, fillings and bridges made in our on-site lab for a faster turnaround and a color-matched, natural result. Fewer visits, better fit.',
  },
  {
    title: 'Implants & Dentures',
    icon: 'icon-shield',
    tintBg: 'var(--teal-200)',
    tintFg: 'var(--teal-700)',
    placeholderColor: 'var(--teal-200)',
    placeholderText: 'dental implant model',
    desc: 'From single implants to full-arch restorations and comfortable custom dentures — we restore both function and confidence, with a clear plan and financing options.',
  },
  {
    title: 'Kids & Family',
    icon: 'icon-heart',
    tintBg: 'var(--coral-200)',
    tintFg: 'var(--coral-700)',
    placeholderColor: 'var(--coral-200)',
    placeholderText: 'child smiling in the dental chair',
    desc: 'A calm, playful first visit and gentle preventive care that grows with your kids. We make dental visits something the whole family actually looks forward to.',
  },
  {
    title: 'Emergency Care',
    icon: 'icon-clock',
    tintBg: 'var(--ocean-200)',
    tintFg: 'var(--ocean-700)',
    placeholderColor: 'var(--ocean-200)',
    placeholderText: 'reception desk welcoming a patient',
    desc: 'Toothaches, chips and lost fillings don\'t wait — and neither do we. Call us and we\'ll get you seen the same day whenever possible.',
  },
];

/* ── Team data ── */
const TEAM = [
  {
    name: 'Roberto Cepero',
    role: 'Office Manager',
    photos: ['assets/photos/team-portrait-1.jpg'],
    bio: "Roberto keeps the whole practice running smoothly and is usually the first friendly face you'll meet. He handles scheduling, insurance, and any question you can throw at him — always with patience and a warm welcome.",
  },
  {
    name: 'Yusleydi Garcia',
    role: 'Lead Assistant',
    photos: ['assets/photos/team-portrait-4.jpg'],
    bio: "Yusleydi is at the dentist's side for every procedure, making sure each visit is comfortable and calm. Patients love her gentle reassurance and the way she explains exactly what's happening, step by step.",
  },
  {
    name: 'Jose Cepero',
    role: 'Dentist',
    photos: ['assets/photos/team-portrait-3.jpg'],
    bio: "Dr. Cepero brings years of experience and a genuinely gentle touch to everything from routine cleanings to full smile makeovers. He takes the time to listen, explain your options, and never rushes a visit.",
  },
  {
    name: 'Alicia Quesada',
    role: 'Hygienist',
    photos: ['assets/photos/team-portrait-2.jpg'],
    bio: "Alicia makes cleanings something to actually look forward to. Thorough, friendly, and full of practical tips, she'll have your smile feeling fresh while making sure you leave knowing how to keep it that way.",
  },
];

/* ── Reviews data ── */
const REVIEWS = [
  {
    initial: 'C',
    name: 'Carla Mendez',
    meta: 'Patient since 2018 · Coral Gables',
    quote: "I've never felt so at ease at a dentist. They remembered my kids' names, walked me through every step, and my smile has never looked better. It really does feel like family.",
  },
  {
    initial: 'D',
    name: 'David Ruiz',
    meta: 'Patient since 2021 · Miami',
    quote: "Came in for an emergency and they saw me the same day. Painless, professional, and they explained every cost up front. I won't go anywhere else.",
  },
  {
    initial: 'Y',
    name: 'Yesenia Pérez',
    meta: 'Patient since 2019 · West Miami',
    quote: "The whole team is bilingual and so warm. My whole family comes here now — even my kids actually look forward to their cleanings!",
  },
];

/* ════════════════════════════════════════════
   Hero image rotation
════════════════════════════════════════════ */
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return;
  let current = 0;
  setInterval(function () {
    slides[current].classList.remove('is-active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('is-active');
  }, 4500);
})();

/* ════════════════════════════════════════════
   Active nav link on scroll
════════════════════════════════════════════ */
(function () {
  const sections = ['hero', 'services', 'testimonials', 'team', 'booking'];
  const links = document.querySelectorAll('.site-nav__link[data-section]');

  function onScroll() {
    let active = 'hero';
    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 100) active = id;
    });
    links.forEach(function (link) {
      const targets = { hero: 'hero', services: 'services', team: 'team', booking: 'booking' };
      link.classList.toggle('is-active', targets[link.dataset.section] === active);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

/* ════════════════════════════════════════════
   Service modal
════════════════════════════════════════════ */
(function () {
  const overlay  = document.getElementById('serviceModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc  = document.getElementById('modalDesc');
  const modalIcon  = document.getElementById('modalIcon');
  const modalPlaceholder = document.getElementById('modalPlaceholder');
  const modalPhoto = document.getElementById('modalPhoto');
  const modalBook  = document.getElementById('modalBook');
  const closeBtn   = document.getElementById('modalClose');

  function openModal(idx) {
    const s = SERVICES[idx];
    modalTitle.textContent = s.title;
    modalDesc.textContent  = s.desc;
    modalIcon.style.background = s.tintBg;
    modalIcon.innerHTML = '<svg width="22" height="22" style="color:' + s.tintFg + '"><use href="#' + s.icon + '"/></svg>';
    modalPlaceholder.style.background =
      'repeating-linear-gradient(45deg,' + s.placeholderColor + ',' + s.placeholderColor + ' 12px,transparent 12px,transparent 24px),var(--surface-sunken)';
    modalPlaceholder.style.color = s.tintFg;
    modalPlaceholder.textContent = s.placeholderText;
    // Show the service photo if one is set, otherwise the striped placeholder
    if (s.image) {
      modalPhoto.src = s.image;
      modalPhoto.alt = s.placeholderText;
    } else {
      modalPhoto.removeAttribute('src');
    }
    modalPhoto.hidden = !s.image;
    modalPlaceholder.hidden = !!s.image;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(parseInt(card.dataset.service, 10));
    });
  });

  closeBtn.addEventListener('click', closeModal);
  modalBook.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();

/* ════════════════════════════════════════════
   Testimonial carousel
════════════════════════════════════════════ */
(function () {
  const quoteEl  = document.getElementById('reviewText');
  const nameEl   = document.getElementById('reviewName');
  const metaEl   = document.getElementById('reviewMeta');
  const avatarEl = document.getElementById('reviewAvatar');
  const dots     = document.querySelectorAll('.testimonials__dot');
  const prevBtn  = document.getElementById('reviewPrev');
  const nextBtn  = document.getElementById('reviewNext');
  let current = 0;
  let timer;

  function show(idx) {
    current = (idx + REVIEWS.length) % REVIEWS.length;
    const r = REVIEWS[current];
    quoteEl.textContent  = '“' + r.quote + '”';
    nameEl.textContent   = r.name;
    metaEl.textContent   = r.meta;
    avatarEl.textContent = r.initial;
    dots.forEach(function (d, i) { d.classList.toggle('is-active', i === current); });
  }

  function next() { show(current + 1); }
  function prev() { show(current - 1); }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(next, 6000);
  }

  nextBtn.addEventListener('click', function () { next(); startTimer(); });
  prevBtn.addEventListener('click', function () { prev(); startTimer(); });
  dots.forEach(function (d) {
    d.addEventListener('click', function () { show(parseInt(d.dataset.dot, 10)); startTimer(); });
  });

  startTimer();
})();

/* ════════════════════════════════════════════
   Team profile expand
════════════════════════════════════════════ */
(function () {
  const profile    = document.getElementById('teamProfile');
  const closeBtn   = document.getElementById('teamProfileClose');
  const roleEl     = document.getElementById('teamProfileRole');
  const nameEl     = document.getElementById('teamProfileName');
  const bioEl      = document.getElementById('teamProfileBio');
  const profileImgs = [
    document.getElementById('teamProfileImg1'),
    document.getElementById('teamProfileImg2'),
    document.getElementById('teamProfileImg3'),
  ];
  const cards = document.querySelectorAll('.team-card');
  let openIdx = null;
  let flickerTimer;

  function startFlicker(photos) {
    clearInterval(flickerTimer);
    let i = 0;
    profileImgs.forEach(function (img, idx) {
      img.src = photos[idx] || '';
      img.alt = '';
      img.classList.toggle('is-active', idx === 0);
    });
    if (photos.length < 2) return;
    flickerTimer = setInterval(function () {
      profileImgs[i].classList.remove('is-active');
      i = (i + 1) % photos.length;
      profileImgs[i].classList.add('is-active');
    }, 1400);
  }

  function openProfile(idx) {
    const m = TEAM[idx];
    roleEl.textContent = m.role;
    nameEl.textContent = m.name;
    bioEl.textContent  = m.bio;
    startFlicker(m.photos);
    profile.classList.add('is-open');
    cards.forEach(function (c, i) { c.classList.toggle('is-open', i === idx); });
    cards[idx].querySelector('.team-card__toggle').textContent = 'Hide profile →';
    profile.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function closeProfile() {
    clearInterval(flickerTimer);
    profile.classList.remove('is-open');
    cards.forEach(function (c) {
      c.classList.remove('is-open');
      c.querySelector('.team-card__toggle').textContent = 'View profile →';
    });
    openIdx = null;
  }

  cards.forEach(function (card, idx) {
    card.addEventListener('click', function () {
      if (openIdx === idx) { closeProfile(); } else { openIdx = idx; openProfile(idx); }
    });
  });

  closeBtn.addEventListener('click', closeProfile);
})();

/* ════════════════════════════════════════════
   Booking form — tag toggles + submit
════════════════════════════════════════════ */
(function () {
  document.querySelectorAll('.tag').forEach(function (tag) {
    tag.addEventListener('click', function () {
      tag.classList.toggle('is-active');
    });
  });

  // Web app URL from the Google Apps Script deployment (see setup/booking-apps-script.gs)
  const BOOKING_URL = '';

  const submitBtn     = document.getElementById('bookingSubmit');
  const formFields    = document.getElementById('bookingForm');
  const successPanel  = document.getElementById('bookingSuccess');
  const resetBtn      = document.getElementById('bookingReset');
  const errorEl       = document.getElementById('bookingError');
  const inputs = {
    firstName: document.getElementById('firstName'),
    lastName:  document.getElementById('lastName'),
    phone:     document.getElementById('phone'),
    email:     document.getElementById('email'),
  };
  const PHONE_FALLBACK = ' Please call us at 305-229-7026.';

  function selectedTags(id) {
    return Array.from(document.querySelectorAll('#' + id + ' .tag.is-active'))
      .map(function (t) { return t.textContent.trim(); });
  }

  function showError(msg) {
    errorEl.textContent = msg;
    errorEl.hidden = !msg;
  }

  function validate() {
    const missing = [];
    Object.keys(inputs).forEach(function (k) { inputs[k].classList.remove('is-invalid'); });
    ['firstName', 'lastName', 'phone'].forEach(function (k) {
      if (!inputs[k].value.trim()) { inputs[k].classList.add('is-invalid'); missing.push(k); }
    });
    if (inputs.phone.value.trim() && inputs.phone.value.replace(/\D/g, '').length < 10) {
      inputs.phone.classList.add('is-invalid');
      return 'Please enter a phone number with area code.';
    }
    if (inputs.email.value.trim() && !inputs.email.checkValidity()) {
      inputs.email.classList.add('is-invalid');
      return 'Please check your email address.';
    }
    if (missing.length) {
      inputs[missing[0]].focus();
      return 'Please fill in your name and phone number.';
    }
    return '';
  }

  submitBtn.addEventListener('click', function () {
    const problem = validate();
    showError(problem);
    if (problem) return;

    if (!BOOKING_URL) {
      showError('Online booking isn\'t connected yet.' + PHONE_FALLBACK);
      return;
    }

    const data = {
      firstName:  inputs.firstName.value.trim(),
      lastName:   inputs.lastName.value.trim(),
      phone:      inputs.phone.value.trim(),
      email:      inputs.email.value.trim(),
      services:   selectedTags('serviceTags'),
      times:      selectedTags('timeTags'),
      newPatient: document.getElementById('newPatient').checked,
      website:    document.getElementById('bookingWebsite').value,
    };

    submitBtn.disabled = true;
    // Sent as plain text so the browser doesn't need a CORS preflight to Google
    fetch(BOOKING_URL, { method: 'POST', body: JSON.stringify(data) })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (!result.ok) throw new Error(result.error);
        formFields.classList.add('is-hidden');
        successPanel.classList.add('is-visible');
        Object.keys(inputs).forEach(function (k) { inputs[k].value = ''; });
      })
      .catch(function () {
        showError('Sorry, we couldn\'t send your request.' + PHONE_FALLBACK);
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });

  Object.keys(inputs).forEach(function (k) {
    inputs[k].addEventListener('input', function () { inputs[k].classList.remove('is-invalid'); });
  });

  resetBtn.addEventListener('click', function () {
    successPanel.classList.remove('is-visible');
    formFields.classList.remove('is-hidden');
    showError('');
  });
})();
