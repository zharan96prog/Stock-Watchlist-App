# UML Діаграми - Stock Watchlist Application

Ця папка містить всі UML діаграми проекту в форматі PlantUML (.puml).

## 📋 Список діаграм

### 1. [Use Case Діаграма](01-use-case.puml)

**Файл:** `01-use-case.puml`

Показує всі можливі сценарії використання системи:

- Дії неавторизованого користувача (гостя)
- Дії авторизованого користувача
- Взаємодію між різними use cases

### 2. [Діаграма класів](02-class-diagram.puml)

**Файл:** `02-class-diagram.puml`

Описує структуру основних класів/сутностей:

- User, Watchlist, Company
- News, Forecast, Financial, Estimate
- Зв'язки між класами
- Методи та атрибути

### 3. [Діаграма послідовності - Додавання в Watchlist](03-sequence-add-watchlist.puml)

**Файл:** `03-sequence-add-watchlist.puml`

Показує послідовність дій при додаванні компанії в watchlist:

- Взаємодія користувача з UI
- Робота з Redux
- API запити
- Збереження в Firebase

### 4. [Діаграма послідовності - Автентифікація](04-sequence-authentication.puml)

**Файл:** `04-sequence-authentication.puml`

Демонструє процес входу користувача:

- Введення даних
- Перевірка через Firebase Auth
- Обробка успіху/помилки
- Перенаправлення

### 5. [Діаграма компонентів](05-component-diagram.puml)

**Файл:** `05-component-diagram.puml`

Архітектура frontend додатку:

- Структура pages та components
- Redux slices
- Services
- Зв'язки між компонентами

### 6. [Діаграма розгортання](06-deployment-diagram.puml)

**Файл:** `06-deployment-diagram.puml`

Інфраструктура та розгортання:

- Client Browser
- CDN/Hosting
- Firebase Cloud
- External APIs
- Developer environment

### 7. [Діаграма станів](07-state-diagram.puml)

**Файл:** `07-state-diagram.puml`

Життєвий цикл watchlist item:

- NotInWatchlist
- Adding
- InWatchlist
- Removing
- ViewingDetails
- Error states

### 8. [Діаграма активності](08-activity-diagram.puml)

**Файл:** `08-activity-diagram.puml`

Процес перегляду деталей компанії:

- Завантаження даних
- Навігація між вкладками
- Обробка помилок
- Логіка кешування

### 9. [ER Діаграма](09-er-diagram.puml)

**Файл:** `09-er-diagram.puml`

Структура бази даних Firebase Firestore:

- Колекція Users
- Колекція Watchlist
- Зв'язки та індекси
- Зовнішні джерела даних

### 10. [Data Flow Діаграма](10-data-flow-diagram.puml)

**Файл:** `10-data-flow-diagram.puml`

Потоки даних у системі:

- User → UI → Redux → Services
- API запити та відповіді
- Кешування
- Real-time sync

---

## 🛠️ Як використовувати

### VS Code (PlantUML Extension)

1. **Встановіть розширення:**

   - PlantUML (jebbs.plantuml)

2. **Перегляд діаграми:**

   - Відкрийте будь-який `.puml` файл
   - Натисніть `Alt+D` (або правий клік → "Preview Current Diagram")
   - Діаграма відкриється в новій вкладці

3. **Експорт:**
   - Правий клік на діаграму → "Export Current Diagram"
   - Оберіть формат: PNG, SVG, PDF

### Online PlantUML

Якщо розширення не працює:

1. Відкрийте: [plantuml.com/plantuml](http://www.plantuml.com/plantuml/uml/)
2. Скопіюйте вміст `.puml` файлу
3. Вставте в онлайн редактор
4. Отримайте готову діаграму

### Інші інструменти

- **Draw.io / diagrams.net** - імпорт PlantUML
- **Lucidchart** - підтримує PlantUML
- **Visual Paradigm** - професійний інструмент UML

---

## 📊 Швидкий експорт усіх діаграм

Якщо потрібно експортувати всі діаграми одразу:

### Windows (PowerShell):

\`\`\`powershell

# Встановіть PlantUML CLI (потрібна Java)

# Завантажте plantuml.jar з https://plantuml.com/download

java -jar plantuml.jar -tpng "docs/uml/\*.puml"
\`\`\`

### Linux/Mac:

\`\`\`bash

# Через brew (Mac)

brew install plantuml

# Експорт

plantuml -tpng docs/uml/\*.puml
\`\`\`

Це створить PNG файли для всіх діаграм.

---

## 📝 Примітки

- Всі діаграми написані українською мовою для зручності представлення
- Діаграми відповідають UML 2.5 стандарту
- Використовується PlantUML синтаксис
- Діаграми постійно оновлюються разом з кодом

---

## 🔗 Корисні посилання

- [PlantUML Documentation](https://plantuml.com/)
- [PlantUML Cheat Sheet](https://plantuml.com/guide)
- [UML 2.5 Specification](https://www.omg.org/spec/UML/2.5/)
- [VS Code PlantUML Extension](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

---

**Створено:** 12 грудня 2025
**Проект:** Stock Watchlist Application
**Призначення:** Магістерська програма "Інженерія програмного забезпечення"
