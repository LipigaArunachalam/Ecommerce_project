import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {
  AdminDashboard,
  Customers,
  Sellers,
  AdminProfile,
  SellerProfile,
  Products,
  OrderStatus,
  CustomerProfile,
  Catalog,
  Cart,
  Order,
  Search,
} from './pages';
import { Login, Signup, ForgetPassword, PasswordReset } from './authentication';
import {
  ProtectedRoute,
  ThemeProvider as ThemeProviderWrapper,
  AdminLayout,
  SellerLayout,
  CustomerLayout,
} from '../shared';

export function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/customer/search" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<PasswordReset />} />

          <Route element={<ProtectedRoute allowedRole="admin" />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="sellers" element={<Sellers />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRole="seller" />}>
            <Route path="/seller" element={<SellerLayout />}>
              <Route path="seller-profile" element={<SellerProfile />} />
              <Route path="products" element={<Products />} />
              <Route path="order-status" element={<OrderStatus />} />
            </Route>
          </Route>

          <Route path="/customer" element={<CustomerLayout />}>
            <Route path="search" element={<Search />} />
            <Route path="catalog" element={<Catalog />} />
            <Route element={<ProtectedRoute allowedRole="customer" />}>
              <Route path="customer-profile" element={<CustomerProfile />} />
              <Route path="cart" element={<Cart />} />
              <Route path="orders" element={<Order />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/customer/search" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}
