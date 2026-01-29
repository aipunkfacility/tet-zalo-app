import React from 'react';
import { Route } from 'react-router-dom';
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from 'zmp-ui';

// Контекст
import { AppProvider } from '../context/AppContext';

// Модули
import CameraModule from '../modules/camera/index';
import GeneratorModule from '../modules/generator/index';
import ResultModule from '../modules/result/index';
import HomePage from '../pages/HomePage';

const MyApp = () => {
  return (
    <AppProvider>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<HomePage />} />
              <Route path="/camera" element={<CameraModule />} />
              <Route path="/generator" element={<GeneratorModule />} />
              <Route path="/result" element={<ResultModule />} />
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </AppProvider>
  );
};

export default MyApp;