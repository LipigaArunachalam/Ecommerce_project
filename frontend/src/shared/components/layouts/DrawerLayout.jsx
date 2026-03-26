import React from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Box,
  Typography,
  alpha,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from '../../styled-components';

export const DrawerLayout = ({ title, menuItems, handleLogout, isDesktop, handleDrawerToggle }) => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* TOP HEADER */}
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2.5,
          minHeight: 64,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {/* Logo mark */}
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: '9px',
              backgroundColor: 'primary.main',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 12px rgba(79, 124, 130, 0.3)',
            }}
          >
            <Typography
              sx={{
                color: '#fff',
                fontWeight: 900,
                fontSize: '0.9rem',
                lineHeight: 1,
                fontFamily: '"Public Sans", sans-serif',
              }}
            >
              {title?.charAt(0).toUpperCase() || 'E'}
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            color="primary"
            fontWeight={700}
            noWrap
            sx={{
              fontFamily: '"Public Sans", sans-serif',
              letterSpacing: '-0.02em',
              fontSize: '0.95rem',
            }}
          >
            {title}
          </Typography>
        </Box>

        <ThemeToggle />
      </Toolbar>

      <Divider sx={{ opacity: 0.5 }} />

      {/* SIDEBAR CONTENT */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { width: 4 },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: 'rgba(79,124,130,0.2)', borderRadius: 2 },
        }}
      >
        {/* MENU ITEMS */}
        <List sx={{ px: 1.5, pt: 2 }}>
          {menuItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end
                className={({ isActive }) => (isActive ? 'active' : '')}
                onClick={!isDesktop ? handleDrawerToggle : undefined}
                sx={(theme) => ({
                  borderRadius: '12px',
                  px: 2,
                  py: 1.25,
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&.active': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    color: theme.palette.primary.main,
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                    '& .MuiTypography-root': {
                      fontWeight: 700,
                      color: theme.palette.primary.main,
                    },
                  },
                  '&:not(.active):hover': {
                    backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    transform: 'translateX(3px)',
                    '& .MuiListItemIcon-root': {
                      color: theme.palette.primary.main,
                    },
                  },
                })}
              >
                <ListItemIcon
                  sx={{
                    color: 'text.secondary',
                    minWidth: 38,
                    transition: 'color 0.25s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontFamily: '"Public Sans", sans-serif',
                    fontWeight: 500,
                    fontSize: '0.875rem',
                    letterSpacing: '-0.01em',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        {/* LOGOUT AT BOTTOM */}
        <Box sx={{ px: 1.5, pb: 2 }}>
          <Divider sx={{ mb: 1.5, opacity: 0.5 }} />
          <ListItemButton
            onClick={handleLogout}
            sx={(theme) => ({
              borderRadius: '12px',
              px: 2,
              py: 1.25,
              transition: 'all 0.25s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.error.main, 0.08),
                transform: 'translateX(3px)',
                '& .MuiListItemIcon-root': { color: 'error.main' },
                '& .MuiTypography-root': { color: 'error.main' },
              },
            })}
          >
            <ListItemIcon sx={{ color: 'error.main', minWidth: 38 }}>
              <Logout sx={{ fontSize: 20 }} />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              primaryTypographyProps={{
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 500,
                fontSize: '0.875rem',
                color: 'error.main',
              }}
            />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
};
