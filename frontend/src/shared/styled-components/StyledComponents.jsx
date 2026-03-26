import { styled, alpha } from '@mui/material/styles';
import { Card, TextField, Button, Box } from '@mui/material';

export const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(3), // More rounded for "water" feel
  background: theme.palette.mode === 'light' 
    ? `radial-gradient(circle at top left, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)), rgba(255, 255, 255, 0.7)` 
    : `radial-gradient(circle at top left, rgba(25, 35, 38, 0.8), rgba(15, 22, 24, 0.6)), rgba(20, 28, 30, 0.7)`,
  backdropFilter: 'blur(16px) saturate(180%)',
  border: '1px solid rgba(255, 255, 255, 0.125)',
  boxShadow: '0 8px 32px 0 rgba(79, 124, 130, 0.15)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    boxShadow: '0 12px 48px 0 rgba(79, 124, 130, 0.25)',
    transform: 'translateY(-4px)',
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    borderRadius: theme.spacing(1.5),
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: alpha(theme.palette.primary.main, 0.2),
    borderWidth: '1px',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: '1.5px',
  },
}));

export const AuthButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  boxShadow: 'none',
  backgroundColor: 'primary.main',
  color: theme.palette.primary.contrastText,
  '&:hover': {
    backgroundColor: 'primary.dark',
    boxShadow: '0 8px 16px 0 rgba(33, 43, 54, 0.24)',
  },
}));

export const ProductStyledCard = styled(Card)(({ theme }) => ({
  height: 350, // Slightly taller for symmetry
  width: 250,  // Slightly wider for symmetry
  display: 'flex',
  flexDirection: 'column',
  overflowY: 'auto', // Enable internal scrolling
  scrollbarWidth: 'none', // Hide scrollbar for clean look
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  borderRadius: theme.spacing(2.5),
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(8px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  boxShadow: '0 4px 12px 0 rgba(79, 124, 130, 0.08)',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': {
    transform: 'scale(1.04) translateY(-8px)',
    boxShadow: '0 20px 40px -12px rgba(79, 124, 130, 0.24)',
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
    borderRadius: 6,
    cursor: 'default',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    display: 'inline-flex',
    justifyContent: 'center',
    padding: theme.spacing(0, 1),
    color: isLight ? paletteColor.dark : paletteColor.lighter,
    backgroundColor: alpha(paletteColor.main, 0.16),
    fontSize: '12px',
    fontWeight: 700,
    textTransform: 'capitalize',
    letterSpacing: '0.02em',
  };
});


