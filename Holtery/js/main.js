const holters = [
  {
    id: 1,
    name: "Holter 12-Odprowadzeniowy",
    description:
      "Całodobowe monitorowanie ciśnienia tętniczego. Idealne dla osób z podejrzeniem nadciśnienia lub w celu oceny skuteczności leczenia.",
    ailments: ["Zawroty Głowy"],
  },
  {
    id: 2,
    name: "Holter 2 w 1 (EKG + ABPM)",
    description:
      "Standardowe, wygodne badanie do wykrywania arytmii i zaburzeń rytmu serca. Najczęściej wybierane przez pacjentów. Mniej elektrod, komfortowe noszenie.",
    ailments: ["Kołotanie Serca"],
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

holters.forEach((holter) => {
  const holterHtml = `
     
        <div>
            <div class="holter__header">
              <img src="" alt="" />
              <h3 class="holter__title">${holter.name}</h3>
              <p class="holter__description">${holter.description}</p>
            </div>
            <div class="grid grid--1x2 cla__btn-container">
              <button class="btn btn--accent">✨ Umów się na badanie</button>
              <button onclick="showPreparations()" class="btn btn--accent btn--accent--outline">
                ✨ Zobacz Przygotowanie
              </button>
            </div>
        </div>

  `;

  holterList.innerHTML += holterHtml;
});

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
