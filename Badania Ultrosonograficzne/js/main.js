// // Dane lekarzy
// const doctors = [
//   {
//     id: 1,
//     name: "Mgr Roxana Wojtas - Tabiś",
//     link: "https://uniestetica.pl/lekarze/mgr-roxana-wojtas-tabis/",
//     phone: "606565000",
//     groups: ["dzieci_mlodziez", "osoby_dorosle"], // Lekarz obsługuje obie grupy
//   },
//   {
//     id: 2,
//     name: "Dr Jan Kowalski",
//     phone: "606565001",
//     groups: ["osoby_dorosle"], // Lekarz obsługuje tylko osoby dorosłe
//   },
//   {
//     id: 3,
//     name: "Dr n. med. Jakub Zasada",
//     link: "",
//     groups: ["dzieci_mlodziez", "osoby_dorosle"],
//   },
//   {
//     id: 4,
//     name: "Dr Maciej Mąkowski",
//     groups: ["dzieci_mlodziez", "osoby_dorosle"],
//   },
// ];

// // Kategorie USG
// const usgCategories = [
//   {
//     id: 1,
//     title: "USG aorty brzusznej",
//     doctors: [1, 2], // Id lekarzy wykonujących badanie
//     preparation:
//       "Przed badaniem USG moszny należy upewnić się, że obszar jest czysty. Zaleca się założenie wygodnej, luźnej odzieży. Nie wymaga specjalnego przygotowania.",
//   },
//   {
//     id: 2,
//     title: "USG jamy brzusznej",
//     doctors: [1], // Tylko pierwszy lekarz wykonuje to badanie
//     preparation:
//       "Należy być na czczo przez co najmniej 6 godzin przed badaniem. Pij wodę, aby pęcherz był pełny.",
//   },

//   {
//     id: 3,
//     title: "",
//     doctors: [],
//     preparation: "",
//   },
//   {
//     id: 3,
//     title: "",
//     doctors: [],
//     preparation: "",
//   },
//   {
//     id: 3,
//     title: "",
//     doctors: [],
//     preparation: "",
//   },
//   {
//     id: 3,
//     title: "",
//     doctors: [],
//     preparation: "",
//   },
//   {
//     id: 3,
//     title: "",
//     doctors: [],
//     preparation: "",
//   },
// ];

// // Grupy pacjentów
// const groups = {
//   dzieci_mlodziez: [1], // Kategorie USG przypisane dzieciom i młodzieży
//   osoby_dorosle: [1, 2, 2, 3], // Kategorie USG przypisane osobom dorosłym
// };

// function renderUSGByGroup(groupKey) {
//   const groupCategories = groups[groupKey];
//   const container = document.querySelector(`.${groupKey}`);

//   groupCategories.forEach((categoryId) => {
//     const category = usgCategories.find((cat) => cat.id === categoryId);

//     if (category) {
//       const categorySection = document.createElement("section");
//       categorySection.classList.add("collapsible");

//       const doctorsForCategory = category.doctors
//         .map((doctorId) =>
//           doctors.find(
//             (doc) => doc.id === doctorId && doc.groups.includes(groupKey)
//           )
//         )
//         .filter(Boolean);

//       categorySection.innerHTML = `
//               <div class="card--content flex">
//                 <p class="card--content__title">${category.title}</p>
//                 <svg class="icon icon--white collapsible__chevron">
//                   <use xlink:href="images/sprite.svg#chevron"></use>
//                 </svg>
//               </div>
//               <div class="collapsible__content">
//                <div class="card--content">
//                 ${doctorsForCategory
//                   .map(
//                     (doctor) => `

//                       <div class="plan" title="Poznaj Specjalistę">
//                         <a href="https://uniestetica.pl/lekarze/mgr-roxana-wojtas-tabis/">
//                           <div class="card">
//                             <header class="card__header">
//                               <i class="ph ph-asclepius"></i>
//                             </header>
//                             <div class="card__body">
//                               <p class="card__title">${doctor.name}</p>
//                             </div>
//                           </div>
//                         </a>
//                         <a href="tel:${doctor.phone}">
//                           <button class="btn btn--primary btn--block">
//                             <i class="ph ph-phone"></i> Umów Wizytę
//                           </button>
//                         </a>
//                       </div>
//                     `
//                   )
//                   .join("")}
//                    <button class="btn btn--secondary btn--block collapsible__button">
//                   Zalecenia

//                 </button>
//                 <div class="collapsible__preparation" style="display: none">
//                   <p>${category.preparation}</p>
//                 </div>
//                   </div>

//               </div>
//             `;

//       container.appendChild(categorySection);
//     }
//   });
// }

// document.addEventListener("DOMContentLoaded", () => {
//   renderUSGByGroup("dzieci_mlodziez");
//   renderUSGByGroup("osoby_dorosle");

//   const collapsibles = document.querySelectorAll(".collapsible");
//   collapsibles.forEach((item) =>
//     item.addEventListener("click", function () {
//       this.classList.toggle("collapsible--expanded");
//     })
//   );

//   const buttons = document.querySelectorAll(".collapsible__button");
//   buttons.forEach((button) => {
//     button.addEventListener("click", (event) => {
//       event.stopPropagation();
//       const preparationContent = button.nextElementSibling;
//       preparationContent.style.display =
//         preparationContent.style.display === "none" ||
//         !preparationContent.style.display
//           ? "block"
//           : "none";
//     });
//   });
// });
