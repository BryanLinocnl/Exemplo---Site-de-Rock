/* ================================================================
   ARQUÉTIPO EVENTOS — Underground Rock JS v2.0
   ================================================================ */

document.addEventListener('DOMContentLoaded', function() {

  /* ---------------- LOADING SCREEN ---------------- */
  const loader = document.getElementById('loader');
  if (loader) {
    loader.classList.add('hidden');
  }

  /* ---------------- HEADER SCROLL EFFECT ---------------- */
  const header = document.getElementById('header');
  const backTop = document.getElementById('backTop');
  if (header) {
    window.addEventListener('scroll', function() {
      const scrolled = window.scrollY > 50;
      header.classList.toggle('scrolled', scrolled);
      if (backTop) backTop.classList.toggle('visible', window.scrollY > 500);
    });
  }

  /* ---------------- BACK TO TOP ---------------- */
  if (backTop) {
    backTop.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      try {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        window.scrollTo(0, 0);
      }
    });
  }

  /* ---------------- HERO SCROLL HINT ---------------- */
  const scrollHint = document.getElementById('scrollHint');
  if (scrollHint) {
    scrollHint.addEventListener('click', function() {
      const hero = document.querySelector('.hero');
      const target = hero ? hero.nextElementSibling : null;
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
      }
    });
  }

  /* ---------------- MOBILE MENU ---------------- */
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      mainNav.classList.toggle('open');
      document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
    });

    const navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mainNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------------- HERO SLIDER ---------------- */
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dots span');
  const heroPrev = document.querySelector('.hero-prev');
  const heroNext = document.querySelector('.hero-next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));
    if (heroSlides[index]) heroSlides[index].classList.add('active');
    if (heroDots[index]) heroDots[index].classList.add('active');
    currentSlide = index;
  }

  function nextSlide() { showSlide((currentSlide + 1) % heroSlides.length); }
  function prevSlide() { showSlide((currentSlide - 1 + heroSlides.length) % heroSlides.length); }

  function startSlider() {
    if (heroSlides.length > 1) slideInterval = setInterval(nextSlide, 6000);
  }
  function stopSlider() { clearInterval(slideInterval); }

  if (heroSlides.length > 0) {
    showSlide(0);
    startSlider();
    if (heroPrev) heroPrev.addEventListener('click', () => { stopSlider(); prevSlide(); startSlider(); });
    if (heroNext) heroNext.addEventListener('click', () => { stopSlider(); nextSlide(); startSlider(); });
    heroDots.forEach((dot, index) => {
      dot.addEventListener('click', () => { stopSlider(); showSlide(index); startSlider(); });
    });
  }

  /* ---------------- FADE IN ON SCROLL ---------------- */
  const fadeElements = document.querySelectorAll(
    '.news-card, .info-card, .ticket-card, .sponsor-tier, .footer-column, ' +
    '.stat-item, .timeline-item, .testimonial-card, .faq-item, .gallery-item, .news-list-card'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  /* ---------------- NEWSLETTER FORM ---------------- */
  const newsletterForms = document.querySelectorAll('#newsletterForm');
  newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'INSCRITO!';
      btn.disabled = true;
      btn.style.background = 'var(--green)';
      btn.style.borderColor = 'var(--green)';
      btn.style.color = 'var(--bg)';

      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        form.reset();
      }, 3000);
    });
  });

  /* ---------------- AUDIO PLAYER ---------------- */
  const playBtn = document.getElementById('playBtn');
  const audioBar = document.querySelector('.audio-bar');
  const audioTime = document.querySelector('.audio-time');
  let isPlaying = false;
  let progress = 0;
  let audioInterval;

  if (playBtn && audioBar && audioTime) {
    playBtn.addEventListener('click', function() {
      isPlaying = !isPlaying;
      playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';

      if (isPlaying) {
        audioInterval = setInterval(() => {
          progress += 0.5;
          if (progress > 100) progress = 0;
          audioBar.style.width = progress + '%';
          const totalSeconds = Math.floor((progress / 100) * 180);
          const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
          const seconds = (totalSeconds % 60).toString().padStart(2, '0');
          audioTime.textContent = minutes + ':' + seconds;
        }, 1000);
      } else {
        clearInterval(audioInterval);
      }
    });
  }

  /* ---------------- LINEUP FILTERS (stage + day) ---------------- */
  const lineupTabs = document.querySelectorAll('.lineup-tab');
  const lineupDayTabs = document.querySelectorAll('.lineup-day-tab');
  const lineupCards = document.querySelectorAll('.lineup-card');
  let activeStage = 'all';
  let activeDay = 'all';

  function applyLineupFilter() {
    lineupCards.forEach(card => {
      const stageMatch = activeStage === 'all' || card.dataset.stage === activeStage;
      const dayMatch = activeDay === 'all' || card.dataset.day === activeDay;
      if (stageMatch && dayMatch) {
        card.style.display = 'block';
        setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'scale(1)'; }, 50);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.9)';
        setTimeout(() => { card.style.display = 'none'; }, 300);
      }
    });
  }

  // Garante que todos os cards aparecem visíveis ao carregar (fallback caso
  // o IntersectionObserver não dispare a tempo, ex.: captura fullPage).
  if (lineupCards.length > 0) {
    lineupCards.forEach(c => { c.style.display = 'block'; c.style.opacity = '1'; c.style.transform = 'scale(1)'; });
  }

  if (lineupTabs.length > 0) {
    lineupTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        lineupTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        activeStage = this.dataset.stage;
        applyLineupFilter();
      });
    });
  }

  if (lineupDayTabs.length > 0) {
    lineupDayTabs.forEach(tab => {
      tab.addEventListener('click', function() {
        lineupDayTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        activeDay = this.dataset.day;
        applyLineupFilter();
      });
    });
  }

  /* ---------------- ARTIST MODAL ---------------- */
  const artistModal = document.getElementById('artistModal');
  const artistModalImage = document.getElementById('artistModalImage');
  const artistModalDay = document.getElementById('artistModalDay');
  const artistModalStage = document.getElementById('artistModalStage');
  const artistModalName = document.getElementById('artistModalName');
  const artistModalTags = document.getElementById('artistModalTags');
  const artistModalBio = document.getElementById('artistModalBio');
  const artistModalClose = document.getElementById('artistModalClose');

  const artistBios = {
    'Foo Fighters': 'Uma das bandas de rock mais emblemáticas do planeta, os Foo Fighters liderados por Dave Grohl entregam energia pura em cada show. Com um catálogo que mistura grunge, hard rock e alternativo, a banda promete um set histórico na Cidade do Rock.',
    'Capital Inicial': 'Banda ícone do rock brasileiro, o Capital Inicial é sinônimo de hinos que marcaram gerações. Com mais de três décadas de carreira, a banda liderada por Dinho Ouro Preto entrega um show explosivo cheio de clássicos.',
    'Fatboy Slim': 'Lenda viva da música eletrônica, Fatboy Slim (Norman Cook) é responsável por alguns dos hinos mais atemporais da dance music. Com hits como "Praise You" e "Right Here, Right Now", ele promete uma festa inesquecível no New Dance Order.',
    'Beyoncé': 'A maior artista pop de sua geração, Beyoncé entrega performances que transcendem música — são espetáculos visuais, coreográficos e vocais. Um show de abertura épico que entrará para a história.',
    'Ivete Sangalo': 'A rainha do axé e do Carnaval, Ivete Sangalo traz a energia contagiante do Brasil para a Cidade do Rock. Seus shows são celebrações de música, dança e alegria que arrastam multidões.',
    'Martin Garrix': 'Um dos DJs mais influentes do planeta, Martin Garrix dominou a cena eletrônica com hits que tocam em festivais do mundo todo. Seu set no New Dance Order promete ser uma das noites mais quentes do evento.',
    'Bruno Mars': 'Multi-instrumentista, cantor e performer completo, Bruno Mars é um showman nato. Misturando pop, R&B, funk e soul, ele entrega apresentações que lembram a golden age do entretenimento ao vivo.',
    'Rise Against': 'Banda punk rock de Chicago que transformou ativismo em hinos. Rise Against é conhecida por suas letras engajadas e energia bruta ao vivo — um punk rock de mensagem e atitude.',
    'Hot Milk': 'A nova revelação do indie rock britânico. Hot Milk mistura emo, punk e pop com uma pegada fresca que conquistou o público do Reino Unido e agora chega para incendiar a Cidade do Rock.',
    'Raimundos': 'Banda que mistura punk rock com forró e humor ácido, os Raimundos são uma instituição do underground brasileiro. Hits como "Eu Quero Ver o Oco" e "Selinho" são hinos da geração 90.',
    'Dead Fish': 'Uma das bandas mais respeitadas do hardcore/punk nacional. Dead Fish carrega décadas de histórico na cena underground brasileira, com shows intensos e letras de protesto.',
    'Garotos Podres': 'Punk rock clássico paulistano. Os Garotos Podres são parte fundamental da história do punk no Brasil, com canções que se tornaram hinos da Juventude Perdida.'
  };

  if (lineupCards.length > 0 && artistModal) {
    lineupCards.forEach(card => {
      card.addEventListener('click', function() {
        const name = this.querySelector('h3') ? this.querySelector('h3').textContent.trim() : '';
        const day = this.querySelector('.lineup-card-day') ? this.querySelector('.lineup-card-day').textContent.trim() : '';
        const stage = this.querySelector('.lineup-card-stage') ? this.querySelector('.lineup-card-stage').textContent.trim() : '';
        const img = this.querySelector('.lineup-card-image') ? this.querySelector('.lineup-card-image').style.backgroundImage : '';
        const tags = this.querySelectorAll('.lineup-card-tag');

        if (artistModalImage) artistModalImage.style.backgroundImage = img;
        if (artistModalDay) artistModalDay.textContent = day;
        if (artistModalStage) artistModalStage.textContent = stage;
        if (artistModalName) artistModalName.textContent = name;
        if (artistModalTags) {
          artistModalTags.innerHTML = '';
          tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'artist-modal-tag' + (tag.classList.contains('headliner') ? ' headliner' : '');
            span.textContent = tag.textContent;
            artistModalTags.appendChild(span);
          });
        }
        if (artistModalBio) {
          artistModalBio.textContent = artistBios[name] || 'Mais informações em breve. Fique ligado nas redes sociais da Arquétipo Eventos para novidades.';
        }
        artistModal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
  }

  function closeArtistModal() {
    if (artistModal) {
      artistModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }
  if (artistModalClose) artistModalClose.addEventListener('click', closeArtistModal);
  if (artistModal) artistModal.addEventListener('click', (e) => { if (e.target === artistModal) closeArtistModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeArtistModal(); });

  /* ---------------- SEARCH MODAL ---------------- */
  const searchBtn = document.querySelector('.search-btn');
  const searchModal = document.getElementById('searchModal');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');

  const searchIndex = [
    { name: 'Foo Fighters', url: 'lineup.html', type: 'Artista' },
    { name: 'Capital Inicial', url: 'lineup.html', type: 'Artista' },
    { name: 'Fatboy Slim', url: 'lineup.html', type: 'Artista' },
    { name: 'Beyoncé', url: 'lineup.html', type: 'Artista' },
    { name: 'Ivete Sangalo', url: 'lineup.html', type: 'Artista' },
    { name: 'Martin Garrix', url: 'lineup.html', type: 'Artista' },
    { name: 'Bruno Mars', url: 'lineup.html', type: 'Artista' },
    { name: 'Rise Against', url: 'lineup.html', type: 'Artista' },
    { name: 'Hot Milk', url: 'lineup.html', type: 'Artista' },
    { name: 'New Dance Order', url: 'noticia.html', type: 'Palco' },
    { name: 'Palco Principal', url: 'lineup.html', type: 'Palco' },
    { name: 'Palco Sunset', url: 'lineup.html', type: 'Palco' },
    { name: 'Ingressos', url: 'ingressos.html', type: 'Página' },
    { name: 'Line-up', url: 'lineup.html', type: 'Página' },
    { name: 'Comfort Zone', url: 'ingressos.html', type: 'Setor' },
    { name: 'Pista Premium', url: 'ingressos.html', type: 'Setor' },
    { name: 'Gourmet Square', url: 'ingressos.html', type: 'Experiência' },
    { name: 'ECCO by Lightwire', url: 'noticias.html', type: 'Novidade' },
    { name: 'Notícias', url: 'noticias.html', type: 'Página' },
  ];

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('open');
      document.body.style.overflow = 'hidden';
      setTimeout(() => { if (searchInput) searchInput.focus(); }, 100);
    }
  }
  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('open');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
      if (searchResults) searchResults.innerHTML = '';
    }
  }

  if (searchBtn) searchBtn.addEventListener('click', openSearch);
  if (searchClose) searchClose.addEventListener('click', closeSearch);
  if (searchModal) searchModal.addEventListener('click', (e) => { if (e.target === searchModal) closeSearch(); });

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function() {
      const query = this.value.trim().toLowerCase();
      searchResults.innerHTML = '';
      if (query.length < 2) return;

      const matches = searchIndex.filter(item =>
        item.name.toLowerCase().includes(query) || item.type.toLowerCase().includes(query)
      );

      matches.forEach(match => {
        const el = document.createElement('a');
        el.href = match.url;
        el.className = 'search-suggestion';
        el.innerHTML = `<i class="fas fa-${match.type === 'Artista' ? 'music' : match.type === 'Palco' ? 'guitar' : match.type === 'Setor' ? 'ticket-alt' : 'newspaper'}" style="margin-right:8px;font-size:0.7rem"></i> ${match.name} <span style="color:var(--gray-dark);margin-left:8px;font-size:0.65rem">${match.type}</span>`;
        searchResults.appendChild(el);
      });

      if (matches.length === 0) {
        searchResults.innerHTML = '<p style="color:var(--gray);font-family:var(--font-mono);font-size:0.8rem">Nenhum resultado encontrado.</p>';
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('open')) closeSearch();
    if (e.key === '/' && searchModal && !searchModal.classList.contains('open') && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      openSearch();
    }
  });

  /* ---------------- FAQ ACCORDION ---------------- */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  /* ---------------- COUNTDOWN TIMER ---------------- */
  const countdownContainer = document.getElementById('countdown');
  if (countdownContainer) {
    const targetDate = new Date('2026-09-04T12:00:00').getTime();

    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        countdownContainer.innerHTML = '<div class="countdown-item"><div class="countdown-number">JÁ</div><div class="countdown-label">Começou!</div></div>';
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const d = document.getElementById('countdown-days');
      const h = document.getElementById('countdown-hours');
      const m = document.getElementById('countdown-minutes');
      const s = document.getElementById('countdown-seconds');
      if (d) d.textContent = days.toString().padStart(2, '0');
      if (h) h.textContent = hours.toString().padStart(2, '0');
      if (m) m.textContent = minutes.toString().padStart(2, '0');
      if (s) s.textContent = seconds.toString().padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  /* ---------------- SMOOTH SCROLL FOR ANCHORS ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  /* ---------------- STATS COUNTER ANIMATION ---------------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          let current = 0;
          const increment = target / 50;
          const update = () => {
            current += increment;
            if (current >= target) {
              el.textContent = target + suffix;
            } else {
              el.textContent = Math.floor(current) + suffix;
              requestAnimationFrame(update);
            }
          };
          update();
          statObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statObserver.observe(el));
  }

  /* ---------------- LIGHTBOX (GALLERY) ---------------- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  if (galleryItems.length > 0 && lightbox) {
    galleryItems.forEach(item => {
      item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img && lightboxImg) {
          lightboxImg.src = img.src;
          lightbox.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', () => {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    });
    if (lightbox) lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
    });
  }
});
