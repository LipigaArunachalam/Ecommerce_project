import React from 'react';
import { useLogout } from '../../../app/authentication/Logout';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, alpha, Tooltip } from '@mui/material';
import {
  Storefront,
  ShoppingCart,
  GridView,
  Person,
  Home,
  Logout,
  Brightness4,
  Brightness7,
  Search as SearchIcon,
} from '@mui/icons-material';
import { useNavigate, Outlet, NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../styled-components';

export const CustomerLayout = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role');
  const isCustomer = userRole === 'customer';

  const menuItems = [
    { text: 'Home', icon: <Home sx={{ fontSize: 18 }} />, path: '/customer/search' },
    ...(isCustomer
      ? [
          { text: 'Orders', icon: <Storefront sx={{ fontSize: 18 }} />, path: '/customer/orders' },
          { icon: <Person sx={{ fontSize: 18 }} />, path: '/customer/customer-profile' },
          { icon: <ShoppingCart sx={{ fontSize: 18 }} />, path: '/customer/cart' },
        ]
      : []),
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  const { handleLogout } = useLogout();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', backgroundColor: 'background.default' }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: (theme) =>
            theme.palette.mode === 'light'
              ? 'rgba(240, 247, 248, 0.85)'
              : 'rgba(10, 16, 18, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: (theme) =>
            theme.palette.mode === 'light'
              ? '1px solid rgba(79, 124, 130, 0.15)'
              : '1px solid rgba(184, 227, 233, 0.08)',
          boxShadow: (theme) =>
            theme.palette.mode === 'light'
              ? '0 1px 0 rgba(79, 124, 130, 0.08), 0 4px 24px rgba(79, 124, 130, 0.06)'
              : '0 1px 0 rgba(184, 227, 233, 0.06), 0 4px 24px rgba(0, 0, 0, 0.2)',
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: { xs: 2, sm: 4 }, minHeight: 64 }}>
          {/* Brand */}
          <Typography
            variant="h6"
            component="div"
            onClick={() => navigate('/customer/search')}
            sx={{
              cursor: 'pointer',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              fontFamily: '"Public Sans", sans-serif',
              color: 'primary.main',
              fontSize: { xs: '1.1rem', sm: '1.25rem' },
              userSelect: 'none',
              transition: 'opacity 0.2s ease',
              '&:hover': { opacity: 0.75 },
            }}
          >
            Ecommerce
          </Typography>

          {/* Nav links */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={NavLink}
                to={item.path}
                color="inherit"
                startIcon={item.icon}
                sx={(theme) => ({
                  px: 1.5,
                  py: 0.75,
                  borderRadius: '10px',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '-0.01em',
                  fontFamily: '"Public Sans", sans-serif',
                  color: theme.palette.text.secondary,
                  transition: 'all 0.25s ease',
                  '&.active': {
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.08),
                  },
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: alpha(theme.palette.primary.main, 0.06),
                    transform: 'translateY(-1px)',
                  },
                })}
              >
                {item.text}
              </Button>
            ))}

            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main' }}>
              <ThemeToggle />
              {isCustomer ? (
                <Tooltip title="Logout" placement="bottom">
                  <IconButton
                    onClick={handleLogout}
                    size="small"
                    sx={(theme) => ({
                      borderRadius: '10px',
                      border: `1px solid ${alpha(theme.palette.error.main, 0.25)}`,
                      color: 'error.main',
                      px: 1.5,
                      py: 0.75,
                      transition: 'all 0.25s ease',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.error.main, 0.08),
                        borderColor: 'error.main',
                        transform: 'translateY(-1px)',
                      },
                    })}
                  >
                    <Logout sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Button
                  variant="contained"
                  onClick={() => navigate('/login')}
                  disableElevation
                  sx={{
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    px: 2.5,
                    py: 0.75,
                    fontFamily: '"Public Sans", sans-serif',
                    boxShadow: 'none',
                    transition: 'all 0.25s ease',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(79, 124, 130, 0.3)',
                    },
                  }}
                >
                  Login
                </Button>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth={false} sx={{ mt: 0, px: 0 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
