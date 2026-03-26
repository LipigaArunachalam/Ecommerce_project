import React, { useState } from 'react';
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useAddProductMutation,
  AdminTableLayout,
  SnackBar,
  DeleteDialog,
} from '../../../shared';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  alpha,
} from '@mui/material';

export const Products = () => {
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [addProduct] = useAddProductMutation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, error } = useGetProductsQuery({ page: page + 1, limit: rowsPerPage });

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentPid, setCurrentPid] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [urlImg, setUrlImg] = useState();

  const handleUpdate = (product) => {
    setIsEditMode(true);
    setCurrentPid(product.product_id);
    setUrlImg(product.product_image_url);
    reset(product);
    setOpen(true);
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setCurrentPid(null);
    setUrlImg('');
    reset({
      product_category_name: '',
      product_name: '',
      product_weight_g: '',
      product_height_cm: '',
      product_length_cm: '',
      product_width_cm: '',
    });
    setOpen(true);
  };

  const columns = [
    {
      key: 'product_category_name',
      label: 'product category',
    },
    {
      key: 'product_name',
      label: 'Product name',
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
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="soft"
            color="secondary"
            onClick={() => handleUpdate(row)}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 700,
              bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.08),
              '&:hover': { bgcolor: (theme) => alpha(theme.palette.secondary.main, 0.16) }
            }}
          >
            Edit
          </Button>
          <Button
            size="small"
            variant="soft"
            color="error"
            onClick={() => handleDelete(row.product_id)}
            sx={{ 
              textTransform: 'none', 
              fontWeight: 700,
              bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
              '&:hover': { bgcolor: (theme) => alpha(theme.palette.error.main, 0.16) }
            }}
          >
            Delete
          </Button>
        </Stack>
      ),
    },
  ];

  const handleDelete = (pid) => {
    setProductToDelete(pid);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    const user_id = localStorage.getItem('user_id');
    try {
      await deleteProduct({
        sid: user_id,
        pid: productToDelete,
      }).unwrap();
      setSnackMessage('Product deleted successfully');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      console.error('Delete failed', err);
      setSnackMessage('Failed to delete product');
      setSnackSeverity('error');
      setSnackOpen(true);
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'Ecommerce');
    data.append('cloud_name', 'dyrw2esoq');
    const res = await fetch('https://api.cloudinary.com/v1_1/dyrw2esoq/image/upload', {
      method: 'POST',
      body: data,
    });
    const uploaded = await res.json();
    setUrlImg(uploaded.secure_url);
    console.log(uploaded.secure_url);
  };

  const handleClose = () => {
    setOpen(false);
    setUrlImg('');
  };

  const onSubmit = async (formData) => {
    const user_id = localStorage.getItem('user_id');
    try {
      if (isEditMode) {
        await updateProduct({
          sid: user_id,
          pid: currentPid,
          data: { ...formData, product_image_url: urlImg },
        }).unwrap();
        setUrlImg('');
        setSnackMessage('Updated Successfully');
        setSnackSeverity('info');
        setSnackOpen(true);
      } else {
        console.log({ ...formData, product_image_url: urlImg });
        await addProduct({
          sid: user_id,
          data: { ...formData, product_image_url: urlImg },
        }).unwrap();
        setUrlImg('');
        setSnackMessage('Added product Successfully');
        setSnackSeverity('info');
        setSnackOpen(true);
      }
      setOpen(false);
    } catch (err) {
      console.error('Operation failed', err);
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h4">
          <strong>Products</strong>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleOpenAdd}>
          Add Product
        </Button>
      </Box>
      <AdminTableLayout
        // title="Products"
        columns={columns}
        data={data || []}
        page={0}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        totalCount={data?.length || 0}
        isLoading={isLoading}
        isError={!!error}
        getRowId={(row) => row.product_id}
      />

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            fontWeight: 800,
            textAlign: 'center',
            fontSize: '1.5rem',
            py: 3,
          }}
        >
          {isEditMode ? 'Update Product' : 'Add New Product'}
        </DialogTitle>

        <DialogContent>
          <Box
            component="form"
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              mt: 1,
            }}
          >
            <TextField
              label="Category"
              fullWidth
              {...register('product_category_name', { required: 'Category is required' })}
              disabled={isEditMode}
              error={!!errors.product_category_name}
              helperText={errors.product_category_name?.message}
            />

            <TextField
              label="Product Name"
              fullWidth
              {...register('product_name', { required: 'Name is required' })}
              error={!!errors.product_name}
              helperText={errors.product_name?.message}
            />

            <TextField
              label="Price"
              type="number"
              fullWidth
              {...register('price', { required: 'Price is required' })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <TextField
              label="Stock"
              type="number"
              fullWidth
              {...register('product_qty', { required: 'Quantity is required' })}
              error={!!errors.product_qty}
              helperText={errors.product_qty?.message}
            />

            <TextField
              label="Weight (g)"
              type="number"
              fullWidth
              {...register('product_weight_g', { required: 'Weight is required' })}
              error={!!errors.product_weight_g}
              helperText={errors.product_weight_g?.message}
            />

            <TextField
              label="Height (cm)"
              type="number"
              fullWidth
              {...register('product_height_cm', { required: 'Height is required' })}
              error={!!errors.product_height_cm}
              helperText={errors.product_height_cm?.message}
            />

            <TextField
              label="Length (cm)"
              type="number"
              fullWidth
              {...register('product_length_cm', { required: 'Length is required' })}
              error={!!errors.product_length_cm}
              helperText={errors.product_length_cm?.message}
            />

            <TextField
              label="Width (cm)"
              type="number"
              fullWidth
              {...register('product_width_cm', { required: 'Width is required' })}
              error={!!errors.product_width_cm}
              helperText={errors.product_width_cm?.message}
            />

            {/* IMAGE SECTION */}
            <Box sx={{ gridColumn: 'span 2', mt: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ mb: 1, fontWeight: 'bold', color: 'text.secondary' }}
              >
                Product Image
              </Typography>

              <Box
                sx={{
                  border: '2px dashed #4F7C82',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  background: 'rgba(28, 49, 92, 0.04)',
                }}
              >
                {urlImg && (
                  <Box mb={2}>
                    <img
                      src={urlImg}
                      alt="preview"
                      style={{
                        width: 120,
                        height: 120,
                        objectFit: 'cover',
                        borderRadius: 10,
                      }}
                    />
                  </Box>
                )}

                <Button
                  variant="outlined"
                  component="label"
                  sx={{
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    '&:hover': {
                      borderColor: 'primary.main',
                      background: 'rgba(26, 57, 86, 0.08)',
                    },
                  }}
                >
                  {isEditMode ? 'Change Image' : 'Upload Image'}
                  <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 4, pt: 2 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            size="large"
            color="inherit"
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              borderRadius: 1.5,
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            size="large"
            sx={{
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              borderRadius: 1.5,
              boxShadow: 'none',
            }}
          >
            {isEditMode ? 'Update Product' : 'Add Product'}
          </Button>
        </DialogActions>
      </Dialog>

      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Product"
        description="Are you sure you want to delete this product? This action cannot be undone."
      />

      <SnackBar
        open={snackOpen}
        message={snackMessage}
        severity={snackSeverity}
        handleClose={() => setSnackOpen(false)}
      />
    </Box>
  );
};
