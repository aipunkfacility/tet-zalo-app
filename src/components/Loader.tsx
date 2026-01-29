import React, { useState, useEffect } from 'react';
import { Box, Text } from 'zmp-ui';

const MESSAGES = [
  "✨ Выбираем лучший шёлк...",
  "🏮 Зажигаем фонарики...",
  "🌸 Ищем цветущую ветку Mai...",
  "📸 Настраиваем объектив 85mm...",
  "🧧 Почти готово..."
];

export const TetLoader = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="w-16 h-16 border-4 border-red-200 border-t-red-600 rounded-full animate-spin mb-6"></div>
      <Text className="text-red-800 font-medium text-lg animate-pulse">
        {MESSAGES[msgIndex]}
      </Text>
    </div>
  );
};
