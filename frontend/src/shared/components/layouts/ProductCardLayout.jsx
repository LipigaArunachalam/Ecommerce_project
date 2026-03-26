import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  TablePagination,
  Pagination,
  CircularProgress,
  Container,
  CardActionArea,
  Divider,
} from '@mui/material';
import { ProductStyledCard } from '../../styled-components';

export const ProductCardLayout = ({
  data = [],
  page,
  onPageChange,
  rowsPerPage,
  onRowsPerPageChange,
  isLoading,
  isError,
  onCardClick,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">Failed to load products.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth={false} sx={{ px: { xs: 2, sm: 3, md: 5 }, py: 0 }}>
      <Grid container spacing={4}>
        {data.length > 0 ? (
          data.map((product, index) => (
            <Grid 
              item 
              key={product.product_id} 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center',
                animation: 'fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                animationDelay: `${index * 0.08}s`,
                opacity: 0,
              }} 
              xs={12} sm={6} md={4} lg={3} xl={2}
            >
              <ProductStyledCard>
                <CardActionArea
                  onClick={() => onCardClick(product)}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      height: 160,
                      width: '100%',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                    image={
                      product.product_image_url ||
                      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
                    }
                    alt={product.product_name || 'product'}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <Box sx={{ mb: 1, flexGrow: 1, overflow: 'hidden' }}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          lineHeight: 1.2,
                          mb: 0.5,
                          fontWeight: 600,
                          // color: '#212B36',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {product.product_name || 'No title'}
                      </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {product.product_category_name || 'Uncategorized'}
                      </Typography>
                    </Box>

                    <Box sx={{ mt: 'auto' }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Typography variant="subtitle1" sx={{ color: 'primary.main', fontWeight: 700 }}>
                          ₹{product.price}
                        </Typography>
                        <Box
                          sx={{
                            bgcolor: product.product_qty > 0 ? 'rgba(34, 197, 94, 0.16)' : 'rgba(255, 86, 48, 0.16)',
                            color: product.product_qty > 0 ? '#118D57' : '#B71D18',
                            px: 0.75,
                            py: 0.25,
                            borderRadius: 0.75,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                          }}
                        >
                          {product.product_qty > 0 ? `${product.product_qty}` : 'Out'}
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </ProductStyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No products found.
            </Typography>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          component="div"
          count={-1} // Since we might not have total count from some APIs, or we can pass it as a prop
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[10, 15, 20, 25]}
        />
      </Box>
    </Container>
  );
};
