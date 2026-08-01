// 1. Знаходимо всі елементи один раз
const headerBodyDom = document.querySelector(".header__body");
const header = document.querySelector(".header");
const arrowTop = document.querySelector(".catalog__top");

// 2. Медіа-запити для двох точок адаптиву
const mediaQuery1430 = window.matchMedia("(max-width: 1430px)");
const mediaQuery882 = window.matchMedia("(max-width: 882px)");

/* -------------- Обробник скролу -------------- */
function handleScroll() {
  const isScrolled = window.scrollY > 99;

  if (mediaQuery882.matches) {
    // 1. Стан для екранів <= 882px (новий клас)
    header.classList.toggle("header__position-mobile-small", isScrolled);
    arrowTop.classList.toggle("arrow__appear-mobile-small", isScrolled);

    // Очищення інших класів
    header.classList.remove("header__position", "header__position-mobile");
    arrowTop.classList.remove("arrow__appear", "arrow__appear-mobile");
  } else if (mediaQuery1430.matches) {
    // 2. Стан для екранів від 883px до 1430px (існуючий мобільний клас)
    header.classList.toggle("header__position-mobile", isScrolled);
    arrowTop.classList.toggle("arrow__appear-mobile", isScrolled);

    // Очищення інших класів
    header.classList.remove(
      "header__position",
      "header__position-mobile-small",
    );
    arrowTop.classList.remove("arrow__appear", "arrow__appear-mobile-small");
  } else {
    // 3. Стан для десктопу > 1430px
    header.classList.toggle("header__position", isScrolled);
    arrowTop.classList.toggle("arrow__appear", isScrolled);

    // Очищення інших класів
    header.classList.remove(
      "header__position-mobile",
      "header__position-mobile-small",
    );
    arrowTop.classList.remove(
      "arrow__appear-mobile",
      "arrow__appear-mobile-small",
    );
  }
}

window.addEventListener("scroll", handleScroll);

/* -------------- Обробник адаптиву HTML -------------- */
function handleTabletChange() {
  if (mediaQuery882.matches) {
    // --- HTML для екранів <= 882px ---
    headerBodyDom.innerHTML = `
      <div class="header-mobile__info">
        <a href="?">
          <div class="logo">
            <img src="./imgs/logo.png" alt="" class="logo__img" />
            <div class="logo__txt">
              <span class="logo__txt-big red">SUSHI BAR</span>
              <span class="logo__txt-small red">BERDICHEV</span>
            </div>
          </div>
        </a>
        <div class="header__boxes">
          <div class="graphic">
            <span class="graphic__txt">Без вихідних</span>
            <span class="graphic__time bold">11:00 - 21:00</span>
          </div>
          <div class="delivery header__box">
            <span class="delivery__txt">Доставка <span class="bold">від 350грн</span></span>
            <span class="delivery__free bold red">Безкоштовна</span>
          </div>
          <div class="call-us header__box">
            <span class="call-us__txt">Телефонуй за номером</span>
            <a href="tel:+380686741820" class="call-us__phone bold red">068-674-18-20</a>
          </div>
        </div>
      </div>
      
    `;
  } else if (mediaQuery1430.matches) {
    // --- HTML для екранів від 883px до 1430px ---
    headerBodyDom.innerHTML = `
      <div class="header-mobile__info">
        <a href="?">
          <div class="logo">
            <img src="./imgs/logo.png" alt="" class="logo__img" />
            <div class="logo__txt">
              <span class="logo__txt-big red">SUSHI BAR</span>
              <span class="logo__txt-small red">BERDICHEV</span>
            </div>
          </div>
        </a>
        <div class="header__boxes">
          <div class="graphic">
            <span class="graphic__txt">Без вихідних</span>
            <span class="graphic__time bold">11:00 - 21:00</span>
          </div>
          <div class="delivery header__box">
            <span class="delivery__txt">Доставка <span class="bold">від 350грн</span></span>
            <span class="delivery__free bold red">Безкоштовна</span>
          </div>
          <div class="call-us header__box">
            <span class="call-us__txt">Телефонуй за номером</span>
            <a href="tel:+380686741820" class="call-us__phone bold red">068-674-18-20</a>
          </div>
        </div>
      </div>
      <div class="header__nav">
        <a href="" class="nav__item">Оплата й доставка</a>
        <a href="?category=report" class="nav__item">Залишити відгук</a>
        <a href="?#location" class="nav__item">Де нас знайти?</a>
      </div>
    `;
  } else {
    // --- HTML для десктопу > 1430px ---
    headerBodyDom.innerHTML = `
      <a href="?">
        <div class="logo">
          <img src="./imgs/logo.png" alt="" class="logo__img" />
          <div class="logo__txt">
            <span class="logo__txt-big red">SUSHI BAR</span>
            <span class="logo__txt-small red">BERDICHEV</span>
          </div>
        </div>
      </a>
      <div class="header__nav">
        <a href="" class="nav__item">Оплата й доставка</a>
        <a href="?category=report" class="nav__item">Залишити відгук</a>
        <a href="?#location" class="nav__item">Де нас знайти?</a>
      </div>
      <div class="header__boxes">
        <div class="graphic">
          <span class="graphic__txt">Без вихідних</span>
          <span class="graphic__time bold">11:00 - 21:00</span>
        </div>
        <div class="delivery header__box">
          <span class="delivery__txt">Доставка <span class="bold">від 350грн</span></span>
          <span class="delivery__free bold red">Безкоштовна</span>
        </div>
        <div class="call-us header__box">
          <span class="call-us__txt">Телефонуй за номером</span>
          <a href="tel:+380686741820" class="call-us__phone bold red">068-674-18-20</a>
        </div>
      </div>
    `;
  }

  // Оновлюємо класи скролу під новий HTML
  handleScroll();
}

// 3. Підписка на зміни медіа-запитів
mediaQuery1430.addEventListener("change", handleTabletChange);
mediaQuery882.addEventListener("change", handleTabletChange);

// Ініціалізація під час завантаження
handleTabletChange();
