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

function showPreparationsForHolter(holterName) {
  const section = document.getElementById("preparationSection");
  const title = document.getElementById("holterTitle");
  const symptoms = document.querySelectorAll("#symptomList li");

  // Znajdź wybrany holter
  const selectedHolter = holters.find((h) => h.name === holterName);

  // Zmień tytuł
  title.textContent = `Przygotowanie dla ${selectedHolter.name}`;

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
