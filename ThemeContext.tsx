import React, { createContext, useContext, useState } from 'react';

type Theme = {
  dark: boolean;
  toggle: () => void;
  colors: {
    background: string;
    card: string;
    title: string;
    text: string;
    secondary: string;
    accent: string;
    border: string;
    headerBg: string;
    inputBg: string;
  };
};

const lightColors = {
  background: '#FFFAF0',
  card: '#ffffff',
  title: '#2F4F4F',
  text: '#2F4F4F',
  secondary: '#5A7A94',
  accent: '#66CDAA',
  border: '#E0EAF4',
  headerBg: '#2F4F4F',
  inputBg: '#ffffff',
};

const darkColors = {
  background: '#1A1A2E',
  card: '#2A2A3E',
  title: '#FFFAF0',
  text: '#FFFAF0',
  secondary: '#9BA8B5',
  accent: '#66CDAA',
  border: '#3A3A5E',
  headerBg: '#16213E',
  inputBg: '#2A2A3E',
};

const ThemeContext = createContext<Theme>({
  dark: false,
  toggle: () => {},
  colors: lightColors,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false);

  const toggle = () => setDark((prev) => !prev);
  const colors = dark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ dark, toggle, colors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
