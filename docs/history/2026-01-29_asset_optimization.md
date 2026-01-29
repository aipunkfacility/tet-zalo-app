# История: 2026-01-29 - Оптимизация ассетов (PNG -> WebP)

## Выполненные действия

### 1. Подготовка и Инструментарий

- Установлена библиотека **sharp** (`npm install -D sharp`).
- Создан скрипт автоматизации `scripts/optimize_assets.js`.

### 2. Конвертация ассетов

Сконвертированы следующие файлы:

- `bg.png` (6.54MB) -> `bg.webp` (0.35MB) **[-94.71%]**
- `red_button.png` (0.64MB) -> `red_button.webp` (0.11MB) **[-82.40%]**
- `small_button.png` (0.27MB) -> `small_button.webp` (0.04MB) **[-83.68%]**

### 3. Интеграция в код

Обновлены импорты в файлах:

- `src/pages/HomePage.tsx`
- `src/modules/result/index.tsx`
- `src/modules/generator/index.tsx`
- `src/components/common/SmallButton.tsx`
- `src/components/common/RedButton.tsx`

### 4. Очистка

- Удалены оригинальные тяжёлые PNG файлы для уменьшения размера репозитория и итоговой сборки.

## Результат

Общий размер ассетов сокращен на ~7 МБ. Это критически важное улучшение для Zalo Mini App, которое теперь будет загружаться практически мгновенно на мобильных устройствах.
