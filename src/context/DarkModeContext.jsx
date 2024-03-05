import React, { createContext, useContext, useEffect, useState } from 'react';

const darkModeContext = createContext();
export const DarkModeContext = ({ children }) => {
  const [dark, setdark] = useState(localStorage.theme === 'dark' ? true : false || false);
  const modeToggle = () => {
    setdark(!dark);
  };
  useEffect(() => {
    // console.log(dark);
    window.localStorage.setItem('theme', dark === true ? 'dark' : 'light');
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);
  return <darkModeContext.Provider value={{ dark, modeToggle }}>{children}</darkModeContext.Provider>;
};

export const useDarkModeContext = () => useContext(darkModeContext);
