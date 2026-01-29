module.exports = {
  // Исправлено: используем 'content' вместо 'purge' для v3+
  content: [
    "./src/**/*.{js,jsx,ts,tsx,vue}", 
    "./index.html"
  ],
  theme: {
    extend: {
      // Здесь можно добавить кастомные цвета, если понадобятся
      colors: {
        primary: '#E53935', // Красный цвет (Тет)
        secondary: '#FFB300', // Золотой/Желтый
      }
    },
  },
  plugins: [],
};
