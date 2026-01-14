/* ===============================
   GLOBAL CONFIG & STATE
=============================== */
const CONFIG = {
  paths: {
    hero: "./json/hero.json",
    specializations: "./json/specializations.json",
    realizations: "./json/realizations.json",
  },
  dom: {
    get heroTextContainer() {
      return document.getElementById("hero-text-container");
    },
    heroSliderList: document.getElementById("hero-slider-list"),
    portfolioGrid: document.getElementById("portfolio-grid"),
    specializationsGrid: document.getElementById("specializations-grid"),
    galleryView: document.getElementById("project-gallery-view"),
    galleryContainer: document.getElementById("project-gallery"),
    projectTitle: document.getElementById("project-title"),
    backBtn: document.getElementById("back-to-projects"),
    realizationsSection: document.getElementById("realizations-section"),
  },
};

let appState = {
  projects: [],
  specializations: [],
  isGalleryOpen: false,
};

/* ===============================
   INIT APP
=============================== */
document.addEventListener("DOMContentLoaded", initApp);

async function initApp() {
  try {
    // 1. Pobierz dane równolegle (szybciej)
    const [heroData, specsData, projectsData] = await Promise.all([
      fetchData(CONFIG.paths.hero),
      fetchData(CONFIG.paths.specializations),
      fetchData(CONFIG.paths.realizations),
    ]);

    appState.specializations = specsData;
    appState.projects = projectsData;

    // 2. Renderuj widoki
    renderHero(heroData);
    initAnimations();
    renderSpecializations(appState.specializations);
    initAnimations();
    renderPortfolio(appState.projects);
    initAnimations();

    // 3. Zainicjuj logikę (listenery, slidery)
    setupEventListeners();
    initScrollSpy();
    checkCookies();
    setFooterYear();

    // Usuń klasę no-js
    document.documentElement.classList.remove("no-js");
    initAnimations();
  } catch (error) {
    console.error("Critical Error initializing app:", error);
    // Tutaj można wyświetlić użytkownikowi komunikat o błędzie na stronie
  }
}

/* ===============================
   DATA FETCHING
=============================== */
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

/* ===============================
   RENDERING FUNCTIONS
=============================== */

// NOWA FUNKCJA: Renderowanie Sekcji Głównej
function renderHero(data) {
  // A. Renderowanie Tekstu (H1, Opis, Button)
  if (CONFIG.dom.heroTextContainer) {
    CONFIG.dom.heroTextContainer.innerHTML = `
      <h1 class="hero-title animate">${data.title}</h1>
      <p class="hero-description animate">${data.description}</p>
      <a href="${data.ctaLink}" class="hero-btn animate">${data.ctaText}</a>
    `;
  }

  // B. Renderowanie Slidera
  if (CONFIG.dom.heroSliderList) {
    const slidesHTML = data.sliderImages
      .map((img, index) => {
        // Sprawdzamy, czy to pierwszy slajd (index 0)
        const isFirst = index === 0;

        // Logika atrybutów dla wydajności:
        // 1. fetchpriority="high" tylko dla pierwszego, reszta auto
        // 2. loading="eager" dla pierwszego, reszta "lazy"
        const priorityAttr = isFirst ? 'fetchpriority="high"' : "";
        const loadingAttr = isFirst ? 'loading="eager"' : 'loading="lazy"';

        return `
      <li class="splide__slide">
        <figure class="gallery-item">
          <div class="gallery-image-container">
            <img 
              src="${img.src}" 
              alt="${img.alt}" 
              class="gallery-image"
              width="1365" 
              height="2048"
              ${priorityAttr}
              ${loadingAttr}
            />
          </div>
          <figcaption class="photo-caption">
            <p class="photo-caption__title">${img.caption}</p>
            <time class="photo-caption__date">${img.date}</time>
          </figcaption>
        </figure>
      </li>
    `;
      })
      .join("");

    CONFIG.dom.heroSliderList.innerHTML = slidesHTML;

    // C. Uruchomienie Splide
    initHeroSlider();
  }
}

// Renderowanie sekcji Specjalizacji (Górna)
function renderSpecializations(data) {
  const container = CONFIG.dom.specializationsGrid;
  if (!container) return;

  container.innerHTML = data
    .map(
      (item) => `
    <div class="category-card">
      <div class="category-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" />
      </div>
      <div class="category-content">
        <h3 class="category-title">${item.title}</h3>
        <p class="category-description">${item.description}</p>
        <button class="category-btn" data-category="${item.id}">
          ${item.btnText || "Wybierz"}
        </button>
      </div>
    </div>
  `
    )
    .join("");
}

// Renderowanie sekcji Realizacji (Dolna)
function renderPortfolio(projects, filter = "all") {
  const container = CONFIG.dom.portfolioGrid;
  if (!container) return;
  container.innerHTML = "";

  // Filtrowanie danych
  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  if (filteredProjects.length === 0) {
    container.innerHTML = `<p class="no-results">Brak realizacji w tej kategorii.</p>`;
    return;
  }

  // Helper do nazw kategorii (pobieramy je teraz z załadowanego JSONa specjalizacji!)
  const getCategoryName = (catId) => {
    const spec = appState.specializations.find((s) => s.id === catId);
    return spec ? spec.title : catId;
  };

  filteredProjects.forEach((project) => {
    const item = document.createElement("div");
    item.className = "portfolio-item animate"; // Dodajemy animate dla observera
    item.dataset.category = project.category;
    const mainImgSrc = project.basePath + project.mainImage;

    item.innerHTML = `
      <div class="portfolio-image">
        <img src="${mainImgSrc}" alt="${project.title}" loading="lazy">
      </div>
      <div class="portfolio-content">
        <div class="portfolio-category">${getCategoryName(
          project.category
        )}</div>
        <h3 class="portfolio-title">${project.title}</h3>
        <p class="portfolio-description">${project.shortDescription}</p>
        <a href="#" class="portfolio-link" data-id="${project.id}">
          Zobacz więcej →
        </a>
      </div>
    `;
    container.appendChild(item);
  });

  // Ponowne podpięcie observera animacji dla nowych elementów
  initAnimations();
}

/* ===============================
   LOGIC & EVENTS
=============================== */

function setupEventListeners() {
  // 1. Kliknięcia w Portfolio (Otwieranie projektu)
  CONFIG.dom.portfolioGrid.addEventListener("click", (e) => {
    const link = e.target.closest(".portfolio-link");
    if (!link) return;
    e.preventDefault();

    const project = appState.projects.find((p) => p.id === link.dataset.id);
    if (project) openProjectGallery(project);
  });

  // 2. Kliknięcia w Specjalizacje (Filtrowanie) - Event Delegation
  CONFIG.dom.specializationsGrid.addEventListener("click", (e) => {
    if (e.target.classList.contains("category-btn")) {
      const category = e.target.dataset.category;
      handleCategoryFilter(category);
    }
  });

  // 3. Filtry w menu (jeśli istnieją przyciski .filter-btn)
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      handleCategoryFilter(this.dataset.filter);
      // UI Update przycisków
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // 4. Powrót
  CONFIG.dom.backBtn.addEventListener("click", returnToPortfolio);

  // 5. Hamburger Menu
  const toggle = document.querySelector(".header__toggle");
  if (toggle) {
    toggle.addEventListener("click", toggleMenu);
  }
}

function handleCategoryFilter(category) {
  if (appState.isGalleryOpen) returnToPortfolio();

  // Scroll do sekcji
  CONFIG.dom.realizationsSection?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // Przeładowanie portfolio z filtrem
  renderPortfolio(appState.projects, category);
}

function openProjectGallery(project) {
  appState.isGalleryOpen = true;
  CONFIG.dom.portfolioGrid.style.display = "none";
  CONFIG.dom.galleryView.style.display = "block";
  CONFIG.dom.projectTitle.textContent = project.title;
  CONFIG.dom.galleryContainer.innerHTML = "";

  // --- ZMIANA 1: Tworzymy tablicę PEŁNYCH ścieżek dla wszystkich zdjęć ---
  // Łączymy folder (basePath) z nazwą pliku
  const fullImages = project.images.map(
    (fileName) => project.basePath + fileName
  );

  // --- ZMIANA 2: Iterujemy po nowych, pełnych ścieżkach ---
  fullImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src; // Tu już jest pełna ścieżka
    img.alt = `${project.title} - zdjęcie ${index + 1}`;
    img.className = "gallery-detail-image";
    img.loading = "lazy";

    // Kliknięcie otwiera lightbox z przekazaniem POPRAWNEJ tablicy fullImages
    img.addEventListener("click", () => openLightbox(index, fullImages));

    CONFIG.dom.galleryContainer.appendChild(img);
  });

  CONFIG.dom.galleryView.scrollIntoView({ behavior: "smooth", block: "start" });
}

function returnToPortfolio() {
  appState.isGalleryOpen = false;
  CONFIG.dom.galleryView.style.display = "none";
  CONFIG.dom.portfolioGrid.style.display = "grid";
  CONFIG.dom.realizationsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

/* ===== LIGHTBOX Z NAWIGACJĄ (WCAG) - WERSJA FINALNA ===== */
function openLightbox(startIndex, images) {
  let currentIndex = startIndex;

  // 1. Struktura HTML
  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.setAttribute("role", "dialog");
  lb.setAttribute("aria-modal", "true");
  lb.setAttribute("aria-label", "Podgląd zdjęcia");

  // Ikony SVG
  const closeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  const leftIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
  const rightIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

  lb.innerHTML = `
  <button class="lb-btn lb-close" aria-label="Zamknij galerię">
    ${closeIcon}
  </button>

  <div class="lb-counter" aria-live="polite"></div>

  <div class="lightbox-content">
    <button class="lb-btn lb-prev" aria-label="Poprzednie zdjęcie">
      ${leftIcon}
    </button>

    <img src="${images[currentIndex]}" alt="Powiększone zdjęcie">

    <button class="lb-btn lb-next" aria-label="Następne zdjęcie">
      ${rightIcon}
    </button>
  </div>
`;

  document.body.appendChild(lb);

  // 2. Elementy DOM
  const imgEl = lb.querySelector("img");
  const closeBtn = lb.querySelector(".lb-close");
  const prevBtn = lb.querySelector(".lb-prev");
  const nextBtn = lb.querySelector(".lb-next");
  const counterEl = lb.querySelector(".lb-counter");
  const contentEl = lb.querySelector(".lightbox-content");

  const updateCounter = () => {
    counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
  };

  // 3. Funkcja zmiany zdjęcia
  const showImage = (index) => {
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    currentIndex = index;
    imgEl.src = images[currentIndex];
    updateCounter();
  };

  // 4. Funkcja zamykająca (sprząta eventy i usuwa element)
  function closeLb() {
    document.removeEventListener("keydown", handleKeydown);
    lb.remove();
    // Opcjonalnie: przywróć focus na element, który otworzył galerię (jeśli masz do niego referencję)
  }

  // 5. Obsługa zdarzeń (Mysz)
  closeBtn.addEventListener("click", closeLb);

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex - 1);
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showImage(currentIndex + 1);
  });

  // Kliknięcie w tło zamyka (ale nie w zdjęcie)
  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lightbox-content")) {
      closeLb();
    }
  });

  // 6. Obsługa Klawiatury (WCAG)
  const handleKeydown = (e) => {
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showImage(currentIndex - 1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1);
  };
  document.addEventListener("keydown", handleKeydown);

  // 7. Focus trap (Dla dostępności)
  closeBtn.focus();

  updateCounter();

  /* =========================================
     8. NOWOŚĆ: Obsługa gestów dotykowych (SWIPE)
     ========================================= */
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50; // Minimalna odległość w px, żeby uznać za swipe

  // Zapisz punkt początkowy dotyku
  contentEl.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  // Zapisz punkt końcowy i sprawdź różnicę
  contentEl.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const distance = touchStartX - touchEndX;

    // Jeśli przesunięcie było większe niż 50px
    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe w lewo (palec idzie w lewo -> następne zdjęcie)
        showImage(currentIndex + 1);
      } else {
        // Swipe w prawo (palec idzie w prawo -> poprzednie zdjęcie)
        showImage(currentIndex - 1);
      }
    }
  }
}

/* ===============================
   UTILS & UI (Slider, Animacje, Cookie)
=============================== */
function initHeroSlider() {
  const splideEl = document.querySelector("#ferrari-gallery");
  if (splideEl && typeof Splide !== "undefined") {
    new Splide("#ferrari-gallery", {
      type: "loop",
      perPage: 3, // Domyślnie 3
      gap: "1rem",
      autoplay: true, // Warto dodać autoplay w hero
      interval: 3000,
      breakpoints: {
        992: { perPage: 2 },
        600: { perPage: 1 }, // Na telefonie 1 zdjęcie
      },
    }).mount();
  }
}

function initAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".animate").forEach((el) => observer.observe(el));
}

function checkCookies() {
  /* ===== COOKIES ===== */
  const cookieBanner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");

  // Sprawdź czy użytkownik już zaakceptował
  if (!localStorage.getItem("cookiesAccepted")) {
    setTimeout(() => {
      cookieBanner.classList.add("show");
    }, 2000); // Pokaż po 2 sekundach
  } else {
    cookieBanner.style.display = "none"; // Ukryj całkowicie jeśli zaakceptowane
  }

  acceptBtn.addEventListener("click", () => {
    localStorage.setItem("cookiesAccepted", "true");
    cookieBanner.classList.remove("show");
  });
}

function setFooterYear() {
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function toggleMenu() {
  const header = document.querySelector(".header");
  const toggle = document.querySelector(".header__toggle");
  const navLinks = document.querySelectorAll(".header__nav a");

  if (!header || !toggle) return;

  const isOpen = header.classList.toggle("header--open");
  toggle.setAttribute("aria-expanded", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  navLinks.forEach((link) => {
    link.addEventListener(
      "click",
      () => {
        header.classList.remove("header--open");
        toggle.setAttribute("aria-expanded", false);
        document.body.classList.remove("menu-open");
      },
      { once: true }
    );
  });
}

function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".header__nav a");

  if (!sections.length || !navLinks.length) return;

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const targetId = link.getAttribute("href")?.replace("#", "");
            link.classList.toggle("active", targetId === entry.target.id);
          });
        }
      });
    },
    {
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    }
  );

  sections.forEach((section) => spyObserver.observe(section));
}
