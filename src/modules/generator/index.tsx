import React, { useEffect, useState } from 'react';
import { Page, useNavigate } from 'zmp-ui';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { useHistory } from '../../context/HistoryContext';
import { polzaApi } from '../../services/polzaApi';
// Импорт фона для красоты
import bgImage from '../../assets/bg.webp';

const GeneratorModule = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Получаем фото пользователя и функцию сохранения результата
  const { userImage, setGeneratedImage } = useAppContext();
  const { addToHistory } = useHistory();
  const [progress, setProgress] = useState(0);
  const [isFinishing, setIsFinishing] = useState(false);
  const [statusText, setStatusText] = useState(t('generator.title'));

  // Helper для сжатия изображения (PNG -> JPG)
  const compressImage = (base64: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.8));
        } else {
          resolve(base64);
        }
      };
      img.onerror = () => resolve(base64);
      img.src = base64;
    });
  };

  // Помощник для скачивания результата и конвертации в Base64
  const imageUrlToBase64 = async (url: string): Promise<string> => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    if (!userImage) {
      navigate('/');
      return;
    }

    const startGeneration = async () => {
      if (isFinishing) return;
      setIsFinishing(true);

      try {
        // 1. Имитируем начало
        setProgress(10);

        // 2. Сжимаем локально
        const compressed = await compressImage(userImage);
        setProgress(20);
        setStatusText(t('generator.preparing'));

        // 3. Отправляем в Polza AI
        const requestId = await polzaApi.generateImage(
          compressed,
          "Magnificent Tet 2026 portrait, traditional Vietnamese attire, festive red and golden lanterns, cherry blossoms background, cinematic lighting, ultra-realistic"
        );
        setProgress(40);
        setStatusText(t('generator.dreaming'));

        // 4. Ждем результат (опрос)
        let pollProgress = 40;
        const resultUrl = await polzaApi.pollResult(requestId, (status) => {
          pollProgress = Math.min(pollProgress + 5, 85);
          setProgress(pollProgress);
          setStatusText(`${t('generator.dreaming')} (${status})`);
        });

        setProgress(90);
        setStatusText(t('generator.developing'));

        // 5. Конвертируем обратно в base64 для истории и сохранения
        const finalImage = await imageUrlToBase64(resultUrl);

        setProgress(100);
        setGeneratedImage(finalImage);
        await addToHistory(finalImage, 'Tet 2026 AI Generation');

        setTimeout(() => navigate('/result'), 500);
      } catch (error: any) {
        console.error("Polza AI Error:", error);
        setStatusText("Error: " + (error.message || "Failed to generate"));
        // Возвращаем в камеру через 3 секунды при ошибке
        setTimeout(() => navigate('/camera'), 3000);
      }
    };

    startGeneration();
  }, [userImage, navigate, setGeneratedImage, addToHistory]);

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
          className="text-2xl font-bold text-white mb-2 text-center text-shadow h-20 flex items-center"
        >
          {statusText}
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