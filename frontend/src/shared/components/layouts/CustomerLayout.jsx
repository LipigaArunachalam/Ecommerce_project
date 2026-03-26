import React from 'react';
import { useLogout } from '../../../app/authentication/Logout';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, alpha } from '@mui/material';
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
import { useNavigate, Outlet } from 'react-router-dom';
// import { ColorModeContext } from "../../../theme/themeProvider";
import { ThemeToggle } from '../../styled-components';

export const CustomerLayout = () => {
  const navigate = useNavigate();

  const userRole = localStorage.getItem('role');
  const isCustomer = userRole === 'customer';

  const menuItems = [
    { text: 'Home', icon: <Home />, path: '/customer/search' },
    ...(isCustomer
      ? [
          { text: 'Orders', icon: <Storefront />, path: '/customer/orders' },
          { icon: <Person />, path: '/customer/customer-profile' },
          { icon: <ShoppingCart />, path: '/customer/cart' },
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
        sx={{ 
          background: (theme) => alpha(theme.palette.primary.main, 0.85),
          backdropFilter: 'blur(12px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Ecommerce
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {menuItems.map((item, index) => (
              <Button
                color="inherit"
                key={item.path || index}
                onClick={() => handleNavigate(item.path)}
                sx={{ 
                  mx: 0.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                {item.icon}
                <Typography sx={{ ml: 1, fontWeight: 'inherit', fontSize: '0.9rem' }}>{item.text}</Typography>
              </Button>
            ))}
            {/* <IconButton onClick={toggleTheme} color="inherit" sx={{ ml: 1 }}>
                            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
                        </IconButton> */}
            <ThemeToggle />
            {isCustomer ? (
              <Button
                variant="contained"
                color="error"
                startIcon={<Logout />}
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                color="success"
                onClick={() => navigate('/login')}
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Container maxWidth={false} sx={{ mt: 4, px: 0 }}>
        <Outlet />
      </Container>
    </Box>
  );
};
