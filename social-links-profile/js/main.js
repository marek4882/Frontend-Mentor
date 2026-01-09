const cardItems = document.querySelectorAll(".social-card__links-item");

cardItems.forEach((cardItem) => {
  const cardLink = cardItem.querySelector(".social-card__link");

  function handleClick(event) {
    if (event.target.tagName === "A") return;

    const noTextSelected = !window.getSelection().toString();

    if (noTextSelected && cardLink) {
      cardLink.click();
    }
  }

  cardItem.addEventListener("click", handleClick);
});
