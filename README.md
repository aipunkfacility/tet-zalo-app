# 🧧 TET AI 2026 - Zalo Mini App

![Zalo Mini App](https://img.shields.io/badge/Platform-Zalo%20Mini%20App-blue)
![React](https://img.shields.io/badge/Framework-React%2018-cyan)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple)
![License](https://img.shields.io/badge/License-MIT-green)

A festive Zalo Mini App for **Tet 2026 (Year of the Horse)**. This app uses AI (simulated) to generate stylized Lunar New Year portraits for users.

**Repository**: [https://github.com/aipunkfacility/tet-zalo-app](https://github.com/aipunkfacility/tet-zalo-app)

---

## ✨ Features

- **📸 Smart Camera & Upload**:
  - Take a photo directly within the app.
  - **[NEW]** Upload existing photos from the device gallery.
- **🎨 AI Generation**: Transforms user selfies into festive Tet-themed portraits.
- **🌍 Multi-language Support (i18n)**:
  - English (EN)
  - Vietnamese (VN) - *Native support*
- **💾 Save & Share**:
  - High-quality image download (Blob/Base64 optimized).
  - Native Zalo sharing integration.
- **🛡️ Secure**: Strict Content Security Policy (CSP) and optimized dependency tree.

---

## 🛠 Tech Stack

- **Core**: React 18, TypeScript, ZMP SDK
- **UI**: ZMP UI (ZaUI), Tailwind CSS, Framer Motion (Animations)
- **State**: React Context API
- **I18n**: i18next, react-i18next
- **Build**: Vite 5

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- Zalo Mini App CLI (`npm i -g zmp-cli`)

### Installation

```bash
# Clone repository
git clone https://github.com/aipunkfacility/tet-zalo-app.git
cd tet-zalo-app

# Install dependencies (use npm ci for security)
npm ci
```

### Local Development

```bash
# Start development server
npm run dev

# Or using ZMP CLI
zmp start
```

### Building for Production

```bash
# Build optimized assets
npm run build

# Deploy to Zalo Mini App Platform
npm run deploy
```

---

## 📂 Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable UI components
├── context/         # React Context (State Management)
├── css/             # Global styles (Tailwind, SASS)
├── i18n/            # Localization config & translations
├── modules/         # Feature modules (Camera, Generator, Result)
├── pages/           # App pages (Router)
└── app.ts           # Entry point
```

---

## 🔒 Security

- **CSP**: configured in `index.html` to allow only trusted domains (`zalo.me`, `zdn.vn`).
- **NPM Audit**: Dependencies are regularly audited for vulnerabilities.

---

## 👥 Authors

- **AI Punk Facility**

---

© 2026 Tet AI Project. Built with ❤️ for Vietnam.
