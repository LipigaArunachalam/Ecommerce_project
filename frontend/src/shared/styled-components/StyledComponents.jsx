import { styled, alpha } from '@mui/material/styles';
import { Card, TextField, Button, Box, IconButton } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3),
  background:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.75)'
      : 'rgba(18, 26, 30, 0.75)',
  backdropFilter: 'blur(20px) saturate(200%)',
  border: `1px solid ${
    theme.palette.mode === 'light'
      ? 'rgba(79, 124, 130, 0.12)'
      : 'rgba(184, 227, 233, 0.08)'
  }`,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 4px 24px rgba(79, 124, 130, 0.1), 0 1px 0 rgba(255,255,255,0.9) inset'
      : '0 4px 24px rgba(0, 0, 0, 0.3)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 12px 40px rgba(79, 124, 130, 0.18)'
        : '0 12px 40px rgba(0, 0, 0, 0.4)',
    transform: 'translateY(-3px)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: '12px',
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(79, 124, 130, 0.04)'
        : 'rgba(184, 227, 233, 0.04)',
    fontFamily: '"Public Sans", sans-serif',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? 'rgba(79, 124, 130, 0.07)'
          : 'rgba(184, 227, 233, 0.07)',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: '"Public Sans", sans-serif',
    fontSize: '0.875rem',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.primary.main, 0.2),
    transition: 'border-color 0.3s ease',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.primary.main, 0.45),
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '1.5px',
  },
}));

export const AuthButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: '12px',
  textTransform: 'none',
  boxShadow: 'none',
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: 700,
  fontSize: '0.9rem',
  letterSpacing: '-0.01em',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 8px 20px rgba(79, 124, 130, 0.35)',
    transform: 'translateY(-1px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export const ProductStyledCard = styled(Card)(({ theme }) => ({
  height: 340,
  width: 240,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  borderRadius: '20px',
  background:
    theme.palette.mode === 'light'
      ? 'rgba(255, 255, 255, 0.85)'
      : 'rgba(18, 26, 30, 0.85)',
  backdropFilter: 'blur(12px)',
  border: `1px solid ${
    theme.palette.mode === 'light'
      ? 'rgba(79, 124, 130, 0.1)'
      : 'rgba(184, 227, 233, 0.07)'
  }`,
  boxShadow:
    theme.palette.mode === 'light'
      ? '0 2px 12px rgba(79, 124, 130, 0.08)'
      : '0 2px 12px rgba(0, 0, 0, 0.25)',
  transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'scale(1.03) translateY(-6px)',
    boxShadow:
      theme.palette.mode === 'light'
        ? '0 16px 40px rgba(79, 124, 130, 0.22)'
        : '0 16px 40px rgba(0, 0, 0, 0.4)',
    borderColor: theme.palette.primary.main,
  },
}));

export const StatusLabel = styled(Box)(({ theme, color = 'info' }) => {
  const isLight = theme.palette.mode === 'light';
  const paletteColor = theme.palette[color] || theme.palette.info;

  return {
    height: 24,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1.25),
    color: isLight ? paletteColor.dark : paletteColor.lighter,
    backgroundColor: alpha(paletteColor.main, 0.14),
    fontSize: '11px',
    fontWeight: 700,
    textTransform: 'capitalize',
    letterSpacing: '0.04em',
    fontFamily: '"Public Sans", sans-serif',
    border: `1px solid ${alpha(paletteColor.main, 0.22)}`,
  };
});


