import React from 'react';
import { useLogoutMutation } from '../../shared';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { baseApi } from '../../shared';

export const useLogout = () => {
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.clear();
      dispatch(baseApi.util.resetApiState());
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
