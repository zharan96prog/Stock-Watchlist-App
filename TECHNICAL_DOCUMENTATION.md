# 📋 Технічна документація проекту

## Stock Watchlist Application

---

## 1. ТЕХНІЧНЕ ЗАВДАННЯ

### 1.1. Загальна інформація

**Назва проекту:** Stock Watchlist Application (Додаток для відстеження акцій)

**Замовник:** Магістерська програма "Інженерія програмного забезпечення"

**Розробник:** [Ваше ім'я]

**Дата початку:** [Дата]

**Версія документа:** 1.0

**Статус:** В розробці

### 1.2. Мета проекту

Розробити веб-додаток для моніторингу, аналізу та оцінки акцій компаній з можливістю створення персоналізованого списку відстеження (watchlist).

### 1.3. Цільова аудиторія

- Приватні інвестори
- Студенти економічних спеціальностей
- Фінансові аналітики-початківці
- Трейдери, що шукають інструмент для швидкого аналізу

### 1.4. Основні функціональні вимоги

#### 1.4.1. Модуль автентифікації

- **FR-1.1:** Реєстрація користувача через email/пароль
- **FR-1.2:** Вхід в систему через email/пароль
- **FR-1.3:** Вихід з системи
- **FR-1.4:** Збереження сесії користувача
- **FR-1.5:** Захист приватних маршрутів

#### 1.4.2. Модуль пошуку компаній

- **FR-2.1:** Пошук компанії за назвою
- **FR-2.2:** Пошук компанії за біржовим символом (ticker)
- **FR-2.3:** Автозаповнення під час пошуку
- **FR-2.4:** Відображення списку результатів пошуку

#### 1.4.3. Модуль watchlist (списку відстеження)

- **FR-3.1:** Додавання компанії до watchlist
- **FR-3.2:** Видалення компанії з watchlist
- **FR-3.3:** Перегляд списку відстежуваних компаній
- **FR-3.4:** Збереження watchlist в базі даних
- **FR-3.5:** Синхронізація watchlist між пристроями

#### 1.4.4. Модуль інформації про компанію

- **FR-4.1:** Перегляд загального огляду компанії (Overview)
  - Назва, символ, біржа
  - Поточна ціна акції
  - Зміна ціни (абсолютна та відносна)
  - Ринкова капіталізація
  - Обсяг торгів
- **FR-4.2:** Перегляд профілю компанії (Profile)
  - Опис бізнесу
  - Країна, індустрія, сектор
  - Кількість співробітників
  - Веб-сайт
  - IPO дата
- **FR-4.3:** Перегляд новин компанії (News)

  - Список останніх новин
  - Заголовок, джерело, дата
  - Посилання на повну статтю

- **FR-4.4:** Перегляд прогнозів (Forecast)

  - Прогноз ціни на 1, 3, 6, 12 місяців
  - Візуалізація прогнозів
  - Рекомендації (buy/hold/sell)

- **FR-4.5:** Перегляд оцінок аналітиків (Estimate)

  - Консенсус-прогнози
  - EPS (прибуток на акцію)
  - Revenue (виручка)
  - Порівняння з конкурентами

- **FR-4.6:** Перегляд фінансових звітів (Financials)
  - Звіт про прибутки та збитки (Income Statement)
  - Баланс (Balance Sheet)
  - Рух грошових коштів (Cash Flow)
  - Фінансові коефіцієнти (Ratios)
  - Показники зростання

#### 1.4.5. Модуль оцінки компанії

- **FR-5.1:** Автоматична оцінка привабливості компанії
- **FR-5.2:** Визначення переоціненості/недооціненості
- **FR-5.3:** Аналіз фінансових коефіцієнтів (P/E, P/B, ROE, тощо)

### 1.5. Нефункціональні вимоги

#### 1.5.1. Продуктивність

- **NFR-1.1:** Час завантаження головної сторінки < 3 секунд
- **NFR-1.2:** Час відгуку на пошуковий запит < 2 секунд
- **NFR-1.3:** Плавна навігація між вкладками (< 500мс)

#### 1.5.2. Масштабованість

- **NFR-2.1:** Підтримка до 10,000 користувачів
- **NFR-2.2:** Можливість розширення функціоналу через модульну архітектуру

#### 1.5.3. Безпека

- **NFR-3.1:** Шифрування паролів користувачів
- **NFR-3.2:** Захист API ключів через environment variables
- **NFR-3.3:** Захист від XSS та CSRF атак
- **NFR-3.4:** HTTPS з'єднання

#### 1.5.4. Usability (Зручність використання)

- **NFR-4.1:** Адаптивний дизайн (responsive) для різних пристроїв
- **NFR-4.2:** Інтуїтивний інтерфейс користувача
- **NFR-4.3:** Підтримка темної та світлої теми (опціонально)

#### 1.5.5. Надійність

- **NFR-5.1:** Uptime не менше 99%
- **NFR-5.2:** Обробка помилок з відповідними повідомленнями
- **NFR-5.3:** Graceful degradation при недоступності API

#### 1.5.6. Сумісність

- **NFR-6.1:** Підтримка Chrome, Firefox, Safari, Edge (остані 2 версії)
- **NFR-6.2:** Підтримка мобільних браузерів (iOS Safari, Chrome Mobile)

### 1.6. Технологічний стек

#### Frontend:

- **Framework:** React 19.0.0
- **State Management:** Redux Toolkit 2.6.1
- **Routing:** React Router DOM 7.5.0
- **UI Library:** Tailwind CSS 3.4.17
- **Charts:** ApexCharts 4.7.0, Recharts 2.15.3
- **Build Tool:** Vite 6.3.0

#### Backend/Database:

- **Authentication:** Firebase Authentication
- **Database:** Firebase Firestore
- **Local Storage:** IndexedDB (через бібліотеку idb 8.0.2)

#### External APIs:

- **Finnhub API:** Профіль компанії, котирування, новини
- **Financial Modeling Prep (FMP) API:** Фінансові звіти, прогнози, оцінки

### 1.7. Архітектура системи

**Тип архітектури:** Single Page Application (SPA) з використанням Component-Based Architecture

**Основні шари:**

1. **Presentation Layer** (UI Components)
2. **Business Logic Layer** (Redux Slices, Custom Hooks)
3. **Service Layer** (API Services)
4. **Data Layer** (Firebase, External APIs)

### 1.8. Обмеження та припущення

#### Обмеження:

- Залежність від зовнішніх API (Finnhub, FMP)
- Обмеження безкоштовних планів API (кількість запитів на день)
- Деякі компанії доступні тільки на платних тарифах

#### Припущення:

- Користувачі мають стабільне інтернет-з'єднання
- Користувачі використовують сучасні браузери
- Фінансові дані оновлюються в режимі реального часу через API

### 1.9. Критерії приймання

- Успішна реєстрація та аутентифікація користувачів
- Можливість пошуку компаній за назвою або символом
- Додавання/видалення компаній з watchlist
- Відображення детальної інформації про компанію
- Коректне відображення фінансових даних
- Адаптивний дизайн на всіх пристроях
- Відсутність критичних помилок

---

## 2. UML ДІАГРАМИ

### 2.1. Use Case діаграма

> **📊 Діаграма:** [docs/uml/01-use-case.puml](docs/uml/01-use-case.puml)
>
> Для перегляду діаграми:
>
> - Відкрийте файл у VS Code і натисніть `Alt+D`
> - Або скопіюйте код на [plantuml.com](http://www.plantuml.com/plantuml/uml/)

**Опис Use Cases:**

- **UC1:** Користувач може переглядати головну сторінку з інформацією про додаток
- **UC2:** Гість може зареєструватися в системі
- **UC3:** Гість може увійти в систему
- **UC4:** Авторизований користувач може вийти з системи
- **UC5:** Користувач може шукати компанії за назвою або символом
- **UC6:** Користувач може додавати компанії до свого watchlist
- **UC7:** Користувач може видаляти компанії зі свого watchlist
- **UC8:** Користувач може переглядати свій watchlist
- **UC9:** Користувач може переглядати детальну інформацію про компанію
- **UC10-UC15:** Різні вкладки детальної інформації про компанію

### 2.2. Діаграма класів (Class Diagram)

> **📊 Діаграма:** [docs/uml/02-class-diagram.puml](docs/uml/02-class-diagram.puml)
>
> Показує структуру основних класів системи:
>
> - User, Watchlist, Company
> - News, Forecast, Financial, Estimate
> - Зв'язки між класами (один-до-одного, один-до-багатьох)

### 2.3. Діаграма послідовності (Sequence Diagram) - Додавання компанії в Watchlist

> **📊 Діаграма:** [docs/uml/03-sequence-add-watchlist.puml](docs/uml/03-sequence-add-watchlist.puml)
>
> Демонструє послідовність дій при додаванні компанії:
>
> - Взаємодія користувача з UI
> - Робота з Redux Store
> - API запити до FMP
> - Збереження в Firebase Firestore

### 2.4. Діаграма послідовності - Автентифікація користувача

> **📊 Діаграма:** [docs/uml/04-sequence-authentication.puml](docs/uml/04-sequence-authentication.puml)
>
> Показує процес входу користувача в систему:
>
> - Введення email/password
> - Перевірка через Firebase Authentication
> - Обробка успішного входу та помилок
> - Перенаправлення користувача

### 2.5. Діаграма компонентів (Component Diagram)

> **📊 Діаграма:** [docs/uml/05-component-diagram.puml](docs/uml/05-component-diagram.puml)
>
> Архітектура frontend додатку:
>
> - Структура Pages та Components
> - Redux Slices (Auth, Watchlist)
> - Services (FMP, Finnhub)
> - Зв'язки між усіма компонентами системи

### 2.6. Діаграма розгортання (Deployment Diagram)

> **📊 Діаграма:** [docs/uml/06-deployment-diagram.puml](docs/uml/06-deployment-diagram.puml)
>
> Інфраструктура та розгортання системи:
>
> - Client Browser (React SPA)
> - CDN/Hosting (Netlify/Vercel/Firebase)
> - Firebase Cloud (Auth + Firestore)
> - External APIs (FMP, Finnhub)

### 2.7. Діаграма станів (State Diagram) - Watchlist Item

> **📊 Діаграма:** [docs/uml/07-state-diagram.puml](docs/uml/07-state-diagram.puml)
>
> Життєвий цикл елемента watchlist:
>
> - NotInWatchlist → Adding → InWatchlist
> - InWatchlist → Removing → NotInWatchlist
> - InWatchlist → ViewingDetails
> - Обробка помилок і повернення до попередніх станів

### 2.8. Діаграма активності (Activity Diagram) - Перегляд деталей компанії

> **📊 Діаграма:** [docs/uml/08-activity-diagram.puml](docs/uml/08-activity-diagram.puml)
>
> Процес перегляду детальної інформації про компанію:
>
> - Паралельне завантаження даних (details + quote)
> - Навігація між вкладками (Overview, Profile, News, Forecast, Estimate, Financials)
> - Обробка помилок завантаження
> - Логіка кешування даних

---

## 3. СТРУКТУРА БАЗИ ДАНИХ

### 3.1. Опис бази даних

**Тип БД:** NoSQL (Firebase Firestore)

**Причини вибору:**

- Інтеграція з Firebase Authentication
- Режим реального часу (real-time updates)
- Автоматичне масштабування
- Відсутність потреби в складних зв'язках
- Швидка розробка та прототипування

### 3.2. Колекції Firestore

#### 3.2.1. Колекція: `users`

**Призначення:** Зберігання інформації про користувачів

```json
{
  "userId": "string (auto-generated by Firebase Auth)",
  "email": "string",
  "createdAt": "timestamp",
  "lastLogin": "timestamp",
  "displayName": "string (optional)"
}
```

**Поля:**

- `userId` - Унікальний ідентифікатор (Primary Key)
- `email` - Email користувача
- `createdAt` - Дата створення акаунту
- `lastLogin` - Остання дата входу
- `displayName` - Ім'я користувача (опціонально)

#### 3.2.2. Колекція: `watchlist`

**Призначення:** Зберігання компаній у списку відстеження користувачів

```json
{
  "id": "string (auto-generated document ID)",
  "userId": "string (reference to users)",
  "symbol": "string",
  "name": "string",
  "price": "number",
  "change": "number",
  "changePercent": "number",
  "marketCap": "number",
  "exchange": "string",
  "currency": "string",
  "addedAt": "timestamp",
  "lastUpdated": "timestamp"
}
```

**Поля:**

- `id` - Унікальний ідентифікатор документа (Primary Key)
- `userId` - ID користувача (Foreign Key до users)
- `symbol` - Біржовий тікер компанії (наприклад, AAPL, TSLA)
- `name` - Назва компанії
- `price` - Поточна ціна акції
- `change` - Зміна ціни (абсолютна)
- `changePercent` - Зміна ціни (%)
- `marketCap` - Ринкова капіталізація
- `exchange` - Біржа (NASDAQ, NYSE тощо)
- `currency` - Валюта (USD, EUR тощо)
- `addedAt` - Дата додавання в watchlist
- `lastUpdated` - Остання дата оновлення даних

**Індекси:**

- `userId` - для швидкого отримання watchlist конкретного користувача
- `symbol` - для перевірки чи компанія вже в watchlist

### 3.3. ER діаграма (Entity-Relationship Diagram)

> **📊 Діаграма:** [docs/uml/09-er-diagram.puml](docs/uml/09-er-diagram.puml)
>
> Структура бази даних Firebase Firestore:
>
> - Колекція Users (userId, email, createdAt, lastLogin)
> - Колекція Watchlist (id, userId, symbol, name, price, change, ...)
> - Зв'язок 1:N (один користувач має багато компаній у watchlist)
> - Зовнішні джерела даних (FMP API, Finnhub API)

### 3.4. Зовнішні джерела даних (External APIs)

Оскільки більшість даних про компанії отримується з зовнішніх API в режимі реального часу, в локальній базі зберігається тільки:

1. Інформація про користувачів
2. Список відстежуваних компаній (watchlist)

**Фінансові дані** (новини, котирування, прогнози, фінанси) отримуються безпосередньо з:

- **Finnhub API**
- **Financial Modeling Prep (FMP) API**

### 3.5. Діаграма даних (Data Flow Diagram)

> **📊 Діаграма:** [docs/uml/10-data-flow-diagram.puml](docs/uml/10-data-flow-diagram.puml)
>
> Потоки даних у системі:
>
> - User → React Application → Redux → Services
> - API запити: FMP API (фінанси, оцінки), Finnhub API (котирування, новини)
> - Firebase Firestore (збереження watchlist, users)
> - IndexedDB (локальне кешування)
> - Відповіді та відображення результатів користувачу

### 3.6. Схема даних для локального кешування (IndexedDB)

Додаток використовує IndexedDB для кешування даних:

**Object Store: `cachedCompanies`**

```javascript
{
  symbol: "string (key)",
  data: {
    details: {},
    quote: {},
    news: [],
    // інші дані
  },
  timestamp: "number",
  expiresIn: "number (milliseconds)"
}
```

**Призначення:**

- Зменшення кількості API запитів
- Підвищення швидкості завантаження
- Робота офлайн (опціонально)

---

## 4. АРХІТЕКТУРА ДОДАТКУ

### 4.1. Загальна архітектура

**Тип:** Single Page Application (SPA)
**Патерн:** Flux Architecture (через Redux)

```
┌─────────────────────────────────────────────────────────┐
│                   USER INTERFACE (React)                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌─────────┐ │
│  │  Pages   │  │Components│  │   UI     │  │ Routing │ │
│  └──────────┘  └──────────┘  └──────────┘  └─────────┘ │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              STATE MANAGEMENT (Redux)                    │
│  ┌──────────────┐           ┌──────────────┐            │
│  │  Auth Slice  │           │Watchlist Slice│            │
│  └──────────────┘           └──────────────┘            │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   SERVICE LAYER                          │
│  ┌──────────────┐           ┌──────────────┐            │
│  │ FMP Service  │           │Finnhub Service│            │
│  └──────────────┘           └──────────────┘            │
└────────────────────────┬────────────────────────────────┘
                         │
         ┌───────────────┴───────────────┐
         ▼                               ▼
┌─────────────────┐           ┌─────────────────────┐
│ Firebase        │           │  External APIs      │
│ (Auth, Firestore)│           │ (Finnhub, FMP)      │
└─────────────────┘           └─────────────────────┘
```

### 4.2. Структура папок

```
src/
├── assets/          # Статичні файли (зображення, іконки)
├── components/      # React компоненти
│   ├── Estimate/    # Компоненти для оцінок
│   ├── Financials/  # Компоненти для фінансів
│   └── UI/          # Переважувані UI компоненти
├── config/          # Конфігураційні файли
├── constants/       # Константи додатку
├── hooks/           # Custom React hooks
├── loaders/         # Route loaders (React Router)
├── pages/           # Сторінки додатку
├── redux/           # Redux store та slices
│   └── slices/      # Redux slices
├── services/        # API сервіси
└── utils/           # Утилітні функції
```

### 4.3. Потік даних

1. **User Action** → Користувач виконує дію (клік, введення)
2. **Component** → Компонент викликає dispatch або функцію
3. **Redux Action** → Запускається action
4. **Thunk/Service** → Асинхронні операції (API запити)
5. **State Update** → Redux оновлює state
6. **Re-render** → React перерендерює компоненти
7. **UI Update** → Користувач бачить оновлені дані

---

## 5. ІНТЕГРАЦІЇ ТА API

### 5.1. Firebase Authentication

**Методи:**

- `signInWithEmailAndPassword()` - Вхід
- `createUserWithEmailAndPassword()` - Реєстрація
- `signOut()` - Вихід
- `onAuthStateChanged()` - Відстеження стану авторизації

### 5.2. Firebase Firestore

**Операції:**

- `addDoc()` - Додавання документа
- `getDocs()` - Отримання колекції
- `deleteDoc()` - Видалення документа

### 5.3. Financial Modeling Prep (FMP) API

**Endpoints:**

- `/api/v3/profile/{symbol}` - Профіль компанії
- `/api/v3/quote/{symbol}` - Котирування
- `/api/v3/search` - Пошук компаній
- `/api/v3/income-statement/{symbol}` - Звіт про прибутки
- `/api/v3/balance-sheet-statement/{symbol}` - Баланс
- `/api/v3/cash-flow-statement/{symbol}` - Рух коштів
- `/api/v3/ratios/{symbol}` - Фінансові коефіцієнти
- `/api/v3/analyst-estimates/{symbol}` - Оцінки аналітиків
- `/api/v4/price-target` - Цільові ціни

### 5.4. Finnhub API

**Endpoints:**

- `/stock/profile2` - Профіль компанії
- `/quote` - Котирування
- `/company-news` - Новини компанії

---

## 6. ТЕСТУВАННЯ

### 6.1. План тестування

#### 6.1.1. Unit Testing

- Тестування Redux reducers
- Тестування утилітних функцій
- Тестування custom hooks

#### 6.1.2. Integration Testing

- Тестування взаємодії компонентів
- Тестування API сервісів
- Тестування Redux slices з async thunks

#### 6.1.3. E2E Testing

- Реєстрація та вхід користувача
- Пошук компанії
- Додавання в watchlist
- Перегляд деталей компанії

### 6.2. Test Cases

#### TC-1: Реєстрація користувача

- **Preconditions:** Користувач не зареєстрований
- **Steps:**
  1. Відкрити /register
  2. Ввести email і пароль
  3. Натиснути "Register"
- **Expected:** Перенаправлення на головну, користувач авторизований

#### TC-2: Додавання компанії в watchlist

- **Preconditions:** Користувач авторизований
- **Steps:**
  1. Знайти компанію (наприклад, AAPL)
  2. Натиснути "Add to Watchlist"
- **Expected:** Компанія додана, відображається повідомлення

---

## 7. РОЗГОРТАННЯ

### 7.1. Вимоги до середовища

- Node.js >= 16.x
- npm >= 8.x
- Сучасний браузер

### 7.2. Кроки розгортання

1. **Clone repository**

```bash
git clone https://github.com/your-repo/stock-watchlist-app.git
```

2. **Install dependencies**

```bash
npm install
```

3. **Setup environment variables**

```bash
# Create .env file with API keys
VITE_FINNHUB_API_KEY=your_key
VITE_FMP_API_KEY=your_key
VITE_FIREBASE_API_KEY=your_key
# ... інші Firebase змінні
```

4. **Build**

```bash
npm run build
```

5. **Deploy**

- Завантажити папку `dist/` на хостинг (Netlify, Vercel, Firebase Hosting)

### 7.3. Рекомендовані платформи

- **Netlify** - Безкоштовний хостинг для SPA
- **Vercel** - Оптимізований для React додатків
- **Firebase Hosting** - Інтеграція з Firebase Services

---

## 8. ПОДАЛЬШИЙ РОЗВИТОК

### 8.1. Заплановані функції

- Порівняння кількох компаній side-by-side
- Система рейтингів та рекомендацій
- Сповіщення про зміни цін
- Експорт watchlist в Excel/CSV
- Темна/світла тема
- Мультимовність (українська, англійська)
- Мобільний додаток (React Native)

### 8.2. Технічні вдосконалення

- Міграція на Next.js (SSR/SSG)
- Використання MongoDB для watchlist
- Впровадження GraphQL
- Додавання Service Worker (PWA)
- Впровадження автоматизованого тестування
- CI/CD pipeline

---

## 9. ДОДАТКИ

### 9.1. Глосарій

- **Ticker/Symbol** - Біржовий символ компанії (наприклад, AAPL для Apple)
- **P/E Ratio** - Price-to-Earnings ratio (співвідношення ціни до прибутку)
- **Market Cap** - Ринкова капіталізація
- **EPS** - Earnings Per Share (прибуток на акцію)
- **Watchlist** - Список відстеження компаній
- **SPA** - Single Page Application
- **Redux** - Бібліотека для управління станом

### 9.2. Посилання

- [React Documentation](https://react.dev/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Finnhub API Documentation](https://finnhub.io/docs/api)
- [FMP API Documentation](https://site.financialmodelingprep.com/developer/docs/)

### 9.3. Контакти

**Автор проекту:** [Ваше ім'я]
**Email:** [Ваш email]
**GitHub:** [Ваш GitHub]

---

**Дата створення документа:** 12 грудня 2025
**Версія:** 1.0
**Статус:** Актуальний
