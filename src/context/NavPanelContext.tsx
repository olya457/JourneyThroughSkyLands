import React, { createContext, useContext, useState } from 'react';

type NavPanelContextType = {
  shouldBeInitiallyOpen: boolean;
  markPanelAsOpened: () => void;
};

const NavPanelContext = createContext<NavPanelContextType | undefined>(undefined);

export const NavPanelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [shouldBeInitiallyOpen, setShouldBeInitiallyOpen] = useState(true);

  const markPanelAsOpened = () => {
    setShouldBeInitiallyOpen(false);
  };

  return (
    <NavPanelContext.Provider value={{ shouldBeInitiallyOpen, markPanelAsOpened }}>
      {children}
    </NavPanelContext.Provider>
  );
};

export const useNavPanel = () => {
  const context = useContext(NavPanelContext);
  if (!context) {
    throw new Error('useNavPanel must be used within a NavPanelProvider');
  }
  return context;
};
