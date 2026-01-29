import React from 'react';
import { Route } from 'react-router-dom';
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from 'zmp-ui';

// Контекст
import { AppProvider } from '../context/AppContext';
import { HistoryProvider } from '../context/HistoryContext';

// Модули
import CameraModule from '../modules/camera/index';
import GeneratorModule from '../modules/generator/index';
import ResultModule from '../modules/result/index';
import HomePage from '../pages/HomePage';
import HistoryPage from '../pages/HistoryPage';

const MyApp = () => {
  return (
    <AppProvider>
      <HistoryProvider>
        <App>
          <SnackbarProvider>
            <ZMPRouter>
              <AnimationRoutes>
                <Route path="/" element={<HomePage />} />
                <Route path="/camera" element={<CameraModule />} />
                <Route path="/generator" element={<GeneratorModule />} />
                <Route path="/result" element={<ResultModule />} />
                <Route path="/history" element={<HistoryPage />} />
              </AnimationRoutes>
            </ZMPRouter>
          </SnackbarProvider>
        </App>
      </HistoryProvider>
    </AppProvider>
  );
};

export default MyApp;