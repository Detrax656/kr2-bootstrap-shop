/* ===============================
   0. Данные о турах
   =============================== */

// Объект с описанием туров. Ключ совпадает с id тура.
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
    badge: 'Скидка',
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
    badge: 'Экскурсии',
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

// Параметры из адреса страницы.
const params = new URLSearchParams(window.location.search);

function formatPrice(value) {
  // toLocaleString('ru-RU') сам расставляет пробелы между тысячами.
  return Number(value).toLocaleString('ru-RU') + ' ₽';
}


/* ===============================
   1. Кнопка «Наверх»
   =============================== */

const toTopButton = document.querySelector('.to-top');

if (toTopButton) {
  window.addEventListener('scroll', () => {
    // window.scrollY — сколько пикселей страница уже прокручена вниз.
    // Если больше 300, добавляем класс to-top--visible,
    // если меньше — убираем его
    toTopButton.classList.toggle('to-top--visible', window.scrollY > 300);
  });
}

/* ===============================
   2. Модальное окно 
   =============================== */

const managerModal = document.getElementById('manager-modal');

if (managerModal) {
  managerModal.addEventListener('hidden.bs.modal', () => {
    const managerForm = document.getElementById('manager-form');

    managerForm.reset();
    managerForm.classList.remove('was-validated');
    document.getElementById('manager-success').classList.add('d-none');
  });
}


/* ===============================
   3. Формы 
   =============================== */

const jsForms = document.querySelectorAll('.js-form');

jsForms.forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

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

    message.scrollIntoView({ behavior: 'smooth', block: 'center' });

    if (!form.hasAttribute('data-keep')) {
      form.reset();

      // После очистки сообщаем остальному коду, что поля изменились

      form.dispatchEvent(new Event('change'));
    }
  });
});


/* ===============================
   4. Страница тура
   =============================== */

const tourTitle = document.getElementById('tour-title');

if (tourTitle) {
  const tourId = params.get('id');

  // Берём тур из объекта TOURS. Если id нет или он неверный, показываем Канкун.
  const tour = TOURS[tourId] || TOURS['cancun'];

  document.title = `${tour.title} | Роза ветров`;

  // Подставляем текст в нужные места страницы.
  document.getElementById('tour-crumb').textContent = tour.title;
  tourTitle.textContent = tour.title;
  document.getElementById('tour-meta').textContent = `${tour.days} дней, вылет ${tour.date}`;
  document.getElementById('tour-text').textContent = tour.text;
  document.getElementById('tour-description').textContent = tour.description;
  document.getElementById('tour-price').textContent = 'от ' + formatPrice(tour.price);
  document.getElementById('tour-seats').textContent = `Осталось мест: ${tour.seats}. Успейте забронировать.`;

  const badge = document.getElementById('tour-badge');
  badge.textContent = tour.badge;
  badge.className = `badge mb-3 ${tour.badgeClass}`;

  // Кнопка «Забронировать» ведёт на бронирование с уже выбранным туром.
  document.getElementById('book-link').href = `booking.html?tour=${tour.id}`;

  document.getElementById('tour-program').innerHTML =
    tour.program.map((step) => `<li>${step}</li>`).join('');

  document.querySelectorAll('.carousel-item img').forEach((img, index) => {
    img.src = tour.images[index];
    img.alt = `${tour.title}, фото ${index + 1}`;
  });

  // Кнопке «В избранное» передаём данные тура.
  const tourFavorite = document.getElementById('tour-favorite');
  tourFavorite.dataset.id = tour.id;
  tourFavorite.dataset.title = tour.title;
  tourFavorite.dataset.price = tour.price;
  tourFavorite.dataset.image = tour.images[0];
  tourFavorite.dataset.meta = `${tour.days} дней, вылет ${tour.date}`;
}


/* ===============================
   5. Избранные туры (localStorage)
   =============================== */


// Название «ячейки» в хранилище
const FAVORITES_KEY = 'rosa-vetrov-favorites';

function getFavorites() {
  // getItem возвращает сохранённую строку или null
  const saved = localStorage.getItem(FAVORITES_KEY);

  // Если что-то есть, превращаем строку обратно в массив
  // Если пусто, возвращаем пустой массив.
  return saved ? JSON.parse(saved) : [];
}

function saveFavorites(list) {

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
}

// Есть ли тур с таким id в избранном.
function isFavorite(id) {
  // some() возвращает true, если хотя бы у одного тура id совпал.
  return getFavorites().some((tour) => tour.id === id);
}

// Обновляет цифру рядом с кнопкой «Личный кабинет».
function updateFavoritesCount() {
  const counter = document.getElementById('favorites-count');

  if (counter) {
    // length — сколько туров лежит в списке.
    counter.textContent = getFavorites().length;
  }
}

function updateFavoriteButton(button) {
  const active = isFavorite(button.dataset.id);

  button.innerHTML = active ? '&#9829; В избранном' : '&#9825; В избранное';

  button.classList.toggle('active', active);

  button.setAttribute('aria-pressed', active);
}

const favoriteButtons = document.querySelectorAll('.favorite-btn');

// Для каждой кнопки по очереди выполняем код внутри.
favoriteButtons.forEach((button) => {
  // При загрузке страницы сразу показываем правильный вид кнопки.
  updateFavoriteButton(button);

  button.addEventListener('click', () => {
    const id = button.dataset.id;

    let favorites = getFavorites();

    if (isFavorite(id)) {
      favorites = favorites.filter((tour) => tour.id !== id);
    } else {
      favorites.push({
        id: id,
        title: button.dataset.title,
        price: button.dataset.price,
        image: button.dataset.image,
        meta: button.dataset.meta
      });
    }

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

const favoritesList = document.getElementById('favorites-list');
const favoritesEmpty = document.getElementById('favorites-empty');

function renderFavorites() {
  const favorites = getFavorites();

  // Если список пуст, показываем сообщение, иначе прячем.
  favoritesEmpty.classList.toggle('d-none', favorites.length !== 0);

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
            <button class="btn btn-outline-secondary favorite-remove" type="button" data-id="${tour.id}">Убрать</button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

if (favoritesList) {
  favoritesList.addEventListener('click', (event) => {
    const button = event.target.closest('.favorite-remove');

    if (!button) {
      return;
    }

    saveFavorites(getFavorites().filter((tour) => tour.id !== button.dataset.id));
    renderFavorites();
    updateFavoritesCount();
  });

  renderFavorites();
}


/* ===============================
   7. Подбор туров
   =============================== */

const filterForm = document.getElementById('filter-form');

if (filterForm) {
  const tourItems = document.querySelectorAll('.tour-item');

  const emptyMessage = document.getElementById('empty-message');
  const foundCount = document.getElementById('found-count');

  function applyFilter() {
    const dest = filterForm.elements['dest'].value;
    const date = filterForm.elements['date'].value;
    const maxPrice = filterForm.elements['price'].value;

    // Счётчик подходящих туров.
    let found = 0;

    tourItems.forEach((item) => {
      // Направление совпадает или не выбрано.
      const okDest = dest === '' || item.dataset.dest === dest;

      const okDate = date === '' || item.dataset.date >= date;

      const okPrice = maxPrice === '' || Number(item.dataset.price) <= Number(maxPrice);

      // Тур виден, только если подошли все три условия.
      const visible = okDest && okDate && okPrice;

      item.classList.toggle('d-none', !visible);

      if (visible) {
        found++;
      }
    });

    // Показываем, сколько туров нашлось, и сообщение, если не нашлось ни одного.
    foundCount.textContent = found;
    emptyMessage.classList.toggle('d-none', found !== 0);
  }

  filterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    applyFilter();
  });

  filterForm.addEventListener('change', applyFilter);

  document.getElementById('filter-reset').addEventListener('click', () => {
    filterForm.reset();
    applyFilter();
  });

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
   8. Бронирование
   =============================== */

const bookingForm = document.getElementById('booking-form');

if (bookingForm) {
  const preselected = params.get('tour');

  if (preselected && TOURS[preselected]) {
    bookingForm.elements['tour'].value = preselected;
  }

  function updateSummary() {
    const tour = TOURS[bookingForm.elements['tour'].value];
    const guests = Number(bookingForm.elements['guests'].value);

    let servicesPrice = 0;
    const serviceNames = [];

    document.querySelectorAll('.service-check:checked').forEach((checkbox) => {
      servicesPrice += Number(checkbox.dataset.price);
      serviceNames.push(checkbox.dataset.name);
    });

    // Если тур ещё не выбран, показываем прочерки и нулевую сумму.
    const tourPrice = tour ? tour.price : 0;

    document.getElementById('sum-tour').textContent = tour ? tour.title : 'не выбран';
    document.getElementById('sum-date').textContent = tour ? tour.date : '-';
    document.getElementById('sum-guests').textContent = guests;
    document.getElementById('sum-services').textContent =
      serviceNames.length > 0 ? serviceNames.join(', ') : 'нет';

    // Итог: (цена тура + цены услуг) умножить на число гостей.
    document.getElementById('sum-total').textContent = formatPrice((tourPrice + servicesPrice) * guests);
  }

  // Пересчитываем при любом изменении формы и один раз при загрузке страницы.
  bookingForm.addEventListener('change', updateSummary);
  updateSummary();
}
