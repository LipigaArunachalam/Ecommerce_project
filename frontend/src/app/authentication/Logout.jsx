import React from 'react';
import { useLogoutMutation } from '../../shared';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      navigate('/');
      // setTimeout(() => {
      //     navigate("/")
      // }, 1000)
    } catch (err) {
      console.error(err);
    }
  };

  return { handleLogout };
};
