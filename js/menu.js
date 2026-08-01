// ==========================================
// 1. КОНСТАНТИ ТА СЛОВНИКИ
// ==========================================
const TRANSLATIONS = {
  rolls: "Роли",
  sets: "Сети",
  hot: "Гарячі роли",
  sushi: "Суші",
  "soupes-salades": "Гаряче та салати",
  extra: "Доповнення",
  philadelfii: "Філадельфії",
};

const SVG_ICONS = {
  arrowUp: `<svg class="up-svg" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1018 16.9814C5.02785 16.9814 4.45387 15.7165 5.16108 14.9083L10.6829 8.59762C11.3801 7.80079 12.6197 7.80079 13.3169 8.59762L18.8388 14.9083C19.5459 15.7165 18.972 16.9814 17.898 16.9814H6.1018Z" fill="#BBBBBB "></path></svg>`,
  arrowDown: `<svg class="rotate" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.1018 16.9814C5.02785 16.9814 4.45387 15.7165 5.16108 14.9083L10.6829 8.59762C11.3801 7.80079 12.6197 7.80079 13.3169 8.59762L18.8388 14.9083C19.5459 15.7165 18.972 16.9814 17.898 16.9814H6.1018Z" fill="#BBBBBB "></path></svg>`,
  cart: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`,
};

// ==========================================
// 2. DOM ЕЛЕМЕНТИ ТА СТАН (STATE)
// ==========================================
const mainMenu = document.querySelector(".menu__list");
const menuContainer = document.querySelector(".menu");
const menuTitle = document.querySelector("._title");
const footer = document.querySelector(".footer");
const containers = document.querySelectorAll("._container");

// Динамічні елементи
const menuMoreBtn = document.createElement("button");
menuMoreBtn.classList.add("menu__more-but");

const modalProduct = document.createElement("div");
modalProduct.classList.add("menu__modal");

const modalCart = document.createElement("div");
modalCart.classList.add("menu__modal", "cart__modal");

const layoutOverlay = document.createElement("div");
layoutOverlay.classList.add("layout");

// Глобальний стан додатку
let cartCatalog = JSON.parse(localStorage.getItem("cart")) || [];
let isMenuExpanded = false;

// ==========================================
// 3. ІНІЦІАЛІЗАЦІЯ ДОДАТКУ
// ==========================================
function initApp() {
  createCartButton();

  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get("category");

  if (categoryFromUrl) {
    fetchMenu(categoryFromUrl);
  } else {
    loadStartMenu();
  }
}

function createCartButton() {
  const cartBtn = document.createElement("button");
  cartBtn.classList.add("cart");
  cartBtn.innerHTML = SVG_ICONS.cart;
  cartBtn.addEventListener("click", openCart);
  document.body.appendChild(cartBtn);
}

// ==========================================
// 4. РЕНДЕРИНГ ШАБЛОНІВ ТА МЕНЮ
// ==========================================
function createProductCardHTML(element) {
  return `
    <div class="card__img-container">
      <img src="${element.image}" alt="${element.name}" class="card__img" />
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
}

function renderMenuCards(items, sourceData, category = null) {
  mainMenu.innerHTML = "";
  items.forEach((element) => {
    const li = document.createElement("li");
    li.classList.add("menu__card");
    li.id = element.id;
    li.innerHTML = createProductCardHTML(element);

    li.addEventListener("click", () => {
      openModal(sourceData, category, parseInt(element.id));
    });

    mainMenu.appendChild(li);
  });
}

function loadStartMenu() {
  menuTitle.textContent = "Новинки";

  fetch("menu.json")
    .then((res) => res.json())
    .then((data) => {
      const allItems = Object.values(data).flat();
      const newItems = allItems.filter((item) => item.isNew);

      // Відображаємо спочатку лише частину (імітація твого slice(0, -2))
      const initialCount = Math.max(0, newItems.length - 2);
      renderMenuCards(newItems.slice(0, initialCount), newItems);

      updateMoreButtonText(initialCount, newItems.length);
      menuContainer.appendChild(menuMoreBtn);

      // Перевіряємо, чи є вже обробник, щоб не плодити дублікати
      menuMoreBtn.onclick = () => {
        isMenuExpanded = !isMenuExpanded;
        if (isMenuExpanded) {
          renderMenuCards(newItems, newItems);
          menuMoreBtn.innerHTML = `Закрити ${SVG_ICONS.arrowDown}`;
        } else {
          renderMenuCards(newItems.slice(0, initialCount), newItems);
          updateMoreButtonText(initialCount, newItems.length);
        }
      };
    })
    .catch((err) =>
      console.error("Помилка завантаження стартового меню:", err),
    );
}

function updateMoreButtonText(current, total) {
  menuMoreBtn.innerHTML = `Більше (${current}/${total}) ${SVG_ICONS.arrowUp}`;
}

function fetchMenu(category) {
  if (category === "report") {
    menuContainer.innerHTML =
      "<h1 class='report__content'>Сторінка наразі в розробці</h1>";
    footer.style.display = "none";
    menuMoreBtn.remove();
    return;
  }

  containers.forEach((container) => (container.style.display = "none"));

  fetch("menu.json")
    .then((res) => res.json())
    .then((data) => {
      if (!data[category]) return;

      mainMenu.className = `menu__list ${category}`;
      menuTitle.textContent = TRANSLATIONS[category] || category;

      renderMenuCards(data[category], data, category);
      menuMoreBtn.remove();
    })
    .catch((err) => console.error("Помилка завантаження категорії:", err));
}

// ==========================================
// 5. МОДАЛЬНЕ ВІКНО ТОВАРУ
// ==========================================
function openModal(data, category, itemId) {
  const source = category ? data[category] : data;
  const item = source.find((el) => el.id === itemId);
  if (!item) return;

  modalProduct.innerHTML = `
  <button class="modal__close-btn">&times;</button>
    <img src="${item.image}" alt="${item.name}" class="modal__img" />
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

  modalProduct.querySelector(".modal__close-btn").onclick = () => {
    closeLayout(modalProduct);
  };

  document.body.appendChild(modalProduct);

  modalProduct.querySelector(".modal-box__but").onclick = () => {
    addToCart(item);
  };

  openLayout(modalProduct);
}

// ==========================================
// 6. ЛОГІКА КОШИКА (CURED FROM BUGS)
// ==========================================
function addToCart(item) {
  const existingItem = cartCatalog.find((el) => el.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Копіюємо об'єкт, щоб не мутувати оригінальну базу даних
    cartCatalog.push({ ...item, quantity: 1 });
  }

  saveCartState();
  openCart();
}

function saveCartState() {
  localStorage.setItem("cart", JSON.stringify(cartCatalog));
}

function openCart() {
  // Закриваємо модалку товару, якщо вона була відкрита
  modalProduct.remove();
  document.body.appendChild(modalCart);
  if (modalCart.classList.contains("ordering")) {
    modalCart.classList.remove("ordering");
  }

  if (cartCatalog.length === 0) {
    modalCart.innerHTML = `
    <button class="modal__close-btn">&times;</button>
      <h2 class="_title">Кошик</h2>
      <p class="none__cart">Кошик порожній</p>
    `;

    modalCart.querySelector(".modal__close-btn").onclick = () =>
      closeLayout(modalCart);

    openLayout(modalCart);
    return;
  }

  modalCart.innerHTML = `
  <button class="modal__close-btn">&times;</button>
    <h2 class="_title">Кошик</h2>
    <div class="cart__catalog"></div>
    <div class="cart-bot">
      <div class="cart-bot__info">
        <div>
          <span class="cart-bot__text">Сума замовлення:</span>
          <span class="cart-bot__price">0 грн</span>
        </div>
        <div>
        <span class="cart-bot__text">Доставка:</span>
        <span class="cart-bot__delivery">Безкоштовно</span>
        </div>
      </div>
      <div class="cart-bot__buttons confirm-but">
        <button class="cart-box__button order-submit-btn">Оформити замовлення</button>
        <button class="cart-box__button continue-but">Продовжити перегляд</button>
      </div>
    </div>
  `;

  modalCart.querySelector(".modal__close-btn").onclick = () =>
    closeLayout(modalCart);

  const cartCatalogCont = modalCart.querySelector(".cart__catalog");
  const totalPriceEl = modalCart.querySelector(".cart-bot__price");
  const deliverPrice = modalCart.querySelector(".cart-bot__delivery");

  function updateCartSummary() {
    const total = cartCatalog.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    totalPriceEl.textContent = `${total} грн`;

    if (total <= 350) {
      deliverPrice.textContent = "За тарифом таксі";
    }
  }

  cartCatalog.forEach((item) => {
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
      <span class="catalog__item-price">${item.quantity * item.price} грн</span>
    `;

    catalogItem.querySelector(".plus").onclick = () => {
      item.quantity += 1;
      saveCartState();
      openCart(); // Повний перерендер усуває розсинхрон інтерфейсу
    };

    catalogItem.querySelector(".del").onclick = () => {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cartCatalog = cartCatalog.filter((el) => el.id !== item.id);
      }
      saveCartState();
      openCart();
    };

    cartCatalogCont.appendChild(catalogItem);
  });

  updateCartSummary();

  modalCart.querySelector(".continue-but").onclick = () =>
    closeLayout(modalCart);

  modalCart.querySelector(".order-submit-btn").onclick = () => {
    console.log(cartCatalog);
    const total = cartCatalog.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    if (total < 150) {
      alert("Мінімальна сума замовлення — 150 грн!");
    } else {
      modalCart.classList.add("ordering");
      modalCart.innerHTML = `
      <h2 class="_title">Оформлення замовлення</h2>
      

      <form class='cart__from' id="callbackForm">
  <div class="form__box">
    <label for="name" class="form__label">Ваше ім'я</label>
    <input id="nameInput" type="text" class="form__input" name="name" />
  </div>
  <div class="form__box">
    <label for="phone" class="form__label">Ваш номер телефону</label>
    <input
      id="phoneInput"
      type="tel"
      name="phone"
      class="form__input"
      required
    />
  </div>

  <button type="submit" id="submitBtn" class='cart-box__button submit__order'>Підтвердити замовлення</button>
</form>

<p id="responseMessage"></p>
      `;
      const form = modalCart.querySelector(".cart__from");
      const messageElement = document.getElementById("responseMessage");

      const API_URL =
        "https://orders-sushibar-api.onrender.com/api/call-request";

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("nameInput").value;
        const phone = document.getElementById("phoneInput").value;

        messageElement.textContent = "Надсилання...";

        try {
          const response = await fetch(API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, phone, cartCatalog, total }),
          });

          const data = await response.json();

          if (response.ok) {
            alert("Дякуємо! Ми зателефонуємо вам найближчим часом.");
            form.reset();
            modalCart.classList.remove("ordering");
            cartCatalog = [];
            saveCartState();
            closeLayout(modalCart);
          } else {
            messageElement.textContent = `Помилка: ${data.error || "Щось пішло не так"}`;
          }
        } catch (error) {
          console.error("Помилка мережі:", error);
          messageElement.textContent = "Не вдалося зʼєднатися з сервером.";
        }
      });
    }
  };

  openLayout(modalCart);
}

// ==========================================
// 7. СЕРВІСНІ ФУНКЦІЇ ОВЕРЛЕЮ (LAYOUT)
// ==========================================
function openLayout(activeElement) {
  document.body.appendChild(layoutOverlay);
  document.body.style.overflow = "hidden";

  layoutOverlay.onclick = (e) => {
    if (e.target === layoutOverlay) {
      closeLayout(activeElement);
    }
  };
}

function closeLayout(activeElement) {
  activeElement.remove();
  layoutOverlay.remove();
  document.body.style.overflow = "auto";
}

// Старт
window.addEventListener("DOMContentLoaded", initApp);
