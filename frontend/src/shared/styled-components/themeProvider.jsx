import React, { createContext, useMemo, useState } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
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
        <GlobalStyles
          styles={{
            '*::-webkit-scrollbar': {
              width: '8px',
              height: '8px',
            },
            '*::-webkit-scrollbar-track': {
              background: theme.palette.background.default,
            },
            '*::-webkit-scrollbar-thumb': {
              background: alpha(theme.palette.primary.main, 0.4),
              borderRadius: '10px',
            },
            '*::-webkit-scrollbar-thumb:hover': {
              background: alpha(theme.palette.primary.main, 0.6),
            },
          }}
        />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
