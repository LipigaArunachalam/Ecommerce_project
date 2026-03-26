import React from 'react';
import { Dashboard, Storefront, ShoppingCart, Logout as LogoutIcon } from '@mui/icons-material';
import { useLogout } from '../../../app/authentication/Logout';
import { CommonLayout } from './CommonLayout';

export const SellerLayout = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/seller/seller-profile' },
    { text: 'Inventory', icon: <Storefront />, path: '/seller/products' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/seller/order-status' },
  ];

  const { handleLogout } = useLogout();

  return <CommonLayout title="Seller Panel" menuItems={menuItems} handleLogout={handleLogout} />;
};
