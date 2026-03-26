import React from 'react';
import { AuthLayout } from '../../shared';
import { SignUpForm } from './SignUpForm';

export const Signup = () => {
  return (
    <AuthLayout>
      <SignUpForm />
    </AuthLayout>
  );
};
