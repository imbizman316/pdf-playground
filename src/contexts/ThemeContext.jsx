import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentPath, setCurrentPath] = useState("");

  return (
    <ThemeContext.Provider value={{ currentPath, setCurrentPath }}>
      {children}
    </ThemeContext.Provider>
  );
}
