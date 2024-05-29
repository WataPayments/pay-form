import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import "./index.css";

export const ThemeContext = createContext(null);

export default function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const osTheme = window.matchMedia("(prefers-color-scheme: dark)")
      ? "dark"
      : "light";
    // setTheme("light");
    setTheme(osTheme);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (event) => {
      setTheme(event.matches ? "dark" : "light");
    };

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <div className={`wrapper ${theme}`}>
        <Outlet />
      </div>
    </ThemeContext.Provider>
  );
}
