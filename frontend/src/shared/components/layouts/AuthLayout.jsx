import React from 'react';
import { Box, Typography } from '@mui/material';
import bgImage from '../../../assets/background.jpg';

export const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundImage: (theme) => theme.palette.mode === 'light'
          ? `linear-gradient(135deg, rgba(240, 247, 248, 0.9), rgba(224, 236, 238, 0.8)), url(${bgImage})`
          : `linear-gradient(135deg, rgba(11, 16, 17, 0.94), rgba(18, 25, 27, 0.9)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        alignItems: 'center',
        justifyContent: 'center',
        px: { xs: 2, md: 4 },
        animation: 'fadeInUp 0.8s ease-out',
      }}
    >
      <Box 
        sx={{ 
          color: 'primary.main', 
          maxWidth: 480, 
          textAlign: { xs: 'center', md: 'left' },
          mr: { md: 8 },
          mb: { xs: 4, md: 0 }
        }}
      >
        <Typography variant="h2" fontWeight={800} sx={{ mb: 2, color: 'primary.main' }}>
          Ecom website
        </Typography>

        <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 500, lineHeight: 1.6 }}>
          Click. Shop. Enjoy.
        </Typography>
      </Box>

      <Box
        sx={{
          width: '100%',
          maxWidth: 480,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
