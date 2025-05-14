/* let menuSets = document.getElementById("menu-sets");
let menuRolls = document.getElementById("menu-rolls");
let menuHot = document.getElementById("menu-hot");
let menuSushi = document.getElementById("menu-sushi");
let menuSaladesSoupes = document.getElementById("menu-salades-soupes");
let menuExtra = document.getElementById("menu-extra"); */

const mainMenu = document.querySelector(".menu__list");
const menuTitle = document.querySelector("._title");
const menuButtons = document.querySelectorAll(".catalog__item");

const menuMore = document.createElement("button");
menuMore.innerHTML = `
Більше
  <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.1018 16.9814C5.02785 16.9814 4.45387 15.7165 5.16108 14.9083L10.6829 8.59762C11.3801 7.80079 12.6197 7.80079 13.3169 8.59762L18.8388 14.9083C19.5459 15.7165 18.972 16.9814 17.898 16.9814H6.1018Z" fill="#BBBBBB "></path> </g></svg>
  `;
menuMore.classList.add("menu__more-but");

const containers = document.querySelectorAll("._container");

let translateArr = [
  { defaultName: "rolls", translateName: "Роли" },
  { defaultName: "sets", translateName: "Сети" },
  { defaultName: "hot", translateName: "Гарячі роли" },
  { defaultName: "sushi", translateName: "Суші" },
  { defaultName: "soupes-salades", translateName: "Гаряче та салати" },
  { defaultName: "extra", translateName: "Доповнення" },
  { defaultName: "philadelfii", translateName: "Філадельфії" },
];
/* function renderStartMenu(arr, num) {
  fetch("menu.json")
    .then((Response) => Response.json())
    .then((data) => {
      menuTitle.textContent = "Новинки";
      mainMenu.innerHTML = ``;

      arr.slice(0, num).forEach((element) => {
        let li = document.createElement("li");
        li.classList.add("menu__card");
        li.id = element.id;
        li.addEventListener("click", (event) => {
          openModal(category, parseInt(event.currentTarget.id));
        });
        li.innerHTML = `
    <img src="${element.image}" alt="" class="card__img" />
    <span class="card__name">${element.name}</span>
    <span class="card__description">${element.description}</span>
    <div class="card__bottom">
        <div class="card__price">
            <span class="price__main red">${element.price}₴</span>/<span class="price__weight">${element.weight}г</span>
        </div>
        <button class="card__but">Переглянути</button>
    </div>
      `;
        mainMenu.appendChild(li);
        mainMenu.appendChild(menuMore);
      });
    });
} */
fetch("menu.json")
  .then((Response) => Response.json())
  .then((data) => {
    const allItems = Object.values(data).flat();
    const newItems = allItems.filter((item) => item.isNew === true);

    console.log(newItems);

    menuTitle.textContent = "Новинки";
    mainMenu.innerHTML = ``;
    newItems.slice(0, -2).forEach((element) => {
      menuMoreClicked = false;
      let li = document.createElement("li");
      li.classList.add("menu__card");
      li.id = element.id;
      li.addEventListener("click", (event) => {
        const item = newItems.find(
          (element) => element.id === parseInt(event.currentTarget.id)
        );
        if (!item) return;
        modal.innerHTML = `
        <img src="${item.image}" alt="" class="modal__img" />
<div class="modal__body">
  <h2 class="modal__body-title">${item.name}</h2>
  <span class="modal__body-weight">Вага: ${item.weight}г</span>
  <div class="modal__body-box">
    <span class="modal-box__price">${item.price}грн</span>
    <button class="modal-box__but">В кошик</button>
  </div>
  <span class="modal__body-recipe">Склад: ${item.description}</span>
</div>`;
        document.body.appendChild(modal);
        openLayout();
      });
      li.innerHTML = `
    <img src="${element.image}" alt="" class="card__img" />
    <span class="card__name">${element.name}</span>
    <span class="card__description">${element.description}</span>
    <div class="card__bottom">
        <div class="card__price">
            <span class="price__main red">${element.price}₴</span>/<span class="price__weight">${element.weight}г</span>
        </div>
        <button class="card__but">Переглянути</button>
    </div>
      `;
      mainMenu.appendChild(li);
      mainMenu.appendChild(menuMore);
    });
  });

function translateTitle(category) {
  const found = translateArr.find((obj) => obj.defaultName === category);
  return found ? found.translateName : category;
}
let modal = document.createElement("div");
modal.classList.add("menu__modal");

function openModal(category, itemId) {
  fetch("menu.json")
    .then((Response) => Response.json())
    .then((data) => {
      const item = data[category].find((element) => element.id === itemId);
      if (!item) return;
      modal.innerHTML = `
        <img src="${item.image}" alt="" class="modal__img" />
<div class="modal__body">
  <h2 class="modal__body-title">${item.name}</h2>
  <span class="modal__body-weight">Вага: ${item.weight}г</span>
  <div class="modal__body-box">
    <span class="modal-box__price">${item.price}грн</span>
    <button class="modal-box__but">В кошик</button>
  </div>
  <span class="modal__body-recipe">Склад: ${item.description}</span>
</div>`;
      document.body.appendChild(modal);
    });

  openLayout();
}
function fetchMenu(category) {
  for (let container of containers) {
    container.style.display = "none";
  }

  fetch("menu.json")
    .then((Response) => Response.json())
    .then((data) => {
      menuTitle.textContent = translateTitle(category);
      mainMenu.innerHTML = ``;

      data[category].forEach((element) => {
        let li = document.createElement("li");
        li.classList.add("menu__card");
        li.id = element.id;
        li.addEventListener("click", (event) => {
          openModal(category, parseInt(event.currentTarget.id));
        });
        li.innerHTML = `
    <img src="${element.image}" alt="" class="card__img" />
    <span class="card__name">${element.name}</span>
    <span class="card__description">${element.description}</span>
    <div class="card__bottom">
        <div class="card__price">
            <span class="price__main red">${element.price}₴</span>/<span class="price__weight">${element.weight}г</span>
        </div>
        <button class="card__but">Переглянути</button>
    </div>
      `;
        mainMenu.appendChild(li);
      });
    });
}

function openLayout() {
  const layout = document.createElement("div");
  layout.classList.add("layout");
  document.body.appendChild(layout);

  document.body.style.overflow = "hidden";

  layout.addEventListener("click", function (e) {
    if (!modal.contains(e.target)) {
      document.body.removeChild(modal);
      document.body.removeChild(layout);
      document.body.style.overflow = "auto";
    }
  });
}

window.addEventListener("DOMContentLoaded", function () {
  const url = new URLSearchParams(window.location.search);
  const categoryFromUrl = url.get("category");

  if (categoryFromUrl) {
    fetchMenu(categoryFromUrl);
  }
});

menuMore.addEventListener("click", function () {});
