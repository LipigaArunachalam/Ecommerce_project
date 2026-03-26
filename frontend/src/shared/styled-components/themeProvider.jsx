import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { palette } from './palette';
import { typography } from './typography';

export const ColorModeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem('theme') ?? 'dark');

  const toggleTheme = () => {
    setMode((prev) => {
      const theme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      return theme;
    });
  };

  const theme = useMemo(() => {
    return createTheme({
      palette: palette(mode),
      typography,
    });
  }, [mode]);

  return (
    <ColorModeContext.Provider value={{ toggleTheme, mode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
