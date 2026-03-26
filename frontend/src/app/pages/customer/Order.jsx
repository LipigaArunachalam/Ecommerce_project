import React, { useState } from 'react';
import { Button } from '@mui/material';

import {
  AdminTableLayout,
  useGetAllProductsQuery,
  useCancelOrderMutation,
  DeleteDialog,
  SnackBar,
} from '../../../shared';
import { Box, Typography, alpha } from '@mui/material';
import { StatusLabel } from '../../../shared/styled-components/StyledComponents';

export const Order = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const uid = localStorage.getItem('user_id');

  const { data, isLoading, error } = useGetAllProductsQuery({
    page: page + 1,
    limit: rowsPerPage,
    uid: uid,
  });

  const [cancelOrder] = useCancelOrderMutation();

  const handleCancel = (row) => {
    setSelectedOrder(row);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (selectedOrder) {
      try {
        await cancelOrder(selectedOrder.order_id).unwrap();
        setSnackMessage('Order cancelled successfully');
        setSnackSeverity('success');
        setSnackOpen(true);
        setIsDeleteDialogOpen(false);
        setSelectedOrder(null);
      } catch (err) {
        console.error('Failed to cancel order:', err);
        setSnackMessage('Failed to cancel order');
        setSnackSeverity('error');
        setSnackOpen(true);
      }
    }
  };

  const columns = [
    {
      key: 'product_name',
      label: 'Category',
    },
    {
      key: 'product_img',
      label: 'Image',
      render: (row) => (
        <Box
          component="img"
          src={row.product_img}
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
      key: 'order_at',
      label: 'Ordered At',
    },
    {
      key: 'product_price',
      label: 'Product Price',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          ₹{Number(row.product_price).toLocaleString()}
        </Typography>
      ),
    },
    {
      key: 'freight_value',
      label: 'Freight',
      render: (row) => (
        <Typography variant="body2" color="text.secondary">
          ₹{Number(row.freight_value).toLocaleString()}
        </Typography>
      ),
    },
    {
      key: 'total_price',
      label: 'Price',
      render: (row) => {
        const total = (Number(row.product_price) || 0) + (Number(row.freight_value) || 0);
        return (
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
            ₹{total.toLocaleString()}
          </Typography>
        );
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => {
        const getStatusColor = (status) => {
          switch (status?.toLowerCase()) {
            case 'delivered': return 'success';
            case 'shipped': return 'info';
            case 'processing': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
          }
        };
        return (
          <StatusLabel color={getStatusColor(row.status)}>
            {row.status}
          </StatusLabel>
        );
      },
    },
    {
      key: 'payment_type',
      label: 'Payment',
    },
    {
      key: 'action',
      label: 'Action',
      render: (row) => {
        return (
          <Button
            variant="soft"
            size="small"
            color="error"
            onClick={() => handleCancel(row)}
            disabled={row.status === 'cancelled' || row.status === 'delivered'}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 700,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              '&:hover': { bgcolor: (theme) => alpha(theme.palette.error.main, 0.16) },
              '&.Mui-disabled': { bgcolor: 'action.disabledBackground' }
            }}
          >
            Cancel Order
          </Button>
        );
      },
    },
  ];

  return (
    <>
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
      <DeleteDialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmCancel}
        title="Cancel Order"
        description="Are you sure you want to cancel this order?"
        confirmText="Yes, Cancel"
        cancelText="No, Keep"
      />
      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </>
  );
};
