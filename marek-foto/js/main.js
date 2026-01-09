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
      const descEl = document.getElementById("project-description");

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

        titleEl.textContent = project.title;
        descEl.textContent = project.fullDescription || "";
        gallery.innerHTML = "";

        project.images.forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = project.title;
          img.loading = "lazy";

          img.addEventListener("click", () => openLightbox(src));
          gallery.appendChild(img);
        });

        window.scrollTo({
          top: galleryView.offsetTop - 40,
          behavior: "smooth",
        });
      }

      /* ===== POWRÓT ===== */
      backBtn.addEventListener("click", () => {
        returnToPortfolio();
      });

      /* ===== LIGHTBOX ===== */
      function openLightbox(src) {
        const lb = document.createElement("div");
        lb.className = "lightbox";
        lb.innerHTML = `<img src="${src}" alt="">`;
        lb.addEventListener("click", () => lb.remove());
        document.body.appendChild(lb);
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

  if (!galleryView || !portfolioContainer) return;

  galleryView.style.display = "none";
  portfolioContainer.style.display = "grid";
  isGalleryOpen = false;

  window.scrollTo({
    top: portfolioContainer.offsetTop - 40,
    behavior: "smooth",
  });
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

    const testimonialHTML = project.testimonial
      ? `
        <div class="testimonial">
          <p class="testimonial-text">${project.testimonial.text}</p>
          <p class="testimonial-author">— ${project.testimonial.author}</p>
        </div>`
      : "";

    item.innerHTML = `
      <div class="portfolio-image">
        <img src="${project.mainImage}" alt="${project.title}">
      </div>
      <div class="portfolio-content">
        <div class="portfolio-category">${displayCategory}</div>
        <h3 class="portfolio-title">${project.title}</h3>
        <p class="portfolio-description">${project.shortDescription}</p>
        ${testimonialHTML}
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

  /* ===== SLIDER ===== */
  const splideEl = document.querySelector("#ferrari-gallery");
  if (splideEl) {
    new Splide("#ferrari-gallery", {
      type: "loop",
      perPage: 3,
      gap: "1rem",
      arrows: true,
      pagination: true,
      autoplay: true,
      interval: 4000,
      breakpoints: {
        1024: { perPage: 2 },
        768: { perPage: 1 },
      },
    }).mount();
  }

  /* ===== KATEGORIE ===== */
  document.querySelectorAll(".category-btn").forEach((button) => {
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

        document.querySelectorAll(".portfolio-item").forEach((item) => {
          const cat = item.dataset.category;
          item.style.display =
            category === "all" || cat?.includes(category) ? "block" : "none";
        });
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

      document.querySelectorAll(".portfolio-item").forEach((item) => {
        const cat = item.dataset.category;
        item.style.display =
          filter === "all" || cat?.includes(filter) ? "block" : "none";
      });
    });
  });

  /* ===== MOBILE MENU ===== */
  document.querySelectorAll(".collapsible").forEach((item) => {
    item.addEventListener("click", function () {
      this.classList.toggle("collapsible--expanded");
    });
  });
}
