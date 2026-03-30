import React, { useState } from 'react';
import {
  useCustomerDetailsQuery,
  useUserDashboardQuery,
  useEditProfileMutation,
  useAddAddressMutation,
  useDeleteAddressMutation,
  SnackBar,
  ProfileLayout,
} from '../../../shared';
import { Email, LocationOn, Home, Map } from '@mui/icons-material';
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';

export const CustomerProfile = () => {
  const { data, error, isLoading } = useCustomerDetailsQuery();
  const { data: dashboard } = useUserDashboardQuery();
  const [editProfile] = useEditProfileMutation();

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('success');

  const lastAddress = data?.addresses?.[data.addresses.length - 1];
  const addressDisplay = lastAddress
    ? `${lastAddress.address_line}, ${lastAddress.city}, ${lastAddress.state} ${lastAddress.zip_code}`
    : 'No address saved';

  const fields = [
    { icon: <Email color="primary" />, label: 'Email Address', value: data?.email },
    {
      icon: <Home color="primary" />,
      label: 'Address',
      value: addressDisplay,
    },
  ];

  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  const [deleteAddress, { isLoading: isDeleting }] = useDeleteAddressMutation();

  const [newAddress, setNewAddress] = useState({
    address_line: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const [openEdit, setOpenEdit] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
  });

  const handleEditOpen = () => {
    setFormData({
      email: data?.email || '',
    });

    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpenEdit(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = async () => {
    const uid = localStorage.getItem("user_id");

    try {
      if (!newAddress.address_line || !newAddress.city || !newAddress.state || !newAddress.zip_code) {
        setSnackMessage("Please fill all fields");
        setSnackSeverity("error");
        setSnackOpen(true);
        return;
      } else {
        await addAddress({
          uid,
          data: newAddress
        }).unwrap();

        setSnackMessage("Address added");
        setSnackSeverity("success");
        setSnackOpen(true);

        setNewAddress({
          address_line: "",
          city: "",
          state: "",
          zip_code: ""
        });
      }

    } catch (err) {
      setSnackMessage("Failed to add address");
      setSnackSeverity("error");
      setSnackOpen(true);
    }
  };

  const handleDeleteAddress = async (id) => {
    const uid = localStorage.getItem('user_id');

    try {
      await deleteAddress({ uid, data: { _id: id } }).unwrap();

      setSnackMessage('Address deleted');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      setSnackMessage('Delete failed');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const uid = localStorage.getItem('user_id');
      console.log(formData);
      if (
        newAddress.address_line == '' ||
        newAddress.city == '' ||
        newAddress.state == '' ||
        newAddress.zip_code == ''
      ) {
        setSnackMessage('Fill all the feilds');
        setSnackSeverity('error');
        setSnackOpen(true);
        return;
      }
      await editProfile({
        uid: uid,
        data: {
          email: formData.email,
          addresses: [...data.addresses, newAddress],
        },
      }).unwrap();
      setNewAddress({
        address_line: '',
        city: '',
        state: '',
        zip_code: '',
      });
      setOpenEdit(false);
      setSnackMessage('edited sucessfully');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      console.error('Profile update failed:', err);
      setSnackMessage(err.data.message);
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <ProfileLayout data={data} isLoading={isLoading} isError={!!error} fields={fields} actions={<Button variant="contained" color="primary" onClick={handleEditOpen}>Edit Profile</Button>} />
      <Dialog open={openEdit} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Profile</DialogTitle>

        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 1,
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <Typography variant="h6" sx={{ mt: 2 }}>
            Addresses
          </Typography>

          {data?.addresses?.map((addr) => (
            <Box
              key={addr._id}
              sx={{
                p: 1.5,
                mt: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography variant="body2">
                {addr.address_line}, {addr.city}, {addr.state} - {addr.zip_code}
              </Typography>

              <Button size="small" color="error" onClick={() => handleDeleteAddress(addr._id)}>
                Delete
              </Button>
            </Box>
          ))}

          <Typography variant="subtitle1" sx={{ mt: 2 }} onClick={() => handleAddAddress()}>
            Add New Address
          </Typography>

          <TextField
            label="Address"
            fullWidth
            value={newAddress.address_line}
            onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })}
          />

          <TextField
            label="City"
            fullWidth
            value={newAddress.city}
            onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
          />

          <TextField
            label="State"
            fullWidth
            value={newAddress.state}
            onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
          />

          <TextField
            label="Zip Code"
            fullWidth
            value={newAddress.zip_code}
            onChange={(e) => setNewAddress({ ...newAddress, zip_code: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Cancel
          </Button>

          <Button variant="contained" onClick={handleSubmit} disabled={isAdding}>
            {isAdding ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Box sx={{ mt: 5, px: 2 }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
          Customer Dashboard
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: 'repeat(3,1fr)',
            },
            gap: 3,
            mb: 4,
          }}
        >
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(53, 125, 197, 0.2)',
              background: 'rgba(52, 71, 78, 0.05)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total Spent
            </Typography>

            <Typography variant="h4" sx={{ color: 'primary.main', fontWeight: 700 }}>
              ₹{dashboard?.total_spent || 0}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(53, 125, 197, 0.2)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Total Orders
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {dashboard?.total_orders || 0}
            </Typography>
          </Paper>

          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              border: '1px solid rgba(53, 125, 197, 0.2)',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Delivered Orders
            </Typography>

            <Typography variant="h4" fontWeight={700}>
              {dashboard?.delivered_orders || 0}
            </Typography>
          </Paper>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1fr 1fr',
            },
            gap: 3,
          }}
        >
          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Order Status
            </Typography>

            <PieChart
              height={260}
              series={[
                {
                  data: [
                    {
                      id: 0,
                      value: dashboard?.delivered_orders || 0,
                      label: 'Delivered',
                      color: '#4caf50',
                    },
                    {
                      id: 1,
                      value: (dashboard?.total_orders || 0) - (dashboard?.delivered_orders || 0),
                      label: 'Pending',
                      color: '#9c35c5',
                    },
                  ],
                },
              ]}
            />
          </Paper>

          <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Orders Overview
            </Typography>

            <BarChart
              height={260}
              xAxis={[
                {
                  scaleType: 'band',
                  data: ['Orders', 'Delivered'],
                },
              ]}
              series={[
                {
                  data: [dashboard?.total_orders || 0, dashboard?.delivered_orders || 0],
                  color: '#9c35c5',
                },
              ]}
            />
          </Paper>
        </Box>
      </Box>

      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
};
