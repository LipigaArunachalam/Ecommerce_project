import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { Typography, Stack, Box, Link as MuiLink } from '@mui/material';
import { SnackBar, useForgotPasswordMutation } from '../../shared';
import { StyledCard, StyledTextField, AuthButton } from '../../shared/styled-components/StyledComponents';

export const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgotPassword] = useForgotPasswordMutation();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const navigate = useNavigate();

  const handlePassword = async (data) => {
    try {
      await forgotPassword(data).unwrap();
      setSnackMessage('Email sent if it exists');
      setSnackSeverity('info');
      setSnackOpen(true);
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      console.error(err);
      setSnackMessage('Invalid email');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <StyledCard sx={{ width: '100%', maxWidth: 480 }}>
        <Typography variant="h3" align="center" color="#161C24" fontWeight={800} gutterBottom>
          Forgot Password
        </Typography>

        <Typography variant="body2" align="center" color="#637381" sx={{ mb: 4 }}>
          Please enter the email address associated with your account and we will email you a password reset link.
        </Typography>

        <form onSubmit={handleSubmit(handlePassword)}>
          <Stack spacing={3}>
            <StyledTextField
              label="Email address"
              variant="outlined"
              fullWidth
              {...register('email', { required: 'Email is required' })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <AuthButton variant="contained" type="submit" fullWidth size="large">
              Send Reset Link
            </AuthButton>

            <Box sx={{ textAlign: 'center' }}>
              <MuiLink 
                component={Link} 
                to="/login" 
                sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Return to login
              </MuiLink>
            </Box>
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
