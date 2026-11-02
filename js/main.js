/* ===============================
   Общий скрипт сайта «Роза ветров».
   Он подключён на всех страницах, поэтому перед каждым блоком
   мы проверяем, есть ли нужный элемент на текущей странице.
   =============================== */


/* ===============================
   0. Данные о турах
   =============================== */

// Объект с описанием туров. Ключ (например, 'cancun') совпадает с id тура.
// Из него страница тура берёт текст, а бронирование берёт цену.
const TOURS = {
  'cancun': {
    id: 'cancun',
    title: 'Канкун: пляжный отдых',
    badge: 'Хит',
    badgeClass: 'bg-warning text-dark',
    days: 8,
    date: '15.01.2027',
    price: 145000,
    seats: 5,
    text: 'Белый песок, тёплое Карибское море и отель с питанием «всё включено».',
    description: 'Классический пляжный отдых на Карибском побережье. Вы поселитесь в отеле в Канкуне, ' +
      'а в свободные дни сможете сами выбрать, чем заняться: пляж, прогулки по городу или экскурсия.',
    program: [
      'День 1: прилёт в Канкун и заселение в отель',
      'Дни 2-4: отдых на пляже, свободное время',
      'День 5: прогулка на лодке к острову Исла-Мухерес',
      'Дни 6-7: свободные дни, по желанию экскурсия в Чичен-Ицу',
      'День 8: выселение и вылет домой'
    ],
    images: ['images/placeholder.jpg', 'images/placeholder2.jpg', 'images/placeholder.jpg']
  },

  'mexico-city': {
    id: 'mexico-city',
    title: 'Мехико и Теотиуакан',
    badge: 'Новинка',
    badgeClass: 'bg-success',
    days: 7,
    date: '05.02.2027',
    price: 118000,
    seats: 8,
    text: 'Столица Мексики, площадь Сокало, музеи и экскурсия к пирамидам Теотиуакана.',
    description: 'Тур для тех, кто любит города и историю. Вы увидите центр Мехико, один из главных музеев страны ' +
      'и древний город Теотиуакан недалеко от столицы.',
    program: [
      'День 1: прилёт в Мехико и заселение в отель',
      'День 2: обзорная экскурсия по центру, площадь Сокало',
      'День 3: Национальный музей антропологии',
      'День 4: поездка к пирамидам Теотиуакана',
      'Дни 5-6: свободное время и покупки',
      'День 7: вылет домой'
    ],
    images: ['images/placeholder2.jpg', 'images/placeholder.jpg', 'images/placeholder2.jpg']
  },

  'oaxaca': {
    id: 'oaxaca',
    title: 'Оахака: культура и кухня',
    badge: 'Скидка',
    badgeClass: 'bg-danger',
    days: 6,
    date: '20.02.2027',
    price: 98000,
    seats: 4,
    text: 'Яркие рынки, мастер-классы по местной кухне и знакомство с традиционными ремёслами.',
    description: 'Спокойный тур по одному из самых колоритных городов Мексики. Много прогулок, ' +
      'рынки, национальная кухня и встречи с местными мастерами.',
    program: [
      'День 1: прилёт в Оахаку и заселение в отель',
      'День 2: прогулка по центру города и местный рынок',
      'День 3: мастер-класс по национальной кухне',
      'День 4: поездка к мастерам-ремесленникам',
      'День 5: свободный день и дегустация мескаля',
      'День 6: вылет домой'
    ],
    images: ['images/placeholder.jpg', 'images/placeholder2.jpg', 'images/placeholder.jpg']
  },

  'tulum': {
    id: 'tulum',
    title: 'Тулум и Ривьера-Майя',
    badge: 'Горящий',
    badgeClass: 'bg-danger',
    days: 9,
    date: '28.01.2027',
    price: 162000,
    seats: 3,
    text: 'Руины майя на берегу моря, купание в сенотах и отдых на пляжах Ривьеры-Майя.',
    description: 'Тур сочетает пляжный отдых и знакомство с культурой майя. ' +
      'Вы увидите руины Тулума прямо у моря и искупаетесь в сеноте.',
    program: [
      'День 1: прилёт и заселение в отель на Ривьере-Майя',
      'Дни 2-3: пляж и экскурсия к руинам Тулума',
      'День 4: купание в сеноте',
      'Дни 5-8: отдых на пляже и свободные дни',
      'День 9: вылет домой'
    ],
    images: ['images/placeholder2.jpg', 'images/placeholder.jpg', 'images/placeholder2.jpg']
  },

  'yucatan': {
    id: 'yucatan',
    title: 'Юкатан: Мерида и Чичен-Ица',
    badge: 'Экскурсии',
    badgeClass: 'bg-secondary',
    days: 8,
    date: '12.03.2027',
    price: 132000,
    seats: 6,
    text: 'Колониальная Мерида и один из самых известных городов майя, Чичен-Ица.',
    description: 'Экскурсионный тур по полуострову Юкатан. Вы побываете в колониальной Мериде ' +
      'и на археологических раскопках городов майя.',
    program: [
      'День 1: прилёт и переезд в Мериду',
      'День 2: прогулка по центру Мериды',
      'День 3: экскурсия в Чичен-Ицу к пирамиде Кукулькана',
      'Дни 4-5: поездка в Ушмаль и свободное время',
      'Дни 6-7: отдых и покупки',
      'День 8: вылет домой'
    ],
    images: ['images/placeholder.jpg', 'images/placeholder2.jpg', 'images/placeholder.jpg']
  },

  'chiapas': {
    id: 'chiapas',
    title: 'Чьяпас: джунгли и каньон',
    badge: 'Приключения',
    badgeClass: 'bg-secondary',
    days: 7,
    date: '26.03.2027',
    price: 125000,
    seats: 7,
    text: 'Город Сан-Кристобаль-де-лас-Касас, водопады и прогулка на лодке по каньону Сумидеро.',
    description: 'Тур для любителей природы. Вы поживёте в горном городе, ' +
      'прокатитесь на лодке по каньону и посмотрите на индейские деревни.',
    program: [
      'День 1: прилёт и переезд в Сан-Кристобаль-де-лас-Касас',
      'День 2: прогулка по городу и рынку',
      'День 3: прогулка на лодке по каньону Сумидеро',
      'День 4: поездка в деревню Сан-Хуан-Чамула',
      'Дни 5-6: водопады и свободное время',
      'День 7: вылет домой'
    ],
    images: ['images/placeholder2.jpg', 'images/placeholder.jpg', 'images/placeholder2.jpg']
  }
};

// Превращает число 145000 в строку «145 000 ₽».
function formatPrice(value) {
  // toLocaleString('ru-RU') сам расставляет пробелы между тысячами.
  return Number(value).toLocaleString('ru-RU') + ' ₽';
}


/* ===============================
   1. Кнопка «Наверх»
   =============================== */

// Находим кнопку «Наверх» по классу.
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
// Сам переход наверх делает ссылка href="#", а плавность даёт
// scroll-behavior: smooth в custom.css, поэтому JS для этого не нужен.


/* ===============================
   2. Форма «Вопрос менеджеру» (модальное окно)
   =============================== */

// Само модальное окно, форма и блок с сообщением об успехе.
const managerModal = document.getElementById('managerModal');
const managerForm = document.getElementById('managerForm');
const managerSuccess = document.getElementById('managerSuccess');

if (managerForm) {
  // Обрабатываем отправку формы.
  managerForm.addEventListener('submit', (event) => {
    // Отменяем стандартную отправку, чтобы страница не перезагружалась.
    event.preventDefault();

    // checkValidity() возвращает false, если какое-то поле заполнено неверно.
    if (!managerForm.checkValidity()) {
      // Класс was-validated включает подсветку полей и сообщения об ошибках в Bootstrap.
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
   3. Обычные формы сайта (бронирование и профиль)
   =============================== */

// У таких форм в HTML есть класс js-form, а в атрибуте data-success записан
// id блока, который нужно показать после успешной отправки.
const jsForms = document.querySelectorAll('.js-form');

jsForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    // Не даём странице перезагрузиться.
    event.preventDefault();

    // Блок с сообщением об успехе для этой формы.
    const message = document.getElementById(form.dataset.success);

    // Если есть ошибки, показываем подсветку и прячем старое сообщение.
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      message.classList.add('d-none');
      return;
    }

    // Ошибок нет: убираем подсветку и показываем сообщение об успехе.
    form.classList.remove('was-validated');
    message.classList.remove('d-none');

    // Плавно прокручиваем страницу к сообщению, чтобы его было видно.
    message.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Форму профиля очищать не нужно (у неё есть атрибут data-keep),
    // а заявку на бронирование очищаем.
    if (!form.hasAttribute('data-keep')) {
      form.reset();

      // После очистки сообщаем остальному коду, что поля изменились
      // (так пересчитается сводка заказа).
      form.dispatchEvent(new Event('change'));
    }
  });
});


/* ===============================
   4. Страница тура: подставляем данные выбранного тура
   =============================== */

// Заголовок есть только на странице tour.html.
const tourTitle = document.getElementById('tourTitle');

if (tourTitle) {
  // Читаем id тура из адреса, например tour.html?id=oaxaca.
  const params = new URLSearchParams(window.location.search);
  const tourId = params.get('id');

  // Берём тур из объекта TOURS. Если id нет или он неверный, показываем Канкун.
  const tour = TOURS[tourId] || TOURS['cancun'];

  // Название вкладки браузера.
  document.title = `${tour.title} | Роза ветров`;

  // Подставляем текст в нужные места страницы.
  document.getElementById('tourCrumb').textContent = tour.title;
  tourTitle.textContent = tour.title;
  document.getElementById('tourMeta').textContent = `${tour.days} дней, вылет ${tour.date}`;
  document.getElementById('tourText').textContent = tour.text;
  document.getElementById('tourDescription').textContent = tour.description;
  document.getElementById('tourPrice').textContent = 'от ' + formatPrice(tour.price);
  document.getElementById('tourSeats').textContent = `Осталось мест: ${tour.seats}. Успейте забронировать.`;

  // Плашка тура: меняем текст и класс цвета.
  const badge = document.getElementById('tourBadge');
  badge.textContent = tour.badge;
  badge.className = `badge mb-3 ${tour.badgeClass}`;

  // Кнопка «Забронировать» ведёт на бронирование с уже выбранным туром.
  document.getElementById('bookLink').href = `booking.html?tour=${tour.id}`;

  // Программа тура: из каждой строки массива делаем элемент списка <li>.
  // map() создаёт новый массив, join('') склеивает его в одну строку.
  document.getElementById('tourProgram').innerHTML =
    tour.program.map((step) => `<li>${step}</li>`).join('');

  // Фото в карусели: каждой картинке по очереди даём свой файл.
  document.querySelectorAll('.carousel-item img').forEach((img, index) => {
    img.src = tour.images[index];
    img.alt = `${tour.title}, фото ${index + 1}`;
  });

  // Кнопке «В избранное» передаём данные тура (так же, как в карточках каталога).
  const tourFavorite = document.getElementById('tourFavorite');
  tourFavorite.dataset.id = tour.id;
  tourFavorite.dataset.title = tour.title;
  tourFavorite.dataset.price = tour.price;
  tourFavorite.dataset.image = tour.images[0];
  tourFavorite.dataset.meta = `${tour.days} дней, вылет ${tour.date}`;
}


/* ===============================
   5. Избранные туры (localStorage)
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
   6. Личный кабинет: список избранного
   =============================== */

// Блок, куда мы выводим карточки, и сообщение «в избранном пусто».
const favoritesList = document.getElementById('favoritesList');
const favoritesEmpty = document.getElementById('favoritesEmpty');

// Рисует карточки избранных туров на странице.
function renderFavorites() {
  const favorites = getFavorites();

  // Если список пуст, показываем сообщение, иначе прячем.
  favoritesEmpty.classList.toggle('d-none', favorites.length !== 0);

  // Для каждого тура собираем кусок HTML-кода карточки и склеиваем всё в одну строку.
  // Обратные кавычки ` ` позволяют вставлять значения через ${...}.
  favoritesList.innerHTML = favorites.map((tour) => `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card h-100 shadow-sm">
        <img src="${tour.image}" class="card-img-top" alt="Фото тура: ${tour.title}">
        <div class="card-body d-flex flex-column">
          <h2 class="card-title h5">${tour.title}</h2>
          <p class="small text-body-secondary mb-2">${tour.meta}</p>
          <p class="fw-bold fs-5 mt-auto">от ${formatPrice(tour.price)}</p>
          <div class="d-flex flex-wrap gap-2">
            <a class="btn btn-primary" href="tour.html?id=${tour.id}">Подробнее</a>
            <button class="btn btn-outline-secondary remove-favorite" type="button" data-id="${tour.id}">Убрать</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

if (favoritesList) {
  // Карточки создаются кодом, поэтому вешаем один обработчик на весь блок
  // и смотрим, по какой кнопке кликнули.
  favoritesList.addEventListener('click', (event) => {
    // closest() ищет ближайшую кнопку «Убрать» от места клика.
    const button = event.target.closest('.remove-favorite');

    // Если кликнули не по кнопке «Убрать», ничего не делаем.
    if (!button) {
      return;
    }

    // Убираем тур из списка, сохраняем и рисуем заново.
    saveFavorites(getFavorites().filter((tour) => tour.id !== button.dataset.id));
    renderFavorites();
    updateFavoritesCount();
  });

  // Первый раз рисуем карточки при загрузке страницы.
  renderFavorites();
}


/* ===============================
   7. Подбор туров в каталоге
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


/* ===============================
   8. Бронирование: сводка заказа
   =============================== */

const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
  // Если пришли со страницы тура (booking.html?tour=oaxaca), выбираем этот тур в списке.
  const params = new URLSearchParams(window.location.search);
  const preselected = params.get('tour');

  if (preselected && TOURS[preselected]) {
    bookingForm.elements['tour'].value = preselected;
  }

  // Пересчитывает карточку «Ваш заказ» справа.
  function updateSummary() {
    // Выбранный тур и число гостей.
    const tour = TOURS[bookingForm.elements['tour'].value];
    const guests = Number(bookingForm.elements['guests'].value);

    // Складываем цены отмеченных услуг и собираем их названия.
    let servicesPrice = 0;
    const serviceNames = [];

    document.querySelectorAll('.service-check:checked').forEach((checkbox) => {
      servicesPrice += Number(checkbox.dataset.price);
      serviceNames.push(checkbox.dataset.name);
    });

    // Если тур ещё не выбран, показываем прочерки и нулевую сумму.
    const tourPrice = tour ? tour.price : 0;

    document.getElementById('sumTour').textContent = tour ? tour.title : 'не выбран';
    document.getElementById('sumDate').textContent = tour ? tour.date : '-';
    document.getElementById('sumGuests').textContent = guests;
    document.getElementById('sumServices').textContent =
      serviceNames.length > 0 ? serviceNames.join(', ') : 'нет';

    // Итог: (цена тура + цены услуг) умножить на число гостей.
    document.getElementById('sumTotal').textContent = formatPrice((tourPrice + servicesPrice) * guests);
  }

  // Пересчитываем при любом изменении формы и один раз при загрузке страницы.
  bookingForm.addEventListener('change', updateSummary);
  updateSummary();
}
