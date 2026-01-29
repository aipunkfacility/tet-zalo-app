import React, { useRef, useState, useEffect } from 'react';
import { Page, useNavigate, useSnackbar } from 'zmp-ui';
import { ChevronLeft, Camera, Image } from 'lucide-react';
// Импортируем наш новый контекст
import { useAppContext } from '../../context/AppContext';

const CameraModule = () => {
  const navigate = useNavigate();
  const { openSnackbar } = useSnackbar();
  // Используем функцию из контекста вместо Recoil
  const { setUserImage } = useAppContext();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setUserImage(e.target.result as string);
          navigate('/generator');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera error:", err);
      openSnackbar({ text: "Не удалось открыть камеру. Разрешите доступ.", type: "error" });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Зеркальное отражение (селфи-режим)
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');

        // СОХРАНЯЕМ ФОТО В КОНТЕКСТ
        setUserImage(dataUrl);

        stopCamera();
        navigate('/generator'); // Переходим к генерации
      }
    }
  };

  return (
    <Page className="bg-black h-screen flex flex-col relative overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Кнопка Назад */}
      <div className="absolute top-0 left-0 w-full p-4 z-10 pt-8 safe-area-top">
        <button onClick={() => navigate(-1)} className="text-white p-2 bg-black/30 rounded-full backdrop-blur-sm">
          <ChevronLeft size={32} />
        </button>
      </div>

      {/* Кнопка Съемки и Загрузки */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-center items-center pb-12 bg-gradient-to-t from-black/70 to-transparent">
        {/* Пустой блок слева для центровки */}
        <div className="w-12 h-12 flex-1"></div>

        {/* Кнопка Фото */}
        <button
          onClick={capturePhoto}
          className="w-20 h-20 rounded-full border-4 border-white bg-red-600 hover:bg-red-500 active:scale-95 transition-all flex items-center justify-center shadow-lg mx-8"
        >
          <Camera className="text-white w-8 h-8" />
        </button>

        {/* Кнопка Загрузки (Справа) */}
        <div className="flex-1 flex justify-start pl-4">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-14 h-14 rounded-xl border-2 border-white/50 bg-black/40 backdrop-blur-md active:scale-95 transition-all flex items-center justify-center"
          >
            <Image className="text-white w-7 h-7" />
          </button>
        </div>
      </div>
    </Page>
  );
};

export default CameraModule;