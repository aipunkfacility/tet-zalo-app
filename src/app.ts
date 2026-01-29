import React from 'react';
import { createRoot } from 'react-dom/client';
import './i18n/config'; // Инициализация i18n
import "zmp-ui/zaui.css";
import "./css/tailwind.scss";
import "./css/app.scss";
import "./css/tet-theme.scss";

// Импортируем наш основной компонент, созданный на предыдущем шаге
import MyApp from "./components/app";
import appConfig from "../app-config.json";

// Suppress React Router v7 future flag warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('React Router Future Flag Warning')) {
    return;
  }
  originalWarn(...args);
};

if (!window.APP_CONFIG) {
  window.APP_CONFIG = appConfig as any;
}

const root = createRoot(document.getElementById("app")!);
root.render(React.createElement(MyApp));