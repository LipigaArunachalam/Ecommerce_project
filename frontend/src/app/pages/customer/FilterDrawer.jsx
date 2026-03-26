import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Drawer,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const priceRanges = [
  { label: '₹100 and below', min: 0, max: 100 },
  { label: '₹100 - ₹200', min: 100, max: 200 },
  { label: '₹200 - ₹300', min: 200, max: 300 },
  { label: '₹300 - ₹400', min: 300, max: 400 },
  { label: '₹400 - ₹500', min: 400, max: 500 },
  { label: '₹500 and above', min: 500, max: 999999 },
];

export const FilterDrawer = ({ open, onClose, onFilterChange, currentFilter }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: 300, p: 3 },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Filters</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
        Price Range
      </Typography>
      <List>
        {priceRanges.map((range) => (
          <ListItem key={range.label} disablePadding>
            <ListItemButton
              selected={currentFilter?.label === range.label}
              onClick={() => {
                onFilterChange(range);
                onClose();
              }}
              sx={{
                borderRadius: 1,
                mb: 0.5,
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '&:hover': {
                    backgroundColor: 'primary.light',
                  },
                },
              }}
            >
              <ListItemText primary={range.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Box sx={{ mt: 'auto', pt: 2 }}>
        {currentFilter && (
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={() => {
              onFilterChange(null);
              onClose();
            }}
          >
            Clear All Filters
          </Button>
        )}
      </Box>
    </Drawer>
  );
};
