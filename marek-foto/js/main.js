/* ===============================
   GLOBAL STATE
=============================== */
let isGalleryOpen = false;

/* ===============================
   DOM READY
=============================== */
document.addEventListener("DOMContentLoaded", function () {
  const jsonPath = "./json/realizations.json";
  const portfolioContainer = document.getElementById("portfolio-grid");
  const galleryView = document.getElementById("project-gallery-view");

  fetch(jsonPath)
    .then((res) => {
      if (!res.ok) throw new Error("Błąd wczytywania JSON");
      return res.json();
    })
    .then((data) => {
      renderPortfolio(data, portfolioContainer);
      initApp();

      const backBtn = document.getElementById("back-to-projects");
      const gallery = document.getElementById("project-gallery");
      const titleEl = document.getElementById("project-title");
      // const descEl = document.getElementById("project-description"); // USUNIĘTE: Nie pobieramy opisu

      /* ===== OTWIERANIE GALERII ===== */
      portfolioContainer.addEventListener("click", function (e) {
        const link = e.target.closest(".portfolio-link");
        if (!link) return;

        e.preventDefault();
        const projectId = link.dataset.id;
        const project = data.find((p) => p.id === projectId);
        if (!project) return;

        openProjectGallery(project);
      });

      function openProjectGallery(project) {
        isGalleryOpen = true;

        portfolioContainer.style.display = "none";
        galleryView.style.display = "block";

        // WYŚRODKOWANIE NAGŁÓWKA
        titleEl.textContent = project.title;
        titleEl.style.textAlign = "center";

        // USUNIĘTE: descEl.textContent = project.fullDescription || ""; // Nie wyświetlamy opisu

        gallery.innerHTML = "";
        // ZMIANA TUTAJ: Używamy indexu (i) oraz przekazujemy całą tablicę project.images
        project.images.forEach((src, index) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = `Zdjęcie ${index + 1} z galerii ${project.title}`; // WCAG: Lepszy alt
          img.loading = "lazy";
          img.classList.add("gallery-detail-image");

          // Przekazujemy indeks klikniętego zdjęcia i całą listę zdjęć
          img.addEventListener("click", () =>
            openLightbox(index, project.images)
          );

          gallery.appendChild(img);
        });

        // POPRAWA SKROLLOWANIA: Zjazd do sekcji ze zdjęciami (galleryView) zamiast na samą górę strony
        galleryView.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      /* ===== POWRÓT ===== */
      backBtn.addEventListener("click", () => {
        returnToPortfolio();
      });

      /* ===== LIGHTBOX Z NAWIGACJĄ (WCAG) ===== */
      function openLightbox(startIndex, images) {
        let currentIndex = startIndex;

        // 1. Struktura HTML
        const lb = document.createElement("div");
        lb.className = "lightbox";
        lb.setAttribute("role", "dialog");
        lb.setAttribute("aria-modal", "true");
        lb.setAttribute("aria-label", "Podgląd zdjęcia");

        // SVG ikony dla lepszego wyglądu (możesz użyć swoich ikon Phosphor, tutaj daję uniwersalne SVG)
        const closeIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        const leftIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>`;
        const rightIcon = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>`;

        lb.innerHTML = `
          <button class="lb-btn lb-close" aria-label="Zamknij galerię">${closeIcon}</button>
          <div class="lightbox-content">
             <button class="lb-btn lb-prev" aria-label="Poprzednie zdjęcie">${leftIcon}</button>
             <img src="${images[currentIndex]}" alt="Powiększone zdjęcie">
             <button class="lb-btn lb-next" aria-label="Następne zdjęcie">${rightIcon}</button>
          </div>
        `;

        document.body.appendChild(lb);

        // 2. Elementy DOM
        const imgEl = lb.querySelector("img");
        const closeBtn = lb.querySelector(".lb-close");
        const prevBtn = lb.querySelector(".lb-prev");
        const nextBtn = lb.querySelector(".lb-next");

        // 3. Funkcja zmiany zdjęcia
        const showImage = (index) => {
          // Pętla (loop): jeśli koniec, idź do początku
          if (index < 0) index = images.length - 1;
          if (index >= images.length) index = 0;

          currentIndex = index;
          imgEl.src = images[currentIndex];
        };

        // 4. Obsługa zdarzeń (Mysz)
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
          if (
            e.target === lb ||
            e.target.classList.contains("lightbox-content")
          ) {
            closeLb();
          }
        });

        // 5. Obsługa Klawiatury (WCAG)
        const handleKeydown = (e) => {
          if (e.key === "Escape") closeLb();
          if (e.key === "ArrowLeft") showImage(currentIndex - 1);
          if (e.key === "ArrowRight") showImage(currentIndex + 1);
        };
        document.addEventListener("keydown", handleKeydown);

        // 6. Funkcja zamykająca
        function closeLb() {
          document.removeEventListener("keydown", handleKeydown); // Ważne: sprzątanie po sobie
          lb.remove();
        }

        // 7. Focus trap (Dla dostępności - fokus na przycisk zamknięcia przy otwarciu)
        closeBtn.focus();
      }
    })
    .catch((err) => console.error(err));
});

/* ===============================
   POWRÓT DO REALIZACJI
=============================== */
function returnToPortfolio() {
  const galleryView = document.getElementById("project-gallery-view");
  const portfolioContainer = document.getElementById("portfolio-grid");
  const section = document.getElementById("realizations-section");

  if (!galleryView || !portfolioContainer) return;

  galleryView.style.display = "none";
  portfolioContainer.style.display = "grid";
  isGalleryOpen = false;

  // Scroll powrotny do sekcji realizacji
  section.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===============================
   RENDER PORTFOLIO
=============================== */
function renderPortfolio(projects, container) {
  if (!container) return;
  container.innerHTML = "";

  const categoryNames = {
    wedding: "Śluby",
    automotive: "Motoryzacja",
    realestate: "Nieruchomości",
    portrait: "Portrety",
    nature: "Natura",
    events: "Wydarzenia",
  };

  projects.forEach((project) => {
    const item = document.createElement("div");
    item.className = "portfolio-item";
    item.dataset.category = project.category;

    const displayCategory = categoryNames[project.category] || project.category;

    // USUNIĘTE: Kod generujący opinie (testimonialHTML) został usunięty,
    // aby nie wyświetlać ich na kartach, ale JSON pozostaje bez zmian.

    item.innerHTML = `
      <div class="portfolio-image">
        <img src="${project.mainImage}" alt="${project.title}">
      </div>
      <div class="portfolio-content">
        <div class="portfolio-category">${displayCategory}</div>
        <h3 class="portfolio-title">${project.title}</h3>
        <p class="portfolio-description">${project.shortDescription}</p>
        
        <a href="#" class="portfolio-link" data-id="${project.id}">
          Zobacz więcej →
        </a>
      </div>
    `;

    container.appendChild(item);
  });
}

/* ===============================
   INIT APP
=============================== */
function initApp() {
  console.log("Init app");

  /* ===== SLIDER (POPRAWIONY POD RÓŻNE EKRANY) ===== */
  const splideEl = document.querySelector("#ferrari-gallery");
  if (splideEl) {
    new Splide("#ferrari-gallery", {
      type: "loop",
      perPage: 3, // Desktop: 3 zdjęcia
      perMove: 1,
      gap: "1rem",
      arrows: true,
      pagination: true,
      autoplay: true,
      interval: 4000,
      breakpoints: {
        1200: { perPage: 3 }, // Duże ekrany
        992: { perPage: 2 }, // Tablety poziome / małe laptopy
        768: { perPage: 1, gap: "0.5rem" }, // Tablety pionowe / Telefony - jedno zdjęcie wygląda lepiej
      },
    }).mount();
  }

  /* ===== KATEGORIE ===== */
  // WAŻNE: Selektor został zmieniony, aby nie łapał linków social media z footera!
  // Teraz łapie tylko przyciski w sekcji specjalizacji.
  document
    .querySelectorAll("#specializations-section .category-btn")
    .forEach((button) => {
      button.addEventListener("click", function () {
        if (isGalleryOpen) returnToPortfolio();

        const category = this.dataset.category;
        const section = document.getElementById("realizations-section");

        section?.scrollIntoView({ behavior: "smooth", block: "start" });

        setTimeout(() => {
          document
            .querySelectorAll(".filter-btn")
            .forEach((btn) => btn.classList.remove("active"));

          document
            .querySelector(`[data-filter="${category}"]`)
            ?.classList.add("active");

          filterItems(category);
        }, 300);
      });
    });

  /* ===== FILTRY ===== */
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      if (isGalleryOpen) returnToPortfolio();

      const filter = this.dataset.filter;

      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      filterItems(filter);
    });
  });

  function filterItems(category) {
    document.querySelectorAll(".portfolio-item").forEach((item) => {
      const cat = item.dataset.category;
      item.style.display =
        category === "all" || cat?.includes(category) ? "block" : "none";
    });
  }

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

  /* ===== AUTO DATE FOOTER ===== */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

 /* ===== HAMBURGER MENU ===== */
const header = document.querySelector(".header");
const toggle = document.querySelector(".header__toggle");
const navLinks = document.querySelectorAll(".header__nav a");

if (header && toggle) {
  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("header--open");
    toggle.setAttribute("aria-expanded", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("header--open");
      toggle.setAttribute("aria-expanded", false);
      document.body.classList.remove("menu-open");
    });
  });
}


  /* ===== SCROLL SPY (ACTIVE LINK) ===== */
  const sections = document.querySelectorAll("section[id]");

  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) =>
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            )
          );
        }
      });
    },
    {
      rootMargin: "-50% 0px -50% 0px",
    }
  );

  sections.forEach((section) => spyObserver.observe(section));
}
