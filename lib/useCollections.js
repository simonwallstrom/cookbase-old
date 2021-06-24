import { useEffect, useState, createContext, useContext } from 'react';

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const [appLoading, setAppLoading] = useState(true);

  const value = {
    appLoading,
  };
  return <AppContext.Provider value={value} {...props} />;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error(`useApp must be used within a AppContextProvider.`);
  }
  return context;
};
