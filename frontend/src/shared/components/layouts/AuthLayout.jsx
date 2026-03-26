import React from 'react';
import { Box, Typography } from '@mui/material';

export const AuthLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        backgroundColor: 'background.default',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* LEFT BRAND PANEL */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          width: '46%',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'linear-gradient(145deg, #e0ecee 0%, #c8dfe3 50%, #b5d4da 100%)'
              : 'linear-gradient(145deg, #0d1a1c 0%, #112024 50%, #162b30 100%)',
          px: { md: 6, lg: 8 },
          py: 8,
        }}
      >
        {/* Decorative orbs */}
        <Box
          sx={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'radial-gradient(circle, rgba(79,124,130,0.25) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(184,227,233,0.12) 0%, transparent 70%)',
            animation: 'slowFloat 12s ease-in-out infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '-5%',
            right: '-8%',
            width: 280,
            height: 280,
            borderRadius: '50%',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'radial-gradient(circle, rgba(79,124,130,0.2) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(184,227,233,0.08) 0%, transparent 70%)',
            animation: 'slowFloat 16s ease-in-out infinite reverse',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            right: '10%',
            width: 140,
            height: 140,
            borderRadius: '50%',
            background: (theme) =>
              theme.palette.mode === 'light'
                ? 'radial-gradient(circle, rgba(79,124,130,0.15) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(184,227,233,0.07) 0%, transparent 70%)',
            animation: 'slowFloat 8s ease-in-out infinite',
          }}
        />

        {/* Brand content */}
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          {/* Logo mark */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '14px',
              backgroundColor: 'primary.main',
              mb: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(79, 124, 130, 0.35)',
            }}
          >
            <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', lineHeight: 1, fontFamily: '"Public Sans", sans-serif' }}>
              E
            </Typography>
          </Box>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontFamily: '"Public Sans", sans-serif',
              letterSpacing: '-0.04em',
              lineHeight: 1.05,
              color: 'primary.main',
              mb: 3,
              fontSize: { md: '3rem', lg: '3.5rem' },
            }}
          >
            Ecom<br />website
          </Typography>

          <Typography
            variant="body1"
            sx={{
              fontFamily: '"Public Sans", sans-serif',
              color: 'text.secondary',
              fontWeight: 400,
              lineHeight: 1.8,
              maxWidth: 320,
              fontSize: '1rem',
            }}
          >
            Click. Shop. Enjoy. Your curated marketplace for everything you need.
          </Typography>

          {/* Decorative line accents */}
          <Box sx={{ mt: 6, display: 'flex', gap: 1 }}>
            {[1, 0.5, 0.25].map((opacity, i) => (
              <Box
                key={i}
                sx={{
                  height: 3,
                  width: i === 0 ? 48 : i === 1 ? 24 : 12,
                  borderRadius: 8,
                  backgroundColor: 'primary.main',
                  opacity,
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      {/* RIGHT FORM PANEL */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 3, sm: 6, md: 8, lg: 10 },
          py: { xs: 6, md: 0 },
          backgroundColor: 'background.default',
          animation: 'fadeInUp 0.6s ease-out',
        }}
      >
        {/* Mobile brand label */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, mb: 4, textAlign: 'center' }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, letterSpacing: '-0.03em', color: 'primary.main', fontFamily: '"Public Sans", sans-serif' }}
          >
            Ecommerce
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontFamily: '"Public Sans", sans-serif' }}>
            Click. Shop. Enjoy.
          </Typography>
        </Box>

        <Box sx={{ width: '100%', maxWidth: 440 }}>
          {children}
        </Box>
      </Box>

      <style>{`
        @keyframes slowFloat {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </Box>
  );
};
