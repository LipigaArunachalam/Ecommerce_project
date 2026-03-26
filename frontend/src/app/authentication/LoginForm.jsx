import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Stack,
  Typography,
  Link as MuiLink,
  Box,
} from '@mui/material';
import { SnackBar, useLoginMutation } from '../../shared';
import { StyledCard, StyledTextField, AuthButton } from '../../shared/styled-components/StyledComponents';

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role === 'seller') {
      navigate('/seller/seller-profile');
    }

    if (role === 'customer') {
      navigate('/customer/search');
    }

    if (role === 'admin') {
      navigate('/admin');
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      localStorage.setItem('email', res.user.email);
      localStorage.setItem('role', res.user.role);
      localStorage.setItem('user_id', res.user.user_id);
      const role = res.user.role;

      setSnackMessage('Login successful');
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        if (role === 'seller') navigate('/seller/seller-profile');
        if (role === 'customer') navigate('/customer/search');
        if (role === 'admin') navigate('/admin');
      }, 1000);
    } catch (err) {
      console.error(err);
      setSnackMessage('Login failed');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <StyledCard sx={{ width: '100%', maxWidth: 480 }}>
        <Typography variant="h3" align="center" color="primary.main" fontWeight={800} gutterBottom>
          Login
        </Typography>

        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Enter your details below to continue.
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <StyledTextField
              label="Email address"
              variant="outlined"
              fullWidth
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <StyledTextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register('password', { required: 'Password is required' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Box sx={{ textAlign: 'right' }}>
              <MuiLink 
                component={Link} 
                to="/forgot-password" 
                variant="body2" 
                sx={{ color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Forgot password?
              </MuiLink>
            </Box>

            <AuthButton
              variant="contained"
              type="submit"
              size="large"
              fullWidth
            >
              Login
            </AuthButton>

            <Typography variant="body2" align="center" color="#637381">
              Don't have an account?{' '}
              <MuiLink 
                component={Link} 
                to="/signup" 
                sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Get started
              </MuiLink>
            </Typography>
          </Stack>
        </form>
      </StyledCard>
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
};
