import React from 'react';

export const StoreContext = React.createContext(null);

const StoreContextProvider = ({ value, children }) => (
  <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
);

function useStoreContext() {
  const context = React.useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStoreContext must be used within a MarkContextProvider');
  }
  return context;
}

export { StoreContextProvider, useStoreContext };
