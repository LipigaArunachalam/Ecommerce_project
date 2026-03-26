import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Grid,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { ShoppingCart, ShoppingBag } from '@mui/icons-material';

export const ProductDetailsDialog = ({ open, onClose, product, onAddToCart, onBuy }) => {
  if (!product) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      fullWidth 
      maxWidth="sm"
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
      <DialogTitle sx={{ fontWeight: 700 }}>Product Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              component="img"
              sx={{
                width: '100%',
                height: 300,
                borderRadius: 2,
                objectFit: 'cover',
                background: (theme) => alpha(theme.palette.primary.main, 0.05),
                border: (theme) => `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                }
              }}
              src={product.product_image_url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'}
              alt={product.product_name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="overline" color="text.secondary">
                  Category
                </Typography>
                <Typography variant="h6" fontWeight={600}>
                  {product.product_category_name}
                </Typography>
              </Box>

              <Box>
                <Typography variant="overline" color="text.secondary">
                  Name
                </Typography>
                <Typography variant="body1">
                  {product.product_name || 'No name available'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="overline" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="h5" color="primary" fontWeight={700}>
                  ₹{product.price}
                </Typography>
              </Box>

              <Box>
                <Typography variant="overline" color="text.secondary">
                  Availability
                </Typography>
                <Typography
                  variant="body2"
                  color={product.product_qty > 0 ? 'success.main' : 'error.main'}
                >
                  {product.product_qty > 0 ? `In Stock: ${product.product_qty}` : 'Out of Stock'}
                </Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 1 }} />
            <Typography variant="subtitle2" gutterBottom sx={{ mt: 1, fontWeight: 700 }}>
              Physical Specifications
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  Weight
                </Typography>
                <Typography variant="body2">{product.product_weight_g}g</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  Height
                </Typography>
                <Typography variant="body2">{product.product_height_cm}cm</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="caption" color="text.secondary">
                  Width
                </Typography>
                <Typography variant="body2">{product.product_width_cm}cm</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button onClick={onClose} variant="contained" color="error">
          Close
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={() => {
              onAddToCart(product.product_id);
              onClose();
            }}
          >
            Add to Cart
          </Button>
          <Button
            variant="contained"
            startIcon={<ShoppingBag />}
            onClick={() => {
              onBuy(product);
              onClose();
            }}
          >
            Buy Now
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
