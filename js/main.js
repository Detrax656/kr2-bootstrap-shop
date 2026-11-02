/* ===============================
   1. Кнопка «Наверх»
   =============================== */

const toTopButton = document.querySelector('.to-top');

// Работаем дальше, только если кнопка есть на странице.
if (toTopButton) {
  // Событие scroll срабатывает каждый раз, когда страницу прокручивают.
  window.addEventListener('scroll', () => {
    // window.scrollY — сколько пикселей страница уже прокручена вниз.
    // Если больше 300, добавляем класс to-top--visible (кнопка появляется),
    // если меньше — убираем его (кнопка прячется).
    toTopButton.classList.toggle('to-top--visible', window.scrollY > 300);
  });
}

/* ===============================
   2. Форма «Вопрос менеджеру» (модальное окно)
   =============================== */

const managerModal = document.getElementById('managerModal');
const managerForm = document.getElementById('managerForm');
const managerSuccess = document.getElementById('managerSuccess');

if (managerForm) {
  // Обрабатываем отправку формы.
  managerForm.addEventListener('submit', (event) => {
    // Отменяем стандартную отправку, чтобы страница не перезагружалась.
    event.preventDefault();

    // checkValidity() возвращает false, если какое-то required-поле заполнено неверно.
    if (!managerForm.checkValidity()) {
      // Класс was-validated включает красную и зелёную подсветку полей в Bootstrap.
      managerForm.classList.add('was-validated');
      return;
    }

    // Всё заполнено верно: прячем форму и показываем сообщение об успехе.
    managerForm.classList.add('d-none');
    managerSuccess.classList.remove('d-none');
  });

  // Bootstrap сам вызывает событие hidden.bs.modal, когда окно закрылось.
  // Возвращаем окно в исходное состояние, чтобы при следующем открытии была чистая форма.
  managerModal.addEventListener('hidden.bs.modal', () => {
    managerForm.reset();
    managerForm.classList.remove('was-validated', 'd-none');
    managerSuccess.classList.add('d-none');
  });
}


/* ===============================
   3. Избранные туры (localStorage)
   =============================== */

// localStorage — это маленькое хранилище в браузере.
// Данные в нём остаются, даже если закрыть страницу или вкладку.
// Хранить можно только строки, поэтому список туров превращаем в строку через JSON.

// Название «ячейки» в хранилище, в которой лежит список избранного.
const FAVORITES_KEY = 'rosa-vetrov-favorites';

// Достаёт список избранного из хранилища.
function getFavorites() {
  // getItem возвращает сохранённую строку или null, если там пока пусто.
  const saved = localStorage.getItem(FAVORITES_KEY);

  // Если что-то есть, превращаем строку обратно в массив (JSON.parse).
  // Если пусто, возвращаем пустой массив.
  return saved ? JSON.parse(saved) : [];
}

// Сохраняет список избранного в хранилище.
function saveFavorites(list) {
  // JSON.stringify превращает массив в строку, setItem кладёт её в хранилище.
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

// Проверяет, есть ли тур с таким id в избранном.
function isFavorite(id) {
  // some() возвращает true, если хотя бы у одного тура id совпал.
  return getFavorites().some((tour) => tour.id === id);
}

// Обновляет цифру рядом с кнопкой «Личный кабинет».
function updateFavoritesCount() {
  const counter = document.getElementById('favoritesCount');

  if (counter) {
    // length — сколько туров лежит в списке.
    counter.textContent = getFavorites().length;
  }
}

// Меняет вид кнопки «В избранное» в зависимости от того, добавлен тур или нет.
function updateFavoriteButton(button) {
  // dataset.id — это значение атрибута data-id у кнопки.
  const active = isFavorite(button.dataset.id);

  // Меняем текст: закрашенное сердечко, если тур в избранном.
  button.innerHTML = active ? '&#9829; В избранном' : '&#9825; В избранное';

  // Класс active делает outline-кнопку Bootstrap закрашенной.
  button.classList.toggle('active', active);

  // aria-pressed подсказывает программам для чтения с экрана, нажата ли кнопка.
  button.setAttribute('aria-pressed', active);
}

// Находим все кнопки «В избранное» на странице.
const favoriteButtons = document.querySelectorAll('.favorite-btn');

// Для каждой кнопки по очереди выполняем код внутри.
favoriteButtons.forEach((button) => {
  // При загрузке страницы сразу показываем правильный вид кнопки.
  updateFavoriteButton(button);

  // Следим за кликом по кнопке.
  button.addEventListener('click', () => {
    // Берём id тура из атрибута data-id.
    const id = button.dataset.id;

    // Достаём текущий список избранного.
    let favorites = getFavorites();

    if (isFavorite(id)) {
      // Тур уже в избранном: оставляем в списке все туры, кроме этого (filter).
      favorites = favorites.filter((tour) => tour.id !== id);
    } else {
      // Тура ещё нет: добавляем в список объект с данными из data-атрибутов кнопки.
      favorites.push({
        id: id,
        title: button.dataset.title,
        price: button.dataset.price,
        image: button.dataset.image,
        meta: button.dataset.meta
      });
    }

    // Записываем новый список в хранилище.
    saveFavorites(favorites);

    // Обновляем кнопку и цифру в меню.
    updateFavoriteButton(button);
    updateFavoritesCount();
  });
});

// При загрузке любой страницы показываем актуальную цифру в меню.
updateFavoritesCount();


/* ===============================
   4. Подбор туров в каталоге
   =============================== */

const filterForm = document.getElementById('filterForm');

// Работает только на странице каталога, где есть форма подбора.
if (filterForm) {
  // Все карточки туров.
  const tourItems = document.querySelectorAll('.tour-item');

  // Сообщение «ничего не найдено» и счётчик найденных туров.
  const emptyMessage = document.getElementById('emptyMessage');
  const foundCount = document.getElementById('foundCount');

  // Показывает только те карточки, которые подходят под выбранные условия.
  function applyFilter() {
    // Что выбрал пользователь в форме. Пустая строка значит «не выбрано».
    const dest = filterForm.elements['dest'].value;
    const date = filterForm.elements['date'].value;
    const maxPrice = filterForm.elements['price'].value;

    // Счётчик подходящих туров.
    let found = 0;

    tourItems.forEach((item) => {
      // Направление совпадает или не выбрано.
      const okDest = dest === '' || item.dataset.dest === dest;

      // Даты записаны как 2027-01-15, поэтому их можно сравнивать как обычные строки:
      // дата вылета должна быть не раньше выбранной.
      const okDate = date === '' || item.dataset.date >= date;

      // Цену сравниваем как числа, поэтому сначала превращаем строки в числа (Number).
      const okPrice = maxPrice === '' || Number(item.dataset.price) <= Number(maxPrice);

      // Тур виден, только если подошли все три условия.
      const visible = okDest && okDate && okPrice;

      // Класс d-none из Bootstrap прячет элемент, второй аргумент включает или выключает класс.
      item.classList.toggle('d-none', !visible);

      if (visible) {
        found++;
      }
    });

    // Показываем, сколько туров нашлось, и сообщение, если не нашлось ни одного.
    foundCount.textContent = found;
    emptyMessage.classList.toggle('d-none', found !== 0);
  }

  // Подбор срабатывает по кнопке «Подобрать».
  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilter();
  });

  // И сразу при смене любого поля.
  filterForm.addEventListener('change', applyFilter);

  // Кнопка «Сбросить»: очищаем форму и показываем все туры.
  document.getElementById('filterReset').addEventListener('click', () => {
    filterForm.reset();
    applyFilter();
  });

  // Если на каталог пришли с главной или из меню, в адресе есть параметры,
  // например tours.html?dest=cancun. URLSearchParams помогает их прочитать.
  const params = new URLSearchParams(window.location.search);

  if (params.get('dest')) {
    filterForm.elements['dest'].value = params.get('dest');
  }

  if (params.get('date')) {
    filterForm.elements['date'].value = params.get('date');
  }

  // Применяем фильтр сразу при загрузке страницы.
  applyFilter();
}
