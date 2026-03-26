import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import { SnackBar, useSignupMutation } from '../../shared';
import { StyledCard, StyledTextField, AuthButton } from '../../shared/styled-components/StyledComponents';

export const SignUpForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const [signup] = useSignupMutation();

  const handleSignup = async (data) => {
    if (data.password !== data.confirmPassword) {
      setSnackMessage('Passwords do not match');
      setSnackSeverity('error');
      setSnackOpen(true);
      return;
    }
    try {
      await signup(data).unwrap();
      setSnackMessage('Signup successful');
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        navigate('/products');
      }, 1000);
    } catch (err) {
      console.error(err);
      const message = err?.data?.message || 'Signup failed';
      setSnackMessage(message);
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <StyledCard
        sx={{
          width: '100%',
          maxWidth: 480,
          maxHeight: '85vh',
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Typography variant="h3" align="center" color="#161C24" fontWeight={800} gutterBottom>
          Sign Up
        </Typography>

        <Typography variant="body2" align="center" color="#637381" sx={{ mb: 4 }}>
          Create your account to start shopping.
        </Typography>

        <form onSubmit={handleSubmit(handleSignup)}>
          <Stack spacing={2.5}>
            <StyledTextField
              label="Username"
              variant="outlined"
              fullWidth
              {...register('username', { required: 'Username is required' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />

            <StyledTextField
              label="Email address"
              type="email"
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

            <StyledTextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              {...register('confirmPassword', { required: 'Confirm Password is required' })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />

            <Stack direction="row" spacing={2}>
              <StyledTextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                {...register('zip_code', { required: 'Required' })}
                error={!!errors.zip_code}
              />
              <StyledTextField
                label="City"
                variant="outlined"
                fullWidth
                {...register('city', { required: 'Required' })}
                error={!!errors.city}
              />
            </Stack>

            <StyledTextField
              label="State"
              variant="outlined"
              fullWidth
              {...register('state', { required: 'State is required' })}
              error={!!errors.state}
              helperText={errors.state?.message}
            />

            <AuthButton type="submit" variant="contained" fullWidth size="large">
              Sign Up
            </AuthButton>

            <Typography variant="body2" align="center" color="#637381">
              Already have an account?{' '}
              <MuiLink 
                component={Link} 
                to="/login" 
                sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Login
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
