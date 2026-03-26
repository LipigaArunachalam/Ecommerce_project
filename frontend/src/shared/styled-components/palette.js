export const palette = (mode) => ({
  mode,

  primary: {
    lighter: '#c1e4e9ff',
    light: '#B8E3E9',
    main: mode === 'light' ? '#4F7C82':  '#85c1c8ff',
    dark: '#40696eff',
    darker: '#29056B',
    contrastText: '#ffffff',
  },

  secondary: {
    main: '#40696eff',
    contrastText: '#ffffff',
  },

  success: {
    main: '#22C55E',
    contrastText: '#ffffff',
  },

  error: {
    main: '#FF5630',
    contrastText: '#ffffff',
  },

  warning: {
    main: '#FFAB00',
    contrastText: '#ffffff',
  },

  info: {
    main: '#00B8D9',
    contrastText: '#ffffff',
  },

  background: {
    default: mode === 'light' ? '#F0F7F8' : '#0B1011',
    paper: mode === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(20, 28, 30, 0.8)',
    neutral: mode === 'light' ? '#EBF2F3' : '#141C1E',
  },

  text: {
    primary: mode === 'light' ? '#1A1A2E' : '#FFFFFF',
    secondary: mode === 'light' ? '#4A4A68' : '#B8E3E9', // Using secondary blue for dark mode
    disabled: mode === 'light' ? '#9E9EBA' : '#637381',
  },
});
