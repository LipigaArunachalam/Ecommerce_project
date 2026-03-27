import React from 'react';
import {
  Grid,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  TablePagination,
  CircularProgress,
  Container,
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Typography color="error" sx={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 600 }}>
          Failed to load products.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3} sx={{ mx: -1.5, justifyContent: 'space-evenly' }}>
        {data.length > 0 ? (
          data.map((product, index) => (
            <Grid
              item
              key={product.product_id}
              xs={12} sm={6} md={4} lg={3} xl={2.4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                animation: `fadeSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: `${index * 0.06}s`,
                opacity: 0,
                transform: 'translateY(15px)',
              }}
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
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      sx={{
                        height: 200,
                        width: '100%',
                        objectFit: 'cover',
                        flexShrink: 0,
                        transition: 'transform 0.5s ease',
                      }}
                      image={
                        product.product_image_url ||
                        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
                      }
                      alt={product.product_name || 'Product Image'}
                    />
                    {/* Minimal stock badge overlay */}
                    {product.product_qty <= 0 && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          background: 'rgba(0,0,0,0.75)',
                          backdropFilter: 'blur(4px)',
                          color: '#fff',
                          px: 1.25,
                          py: 0.5,
                          borderRadius: '8px',
                          fontSize: '0.65rem',
                          fontWeight: 800,
                          letterSpacing: '0.05em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Out of Stock
                      </Box>
                    )}
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2.5,
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                        mb: 0.75,
                        fontFamily: '"Public Sans", sans-serif',
                        fontSize: '0.65rem',
                      }}
                    >
                      {product.product_category_name || 'General'}
                    </Typography>

                    <Typography
                      variant="subtitle1"
                      sx={{
                        lineHeight: 1.3,
                        mb: 1.5,
                        fontWeight: 700,
                        fontFamily: '"Public Sans", sans-serif',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {product.product_name || 'Untitled Product'}
                    </Typography>

                    <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'primary.main',
                          fontWeight: 800,
                          fontFamily: '"Public Sans", sans-serif',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        ₹{parseFloat(product.price).toLocaleString('en-IN')}
                      </Typography>
                      
                      {product.product_qty > 0 && (
                        <Typography
                          variant="caption"
                          sx={{
                            color: 'success.main',
                            fontWeight: 700,
                            fontFamily: '"Public Sans", sans-serif',
                            bgcolor: 'success.lighter',
                            px: 1,
                            py: 0.25,
                            borderRadius: '6px',
                          }}
                        >
                          {product.product_qty} LEFT
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </ProductStyledCard>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary" sx={{ fontFamily: '"Public Sans", sans-serif' }}>
                No products found matching your criteria.
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>

      <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <TablePagination
          component="div"
          count={-1}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[10, 15, 20, 30]}
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            border: 'none',
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontFamily: '"Public Sans", sans-serif',
              fontWeight: 600,
              color: 'text.secondary',
            },
          }}
        />
      </Box>

      <style>{`
        @keyframes fadeSlideIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Container>
  );
};
