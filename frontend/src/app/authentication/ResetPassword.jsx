import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  CardContent,
  Box,
  Card,
  Typography,
  Stack,
  Button,
  Link as MuiLink,
  TextField,
} from '@mui/material';
import { SnackBar, useResetPasswordMutation } from '../../shared';
import { StyledCard, StyledTextField, AuthButton } from '../../shared/styled-components/StyledComponents';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isLoading: resetPasswordLoading }] = useResetPasswordMutation();

  const handleReset = async (data) => {
    try {
      await resetPassword({ email, newPassword: data.newPassword, token }).unwrap();

      setSnackMessage('Password reset successfully');
      setSnackSeverity('success');
      setSnackOpen(true);

      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to reset password. Please try again.');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7, px: 2 }}>
      <StyledCard sx={{ width: '100%', maxWidth: 480 }}>
        <Typography variant="h3" align="center" color="primary.main" fontWeight={800} gutterBottom>
          Reset Password
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 4 }}>
          Enter your new password below to reset your account.
        </Typography>
        <form onSubmit={handleSubmit(handleReset)}>
          <Stack spacing={3}>
            <StyledTextField
              type="password"
              label="New Password"
              variant="outlined"
              fullWidth
              {...register('newPassword', { 
                required: 'Password is required',
                minLength: { value: 5, message: 'Minimum 5 characters' }
              })}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
            />

            <AuthButton
              variant="contained"
              type="submit"
              size="large"
              fullWidth
              disabled={resetPasswordLoading}
            >
              {resetPasswordLoading ? 'Resetting...' : 'Reset Password'}
            </AuthButton>
            
            <Box sx={{ textAlign: 'center', mt: 2 }}>
              <MuiLink 
                onClick={() => navigate('/login')}
                sx={{ 
                  cursor: 'pointer',
                  color: 'primary.main', 
                  fontWeight: 700, 
                  textDecoration: 'none', 
                  '&:hover': { textDecoration: 'underline' } 
                }}
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
