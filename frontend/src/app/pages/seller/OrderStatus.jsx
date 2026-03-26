import React from 'react';
import {
  useOrderStatusQuery,
  useUpdateOrderStatusMutation,
  AdminTableLayout,
} from '../../../shared';
import { FormControl, Select, MenuItem, Typography } from '@mui/material';
import { StatusLabel } from '../../../shared/styled-components/StyledComponents';

export const OrderStatus = () => {
  const { data, error, isLoading } = useOrderStatusQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId, event) => {
    const newStatus = event.target.value;
    try {
      await updateStatus({ oid: orderId, status: newStatus }).unwrap();
      console.log('Status updated!');
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const columns = [
    {
      key: 'order_id',
      label: 'Order ID',
      // AdminTableLayout handles common ID styling systematically
    },
    {
      key: 'order_status',
      label: 'Status',
      render: (row) => {
        const getStatusColor = (status) => {
          switch (status) {
            case 'delivered': return 'success';
            case 'shipped': return 'info';
            case 'processing': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
          }
        };

        return (
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <Select
              value={row.order_status}
              onChange={(e) => handleStatusChange(row.order_id, e)}
              sx={{
                '& .MuiSelect-select': {
                  py: 0.5,
                  display: 'flex',
                  alignItems: 'center',
                },
                borderRadius: 1.5,
              }}
              renderValue={(selected) => (
                <StatusLabel color={getStatusColor(selected)}>
                  {selected}
                </StatusLabel>
              )}
            >
              <MenuItem value="created">Created</MenuItem>
              <MenuItem value="invoiced">Invoiced</MenuItem>
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
              <MenuItem value="unavailable">Unavailable</MenuItem>
            </Select>
          </FormControl>
        );
      },
    },
    {
      key: 'estimated_delivery_date',
      label: 'Est. Delivery',
    },
    {
      key: 'payment_type',
      label: 'Payment',
    },
    {
      key: 'Installation',
      label: 'Installation',
    },
    {
      key: 'price',
      label: 'Price',
      render: (row) => (
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          ₹{Number(row.price).toLocaleString()}
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
      key: 'total',
      label: 'Total',
      render: (row) => (
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary' }}>
          ₹{(Number(row.price) + Number(row.freight_value)).toLocaleString()}
        </Typography>
      ),
    },
  ];

  return (
    <AdminTableLayout
      title="Order Status"
      columns={columns}
      data={data}
      page={0}
      rowsPerPage={10}
      totalCount={data?.length || 0}
      isLoading={isLoading}
      isError={!!error}
      getRowId={(row) => row.order_id}
    />
  );
};
