import React from 'react';
import { AuthLayout } from '../../shared';
import { LoginForm } from './LoginForm';

export const Login = () => {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
};
