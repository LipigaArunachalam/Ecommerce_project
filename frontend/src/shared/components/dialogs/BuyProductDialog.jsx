import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useBuyProductMutation, useCustomerDetailsQuery, useAddAddressMutation } from '../../utils';

export const BuyProductDialog = ({ open, onClose, product, onSuccess }) => {
  const [buyProduct, { isLoading: isBuying, isSuccess, isError, error, reset }] = useBuyProductMutation();
  const [addAddress, { isLoading: isAddingAddress }] = useAddAddressMutation();
  const isLoading = isBuying || isAddingAddress;
  const { data } = useCustomerDetailsQuery();

  const [formData, setFormData] = useState({
    payment_type: 'credit_card',
    payment_installments: 1,
  });

  const [message, setMessage] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState({
    address_line: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const formatAddress = (addr) => {
    return `${addr.address_line}, ${addr.city}, ${addr.state} - ${addr.zip_code}`;
  };

  useEffect(() => {
    if (product) {
      setFormData((prev) => ({
        ...prev,
        quantity: product.quantity || 1,
      }));
    }
  }, [product]);

  const handleClose = () => {
    setMessage('');
    reset();
    onClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewAddressChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const customerId = localStorage.getItem('user_id');

    if (!product || !customerId) {
      setMessage('Missing product or customer details. Please log in again.');
      return;
    }

    let finalAddress;

      if (selectedAddress === 'new') {
        const { address_line, city, state, zip_code } = newAddress;

        if (!address_line || !city || !state || !zip_code) {
          setMessage('Please fill all address fields');
          return;
        }

        try {
          await addAddress({ uid: customerId, data: newAddress }).unwrap();
          finalAddress = newAddress;
        } catch (err) {
          console.error('Failed to add address:', err);
          setMessage('Failed to save address. Please try again.');
          return;
        }
      } else {
        if (!selectedAddress) {
          setMessage('Please select an address');
          return;
        }

        finalAddress = JSON.parse(selectedAddress);
      }

    const payload = {
      product_id: String(product.product_id),
      quantity: Number(formData.quantity),
      customer_id: customerId,
      payment_type: formData.payment_type,
      payment_installments: Number(formData.payment_installments),
      address: finalAddress,
    };

    try {
      await buyProduct(payload).unwrap();
      setMessage('Product purchased successfully!');
      if (onSuccess) onSuccess();

      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (err) {
      console.error('Purchase failed:', err);
      setMessage(err?.data?.message || 'Purchase failed. Please try again.');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="xs"
      PaperProps={{
        sx: {
          borderRadius: 3,
          background: (theme) => theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.9)' 
            : 'rgba(20, 28, 30, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <DialogTitle>Buy Product</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          {product && (
            <Alert severity="info">
              Buying: <strong>{product.product_category_name || 'Product'}</strong>
            </Alert>
          )}

          {message && <Alert severity={isSuccess ? 'success' : 'error'}>{message}</Alert>}

          <TextField
            label="Quantity"
            name="quantity"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 1 }}
          />

          <TextField
            select
            label="Payment Type"
            name="payment_type"
            value={formData.payment_type}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="credit_card">Credit Card</MenuItem>
            <MenuItem value="debit_card">Debit Card</MenuItem>
            <MenuItem value="boleto">Boleto</MenuItem>
            <MenuItem value="voucher">Voucher</MenuItem>
          </TextField>

          <TextField
            label="Payment Installments"
            name="payment_installments"
            type="number"
            value={formData.payment_installments}
            onChange={handleChange}
            fullWidth
            inputProps={{ min: 1, max: 24 }}
            disabled={formData.payment_type !== 'credit_card'}
          />

          <TextField
            select
            label="Select Address"
            value={selectedAddress}
            onChange={(e) => setSelectedAddress(e.target.value)}
            fullWidth
          >
            {data?.addresses?.map((addr, index) => {
              const fullAddress = formatAddress(addr);
              return (
                <MenuItem key={index} value={JSON.stringify(addr)}>
                  {fullAddress}
                </MenuItem>
              );
            })}

            <MenuItem value="new">+ Add New Address</MenuItem>
          </TextField>

          {selectedAddress === 'new' && (
            <>
              <TextField
                label="Address Line"
                name="address_line"
                value={newAddress.address_line}
                onChange={handleNewAddressChange}
                fullWidth
              />

              <TextField
                label="City"
                name="city"
                value={newAddress.city}
                onChange={handleNewAddressChange}
                fullWidth
              />

              <TextField
                label="State"
                name="state"
                value={newAddress.state}
                onChange={handleNewAddressChange}
                fullWidth
              />

              <TextField
                label="Zip Code"
                name="zip_code"
                value={newAddress.zip_code}
                onChange={handleNewAddressChange}
                fullWidth
              />
            </>
          )}
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} variant="contained" color="error" disabled={isLoading}>
          Cancel
        </Button>

        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || isSuccess}
          startIcon={isLoading ? <CircularProgress size={20} /> : null}
        >
          {isLoading ? 'Processing...' : 'Confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};