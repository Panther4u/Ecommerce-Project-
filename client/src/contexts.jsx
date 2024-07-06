import React, { createContext, useContext, useState } from "react";

const SharedContext = createContext();

export const SharedProvider = ({ children }) => {
  const [sharedState, setSharedState] = useState({
    // Define shared state here
    activeMenu: false,
    themeSettings: false,
    currentColor: "#ffffff",
    currentMode: "Light",
  });

  return (
    <SharedContext.Provider value={{ sharedState, setSharedState }}>
      {children}
    </SharedContext.Provider>
  );
};

export const useSharedContext = () => useContext(SharedContext);
