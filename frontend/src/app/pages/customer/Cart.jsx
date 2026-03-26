import React from 'react';
import { useState } from 'react';
import { Stack, Button, Container, IconButton, Box, Typography, alpha } from '@mui/material';
import {
  useCartQuery,
  useRemoveFromCartMutation,
  useUpdateCartMutation,
  AdminTableLayout,
  BuyProductDialog,
  BuyAllDialog,
  DeleteDialog,
  SnackBar,
} from '../../../shared';
import { Add, Remove } from '@mui/icons-material';

export const Cart = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [isBuyAllDialogOpen, setIsBuyAllDialogOpen] = useState(false);

  const [remove] = useRemoveFromCartMutation();
  const [updateCart] = useUpdateCartMutation();

  const { data, isLoading, error } = useCartQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  const columns = [
    {
      key: 'product_category_name',
      label: 'product category',
    },
    {
      key: 'product_image_url',
      label: 'Image',
      render: (row) => (
        <Box
          component="img"
          src={row.product_image_url}
          alt={row.product_name}
          sx={{
            height: 64,
            width: 64,
            borderRadius: 1.5,
            objectFit: 'cover',
            border: (theme) => `1px solid ${theme.palette.divider}`,
          }}
        />
      ),
    },
    {
      key: 'price',
      label: 'Price',
      render: (row) => (
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          ₹{Number(row.price).toLocaleString()}
        </Typography>
      ),
    },
    {
      key: 'product_weight_g',
      label: 'Weight',
    },
    {
      key: 'product_height_cm',
      label: 'Height',
    },
    {
      key: 'product_width_cm',
      label: 'Width',
    },
    {
      key: 'product_qty',
      label: 'Stock',
    },
    {
      key: 'quantity',
      label: 'Quantity',
      render: (row) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={{
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            p: 0.5,
            width: 'fit-content',
          }}
        >
          <IconButton
            size="small"
            onClick={() => handleDecrease(row)}
            sx={{ color: 'text.secondary', p: 0.5 }}
          >
            <Remove fontSize="small" />
          </IconButton>

          <Typography variant="body2" sx={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>
            {row.quantity}
          </Typography>

          <IconButton
            size="small"
            onClick={() => handleIncrease(row)}
            sx={{ color: 'primary.main', p: 0.5 }}
          >
            <Add fontSize="small" />
          </IconButton>
        </Stack>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="soft"
            color="error"
            onClick={() => handleRemove(row.product_id)}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 700,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              color: 'error.dark',
              '&:hover': { bgcolor: (theme) => alpha(theme.palette.error.main, 0.16) }
            }}
          >
            Remove
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleBuy(row)}
            sx={{ textTransform: 'none', fontWeight: 700, boxShadow: 'none' }}
          >
            Buy Now
          </Button>
        </Stack>
      ),
    },
  ];

  const handleBuy = (product) => {
    setSelectedProduct(product);
    setIsBuyDialogOpen(true);
  };

  const handleBuyAll = () => {
    if (!data || data.length === 0) {
      setSnackMessage('Cart is empty');
      setSnackSeverity('warning');
      setSnackOpen(true);
      return;
    }
    setIsBuyAllDialogOpen(true);
  };

  const handleBuyAllSuccess = async () => {
    try {
      const uid = localStorage.getItem('user_id');

      const removePromises = data.map((item) => remove({ uid, pid: item.product_id }).unwrap());

      await Promise.all(removePromises);

      setSnackMessage('All items purchased successfully');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to purchase all items');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const handleRemove = (pid) => {
    setSelectedProductId(pid);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await remove({ uid: localStorage.getItem('user_id'), pid: selectedProductId }).unwrap();
      setSnackMessage('Item removed from cart');
      setSnackSeverity('success');
      setSnackOpen(true);
      setIsDeleteDialogOpen(false);
      setSelectedProductId(null);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to remove item');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const handlePurchaseSuccess = async () => {
    if (selectedProduct) {
      try {
        await remove({
          uid: localStorage.getItem('user_id'),
          pid: selectedProduct.product_id,
        }).unwrap();
      } catch (err) {
        console.error('Failed to remove item from cart after purchase:', err);
      }
    }
  };

  const handleIncrease = async (row) => {
    try {
      await updateCart({
        uid: localStorage.getItem('user_id'),
        pid: row.product_id,
        qty: row.quantity + 1,
      }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrease = async (row) => {
    try {
      const newQty = row.quantity - 1;

      if (newQty <= 0) {
        await remove({
          uid: localStorage.getItem('user_id'),
          pid: row.product_id,
        }).unwrap();
      } else {
        await updateCart({
          uid: localStorage.getItem('user_id'),
          pid: row.product_id,
          qty: newQty,
        }).unwrap();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="flex-end" mb={3}>
        <Button
          variant="contained"
          onClick={handleBuyAll}
          sx={{
            px: 3,
            py: 1,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: 'none',
            boxShadow: (theme) => `0 8px 16px 0 ${alpha(theme.palette.primary.main, 0.24)}`,
          }}
        >
          Checkout All Items
        </Button>
      </Stack>

      <AdminTableLayout
        columns={columns}
        data={data || []}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        isLoading={isLoading}
        isError={!!error}
        getRowId={(row) => row.product_id}
      />
      <BuyProductDialog
        open={isBuyDialogOpen}
        onClose={() => setIsBuyDialogOpen(false)}
        product={selectedProduct}
        isBulk={false}
        onSuccess={handlePurchaseSuccess}
      />
      <BuyAllDialog
        open={isBuyAllDialogOpen}
        onClose={() => setIsBuyAllDialogOpen(false)}
        products={data}  
        onSuccess={handleBuyAllSuccess}
      />
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmRemove}
        title="Remove Item"
        description="Are you sure you want to remove this item from your cart?"
        confirmText="Remove"
        cancelText="Cancel"
      />
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Container>
  );
};
