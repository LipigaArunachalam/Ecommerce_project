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
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // const [error,setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isLoading: resetPasswordLoading }] = useResetPasswordMutation();

  const handleReset = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setSnackMessage('Passwords do not match');
      setSnackSeverity('error');
      setSnackOpen(true);
      return;
    }
    try {
      const res = await resetPassword({ email, newPassword: data.newPassword, token });

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
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
      <StyledCard sx={{ width: '100%', maxWidth: 480 }}>
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold">
            RESET PASSWORD
          </Typography>
          <form onSubmit={handleSubmit(handleReset)}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* {error && <p className="error">{error}</p>} */}

              <TextField
                type={showPassword ? 'text' : 'password'}
                label="New Password"
                variant="outlined"
                fullWidth
                placeholder="Enter new password"
                {...register('newPassword', { required: 'password is needed' })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                sx={textStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                placeholder="Confirm new password"
                {...register('confirmPassword', { required: 'confirmation is needed' })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                sx={textStyle}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
        </CardContent>
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
