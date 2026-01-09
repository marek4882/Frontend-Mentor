const card = document.querySelector(".doctor__card");
const cardLink = document.querySelector(".doctor__name");

const clickableElements = Array.from(card.querySelectorAll("a"));

clickableElements.forEach((ele) =>
  ele.addEventListener("click", (e) => e.stopPropagation())
);

function handleClick(event) {
  const noTextSelected = !window.getSelection().toString();

  if (noTextSelected) {
    cardLink.click();
  }
}

card.addEventListener("click", handleClick);
