import React from 'react';
import { Dashboard, Storefront, People, Person } from '@mui/icons-material';
import { useLogout } from '../../../app/authentication/Logout';
import { CommonLayout } from './CommonLayout';

export const AdminLayout = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin' },
    { text: 'Sellers', icon: <Storefront />, path: '/admin/sellers' },
    { text: 'Customers', icon: <People />, path: '/admin/customers' },
    { text: 'Profile', icon: <Person />, path: '/admin/profile' },
  ];

  const { handleLogout } = useLogout();

  return <CommonLayout title="Admin Panel" menuItems={menuItems} handleLogout={handleLogout} />;
};
