const allPackages = [
  {
    id: 1,
    name: "Strefa Kobiet",
    description: "Zadbaj o Siebie i Bliskich - Poznaj Nasze Pakiety Badań.",
    color: "#e88f8b",
    picture: "/images/gynegolocy_icon_40x40.svg",
    packageDetails: [
      {
        header: "Pakiet Podstawowy",
        subheader: "Dorosła Kobieta",
        price: 559,
        currency: "zł",
        services: [
          "Konsultacja Specjalisty Ginekologa",
          "Badanie Ginekologiczne",
          "USG Ginekologiczne",
          "Cytologia",
          "Fizjoterapia Uroginekologiczna",
        ],
      },
      {
        header: "Pakiet Podstawowy",
        subheader: "Młoda Kobieta",
        specificInfo: "Studentki Uczennice do 25 roku życia",
        price: 509,
        currency: "zł",
        services: [
          "Konsultacja Specjalisty Ginekologa",
          "USG Ginekologiczne",
          "USG Piersi",
          "Cytologia",
        ],
      },
      {
        header: "Pakiet Kobiecość",
        subheader: "Pakiet Piękno",
        price: 350,
        currency: "zł",
        services: [
          "Konsultacja Dermatologiczna",
          "Konsultacja Trychologiczna",
          "Stworzenia Planu Zabiegowego",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Pakiet Endokrynologiczny",
    description: "Zadbaj o Siebie i Bliskich - Poznaj Nasze Pakiety Badań.",
    color: "#BE6B98",
    picture: "/images/strefa_kobiet_icon_40x40.svg",
    packageDetails: [
      {
        header: "Pakiet Podstawowy",
        price: 659,
        currency: "zł",
        services: [
          "USG Tarczycy",
          "Badanie Hormonów (TSH, FT3, FT4)",
          "Konsultacja Endokrynologiczna",
        ],
      },
      {
        header: "Pakiet rozszerzony",
        price: 1009,
        currency: "zł",
        services: [
          "USG Tarczycy",
          "Badanie Hormonów (TSH, FT3, FT4)",
          "Konsultacja Endokrynologiczna",
          "Biopsja Tarczycy",
        ],
      },
      {
        header: "Pakiet Full",
        price: 659,
        currency: "zł",
        services: [
          "USG Tarczycy",
          "Badanie Hormonów (TSH, FT3, FT4)",
          "Konsultacja Endokrynologiczna",
          "Biopsja Tarczycy",
          "Konsultacja Chirurga Endokrynologicznego",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Pakiet Kardiologiczny",
    description: "Zadbaj o Siebie i Bliskich - Poznaj Nasze Pakiety Badań.",
    color: "#DF1D28",
    picture: "/images/cardiologic_icon_40x40.svg",
    packageDetails: [
      {
        header: "Pakiet Kardiologiczny",
        price: 1309,
        currency: "zł",
        services: [
          "Konsultacja Kardiologiczna",
          "Echo Serca",
          "EKG Wysiłkowe",
          "EKG Spoczynkowe",
          "Holter EKG",
          "Holter ABPM",
        ],
      },
      {
        header: "Pakiet Kardiologiczny Premium",
        price: 1309,
        currency: "zł",
        services: [
          "Konsultacja Kardiologiczna",
          "Echo Serca",
          "EKG Wysiłkowe",
          "EKG Spoczynkowe",
          "Holter Premium Life",
          "Holter ABPM",
          "USG Tętnic Szyjnych",
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Pakiet Ginekologiczny - Zdrowa Kobieta",
    description: "Zadbaj o Siebie i Bliskich - Poznaj Nasze Pakiety Badań.",
    color: "#F2BAB8",
    picture: "/images/strefa_kobiet_icon_40x40.svg",
    packageDetails: [
      {
        header: "Pakiet Ginekologiczny",
        price: 759,
        currency: "zł",
        services: [
          "Konsultacja Ginekologiczna",
          "Badanie Ginekologiczne",
          "USG Ginekologiczny",
          "USG Piersi",
          "Cytologia",
        ],
      },
      {
        header: "Pakiet Ginekologcziny Premium",
        price: 809,
        currency: "zł",
        services: [
          "Konsultacja Ginekologiczna",
          "Badanie Ginekologiczne",
          "USG Ginekologiczny",
          "USG Piersi",
          "Cytologia LBC",
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Pakiet Covid",
    description: "Zadbaj o Siebie i Bliskich - Poznaj Nasze Pakiety Badań.",
    color: "#97D1CE",
    picture: "/images/covid_icon_40x40.svg",
    packageDetails: [
      {
        header: "Pakiet Covid I",
        price: 809,
        currency: "zł",
        services: [
          "Konsultacja Pulmonologiczna",
          "Konsultacja Kardiologiczna",
          "Echo Serca",
          "EKG",
        ],
      },
      {
        header: "Pakiet Covid II",
        price: 1309,
        currency: "zł",
        services: [
          "Konsultacja Pulmonologiczna",
          "Konsultacja Kardiologiczna",
          "Echo Serca",
          "EKG",
          "Próba Wysiłkowa",
          "USG Brzucha",
        ],
      },
      {
        header: "Pakiet Covid III",
        price: 1509,
        currency: "zł",
        services: [
          "Konsultacja Pulmonologiczna",
          "Konsultacja Kardiologiczna",
          "Echo Serca",
          "EKG",
          "Próba Wysiłkowa",
          "USG Brzucha",
          "Przeciwciała",
        ],
      },
    ],
  },
];

const categories = {
  women: [1, 4, 5],
  men: [3, 4, 5],
  family: [5, 6],
};
function showPackages(category, planName) {
  const packagesContainer = document.getElementById("packages");
  packagesContainer.innerHTML = ""; // Clear previous packages

  // Find the packages that match the selected category
  const selectedPackages = allPackages.filter((pkg) =>
    categories[category].includes(pkg.id)
  );

  // Generate the HTML for the selected packages
  packagesContainer.innerHTML = `
      <header class="plan__name">
        <h2>${planName}</h2>
      </header>
      <div class="grid grid--1x3">
        ${selectedPackages
          .map(
            (pkg) => `
              <picture class="packages-container-all grid grid__center" data-package-id="${pkg.id}">
                <img src="${pkg.picture}" class="icon" alt="${pkg.name}" />
                <h3 class="" style="text-align: center">${pkg.name}</h3>
              </picture>
            `
          )
          .join("")}
      </div>
    `;

  // Add click event listeners to each package element
  const packageElements = packagesContainer.querySelectorAll(
    ".packages-container-all"
  );
  packageElements.forEach((element) => {
    element.addEventListener("click", function () {
      const packageId = parseInt(this.getAttribute("data-package-id"));
      const selectedPackage = allPackages.find((pkg) => pkg.id === packageId);
      if (selectedPackage) {
        showPackageDetails(selectedPackage);
      }
    });
  });
}

function showPackageDetails(pkg) {
  const packageDetails = document.getElementById("package-details");
  packageDetails.innerHTML = ""; // Clear previous details

  // Set the inner HTML with proper structure
  packageDetails.innerHTML = `
      <header class="block__header" style="color: ${pkg.color};">
        <h2>${pkg.name}</h2>
        <p>${pkg.description}</p>
      </header>
      <div class="grid grid--1x3">
      ${pkg.packageDetails
        .map(
          (detail) => ` 
        
          <div class="plan">
            <div class="card card--secondary">
              <header >
                <h3 class="plan__name">${detail.header}</h3>
                ${
                  detail.subheader
                    ? `<h4 class="plan__subheader>${detail.subheader}</h4>`
                    : ""
                }
                ${
                  detail.specificInfo
                    ? `<p class="plan__specific_info><em>${detail.specificInfo}</p>`
                    : ""
                }
                <p class="plan__price">${detail.price} ${detail.currency}</p>
              </header>
              <div class="card__body">
                <ul class="list list--tick">
                  ${detail.services
                    .map((service) => `<li class="list__item">${service}</li>`)
                    .join("")}
                </ul>
              </div>
            </div>
          </div>
       
      `
        )
        .join("")}
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#splide", {
    type: "loop",
    perPage: 3,
    perMove: 1,
    autoplay: true,
    interval: 3000,
    breakpoints: {
      768: {
        perPage: 1,
      },
      1024: {
        perPage: 2,
      },
    },
  }).mount();
});
