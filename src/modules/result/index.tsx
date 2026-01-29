import React from 'react';
import { Page, useNavigate, useSnackbar } from 'zmp-ui';
import { Download, Share2, Home, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
// Импорт ассетов
import bgImage from '../../assets/bg.webp';
import redButtonImg from '../../assets/red_button.webp';

const ResultModule = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  // Забираем сгенерированное фото
  const { generatedImage } = useAppContext();

  const { openSnackbar } = useSnackbar(); // To show notification

  const handleShare = () => {
    console.log("Sharing...");
    // Тут можно добавить api.openShareSheet из zmp-sdk
  };

  // Helper для синхронной конвертации Base64 -> Blob
  const base64ToBlob = (base64: string, mimeType = 'image/png') => {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeType });
  };

  const handleSave = () => {
    if (generatedImage) {
      try {
        // Синхронная конвертация, чтобы не терять user event context
        const blob = base64ToBlob(generatedImage);
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `tet_ai_2026_${Date.now()}.png`;

        document.body.appendChild(a);
        a.click();

        // Задержка очистки
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 1000);

        openSnackbar({
          text: t('result.saved'),
          type: 'success',
          duration: 3000,
        });
      } catch (err) {
        console.error("Save failed", err);
        openSnackbar({
          text: "Failed to save image",
          type: "error"
        });
      }
    }
  };

  return (
    <Page className="flex flex-col min-h-screen relative overflow-hidden bg-black">
      {/* Темный фон */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img src={bgImage} alt="bg" className="w-full h-full object-cover" />
      </div>

      <div className="z-10 flex flex-col h-full px-4 pt-6 pb-8 safe-area-top">
        {/* Хедер */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-6"
        >
          <button onClick={() => navigate('/')} className="p-2 bg-white/10 rounded-full text-white backdrop-blur-md hover:bg-white/20">
            <Home size={24} />
          </button>
          <h1 className="text-white font-bold text-xl tracking-wider text-shadow">{t('result.title')}</h1>
          <div className="w-10"></div>
        </motion.div>

        {/* Рамка с фото */}
        <div className="flex-grow flex flex-col items-center justify-center relative mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="relative w-full max-w-sm aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-500/50"
          >
            {generatedImage ? (
              <img src={generatedImage} alt="Result" className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">Нет изображения</div>
            )}

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-3 right-3 bg-black/60 px-3 py-1 rounded-full text-xs text-white backdrop-blur font-bold border border-white/10"
            >
              Tết 2026 AI
            </motion.div>
          </motion.div>
        </div>

        {/* Кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col gap-4 mb-4"
        >
          <button onClick={handleShare} className="relative w-full h-16 active:scale-95 transition-transform">
            <img src={redButtonImg} className="absolute inset-0 w-full h-full object-fill rounded-2xl shadow-lg" alt="btn" />
            <div className="absolute inset-0 flex items-center justify-center gap-3 text-white font-black text-xl tracking-wide">
              <Share2 size={24} />
              <span>{t('result.share')}</span>
            </div>
          </button>

          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl h-14 flex items-center justify-center gap-2 text-white font-bold active:scale-95 transition-transform hover:bg-white/20"
            >
              <Download size={20} />
              <span>{t('result.save')}</span>
            </button>
            <button
              onClick={() => navigate('/camera')}
              className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl h-14 flex items-center justify-center gap-2 text-white font-bold active:scale-95 transition-transform hover:bg-white/20"
            >
              <RotateCcw size={20} />
              <span>{t('result.retry')}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </Page>
  );
};

export default ResultModule;