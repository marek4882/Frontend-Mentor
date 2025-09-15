const holters = [
  {
    id: 1,
    name: "Holter 12-Odprowadzeniowy",
    description:
      "Całodobowe monitorowanie ciśnienia tętniczego. Idealne dla osób z podejrzeniem nadciśnienia lub w celu oceny skuteczności leczenia.",
    ailments: ["Zawroty głowy"],
  },
  {
    id: 2,
    name: "Holter 2 w 1 (EKG + ABPM)",
    description:
      "Standardowe, wygodne badanie do wykrywania arytmii i zaburzeń rytmu serca. Najczęściej wybierane przez pacjentów. Mniej elektrod, komfortowe noszenie.",
    ailments: ["Kołatanie serca"],
  },
  {
    id: 3,
    name: "Holter Premium Life",
    description:
      "Standardowe, wygodne badanie do wykrywania arytmii i zaburzeń rytmu serca. Najczęściej wybierane przez pacjentów. Mniej elektrod, komfortowe noszenie.",
    ailments: ["Ból w klatce piersowiej"],
  },
  {
    id: 4,
    name: "Holter EKG",
    description:
      "Standardowe, wygodne badanie do wykrywania arytmii i zaburzeń rytmu serca. Najczęściej wybierane przez pacjentów. Mniej elektrod, komfortowe noszenie.",
    ailments: ["Duszność bez wyraźnej przyczyny"],
  },
  {
    id: 5,
    name: "Holter Ciśnieniowy",
    description:
      "Standardowe, wygodne badanie do wykrywania arytmii i zaburzeń rytmu serca. Najczęściej wybierane przez pacjentów. Mniej elektrod, komfortowe noszenie.",
    ailments: ["Duszność bez wyraźnej przyczyny", "Zawroty głowy"],
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

const holterList = document.getElementById("holterList");

if (holterList) {
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
    <div class="container holter--grid"></div>
  `;

  const container = holterList.querySelector(".holter--grid");

  holters.forEach((holter, index) => {
    const divClass = `div${index + 1}`;
    const holterHtml = `
      <div class="${divClass} process__step card_">
        <div class="holter__header">
          <h3 class="holter__title">${holter.name}</h3>
          <p class="holter__description">${holter.description}</p>
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

function initFAQToggle() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const icon = question.querySelector(".icon i");

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

document.addEventListener("DOMContentLoaded", initFAQToggle);

function showPreparationsForHolter(holterName) {
  const section = document.getElementById("preparationSection");
  const title = document.getElementById("holterTitle");
  const symptoms = document.querySelectorAll("#symptomList li");

  // Znajdź wybrany holter
  const selectedHolter = holters.find((h) => h.name === holterName);

  // Zmień tytuł
  title.innerHTML = `Przygotowanie dla <span class="highlights">${selectedHolter.name}</span>`;

  // Wyczyść zaznaczenia
  symptoms.forEach((item) => item.classList.remove("highlight"));

  // Zaznacz dolegliwości
  selectedHolter.ailments.forEach((symptom) => {
    const normalizedSymptom = symptom.toLowerCase();
    const match = Array.from(document.querySelectorAll("#symptomList li")).find(
      (li) =>
        li.getAttribute("data-symptom").toLowerCase() === normalizedSymptom
    );
    if (match) match.classList.add("highlight");
  });
  // Pokaż sekcję
  section.classList.remove("hidden");

  // Przewiń do sekcji
  section.scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", () => {
  initOtherSplideSliders();
  initYouTubeIframeCheck();
});

function initYouTubeIframeCheck() {
  const iframe = document.querySelector('iframe[src*="youtube.com/embed"]');
  if (!iframe) {
    console.error("YouTube iframe not found in the DOM.");
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
      console.warn("YouTube iframe is present but not visible.");
      return false;
    } else {
      console.log("YouTube iframe is present and visible.");
      return true;
    }
  };

  // Initial check
  setTimeout(checkVisibility, 100);

  // Listen for iframe load
  iframe.addEventListener("load", () => {
    console.log("YouTube iframe loaded successfully.");
    checkVisibility();
  });

  // Timeout warning
  setTimeout(() => {
    if (!iframe.complete) {
      console.warn("YouTube iframe load event did not fire within 5 seconds.");
    }
  }, 5000);
}

function initOtherSplideSliders() {
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
    console.log(`Element ${selector}:`, el); // Debug log
    if (el) {
      const splideInstance = new Splide(el, options).mount();
      console.log(`Splide mounted for ${selector}`); // Debug log
    } else {
      console.error(`Element ${selector} not found!`); // Error log
    }
  });
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("show-more")) {
    const reviewDiv = e.target.closest(".review");
    const comment = reviewDiv.querySelector(".comment");

    comment.classList.toggle("expanded");
    e.target.textContent = comment.classList.contains("expanded")
      ? "Pokaż mniej"
      : "Pokaż więcej";
  }
});
// Otwórz konsoli i sprawdź:
console.log(document.querySelector("#splide-kardiolog"));
console.log(document.querySelectorAll("#splide-kardiolog .splide__slide"));

document.addEventListener("DOMContentLoaded", () => {
  const steps = document.querySelectorAll(".process__step");

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
    ); // 50% elementu w viewport

    steps.forEach((step) => observer.observe(step));
  }
});

// Obsługa animacji kart w sekcji proces - POPRAWIONA WERSJA
document.addEventListener("DOMContentLoaded", function () {
  const processSection = document.querySelector(".process");
  // Pobierz tylko karty z sekcji process
  const cards = document.querySelectorAll(".process .card_");
  let animationTriggered = false;

  console.log("Process section found:", processSection);
  console.log("Cards found:", cards.length);

  // Funkcja do dodawania klasy hover z efektem ::before
  function activateCard(card, index) {
    setTimeout(() => {
      // Dodaj klasę hover dla efektu transformacji i cienia
      card.classList.add("hover");

      // Dodaj klasę dla efektu ::before (górny pasek)
      card.classList.add("active-before");

      console.log(`Card ${index + 1} activated`);
    }, index * 2000); // 2 sekundy odstępu między kartami
  }

  // Funkcja sprawdzająca czy element jest częściowo widoczny
  function isElementPartiallyVisible(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;

    return (
      rect.top < windowHeight * 0.8 && // Uruchom animację gdy 80% sekcji jest widoczne
      rect.bottom > 0
    );
  }

  // Główna funkcja uruchamiająca animację
  function triggerCardsAnimation() {
    if (animationTriggered || cards.length === 0) return;

    console.log("Triggering cards animation...");
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
      if (!processSection) {
        console.warn("Process section not found!");
        return;
      }

      // Sprawdź czy sekcja process jest widoczna
      if (isElementPartiallyVisible(processSection)) {
        console.log("Process section is visible, triggering animation");
        triggerCardsAnimation();
      }

      scrollTimeout = null;
    }, 100);
  }

  // Dodaj event listener dla scroll
  window.addEventListener("scroll", handleScroll);

  // Sprawdź od razu po załadowaniu strony
  setTimeout(() => {
    handleScroll();
  }, 500);

  // Funkcja resetowania animacji (do testowania)
  window.resetCardsAnimation = function () {
    animationTriggered = false;
    cards.forEach((card) => {
      card.classList.remove("hover", "active-before", "highlight");
    });
    console.log("Animacja zresetowana - można uruchomić ponownie");
  };

  // Funkcja do manualnego uruchomienia animacji (do testowania)
  window.triggerAnimation = function () {
    animationTriggered = false;
    triggerCardsAnimation();
  };
});
