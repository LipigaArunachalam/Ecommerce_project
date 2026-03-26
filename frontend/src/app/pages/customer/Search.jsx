import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Typography,
  Badge,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Catalog } from './Catalog';
import { FilterDrawer } from './FilterDrawer';
import { useGetAllCategoryQuery } from '../../../shared';
import { StyledTextField } from '../../../shared/styled-components/StyledComponents';

export const Search = () => {
  const [input, setInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filters, setFilters] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoryQuery();

  const handleSearch = () => {
    setSearchTerm(input);
    setSelectedCategory('');
    setFilters(null);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName === selectedCategory ? '' : categoryName);
    setSearchTerm('');
    setInput('');
    setFilters(null);
  };

  return (
    <Box sx={{ py: 3, px: 0 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 3 }}>
        <StyledTextField
          fullWidth
          placeholder="Search products..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          InputProps={{
            sx: { borderRadius: 1.5 },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
        {searchTerm && (
          <Badge color="primary" variant="dot" invisible={!filters}>
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={() => setIsDrawerOpen(true)}
              sx={{ height: 56, whiteSpace: 'nowrap' }}
            >
              Filters
            </Button>
          </Badge>
        )}
      </Box>

      <FilterDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onFilterChange={(newFilter) => setFilters(newFilter)}
        currentFilter={filters}
      />

      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          py: 2,
          gap: 1,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <Button
          variant={selectedCategory === '' ? 'contained' : 'outlined'}
          onClick={() => handleCategoryClick('')}
          sx={{ borderRadius: 20, flexShrink: 0 }}
        >
          All
        </Button>
        {!categoriesLoading &&
          categories?.map((cat) => {
            const categoryName = typeof cat === 'string' ? cat : cat.category_name;
            const categoryId = typeof cat === 'string' ? cat : cat.category_id || cat.category_name;
            const displayLabel = categoryName
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            return (
              <Button
                key={categoryId}
                variant={selectedCategory === categoryName ? 'contained' : 'outlined'}
                onClick={() => handleCategoryClick(categoryName)}
                sx={{
                  borderRadius: 20,
                  flexShrink: 0,
                  textTransform: 'none',
                  minWidth: 'auto',
                  px: 3,
                  whiteSpace: 'nowrap',
                }}
              >
                {displayLabel}
              </Button>
            );
          })}
      </Box>

      <Catalog searchTerm={searchTerm} selectedCategory={selectedCategory} filters={filters} />
    </Box>
  );
};
