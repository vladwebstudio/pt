// ===== TRANSLATIONS =====
const T = {
  back_to_cases: "Повернутися до кейсів",
  timeline_title: "Процес роботи",
  result_title: "Результат",
  gallery_title: "Скріншоти проекту",
  testimonial_title: "Відгук замовника",
  project_link_title: "Хочете переглянути проект в дії?",
  project_link_desc: "Сайт працює тільки на телефоні. В режимі гостя прибрані блоки \"перейти в Telegram\" для конфіденційності. Перегляньте проект, пролистайте сторінки та вивчіть інтерфейс.",
  project_link_btn: "Відкрити проект (режим гостя)",
  prev_case: "Попередній кейс",
  next_case: "Наступний кейс",
  cta_title: "Потрібен схожий проект?",
  cta_desc: "Обговоримо ваше завдання, терміни та вартість. Напишіть у Telegram.",
  cta_tg: "Написати в Telegram",
  cta_price: "Переглянути ціни",
  page_title: 'Детальний перегляд кейсу — Влад',
  zoom_hint: 'Ctrl + коліщатко'
};

// Site is Ukrainian-only (ст. 30 мовного закону) — language is always 'uk', ignoring any
// stale localStorage or ?lang= param left over from older versions of the site.
let currentLang = 'uk';

// Update page title based on language
function updatePageTitle() {
  document.title = T.page_title;
}

// ===== SEO: per-case title/meta/canonical/JSON-LD (helps Googlebot, which renders JS;
// note social-preview bots like Telegram/Facebook do NOT run JS, so shared links will
// show the generic static meta from the HTML <head>, not this per-case version) =====
function updateSeoTags(caseData, id) {
  const t = T;
  const caseTitle = getTranslated(caseData, 'title', 'title');
  const caseDesc = getTranslated(caseData, 'desc', 'desc');
  // Canonical/OG URL points at the static per-case page (case-1.html etc.), not the
  // query-string route — that's the URL search engines and shared links should treat
  // as the "real" address for this case (see build-case-pages.js).
  const pageUrl = `https://vladwebstudio.github.io/portfolio/case-${id}.html`;
  const fullTitle = `${caseTitle} — кейс | ${t.page_title.split('—')[1] ? t.page_title.split('—')[1].trim() : 'Влад'}`;
  document.title = fullTitle;
  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };
  setMeta('meta[name="description"]', 'content', caseDesc);
  setMeta('meta[property="og:title"]', 'content', fullTitle);
  setMeta('meta[property="og:description"]', 'content', caseDesc);
  setMeta('meta[property="og:url"]', 'content', pageUrl);
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (canonicalEl) canonicalEl.setAttribute('href', pageUrl);
  const schemaEl = document.getElementById('caseSchema');
  if (schemaEl) {
    schemaEl.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Влад — веб-розробник",
        "item": "https://vladwebstudio.github.io/portfolio/"
      }, {
        "@type": "ListItem",
        "position": 2,
        "name": "Кейси",
        "item": "https://vladwebstudio.github.io/portfolio/#cases"
      }, {
        "@type": "ListItem",
        "position": 3,
        "name": caseTitle,
        "item": pageUrl
      }]
    }, null, 2);
  }
}

// Apply translations
function applyTranslations() {
  const t = T;
  document.querySelectorAll('[data-key]').forEach(el => {
    const key = el.dataset.key;
    if (t[key]) el.textContent = t[key];
  });
  // Update zoom hint
  const zoomHint = document.getElementById('zoomHint');
  if (zoomHint && t.zoom_hint) zoomHint.textContent = t.zoom_hint;
}
applyTranslations();

// Case data
const casesData = {
  2: {
    type: 'crm',
    typeLabel: 'CRM Система',
    title: 'CRM та контроль оплат',
    desc: 'Система для контролю оплат, менеджерів і статистики. Панель адміністратора і менеджера, облік фактичних і потенційних оплат, аналітика по проектах, порівняння менеджерів, цілі і прогнози.',
    projectLink: 'https://vladwebstudio.github.io/crm-con-pay/',
    timeline: [{
      icon: 'fa-file-alt',
      iconColor: 'purple',
      title: 'Технічне завдання',
      content: `
            <p>Замовник звернувся з запитом на систему для контролю бізнесу. Основні вимоги:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Облік фактичних і потенційних оплат</li>
              <li><i class="fas fa-check"></i>Контроль роботи менеджерів</li>
              <li><i class="fas fa-check"></i>Аналітика по проектах і місяцях</li>
              <li><i class="fas fa-check"></i>Порівняння ефективності менеджерів</li>
              <li><i class="fas fa-check"></i>Планування цілей і прогнозів</li>
            </ul>
          `
    }, {
      icon: 'fa-comments',
      iconColor: 'teal',
      title: 'Обговорення деталей',
      content: `
            <p>Провів кілька зустрічей з замовником для уточнення вимог:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Визначені ролі: адміністратор і менеджер</li>
              <li><i class="fas fa-check"></i>Погоджена структура даних в Google Sheets</li>
              <li><i class="fas fa-check"></i>Уточнені метрики для аналітики</li>
              <li><i class="fas fa-check"></i>Визначений дизайн-стиль: темна тема з акцентами</li>
            </ul>
          `
    }, {
      icon: 'fa-palette',
      iconColor: 'orange',
      title: 'Дизайн',
      content: `
            <p>Створив дизайн інтерфейсу:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Панель адміністратора з повною статистикою</li>
              <li><i class="fas fa-check"></i>Панель менеджера з особистими даними</li>
              <li><i class="fas fa-check"></i>Адаптивний дизайн для мобільних пристроїв</li>
              <li><i class="fas fa-check"></i>Інтерактивні графіки і таблиці</li>
            </ul>
          `
    }, {
      icon: 'fa-handshake',
      iconColor: 'purple',
      title: 'Погодження термінів і ціни',
      content: `
            <p>Фіксуємо умови перед стартом:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Термін розробки: 7-14 днів</li>
              <li><i class="fas fa-check"></i>Вартість: $700</li>
              <li><i class="fas fa-check"></i>Інтеграція API</li>
              <li><i class="fas fa-check"></i>Гостьовий доступ для тестування</li>
              <li><i class="fas fa-check"></i>Перегляд для співпраці</li>
            </ul>
          `
    }, {
      icon: 'fa-code',
      iconColor: 'teal',
      title: 'Розробка',
      content: `
            <p>Написав код системи з нуля:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>HTML/CSS/JavaScript без фреймворків</li>
              <li><i class="fas fa-check"></i>Інтеграція Google Sheets API</li>
              <li><i class="fas fa-check"></i>Рольова система доступу</li>
              <li><i class="fas fa-check"></i>Аналітика і візуалізація даних</li>
            </ul>
          `
    }, {
      icon: 'fa-rocket',
      iconColor: 'orange',
      title: 'Запуск і здача',
      content: `
            <p>Проект готов і повністю відданий в управління:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Передана документація</li>
              <li><i class="fas fa-check"></i>Замовник задоволений результатом</li>
              <li><i class="fas fa-check"></i>Договорилися на підтримання проекту</li>
              <li><i class="fas fa-check"></i>Підписка за $40/міс на підтримання проекту</li>
            </ul>
          `
    }],
    result: [{
      title: 'Функціонал',
      items: ['Панель адміністратора і менеджера', 'Облік фактичних і потенційних оплат', 'Порівняння менеджерів і аналітика', 'Історії по місяцях і проектах', 'Цілі, плани і прогнози']
    }, {
      title: 'Аналітика',
      items: ['Абсолютна свобода у виборі даних', 'Вибір конкретного менеджера або всіх одразу', 'Вибір конкретного проекту або всіх проектів', 'Фільтрація по датах і періодах', 'Обширний функціонал статистики по всіх параметрах']
    }, {
      title: 'Безпека',
      items: ['Рольова система доступу', 'Захист даних і авторизація', 'Гостьовий доступ для тестування', 'Безпечне зберігання даних', 'Контроль прав доступу']
    }, {
      title: 'Технології',
      items: ['HTML5, CSS3, JavaScript (ES6+)', 'Google Sheets API', 'Адаптивний дизайн', 'Без фреймворків і конструкторів']
    }],
    gallery: [{
      src: 'img/srm-1.webp',
      title: 'Головний екран менеджера',
      description: 'Дашборд з повною статистикою та управлінням.',
      features: ['Цілі і статистика', 'Активність і історія', 'Фінанси і прогнози', 'Аналітика і оплати', 'Клієнти і виплати']
    }, {
      src: 'img/srm-2.webp',
      title: 'Панель адміністратора',
      description: 'Аналітика, статистика, метрики, порівняння, графіки.',
      features: ['Аналітика і статистика', 'Метрики і порівняння', 'Графіки і звіти']
    }, {
      src: 'img/srm-3.webp',
      title: 'Аналітика адміністратора',
      description: 'Обширна аналітика з детальним вибором даних.',
      features: ['Вибір фільтрів (менеджер/проект)', 'Порівняння і рейтинги', 'Фінансові метрики', 'Аналітика активності']
    }, {
      src: 'img/srm-4.webp',
      title: 'Мобільна версія',
      description: 'Повністю адаптивний інтерфейс для роботи з будь-якого пристрою.',
      features: ['Всі функції і дашборд', 'Аналітика і управління', 'Робота в будь-якому місці']
    }],
    testimonial: {
      name: 'Руслан В.',
      role: 'Власник компанії ProSales',
      rating: 5,
      text: 'Дуже сподобалася система аналітики, статистики, метрик — дуже обширні і круті в цьому плані. Можна вибирати конкретного менеджера або всіх одразу, дивитися по проектах, по датах. Все працює стабільно, інтерфейс зручний. Влад швидко зрозумів задачу і реалізував все як треба. Рекомендую!'
    },
    projectUrl: 'https://vladwebstudio.github.io/crm-con-pay/'
  },
  1: {
    type: 'video',
    typeLabel: 'Відеопродакшн-сайт',
    title: 'Сайт та адмін-панель для відеопродакшн-студії Contrabas',
    desc: 'Повний редизайн сайту креативної відеопродакшн-компанії Contrabas: преміальний темний UI, кейси з підтримкою кількох роликів в одному проєкті (лайтбокс-перегляд) та кастомна адмін-панель, яка дозволяє власнику самостійно додавати кейси, змінювати фото й тексти без розробника.',
    projectLink: 'https://contrabasvideo.com.ua/',
    timeline: [{
      icon: 'fa-file-alt',
      iconColor: 'purple',
      title: 'Технічне завдання',
      content: `
            <p>Замовник — відеопродакшн-студія Contrabas — звернувся з ТЗ на повний редизайн сайту:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Темний преміальний стиль, що відповідає позиціонуванню кіно- і відеопродакшну</li>
              <li><i class="fas fa-check"></i>Структуровані сторінки кейсів з описом та SEO під кожен проєкт</li>
              <li><i class="fas fa-check"></i>Високі показники швидкості (PageSpeed) на десктопі й мобільних</li>
              <li><i class="fas fa-check"></i>Структура сайту з розрахунком на українську та англійську версії</li>
              <li><i class="fas fa-check"></i>Можливість самостійно керувати контентом без залучення розробника</li>
            </ul>
          `
    }, {
      icon: 'fa-comments',
      iconColor: 'teal',
      title: 'Обговорення деталей',
      content: `
            <p>Уточнив, що саме власник має редагувати сам, і склав список розділів адмінки:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Додавання і редагування кейсів (відео, назви, категорії, рік)</li>
              <li><i class="fas fa-check"></i>Порядок кейсів на головній і в «Всі кейси»</li>
              <li><i class="fas fa-check"></i>Фото Hero-екрану і секції «Про нас»</li>
              <li><i class="fas fa-check"></i>Тексти контактів, «Про нас» і блоку послуг</li>
            </ul>
          `
    }, {
      icon: 'fa-palette',
      iconColor: 'orange',
      title: 'Дизайн',
      content: `
            <p>Розробив кінематографічний темний дизайн під бренд студії:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Hero на повний екран з відео-атмосферою знімального майданчика</li>
              <li><i class="fas fa-check"></i>Картки кейсів з позначкою кількості роликів у проєкті</li>
              <li><i class="fas fa-check"></i>Лайтбокс-перегляд кейсу замість переходу на нову сторінку</li>
              <li><i class="fas fa-check"></i>Адаптація під мобільні пристрої</li>
            </ul>
          `
    }, {
      icon: 'fa-handshake',
      iconColor: 'purple',
      title: 'Погодження обсягу робіт',
      content: `
            <p>Зафіксували фінальний обсяг і умови перед стартом розробки:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Повний редизайн публічної частини сайту</li>
              <li><i class="fas fa-check"></i>Кастомна адмін-панель «з нуля», без стандартної CMS</li>
              <li><i class="fas fa-check"></i>Підтримка кейсів з кількома відео в одному проєкті</li>
              <li><i class="fas fa-check"></i>Захист адмін-панелі паролем</li>
              <li><i class="fas fa-check"></i>Вартість: $450</li>
            </ul>
          `
    }, {
      icon: 'fa-code',
      iconColor: 'teal',
      title: 'Розробка',
      content: `
            <p>Побудував публічну частину і адмін-панель:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Верстка і логіка кейсів з галереєю роликів (інтеграція з Vimeo)</li>
              <li><i class="fas fa-check"></i>Адмін-панель: створення й редагування кейсів, сортування drag&drop, завантаження фото</li>
              <li><i class="fas fa-check"></i>Розділи для редагування контактів, Hero, «Про нас» і категорій проєктів</li>
              <li><i class="fas fa-check"></i>База даних на Google Таблиці (Google Sheets API) — без окремого сервера</li>
              <li><i class="fas fa-check"></i>Оптимізація під швидке завантаження</li>
            </ul>
          `
    }, {
      icon: 'fa-rocket',
      iconColor: 'orange',
      title: 'Запуск і здача',
      content: `
            <p>Сайт запущено і переданий в самостійне управління:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Сайт працює на contrabasvideo.com.ua</li>
              <li><i class="fas fa-check"></i>Власник додає й редагує кейси сам, без звернень до розробника</li>
              <li><i class="fas fa-check"></i>Перевірено коректну роботу на десктопі й мобільних</li>
            </ul>
          `
    }],
    result: [{
      title: 'Адмін-панель',
      items: ['Додавання нового кейсу (відео, опис, категорія, рік)', 'Редагування наявних кейсів і заміна роликів', 'Сортування кейсів на головній і в «Всі кейси»', 'Завантаження фото Hero і «Про нас» через drag & drop', 'Редагування контактів, послуг і тексту «Про нас»']
    }, {
      title: 'Функціонал',
      items: ['Лайтбокс-перегляд кейсу без переходу на нову сторінку', 'Підтримка кількох відео в одному кейсі', 'Фільтрація кейсів за категоріями', 'Адаптивний дизайн під усі пристрої']
    }, {
      title: 'Технології',
      items: ['HTML5, CSS3, JavaScript', 'Кастомна адмін-панель без готової CMS', 'Google Sheets API як база даних', 'Інтеграція з Vimeo для відео', 'Захист адмінки паролем']
    }],
    gallery: [{
      src: 'img/contrabas-1.webp',
      title: 'Публічна частина сайту',
      description: 'Новий темний преміальний дизайн: hero-секція знімального майданчика та сітка кейсів з позначкою кількості роликів.',
      features: ['Кінематографічний темний UI', 'Бейдж «N відео» на картках кейсів', 'Адаптивна сітка кейсів і фільтри за категоріями']
    }, {
      src: 'img/contrabas-2.webp',
      title: 'Адмін-панель — головне меню',
      description: 'Власник керує сайтом самостійно: кейси, фото, контакти, тексти — без розробника і без стандартної CMS.',
      features: ['8 розділів керування контентом', 'Власна CRM-панель під потреби студії', 'Доступ захищено паролем']
    }, {
      src: 'img/contrabas-3.webp',
      title: '4 ключові функції адмінки',
      description: 'Створення і редагування кейсів, сортування порядку на сайті, завантаження фото Hero та секції «Про нас».',
      features: ['Створення нового кейсу', 'Редагування відео і описів', 'Drag & drop сортування кейсів', 'Завантаження фото сайту']
    }, {
      src: 'img/contrabas-4.webp',
      title: 'Кейс з кількома роликами',
      description: 'Один кейс може містити цілу серію відео (наприклад, 5 епізодів Reels) — кожен зі своєю назвою, у лайтбокс-перегляді.',
      features: ['Лайтбокс-перегляд без переходу на нову сторінку', 'Галерея роликів під основним відео', 'Підпис до кожного епізоду']
    }],
    testimonial: {
      name: 'Руслан Тесленко',
      role: 'Власник і продюсер, Contrabas',
      rating: 5,
      text: 'Це саме те, що я хотів побачити — дуже круто вийшло. Окремо порадувала адмін-панель: тепер сам редагую кейси, фото і тексти без звернень до розробника, це дуже зручно. Зробили все навіть швидше, ніж ми спочатку обговорювали.'
    },
    projectUrl: 'https://contrabasvideo.com.ua/'
  },
  3: {
    type: 'course',
    typeLabel: 'Сайт курсу',
    title: 'Онлайн-курс з товарного бізнесу',
    projectLink: 'https://vladwebstudio.github.io/tovark/',
    desc: 'Розробка і верстка висококонверсійного односторінкового сайту для онлайн-курсу з запуску товарного бізнесу та роботи з Китаєм. Проект виконаний в трендовому темному UI-стилі з преміальними акцентами. Структура повністю mobile-first, логічно розбита на ключові блоки (оффер, програма, тарифи, кейси) і оптимізована під швидку лідогенерацію.',
    timeline: [{
      icon: 'fa-file-alt',
      iconColor: 'purple',
      title: 'Технічне завдання',
      content: `
            <p>Замовник запросив сайт для онлайн-курсу з запуску товарного бізнесу та роботи з Китаєм:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Висококонверсійний односторінковий сайт</li>
              <li><i class="fas fa-check"></i>Трендовий темний UI-стиль з преміальними акцентами</li>
              <li><i class="fas fa-check"></i>Mobile-first структура</li>
              <li><i class="fas fa-check"></i>Ключові блоки: оффер, програма, тарифи, кейси</li>
              <li><i class="fas fa-check"></i>Оптимізація під швидку лідогенерацію</li>
            </ul>
          `
    }, {
      icon: 'fa-comments',
      iconColor: 'teal',
      title: 'Обговорення деталей',
      content: `
            <p>Уточнив вимоги і функціонал:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Цільова аудиторія: новачки і підприємці в товарному бізнесі</li>
              <li><i class="fas fa-check"></i>Стиль: трендовий темний UI з преміальними акцентами</li>
              <li><i class="fas fa-check"></i>Структура: оффер, програма, тарифи, кейси</li>
              <li><i class="fas fa-check"></i>Правки і ексклюзивний контент</li>
              <li><i class="fas fa-check"></i>Документи: договори, публічна оферта, договір конфіденційності</li>
            </ul>
          `
    }, {
      icon: 'fa-palette',
      iconColor: 'orange',
      title: 'Дизайн',
      content: `
            <p>Розробив дизайн безпосередньо в коді:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Унікальний дизайн з роботою тіней</li>
              <li><i class="fas fa-check"></i>Преміальні акценти і анімації</li>
              <li><i class="fas fa-check"></i>Mobile-first підхід</li>
              <li><i class="fas fa-check"></i>Обробка фото і редції</li>
              <li><i class="fas fa-check"></i>Оптимізація під лідогенерацію</li>
            </ul>
          `
    }, {
      icon: 'fa-handshake',
      iconColor: 'purple',
      title: 'Погодження термінів і ціни',
      content: `
            <p>Зафіксували умови:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Термін розробки: 3-5 днів</li>
              <li><i class="fas fa-check"></i>Вартість: $550</li>
              <li><i class="fas fa-check"></i>Правки і ексклюзивний контент</li>
              <li><i class="fas fa-check"></i>Документи: договори, публічна оферта, договір конфіденційності</li>
              <li><i class="fas fa-check"></i>Постійне співпрацювання</li>
            </ul>
          `
    }, {
      icon: 'fa-code',
      iconColor: 'teal',
      title: 'Розробка',
      content: `
            <p>Написав код сайту:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Чистий HTML/CSS/JavaScript</li>
              <li><i class="fas fa-check"></i>Трендовий темний UI-стиль</li>
              <li><i class="fas fa-check"></i>Mobile-first структура</li>
              <li><i class="fas fa-check"></i>Оптимізація під лідогенерацію</li>
              <li><i class="fas fa-check"></i>Інтегрована аналітика для відстеження унікальних користувачів та середнього скролу по сторінці</li>
            </ul>
          `
    }, {
      icon: 'fa-rocket',
      iconColor: 'orange',
      title: 'Запуск і здача',
      content: `
            <p>Проект готовий:</p>
            <ul class="t-card-list">
              <li><i class="fas fa-check"></i>Передано готовий проект</li>
              <li><i class="fas fa-check"></i>Пояснено як все працює</li>
              <li><i class="fas fa-check"></i>Передано повні доступи</li>
              <li><i class="fas fa-check"></i>Замовник задоволений</li>
            </ul>
          `
    }],
    result: [{
      title: 'Функціонал',
      items: ['Висококонверсійний односторінковий сайт', 'Трендовий темний UI-стиль', 'Mobile-first структура', 'Ключові блоки: оффер, програма, тарифи, кейси', 'Оптимізація під лідогенерацію']
    }, {
      title: 'Технології',
      items: ['HTML5, CSS3, JavaScript (ES6+)', 'CSS Grid і Flexbox', 'CSS анімації', 'Без фреймворків і конструкторів', 'Аналітика конверсії і відслідковування поведінки', 'Моніторинг переглядів і взаємодій']
    }],
    gallery: [{
      src: 'img/tovark-1.webp',
      title: 'Головний екран',
      description: 'Головний екран з основною інформацією про курс та блоком "З нами ти навчишся".',
      features: ['Основна інформація про курс', 'Блок "З нами ти навчишся"', 'Інформація про старт навчання', 'Банер з експертом', 'Назва продукту']
    }, {
      src: 'img/tovark-2.webp',
      title: 'Для кого навчання і модулі',
      description: 'Блок з інформацією про цільову аудиторію та модулями навчання.',
      features: ['Для кого це навчання', 'Програма навчання з модулями', 'Що будеш проходити', 'Бонусні модулі']
    }, {
      src: 'img/tovark-3.webp',
      title: 'Формати участі та експерти',
      description: 'Блок з тарифами, інформацією про експерта та блогера з ким запуск.',
      features: ['Формати участі (тарифи)', 'Інформація про експерта', 'Блогер з ким запуск', 'Умови тарифів']
    }, {
      src: 'img/tovark-4.webp',
      title: 'Результати та відгуки',
      description: 'Блок з результатами учнів, фото/відео відгуками та футером з договорами.',
      features: ['Результати учнів з фото/відео', 'Відгуки текстові', 'Відгуки відео', 'Футер з договорами', 'Публічна оферта']
    }, {
      src: 'img/tovark-5.webp',
      title: 'Адаптація під телефон',
      description: 'Мобільна версія сайту з оптимізованим інтерфейсом.',
      features: ['Mobile-first підхід', 'Оптимізація під смартфони', 'Зручна навігація', 'Адаптивний дизайн', 'Швидке завантаження']
    }],
    testimonial: {
      name: 'Неля Колесник',
      role: 'Автор курсу',
      rating: 5,
      text: 'Влад створив сайт у швидкі терміни. Після запуску були абсолютно мінімальні правки, тому що змінювся наш контент. За договором Влад зробив теж швидко, протягом дня. Все було чудово, все сподобалося. Замовили в нього вже третій проект — постійно повертаємось до Влада.'
    },
    projectUrl: 'https://vladwebstudio.github.io/tovark/'
  }
};

// Get case ID from URL — supports both the legacy query route (case-detail.html?id=2,
// still works for any old shared links) and the static per-case route (case-2.html,
// see build-case-pages.js) used for SEO/link-preview purposes going forward.
const urlParams = new URLSearchParams(window.location.search);
const legacyIdParam = urlParams.get('id');
const pathIdMatch = window.location.pathname.match(/case-(\d+)\.html/);
const caseId = parseInt(legacyIdParam) || (pathIdMatch ? parseInt(pathIdMatch[1]) : 1);

// Site is Ukrainian-only, data already flattened to a single language — these just
// read the field directly (fallbackKey kept for call-site compatibility).
function getTranslated(obj, key, fallbackKey) {
  return obj[fallbackKey || key];
}

function getTranslatedArray(obj, key, fallbackKey) {
  return obj[fallbackKey || key];
}

// Load case data
function loadCase(id) {
  const caseData = casesData[id];
  if (!caseData) return;

  // SEO: unique title/meta/canonical/breadcrumb per case (see updateSeoTags above)
  updateSeoTags(caseData, id);

  // Update header
  document.getElementById('caseBadge').className = `case-badge ${caseData.type}`;
  document.getElementById('caseBadge').innerHTML = `<i class="fas fa-${caseData.type === 'crm' ? 'database' : caseData.type === 'landing' ? 'shopping-bag' : caseData.type === 'course' ? 'book-open' : caseData.type === 'video' ? 'clapperboard' : 'palette'}"></i><span>${getTranslated(caseData, 'typeLabel', 'typeLabel')}</span>`;
  document.getElementById('caseTitle').textContent = getTranslated(caseData, 'title', 'title');
  document.getElementById('caseDesc').textContent = getTranslated(caseData, 'desc', 'desc');

  // Update timeline
  const timelineEl = document.getElementById('timeline');
  timelineEl.innerHTML = `
    <div class="t-tabs">
      ${caseData.timeline.map((item, index) => `
        <div class="t-tab${index === 0 ? ' active' : ''}" data-idx="${index}">
          <div class="t-tab-collapsed">
            <div class="t-tab-num-ghost"><svg viewBox="0 0 76 60"><text x="38" y="30" dominant-baseline="middle" text-anchor="middle" font-size="52" font-weight="700" letter-spacing="-1" fill="none" stroke="rgba(255,255,255,.32)" stroke-width="1.2">${String(index + 1).padStart(2, '0')}</text></svg></div>
          </div>
          <div class="t-tab-expanded">
            <div class="t-tab-num">${String(index + 1).padStart(2, '0')}</div>
            <div class="t-tab-title">${getTranslated(item, 'title', 'title')}</div>
            <div class="t-tab-content">${getTranslated(item, 'content', 'content')}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Update result
  const resultEl = document.getElementById('resultGrid');
  const resultIcons = [{
    re: /функціонал|функционал|functionality/i,
    icon: 'fa-circle-check',
    color: 'purple'
  }, {
    re: /аналітик|аналитик|analytic/i,
    icon: 'fa-chart-line',
    color: 'teal'
  }, {
    re: /безпек|безопасн|security/i,
    icon: 'fa-shield-halved',
    color: 'orange'
  }, {
    re: /технолог|technolog/i,
    icon: 'fa-layer-group',
    color: 'teal'
  }];
  resultEl.innerHTML = caseData.result.map((card, idx) => {
    const translatedTitle = getTranslated(card, 'title', 'title');
    const translatedItems = getTranslatedArray(card, 'items', 'items');
    const isTech = /технолог|technolog/i.test(card.title || '');
    const match = resultIcons.find(r => r.re.test(card.title || '')) || {
      icon: 'fa-circle-check',
      color: ['purple', 'teal', 'orange'][idx % 3]
    };
    return `
    <div class="result-card ${isTech ? 'is-tech' : 'is-check'} clr-${match.color}">
      <div class="result-card-head">
        <div class="result-card-icon"><i class="fas ${match.icon}"></i></div>
        <h4>${translatedTitle}</h4>
      </div>
      ${isTech ? `<div class="result-pills">${translatedItems.map(item => `<span class="result-pill">${item}</span>`).join('')}</div>` : `<ul class="result-list">${translatedItems.map(item => `<li><i class="fas fa-check"></i><span>${item}</span></li>`).join('')}</ul>`}
    </div>
  `;
  }).join('');

  // Update gallery - all images in one slider
  const gallerySliderWrapper = document.getElementById('gallerySliderWrapper');
  const galleryInfo = document.getElementById('galleryInfo');
  if (caseData.gallery.length > 0) {
    gallerySliderWrapper.innerHTML = `
      <div class="gallery-slider">
        ${caseData.gallery.map((item, index) => {
      const translatedTitle = getTranslated(item, 'title', 'title');
      const translatedDesc = getTranslated(item, 'description', 'description');
      const translatedFeatures = getTranslatedArray(item, 'features', 'features');
      return `
          <div class="gallery-slide ${index === 0 ? 'active' : ''}" data-slide="${index}">
            <div class="slide-label">${translatedTitle}</div>
            <div class="scr">
              <div class="mck">
                <div class="mck-top"><div class="mck-dots"><div class="mck-dot"></div><div class="mck-dot"></div><div class="mck-dot"></div></div><div class="mck-url"></div><div style="width:20px"></div></div>
                <div class="mck-cnt">
                  <img src="${item.src}" alt="${translatedTitle}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:contain;border-radius:6px;">
                </div>
              </div>
            </div>
          </div>
        `;
    }).join('')}
      </div>
      <div class="gal-controls">
        ${caseData.gallery.map((_, index) => `<div class="gal-dot ${index === 0 ? 'active' : ''}" data-slide="${index}"></div>`).join('')}
      </div>
      <div class="gal-arr prev"><i class="fas fa-chevron-left"></i></div>
      <div class="gal-arr next"><i class="fas fa-chevron-right"></i></div>
    `;
  } else {
    gallerySliderWrapper.style.display = 'none';
  }

  // Initialize slider functionality
  initGallerySlider(gallerySliderWrapper, caseData.gallery);

  // Update project link (now merged into the final CTA row)
  const projectLinkBtn = document.getElementById('projectLinkBtn');
  if (projectLinkBtn) {
    projectLinkBtn.href = caseData.projectLink || '#';
    projectLinkBtn.style.display = caseData.projectLink ? '' : 'none';
  }

  // Update testimonial
  const testimonialEl = document.getElementById('testimonialCard');
  if (caseData.testimonial) {
    const translatedName = getTranslated(caseData.testimonial, 'name', 'name');
    const translatedRole = getTranslated(caseData.testimonial, 'role', 'role');
    const translatedText = getTranslated(caseData.testimonial, 'text', 'text');
    const rating = caseData.testimonial.rating || 5;
    const stars = Array(5).fill(0).map((_, i) => `<i class="fas fa-star"></i>`).join('');
    const ig = {
      1: 'https://www.instagram.com/ruslan.teslenko.producer/',
      3: 'https://www.instagram.com/nelia_kolesnyk/'
    }[id];
    const statText = {
      3: 'Вже 3-й проект разом'
    }[id];
    const igLink = ig ? `<a href="${ig}" target="_blank" rel="noopener" class="testimonial-ig-link" aria-label="Instagram"><i class="fab fa-instagram"></i></a>` : '';
    const statBadge = statText ? `<div class="testimonial-stat"><i class="fas fa-arrow-trend-up"></i><span>${statText}</span></div>` : '';
    const avatarPhoto = {
      1: 'img/testi-ruslan.webp',
      3: 'img/testi-nelia.webp'
    }[id];
    const avatarHtml = avatarPhoto
      ? `<img src="${avatarPhoto}" alt="${translatedName}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">`
      : `<i class="fas fa-user"></i>`;
    testimonialEl.innerHTML = `
      <div class="testimonial-header">
        <div class="testimonial-avatar">${avatarHtml}</div>
        <div class="testimonial-author">
          <h4>${translatedName}${igLink}</h4>
          <p>${translatedRole}</p>
        </div>
      </div>
      <div class="testimonial-text">${translatedText}</div>
      <div class="testimonial-rating">
        <span class="testimonial-stars">${stars}<span class="testimonial-rating-num">${rating.toFixed(1)}</span></span>
      </div>
      ${statBadge}
    `;
  } else {
    const translatedMessage = 'Відзив тимчасово недоступний';
    testimonialEl.innerHTML = `<p style="color:var(--t2)">${translatedMessage}</p>`;
  }

  // Update navigation
  const prevBtn = document.getElementById('prevCase');
  const nextBtn = document.getElementById('nextCase');
  if (id > 1) {
    prevBtn.href = `case-${id - 1}.html`;
    prevBtn.classList.remove('disabled');
  } else {
    prevBtn.href = '#';
    prevBtn.classList.add('disabled');
  }
  if (id < Object.keys(casesData).length) {
    nextBtn.href = `case-${id + 1}.html`;
    nextBtn.classList.remove('disabled');
  } else {
    nextBtn.href = '#';
    nextBtn.classList.add('disabled');
  }

  // Update URL without reload — only for the legacy ?id= query route. The static
  // case-N.html route is already the canonical clean URL, so leave it untouched.
  if (legacyIdParam) {
    const newUrl = new URL(window.location);
    newUrl.searchParams.set('id', id);
    window.history.replaceState({}, '', newUrl);
  }
}

// Initialize gallery slider
function initGallerySlider(wrapper, images) {
  if (!wrapper || images.length === 0) return;
  const slides = wrapper.querySelectorAll('.gallery-slide');
  const dots = wrapper.querySelectorAll('.gal-dot');
  const prev = wrapper.querySelector('.gal-arr.prev');
  const next = wrapper.querySelector('.gal-arr.next');
  const infoPanel = document.getElementById('galleryInfo');
  const infoTitle = wrapper.parentElement.querySelector('.gal-info-title');
  const infoDesc = wrapper.parentElement.querySelector('.gal-info-desc');
  const infoFeatures = wrapper.parentElement.querySelector('.gal-info-features');
  let cur = 0;
  function go(idx) {
    slides[cur].classList.remove('active');
    dots[cur].classList.remove('active');
    cur = (idx + slides.length) % slides.length;
    slides[cur].classList.add('active');
    dots[cur].classList.add('active');
    updateGalleryInfo(cur);
  }
  function updateGalleryInfo(slideIndex) {
    const activeSlide = slides[slideIndex];
    const img = activeSlide.querySelector('.scr img');
    const slideLabel = activeSlide.querySelector('.slide-label');
    if (infoPanel && img) {
      const imageData = images[slideIndex];
      if (imageData) {
        const translatedTitle = getTranslated(imageData, 'title', 'title');
        const translatedDesc = getTranslated(imageData, 'description', 'description');
        const translatedFeatures = getTranslatedArray(imageData, 'features', 'features');
        infoTitle.textContent = translatedTitle;
        infoDesc.textContent = translatedDesc;
        infoFeatures.innerHTML = translatedFeatures.map(f => `<div class="gal-info-feature"><i class="fas fa-check"></i><span>${f}</span></div>`).join('');
        infoPanel.classList.add('show');
      }
    }
  }

  // Lightbox functionality - click on image to open
  slides.forEach((slide, index) => {
    const img = slide.querySelector('.scr img');
    if (img) {
      img.addEventListener('click', e => {
        e.stopPropagation();
        openLightbox(index);
      });
    }
  });
  if (prev) prev.addEventListener('click', () => go(cur - 1));
  if (next) next.addEventListener('click', () => go(cur + 1));
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => go(idx));
  });

  // Show initial info
  updateGalleryInfo(0);
}

// Initialize
loadCase(caseId);

// ===== LIGHTBOX =====
let currentImages = [];
let currentIndex = 0;
let zoomLevel = 1;
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lbClose = document.querySelector('.lb-close');
const lbPrev = document.querySelector('.lb-prev');
const lbNext = document.querySelector('.lb-next');
const lbCounter = document.querySelector('.lb-counter');
const lbInfo = document.querySelector('.lb-info');
const lbInfoTitle = document.querySelector('.lb-info-title');
const lbInfoDesc = document.querySelector('.lb-info-desc');
const lbInfoFeatures = document.querySelector('.lb-info-features');
const lbInfoToggle = document.getElementById('lbInfoToggle');
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;
let initialTranslateX = 0;
let initialTranslateY = 0;
let isInfoExpanded = true;

// Toggle info description
if (lbInfoToggle) {
  lbInfoToggle.addEventListener('click', () => {
    isInfoExpanded = !isInfoExpanded;
    lbInfoDesc.classList.toggle('hidden', !isInfoExpanded);
    lbInfoFeatures.classList.toggle('hidden', !isInfoExpanded);
    lbInfoToggle.innerHTML = isInfoExpanded ? '<i class="fas fa-minus"></i>' : '<i class="fas fa-plus"></i>';
  });
}
function openLightbox(index) {
  const caseData = casesData[caseId];
  currentImages = caseData.gallery;
  currentIndex = index;
  zoomLevel = 1;
  translateX = 0;
  translateY = 0;
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].title;
  lightboxImg.style.transform = 'scale(1) translate(0, 0)';
  lbCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  updateLightboxInfo();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  zoomLevel = 1;
  translateX = 0;
  translateY = 0;
  lightboxImg.style.transform = 'scale(1) translate(0, 0)';
}
function updateLightboxInfo() {
  const img = currentImages[currentIndex];
  const translatedTitle = getTranslated(img, 'title', 'title');
  const translatedDesc = getTranslated(img, 'description', 'description');
  const translatedFeatures = getTranslatedArray(img, 'features', 'features');
  lbInfoTitle.textContent = translatedTitle;
  lbInfoDesc.textContent = translatedDesc;
  lbInfoFeatures.innerHTML = translatedFeatures.map(f => `<div class="lb-info-feature"><i class="fas fa-check"></i><span>${f}</span></div>`).join('');
  lbInfo.classList.add('show');
}
function navigateLightbox(direction) {
  currentIndex += direction;
  if (currentIndex < 0) currentIndex = currentImages.length - 1;
  if (currentIndex >= currentImages.length) currentIndex = 0;
  lightboxImg.src = currentImages[currentIndex].src;
  lightboxImg.alt = currentImages[currentIndex].title;
  zoomLevel = 1;
  translateX = 0;
  translateY = 0;
  lightboxImg.style.transform = 'scale(1) translate(0, 0)';
  lbCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  updateLightboxInfo();
}

// ===== TIMELINE COLUMNS (vertical bars; hover moves which one is open, last hovered stays open) =====
const timelineContainer = document.getElementById('timeline');
if (timelineContainer) {
  const setActive = idx => {
    timelineContainer.querySelectorAll('.t-tab').forEach(t => t.classList.toggle('active', t.dataset.idx === String(idx)));
  };
  timelineContainer.addEventListener('mouseover', e => {
    const tab = e.target.closest('.t-tab');
    if (tab && !tab.classList.contains('active')) setActive(tab.dataset.idx);
  });
}
lbClose.addEventListener('click', closeLightbox);
lbPrev.addEventListener('click', e => {
  e.stopPropagation();
  navigateLightbox(-1);
});
lbNext.addEventListener('click', e => {
  e.stopPropagation();
  navigateLightbox(1);
});

// Close lightbox when clicking on empty space (background), not on content
lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') navigateLightbox(-1);
  if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Zoom controls
const zoomInBtn = document.getElementById('zoomIn');
const zoomOutBtn = document.getElementById('zoomOut');
const zoomResetBtn = document.getElementById('zoomReset');
if (zoomInBtn) zoomInBtn.addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault();
  zoomLevel = Math.min(zoomLevel + 0.15, 3);
  updateTransform();
});
if (zoomOutBtn) zoomOutBtn.addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault();
  zoomLevel = Math.max(zoomLevel - 0.15, 0.5);
  updateTransform();
});
if (zoomResetBtn) zoomResetBtn.addEventListener('click', e => {
  e.stopPropagation();
  e.preventDefault();
  zoomLevel = 1;
  translateX = 0;
  translateY = 0;
  updateTransform();
});
function updateTransform() {
  lightboxImg.style.transform = `scale(${zoomLevel}) translate(${translateX}px, ${translateY}px)`;
  lightboxImg.style.cursor = zoomLevel > 1 ? 'grab' : 'default';
}

// Wheel zoom - only with Ctrl/Cmd key (trackpad scroll won't zoom)
lightboxImg.addEventListener('wheel', e => {
  if (e.ctrlKey || e.metaKey) {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomLevel = Math.min(zoomLevel + 0.05, 3);
    } else {
      zoomLevel = Math.max(zoomLevel - 0.05, 0.5);
    }
    updateTransform();
  }
  // Allow normal scrolling without Ctrl/Cmd
});

// Drag functionality
lightboxImg.addEventListener('mousedown', e => {
  if (zoomLevel > 1) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialTranslateX = translateX;
    initialTranslateY = translateY;
    lightboxImg.style.cursor = 'grabbing';
    e.preventDefault();
    e.stopPropagation();
  }
});
document.addEventListener('mousemove', e => {
  if (isDragging) {
    e.preventDefault();
    const deltaX = (e.clientX - startX) * 0.3;
    const deltaY = (e.clientY - startY) * 0.3;
    translateX = initialTranslateX + deltaX;
    translateY = initialTranslateY + deltaY;
    updateTransform();
  }
});
document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    updateTransform();
  }
});
lightboxImg.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    updateTransform();
  }
});
lightboxImg.addEventListener('click', e => {
  e.stopPropagation();
});

// Touch events for mobile pinch-zoom
let initialPinchDistance = 0;
let initialZoomLevel = 1;
lightboxImg.addEventListener('touchstart', e => {
  if (e.touches.length === 1) {
    if (zoomLevel > 1) {
      isDragging = true;
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      initialTranslateX = translateX;
      initialTranslateY = translateY;
    }
  } else if (e.touches.length === 2) {
    initialPinchDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    initialZoomLevel = zoomLevel;
  }
}, {
  passive: true
});
lightboxImg.addEventListener('touchmove', e => {
  if (e.touches.length === 1 && isDragging) {
    e.preventDefault();
    const deltaX = (e.touches[0].clientX - startX) * 0.3;
    const deltaY = (e.touches[0].clientY - startY) * 0.3;
    translateX = initialTranslateX + deltaX;
    translateY = initialTranslateY + deltaY;
    updateTransform();
  } else if (e.touches.length === 2) {
    const currentPinchDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
    const distanceChange = Math.abs(currentPinchDistance - initialPinchDistance);

    // Only zoom if distance changes significantly (> 20px) - true pinch gesture on mobile
    if (distanceChange > 20) {
      e.preventDefault();
      const scaleRatio = currentPinchDistance / initialPinchDistance;
      // Smooth the zoom by interpolating towards the target scale
      const targetZoom = initialZoomLevel * scaleRatio;
      zoomLevel = zoomLevel + (targetZoom - zoomLevel) * 0.3;
      zoomLevel = Math.max(0.5, Math.min(3, zoomLevel));
      updateTransform();
    }
  }
}, {
  passive: false
});
lightboxImg.addEventListener('touchend', e => {
  isDragging = false;
  if (e.touches.length < 2) {
    initialPinchDistance = 0;
  }
});

// ===== PARTICLE SYSTEM =====
const particleCanvas = document.getElementById('particleCanvas');
const ctx = particleCanvas.getContext('2d');
let particles = [];
let mouseX = 0,
  mouseY = 0;
function resizeCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);
class Particle {
  constructor() {
    this.x = Math.random() * particleCanvas.width;
    this.y = Math.random() * particleCanvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Wrap around screen
    if (this.x < 0) this.x = particleCanvas.width;
    if (this.x > particleCanvas.width) this.x = 0;
    if (this.y < 0) this.y = particleCanvas.height;
    if (this.y > particleCanvas.height) this.y = 0;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108, 92, 231, ${this.opacity})`;
    ctx.fill();
  }
}

// Create particles
for (let i = 0; i < 100; i++) {
  particles.push(new Particle());
}
function animateParticles() {
  ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== SCROLL TO TOP =====
// Scroll to top functionality
const scrollTopBtn = document.getElementById('scrollTopBtn');
window.addEventListener('scroll', () => {
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('show', window.scrollY > 300);
  }
});
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ===== TRACKING (same dataLayer/event scheme as index.html) =====
// Pushes to window.dataLayer only — nothing is sent anywhere until a real GTM container ID
// is filled in (see the GTM placeholder in <head>). Safe to leave running.
window.dataLayer = window.dataLayer || [];
function trackEvent(eventName, params) {
  const event_id = eventName + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
  window.dataLayer.push(Object.assign({
    event: eventName,
    event_id
  }, params || {}));
}
trackEvent('case_view', {
  case_id: caseId,
  lang: currentLang
});
document.querySelectorAll('a[href*="t.me/vladoss_011"]').forEach(a => {
  a.addEventListener('click', () => {
    trackEvent('telegram_click', {
      lead_source: 'case_detail',
      case_id: caseId,
      lang: currentLang
    });
    trackEvent('lead_generated', {
      lead_source: 'case_detail:' + caseId,
      lang: currentLang
    });
  });
});

// CTA: "Переглянути ціни" — jumps back to the pricing calculator on the homepage.
document.querySelectorAll('a[href*="index.html#calculator"]').forEach(a => {
  a.addEventListener('click', () => {
    trackEvent('cta_click', { cta_type: 'view_pricing', case_id: caseId });
  });
});

// CTA: "Відкрити проект (гість)" — opens the live guest-mode demo of this case.
const projectLinkBtnTracked = document.getElementById('projectLinkBtn');
if (projectLinkBtnTracked) {
  projectLinkBtnTracked.addEventListener('click', () => {
    trackEvent('cta_click', { cta_type: 'live_project_open', case_id: caseId });
    trackEvent('outbound_click', { url: projectLinkBtnTracked.href, case_id: caseId });
  });
}

// Prev/next case navigation — which case cross-links actually get used.
['prevCase', 'nextCase'].forEach(id => {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) return;
    trackEvent('case_nav_click', { direction: id === 'prevCase' ? 'prev' : 'next', from_case_id: caseId });
  });
});

// Outbound Instagram links in testimonials.
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a.testimonial-ig-link[href]');
  if (a) trackEvent('outbound_click', { url: a.getAttribute('href'), case_id: caseId, cta_location: 'testimonial' });
});

// Scroll depth — fires once per threshold per page load.
(() => {
  const depths = [25, 50, 75, 90, 100];
  const seen = new Set();
  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;
    const pct = Math.round((window.scrollY / docHeight) * 100);
    depths.forEach(d => {
      if (pct >= d && !seen.has(d)) {
        seen.add(d);
        trackEvent('scroll_depth', { depth: d, case_id: caseId });
      }
    });
  }, { passive: true });
})();

// Engaged time — only counts seconds while the tab is visible/focused.
(() => {
  const thresholds = [10, 30, 60, 120, 180];
  const seen = new Set();
  let seconds = 0;
  setInterval(() => {
    if (document.visibilityState !== 'visible') return;
    seconds++;
    thresholds.forEach(sec => {
      if (seconds >= sec && !seen.has(sec)) {
        seen.add(sec);
        trackEvent('engaged_time', { seconds: sec, case_id: caseId });
      }
    });
  }, 1000);
})();