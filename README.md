# Users Dashboard

Дашборд для просмотра списка пользователей с серверной пагинацией и поиском.

## 🚀 Стек и Архитектура

- **Фреймворк:** Next.js (App Router) + React 18
- **Стилизация:** Tailwind CSS
- **Данные:** Нативный `fetch` в Server Components (без Redux/React Query). Состояние (поиск, страница) хранится в URL (Single Source of Truth).
- **Оптимизация:** Debounce для поиска (`use-debounce`), `Suspense` для стриминга UI, нативные серверные компоненты (Zero-JS data fetching).

## 🛠 Запуск локально

1. `npm install`
2. `npm run dev`
3. Открыть `http://localhost:3000`
