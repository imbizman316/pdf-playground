import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [currentPath, setCurrentPath] = useState("");
  const [imageOn, setImageOn] = useState(false);

  return (
    <ThemeContext.Provider
      value={{ currentPath, setCurrentPath, imageOn, setImageOn }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
