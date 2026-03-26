import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  useAddToCartMutation,
  useGetCatalogQuery,
  useSearchProductQuery,
  useGetCategoryQuery,
  ProductCardLayout,
  BuyProductDialog,
  ProductDetailsDialog,
  SnackBar,
} from '../../../shared';

export const Catalog = ({ searchTerm, selectedCategory, filters }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage(0);
  }, [searchTerm, selectedCategory, filters]);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [isBuyDialogOpen, setIsBuyDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [snackSeverity, setSnackSeverity] = useState('error');

  const {
    data: catalogData,
    isLoading: catalogLoading,
    error: catalogError,
  } = useGetCatalogQuery(
    {
      page: page + 1,
      limit: rowsPerPage,
    },
    { skip: !!searchTerm || !!selectedCategory }
  );

  const {
    data: searchdata,
    isLoading: isSearchLoading,
    error: searchError,
  } = useSearchProductQuery(
    {
      prod: searchTerm,
      page: page + 1,
      limit: rowsPerPage,
      min: filters?.min,
      max: filters?.max,
    },
    { skip: !searchTerm }
  );

  const {
    data: categoryData,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useGetCategoryQuery(
    {
      name: selectedCategory,
      page: page + 1,
      limit: rowsPerPage,
    },
    { skip: !!searchTerm || !selectedCategory }
  );

  const [addToCart] = useAddToCartMutation();

  const handleBuy = (product) => {
    const userRole = localStorage.getItem('role');
    const userId = localStorage.getItem('user_id')
    if (!userId && userRole !== 'customer') {
      navigate('/login');
      return;
    }
    setSelectedProduct(product);
    setIsBuyDialogOpen(true);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsDetailsDialogOpen(true);
  };

  const handleAddToCart = async (product_id) => {
    const uid = localStorage.getItem('user_id')
    const userRole = localStorage.getItem('role');
    if (!uid && userRole !== 'customer') {
      navigate('/login');
      return;
    }
    try {
      await addToCart({ uid: uid, pid: product_id });
      // navigate("/customer/cart")
      setSnackMessage('Added to cart');
      setSnackSeverity('success');
      setSnackOpen(true);
    } catch (err) {
      console.error(err);
      setSnackMessage('Failed to add');
      setSnackSeverity('error');
      setSnackOpen(true);
    }
  };

  let displayData = [];
  let finalLoading = false;
  let finalError = null;

  if (searchTerm) {
    displayData = searchdata;
    finalLoading = isSearchLoading;
    finalError = searchError;
  } else if (selectedCategory) {
    displayData = categoryData;
    finalLoading = isCategoryLoading;
    finalError = categoryError;
  } else {
    displayData = catalogData;
    finalLoading = catalogLoading;
    finalError = catalogError;
  }

  return (
    <Box>
      <ProductCardLayout
        data={displayData || []}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        isLoading={finalLoading}
        isError={!!finalError}
        onCardClick={handleCardClick}
      />

      <ProductDetailsDialog
        open={isDetailsDialogOpen}
        onClose={() => setIsDetailsDialogOpen(false)}
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onBuy={handleBuy}
      />

      <BuyProductDialog
        open={isBuyDialogOpen}
        onClose={() => setIsBuyDialogOpen(false)}
        product={selectedProduct}
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
