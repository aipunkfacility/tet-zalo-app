import React, { useEffect, useState } from 'react';
import { Page, useNavigate } from 'zmp-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
// Импорт фона для красоты
import bgImage from '../../assets/bg.webp';

const GeneratorModule = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Получаем фото пользователя и функцию сохранения результата
  const { userImage, setGeneratedImage } = useAppContext();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Защита: если фото нет, возвращаем на главную
    if (!userImage) {
      navigate('/');
      return;
    }

    // Имитация бурной деятельности ИИ
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1.5; // Скорость загрузки
      });
    }, 50);

    return () => clearInterval(interval);
  }, [userImage, navigate]);

  // Эффект перехода только когда прогресс 100%
  useEffect(() => {
    if (progress >= 100 && userImage) {
      setGeneratedImage(userImage);
      const timer = setTimeout(() => navigate('/result'), 500);
      return () => clearTimeout(timer);
    }
  }, [progress, userImage, setGeneratedImage, navigate]);

  return (
    <Page className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-black">
      {/* Фон с размытием */}
      <div className="absolute inset-0 z-0">
        <img src={bgImage} alt="bg" className="w-full h-full object-cover blur-sm opacity-50" />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="z-10 flex flex-col items-center w-full px-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "backOut" }}
          className="relative w-48 h-48 mb-8"
        >
          {/* Крутящиеся кольца */}
          <div className="absolute inset-0 border-4 border-red-500/30 rounded-full"></div>
          <div
            className="absolute inset-0 border-4 border-t-red-500 border-r-yellow-400 rounded-full animate-spin"
            style={{ borderBottomColor: 'transparent', borderLeftColor: 'transparent' }}
          ></div>

          {/* Аватарка по центру */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="absolute inset-3 rounded-full overflow-hidden border-2 border-white/20"
          >
            {userImage && <img src={userImage} className="w-full h-full object-cover" alt="preview" />}
          </motion.div>
        </motion.div>

        <motion.h2
          key="magic-text"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-2 text-center text-shadow"
        >
          {t('generator.title')}
        </motion.h2>

        <motion.p
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-yellow-400 font-mono font-bold text-xl mb-6"
        >
          {t('generator.progress', { progress: Math.round(progress) })}
        </motion.p>

        {/* Полоска прогресса */}
        <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-600 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.2 }}
          ></motion.div>
        </div>
      </div>
    </Page>
  );
};

export default GeneratorModule;