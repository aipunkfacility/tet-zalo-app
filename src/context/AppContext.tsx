import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AppContextType {
  userImage: string | null;
  setUserImage: (img: string) => void;
  generatedImage: string | null;
  setGeneratedImage: (img: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ userImage, setUserImage, generatedImage, setGeneratedImage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
