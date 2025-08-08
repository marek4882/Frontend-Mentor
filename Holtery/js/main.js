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
  "Duszność bez wyraźnej przyczyny",
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

holters.forEach((holter, index) => {
  const divClass = `div${index + 1}`; // np. div1, div2, ...
  const holterHtml = `
    <div class="${divClass} card_">
      <div class="holter__header">
        <img src="" alt="" />
        <h3 class="holter__title">${holter.name}</h3>
        <p class="holter__description">${holter.description}</p>
      </div>
      <div class="holter__btn-container">
        <button class="btn btn--accent">✨ Umów się na badanie</button>
        <button onclick="showPreparationsForHolter('${holter.name}')" class="btn btn--accent btn--accent--outline">
          ✨ Zobacz Przygotowanie
        </button>
      </div>
    </div>
  `;
  holterList.innerHTML += holterHtml;
});

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
  a;
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
