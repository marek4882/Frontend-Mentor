const holters = [
  {
    id: 1,
    name: "Holter 12-Odprowadzeniowy",
    description:
      "Zaawansowane badanie EKG z 12 odprowadzeń umożliwiające szczegółowe wykrywanie zaburzeń przewodnictwa i niedokrwienia mięśnia sercowego. Rekomendowany pacjentom z poważniejszymi problemami kardiologicznymi.",
    ailments: [
      "Zawroty głowy",
      "Ból w klatce piersiowej",
      "Omdlenia lub utraty przytomności",
      "Podejrzenie choroby niedokrwiennej serca",
    ],
    indications: [
      "Ból w klatce piersiowej",
      "Dusznosci",
      "Zaburzenia przewodnictwa w EKG",
      "Podejrzenie niedokrwienia mięśnia sercowego",
    ],
    forWhom: ["Dorośli", "Dzieci", "Młodzież"],
  },
  {
    id: 2,
    name: "Holter 2 w 1 (EKG + ABPM)",
    description:
      "Nowoczesne połączenie monitoringu EKG i ciśnienia tętniczego w jednym urządzeniu. Umożliwia jednoczesną ocenę rytmu serca oraz wahań ciśnienia krwi, dając pełny obraz funkcjonowania układu krążenia.",
    ailments: [
      "Kołatanie serca",
      "Podejrzenie nadciśnienia tętniczego",
      "Bóle i uciski w klatce piersiowej związane z wahaniami ciśnienia",
      "Epizody osłabienia lub zmęczenia niewiadomego pochodzenia",
    ],
    indications: [
      "Bóle i uciski w klatce piersiowej",
      "Kołatania serca",
      "Podejrzenie nadciśnienia tętniczego",
      "Objawy osłabienia niewiadomego pochodzenia",
    ],
    forWhom: ["Dorośli", "Dzieci", "Młodzież"],
  },
  {
    id: 3,
    name: "Holter Premium Life",
    description:
      "Lekkie, komfortowe urządzenie praktycznie niewyczuwalne podczas noszenia. Bezprzewodowa konstrukcja i ograniczona liczba elektrod zapewniają wygodę przy wysokiej dokładności wykrywania arytmii.",
    ailments: [
      "Ból w klatce piersiowej",
      "Kołatania serca",
      "Nieregularny rytm serca",
      "Napadowe duszności podczas wysiłku",
    ],
    indications: [
      "Ból w klatce piersiowej",
      "Kołatania serca",
      "Nieregularny rytm serca",
    ],
    forWhom: ["Dorośli", "Dzieci", "Młodzież"],
  },
  {
    id: 4,
    name: "Holter EKG",
    description:
      "Klasyczny Holter EKG do całodobowego monitorowania pracy serca. Uniwersalne badanie umożliwiające wykrycie arytmii, ocenę rytmu zatokowego.",
    ailments: [
      "Duszność bez wyraźnej przyczyny",
      "Kołatania serca",
      "Zawroty głowy i uczucie osłabienia",
      "Epizody omdleń",
    ],
    indications: [
      "Duszność ",
      "Kołatania serca",
      "Zawroty głowy i uczucie osłabienia",
    ],
    forWhom: ["Dorośli", "Dzieci", "Młodzież"],
  },
  {
    id: 5,
    name: "Holter Ciśnieniowy (ABPM)",
    description:
      "Urządzenie do całodobowego monitorowania ciśnienia tętniczego z automatycznymi pomiarami co kilkanaście minut. Pozwala dokładnie ocenić dobowy profil ciśnienia krwi i skuteczność stosowanej terapii.",
    ailments: [
      "Duszność bez wyraźnej przyczyny",
      "Zawroty głowy",
      "Nadciśnienie tętnicze",
      "Objawy niedokrwienia mózgu związane z wahaniami ciśnienia",
    ],
    indications: ["Nadciśnienie tętnicze", "Zawroty głowy", "Duszność"],
    forWhom: ["Dorośli", "Dzieci", "Młodzież"],
  },
];

const allAilments = [
  "Kołatanie serca",
  "Zawroty głowy",
  "Ból w klatce piersiowej",
];

const preparations = [
  {
    id: 1,
    items: [
      { logo: "💧", preparationItem: "lorem1" },
      { logo: "💧", preparationItem: "lorem2" },
      { logo: "💧", preparationItem: "lorem3" },
      { logo: "💧", preparationItem: "lorem4" },
    ],
  },
];

// Funkcje obsługi Holterów
function showPreparationsForHolter(holterName) {
  const section = document.getElementById("preparationSection");
  const title = document.getElementById("holterTitle");
  const symptomList = document.getElementById("symptomList");

  if (!section || !title || !symptomList) {
    console.error("Nie znaleziono wymaganych elementów DOM");
    return;
  }

  // Znajdź wybrany holter
  const selectedHolter = holters.find((h) => h.name === holterName);
  if (!selectedHolter) {
    console.error(`Nie znaleziono holtera o nazwie: ${holterName}`);
    return;
  }

  // Zmień tytuł
  title.innerHTML = `Przygotowanie dla <span class="highlights">${selectedHolter.name}</span>`;

  // Wyczyść listę dolegliwości
  symptomList.innerHTML = "";

  // Wygeneruj wszystkie dolegliwości holtera
  selectedHolter.ailments.forEach((symptom) => {
    const li = document.createElement("li");
    li.classList.add("symptom-item", "highlight");
    li.setAttribute("data-symptom", symptom);

    li.innerHTML = `
      <div class="symptom-item__indicator">✓</div>
      <span class="symptom-item__text">${symptom}</span>
    `;

    symptomList.appendChild(li);
  });

  // Pokaż sekcję
  section.classList.remove("hidden");

  // Przewiń do sekcji
  section.scrollIntoView({ behavior: "smooth" });
}

// Inicjalizacja listy Holterów
function initHolterList() {
  const holterList = document.getElementById("holterList");

  if (!holterList) {
    return; // Element nie istnieje na tej stronie
  }

  holterList.innerHTML = `
    <div class="block__header">
      <h2>Wybierz swój <span class="highlights">Holter</span></h2>
      <p>
        Zastanawiasz się, jaki holter będzie dla Ciebie najlepszy? Poniżej
        znajdziesz krótkie opisy dostępnych opcji – dzięki temu łatwiej
        podejmiesz decyzję. W razie wątpliwości skontaktuj się z nami – chętnie
        odpowiemy na pytania i pomożemy umówić wizytę lub konsultację z lekarzem.
      </p>
    </div>
    <div class="container"></div>
    <div class="container holter--grid"></div>
  `;

  const container = holterList.querySelector(".holter--grid");

  holters.forEach((holter, index) => {
    const divClass = `div${index + 1}`;

    // Generowanie Wskazań
    const indicationsHtml = holter.indications
      .map(
        (ind) =>
          `<div class="hero-badge" style="background:#cd1a2d">${ind}</div>`
      )
      .join("");

    // Generowanie Dla Kogo
    const forWhomHtml = holter.forWhom
      .map((fw) => `<div class="hero-badge">${fw}</div>`)
      .join("");

    const holterHtml = `
      <div class="${divClass} process__step card_">
        <div class="holter__header">
          <h3 class="holter__title">${holter.name}</h3>
          <p class="holter__description">${holter.description}</p>
          <div style="margin-top:0.8rem; text-align:left">
            <div class="hero-badge__wrapper">
              <p style="font-weight: bold; margin-bottom: 0.3rem">Wskazania:</p>
              ${indicationsHtml}
            </div>
            <div class="hero-badge__wrapper">
              <p style="font-weight: bold; margin-bottom: 0.3rem">Dla Kogo:</p>
              ${forWhomHtml}
            </div>
          </div>
        </div>
        <div class="holter__btn-container">
          <button class="btn btn--accent"><i class="ph ph-phone"></i> Umów się na badanie</button>
          <button
            onclick="showPreparationsForHolter('${holter.name}')"
            class="btn btn--accent btn--accent--outline"
          >
            <i class="ph ph-list-checks"></i> Zobacz Przygotowanie
          </button>
        </div>
      </div>
    `;
    container.innerHTML += holterHtml;
  });
}
// FAQ Toggle
function initFAQToggle() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    const icon = question.querySelector(".icon i");
    if (!icon) return;

    // ustaw ikonę na start
    icon.className = item.classList.contains("active")
      ? "ph ph-x-circle"
      : "ph ph-plus-circle";

    question.addEventListener("click", () => {
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active");
          const otherIcon = otherItem.querySelector(".icon i");
          if (otherIcon) otherIcon.className = "ph ph-plus-circle";
        }
      });

      item.classList.toggle("active");
      icon.className = item.classList.contains("active")
        ? "ph ph-x-circle"
        : "ph ph-plus-circle";
    });
  });
}

// YouTube iframe check
function initYouTubeIframeCheck() {
  const iframe = document.querySelector('iframe[src*="youtube.com/embed"]');
  if (!iframe) {
    console.log(
      "YouTube iframe nie został znaleziony - prawdopodobnie nie ma go na tej stronie."
    );
    return;
  }

  // Check if iframe is properly visible
  const checkVisibility = () => {
    const rect = iframe.getBoundingClientRect();
    const style = getComputedStyle(iframe);

    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      rect.width === 0 ||
      rect.height === 0
    ) {
      console.warn("YouTube iframe jest obecny, ale nie jest widoczny.");
      return false;
    } else {
      console.log("YouTube iframe jest obecny i widoczny.");
      return true;
    }
  };

  // Initial check
  setTimeout(checkVisibility, 100);

  // Listen for iframe load
  iframe.addEventListener("load", () => {
    console.log("YouTube iframe załadowany pomyślnie.");
    checkVisibility();
  });

  // Timeout warning
  setTimeout(() => {
    if (!iframe.complete) {
      console.warn("YouTube iframe nie załadował się w ciągu 5 sekund.");
    }
  }, 5000);
}

// Splide sliders initialization
function initOtherSplideSliders() {
  // Sprawdź czy Splide jest dostępny
  if (typeof Splide === "undefined") {
    console.log("Splide nie jest załadowany - slajdery nie będą działać.");
    return;
  }

  const sliders = [
    {
      selector: "#benefits-splide",
      options: {
        type: "loop",
        perPage: 5,
        perMove: 1,
        focus: "left",
        autoplay: false,
        pauseOnHover: true,
        interval: 3000,
        breakpoints: {
          768: { perPage: 1 },
          1024: { perPage: 2 },
        },
      },
    },
    {
      selector: "#splide-kardiolog",
      options: {
        type: "loop",
        perPage: 2,
        gap: "1rem",
        perMove: 1,
        focus: "left",
        autoplay: false,
        pauseOnHover: true,
        interval: 3000,
        breakpoints: {
          768: { perPage: 1 },
          1024: { perPage: 2 },
        },
      },
    },
    {
      selector: "#splide-kardiologs",
      options: {
        type: "loop",
        perPage: 2,
        perMove: 1,
        focus: "left",
        gap: "1rem",
        autoplay: false,
        pauseOnHover: true,
        interval: 3000,
        breakpoints: {
          768: { perPage: 1 },
          1024: { perPage: 2 },
        },
      },
    },
  ];

  sliders.forEach(({ selector, options }) => {
    const el = document.querySelector(selector);
    if (el) {
      try {
        const splideInstance = new Splide(el, options).mount();
        console.log(`Splide zamontowany dla ${selector}`);
      } catch (error) {
        console.error(`Błąd podczas montowania Splide dla ${selector}:`, error);
      }
    } else {
      console.log(
        `Element ${selector} nie został znaleziony - prawdopodobnie nie ma go na tej stronie.`
      );
    }
  });
}

// Review show more/less functionality
function initReviewToggle() {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("show-more")) {
      const reviewDiv = e.target.closest(".review");
      if (!reviewDiv) return;

      const comment = reviewDiv.querySelector(".comment");
      if (!comment) return;

      comment.classList.toggle("expanded");
      e.target.textContent = comment.classList.contains("expanded")
        ? "Pokaż mniej"
        : "Pokaż więcej";
    }
  });
}

// Mobile hover simulation for process steps
function initMobileHoverSimulation() {
  const steps = document.querySelectorAll(".process__step");

  if (!steps.length) return;

  // tylko dla mobile
  if (window.innerWidth <= 768) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hover"); // symulacja hover
          } else {
            entry.target.classList.remove("hover");
          }
        });
      },
      { threshold: 0.5 }
    );

    steps.forEach((step) => observer.observe(step));
  }
}

// Process cards animation
function initProcessCardsAnimation() {
  const processSection = document.querySelector(".process");
  const cards = document.querySelectorAll(".process .card_");
  let animationTriggered = false;

  if (!processSection || !cards.length) {
    console.log(
      "Sekcja process lub karty nie zostały znalezione - prawdopodobnie nie ma ich na tej stronie."
    );
    return;
  }

  console.log("Process section found:", processSection);
  console.log("Cards found:", cards.length);

  // Funkcja do dodawania klasy hover z efektem ::before
  function activateCard(card, index) {
    setTimeout(() => {
      card.classList.add("hover", "active-before");
      console.log(`Card ${index + 1} activated`);
    }, index * 2000);
  }

  // Funkcja sprawdzająca czy element jest częściowo widoczny
  function isElementPartiallyVisible(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return rect.top < windowHeight * 0.8 && rect.bottom > 0;
  }

  // Główna funkcja uruchamiająca animację
  function triggerCardsAnimation() {
    if (animationTriggered || cards.length === 0) return;

    console.log("Uruchamiam animację kart...");
    animationTriggered = true;

    // Usuń wszystkie aktywne klasy przed rozpoczęciem nowej animacji
    cards.forEach((card) => {
      card.classList.remove("hover", "active-before", "highlight");
    });

    // Aktywuj karty kolejno z 2-sekundowym odstępem
    cards.forEach((card, index) => {
      activateCard(card, index);
    });

    console.log("Animacja kart została uruchomiona!");
  }

  // Event listener dla scroll z throttling
  let scrollTimeout;
  function handleScroll() {
    if (scrollTimeout) return;

    scrollTimeout = setTimeout(() => {
      // Sprawdź czy sekcja process jest widoczna
      if (isElementPartiallyVisible(processSection)) {
        console.log("Sekcja process jest widoczna, uruchamiam animację");
        triggerCardsAnimation();
      }
      scrollTimeout = null;
    }, 100);
  }

  // Dodaj event listener dla scroll
  window.addEventListener("scroll", handleScroll);

  // Sprawdź od razu po załadowaniu strony
  setTimeout(handleScroll, 500);

  // Funkcje globalne do testowania
  window.resetCardsAnimation = function () {
    animationTriggered = false;
    cards.forEach((card) => {
      card.classList.remove("hover", "active-before", "highlight");
    });
    console.log("Animacja zresetowana - można uruchomić ponownie");
  };

  window.triggerAnimation = function () {
    animationTriggered = false;
    triggerCardsAnimation();
  };
}

// Główna funkcja inicjalizująca
function initializeApp() {
  initHolterList();
  initFAQToggle();
  initOtherSplideSliders();
  initYouTubeIframeCheck();
  initReviewToggle();
  initMobileHoverSimulation();
  initProcessCardsAnimation();
}

// Event listeners
document.addEventListener("DOMContentLoaded", initializeApp);

// Dodatkowe sprawdzenie po załadowaniu wszystkich zasobów
window.addEventListener("load", () => {
  console.log("Wszystkie zasoby zostały załadowane");
  // Ponownie sprawdź slajdery w przypadku opóźnionego ładowania Splide
  setTimeout(() => {
    initOtherSplideSliders();
  }, 1000);
});

// Debug logs (można usunąć w wersji produkcyjnej)
console.log("Skrypt załadowany pomyślnie");

// Eksportuj funkcje dla compatibility (jeśli potrzebne)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    holters,
    allAilments,
    preparations,
    showPreparationsForHolter,
    initializeApp,
  };
}
