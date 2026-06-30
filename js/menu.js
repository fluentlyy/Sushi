const mainMenu = document.querySelector(".menu__list");
const menu = document.querySelector(".menu");
const menuTitle = document.querySelector("._title");
const menuButtons = document.querySelectorAll(".catalog__item");
const footer = document.querySelector(".footer");
const menuMore = document.createElement("button");

const containers = document.querySelectorAll("._container");

let modal = document.createElement("div");
const cartModal = document.createElement("div");

const layout = document.createElement("div");

const cart = document.createElement("button");

let isClicked = false;

let cartCatalog = [];

const savedCart = localStorage.getItem("cart");
if (savedCart) {
  cartCatalog = JSON.parse(savedCart);
}

let translateArr = [
  { defaultName: "rolls", translateName: "Роли" },
  { defaultName: "sets", translateName: "Сети" },
  { defaultName: "hot", translateName: "Гарячі роли" },
  { defaultName: "sushi", translateName: "Суші" },
  { defaultName: "soupes-salades", translateName: "Гаряче та салати" },
  { defaultName: "extra", translateName: "Доповнення" },
  { defaultName: "philadelfii", translateName: "Філадельфії" },
];

modal.classList.add("menu__modal");
menuMore.classList.add("menu__more-but");
cart.classList.add("cart");

menuMore.innerHTML = `
Більше
  <svg class="up-svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.1018 16.9814C5.02785 16.9814 4.45387 15.7165 5.16108 14.9083L10.6829 8.59762C11.3801 7.80079 12.6197 7.80079 13.3169 8.59762L18.8388 14.9083C19.5459 15.7165 18.972 16.9814 17.898 16.9814H6.1018Z" fill="#BBBBBB "></path> </g></svg>
  `;
cart.innerHTML = `
<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
`;

cart.addEventListener("click", function () {
  openCart();
});

document.body.appendChild(cart);

function renderStartMenu(arr, num) {
  menuTitle.textContent = "Новинки";
  mainMenu.innerHTML = ``;

  arr.slice(0, num).forEach((element) => {
    let li = document.createElement("li");
    li.classList.add("menu__card");
    li.id = element.id;
    li.addEventListener("click", (event) => {
      openModal(arr, null, parseInt(event.currentTarget.id));
    });
    li.innerHTML = `
    <div class="card__img-container">
  <img src="${element.image}" alt="" class="card__img" />
</div>
    
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
    menu.appendChild(menuMore);
  });
}

fetch("menu.json")
  .then((response) => response.json())
  .then((data) => {
    const allItems = Object.values(data).flat();
    const newItems = allItems.filter((item) => item.isNew === true);

    renderStartMenu(newItems, -2);

    menuMore.addEventListener("click", function () {
      isClicked = !isClicked;

      if (isClicked) {
        renderStartMenu(newItems, newItems.length);
        menuMore.innerHTML = `
  Закрити
  <svg class="rotate" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.1018 16.9814C5.02785 16.9814 4.45387 15.7165 5.16108 14.9083L10.6829 8.59762C11.3801 7.80079 12.6197 7.80079 13.3169 8.59762L18.8388 14.9083C19.5459 15.7165 18.972 16.9814 17.898 16.9814H6.1018Z" fill="#BBBBBB "></path> </g></svg>
  `;
      } else {
        renderStartMenu(newItems, -2);
        menuMore.innerHTML = `
Більше
  <svg class="up-svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.1018 16.9814C5.02785 16.9814 4.45387 15.7165 5.16108 14.9083L10.6829 8.59762C11.3801 7.80079 12.6197 7.80079 13.3169 8.59762L18.8388 14.9083C19.5459 15.7165 18.972 16.9814 17.898 16.9814H6.1018Z" fill="#BBBBBB "></path> </g></svg>
  `;
      }
    });
  });

function fetchMenu(category) {
  if (category == "report") {
    menu.innerHTML =
      "<h1 class='report__content'>Сторінка наразі в розробці</h1>";
    footer.style.display = "none";
    menuMore.style.display = "none";
  }

  for (let container of containers) {
    container.style.display = "none";
  }

  fetch("menu.json")
    .then((Response) => Response.json())
    .then((data) => {
      mainMenu.classList.add(category);

      menuTitle.textContent = translateTitle(category);
      mainMenu.innerHTML = ``;

      data[category].forEach((element) => {
        let li = document.createElement("li");
        li.classList.add("menu__card");
        li.id = element.id;
        li.addEventListener("click", (event) => {
          openModal(data, category, parseInt(event.currentTarget.id));
        });
        li.innerHTML = `
    <div class="card__img-container">
  <img src="${element.image}" alt="" class="card__img" />
</div>
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
        menuMore.remove();
      });
    });
}
function translateTitle(category) {
  const found = translateArr.find((obj) => obj.defaultName === category);
  return found ? found.translateName : category;
}
function openModal(arr, category, itemId) {
  const source = category ? arr[category] : arr;
  const item = (source || []).find((element) => element.id === itemId);
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
    </div>
  `;
  document.body.appendChild(modal);

  const modalButton = modal.querySelector(".modal-box__but");
  if (modalButton) {
    modalButton.addEventListener("click", () => {
      cartCatalog.push(item);
      console.log(cartCatalog);
      localStorage.setItem("cart", JSON.stringify(cartCatalog));
      openCart();
    });
  }

  openLayout(modal);
}
function openCart() {
  cartModal.classList.add("menu__modal");
  cartModal.classList.add("cart__modal");
  document.body.appendChild(cartModal);

  cartModal.innerHTML = `
 <h2 class="_title">Кошик</h2>
 <div class="cart__catalog"></div>
 <div class="cart-bot">
  <div class="cart-bot__info">
    <div>
    <span class="cart-bot__text">Сума замовлення:</span>
    <span class="cart-bot__price">0грн</span>
    </div>
    <div>
    <span class="cart-bot__text">Доставка:</span>
    </div>
  </div>
  <div class="cart-bot__buttons confirm-but">
    <button class="cart-box__button">Оформити замовлення</button>
    <button class="cart-box__button continue-but">Продовжити перегляд</button>
  </div>
</div>
  `;

  const cartCatalogCont = cartModal.querySelector(".cart__catalog");
  const totalPriceEl = cartModal.querySelector(".cart-bot__price");

  function updateTotalPrice() {
    const total = cartCatalog.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    totalPriceEl.textContent = `${total}грн`;
  }

  cartCatalog.forEach((item, index) => {
    item.quantity = 1;

    const catalogItem = document.createElement("div");
    catalogItem.classList.add("cart-catalog__item");
    catalogItem.innerHTML = `
      <img src="${item.image}" alt="" class="catalog__item-img" />
      <span class="catalog__item-name">${item.name}</span>
      <div class="catalog__item-countity">
        <button class="item-countity__button del">-</button>
        <div class="item-countity__text">${item.quantity}</div>
        <button class="item-countity__button plus">+</button>
      </div>
      <span class="catalog__item-price">${item.price}грн</span>
    `;

    const delItems = catalogItem.querySelector(".del");
    const plusItems = catalogItem.querySelector(".plus");
    const itemQuantityText = catalogItem.querySelector(".item-countity__text");
    const itemPriceText = catalogItem.querySelector(".catalog__item-price");

    function updateDisplay() {
      itemQuantityText.textContent = item.quantity;
      itemPriceText.textContent = `${item.quantity * item.price}грн`;

      updateTotalPrice();
    }

    plusItems.addEventListener("click", () => {
      item.quantity++;
      updateDisplay();
    });

    delItems.addEventListener("click", () => {
      if (item.quantity > 0) {
        item.quantity--;
      }
      if (item.quantity == 0) {
        cartCatalog = cartCatalog.filter((item) => item.quantity !== 0);
        console.log(cartCatalog);
      }
      updateDisplay();
    });

    cartCatalogCont.appendChild(catalogItem);
  });

  updateTotalPrice(); // Перший розрахунок після створення

  const confirmBut = cartModal.querySelector(".confirm-but");
  confirmBut.addEventListener("click", function () {
    const total = localArr.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    if (total < 150) {
      closeLayout(cartModal);
    }
  });

  if (cartCatalog.length === 0) {
    cartModal.innerHTML = `
      <h2 class="_title">Кошик</h2>
      <p class="none__cart">Кошик порожній</p>
    `;
  }

  if (modal) {
    modal.remove();
  }

  openLayout(cartModal);
}

function openLayout(element) {
  layout.classList.add("layout");
  document.body.appendChild(layout);

  document.body.style.overflow = "hidden";

  layout.addEventListener("click", function (e) {
    if (!modal.contains(e.target)) {
      closeLayout(element);
    }
  });
}
function closeLayout(element) {
  element.remove();
  layout.remove();
  document.body.style.overflow = "auto";
}
window.addEventListener("DOMContentLoaded", function () {
  const url = new URLSearchParams(window.location.search);
  const categoryFromUrl = url.get("category");

  if (categoryFromUrl) {
    fetchMenu(categoryFromUrl);
  }
});
