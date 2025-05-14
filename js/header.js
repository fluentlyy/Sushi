let lastScroll = 0;

window.addEventListener("scroll", function () {
  const header = document.querySelector(".header");
  const arrowTop = document.querySelector(".catalog__top");
  const currentScroll = window.scrollY;

  // Додаємо/прибираємо клас, якщо більше 99px
  if (currentScroll > 99) {
    header.classList.add("header__position");
    arrowTop.classList.add("arrow__appear");
  } else {
    header.classList.remove("header__position");
    arrowTop.classList.remove("arrow__appear");
  }

  // Перевірка напрямку скролу
  /* if (currentScroll > lastScroll) {
    header.classList.add("header__hidden");
  } else {
    header.classList.remove("header__hidden");
  } */

  lastScroll = currentScroll;
});
