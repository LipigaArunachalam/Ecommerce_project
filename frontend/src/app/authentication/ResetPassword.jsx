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

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  // const [error,setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword] = useResetPasswordMutation();

  const textStyle = {
    '& .MuiInputBase-input': {
      color: 'black',
    },
    '& .MuiInputLabel-root': {
      color: 'black',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
        borderWidth: '1px', 
      },
      '&:hover fieldset': {
        borderColor: 'black',
        borderWidth: '2px', 
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
        borderWidth: '2px', 
      },
    },
  };

  const handleReset = async (data) => {
    try {
      //const res = await API.post("/auth/reset-password", {newPassword:data.newPassword,email,token});
      const res = await resetPassword({ email, newPassword: data.newPassword, token });

      setSnackMessage('Password resetted successfully');
      setSnackSeverity('success');
      setSnackOpen(true);

      console.log(res);
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to reset');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 7 }}>
      <Card
        sx={{
          p: 4,
          borderRadius: 12,
          background: 'rgba(229, 216, 234, 0.92)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        <CardContent>
          <Typography variant="h4" align="center" fontWeight="bold">
            RESET PASSWORD
          </Typography>
          <form onSubmit={handleSubmit(handleReset)}>
            <Stack spacing={3} sx={{ mt: 2 }}>
              {/* {error && <p className="error">{error}</p>} */}

              <TextField
                type="password"
                label="New Password"
                variant="outlined"
                fullWidth
                placeholder="Enter new password"
                {...register('newPassword', { required: 'password is needed' })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                sx={textStyle}
              />
              <TextField
                type="password"
                label="New Password"
                variant="outlined"
                fullWidth
                placeholder="Enter new password"
                {...register('newPassword', { required: 'password is needed' })}
                error={!!errors.newPassword}
                helperText={errors.newPassword?.message}
                sx={textStyle}
              />

              <Button
                variant="contained"
                type="submit"
                size="large"
                fullWidth
                sx={{ py: 1.5, borderRadius: 2 }}
              >
                Reset Password
              </Button>
            </Stack>
          </form>
        </CardContent>
      </Card>
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
};
