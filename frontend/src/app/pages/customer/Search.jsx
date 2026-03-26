import React, { useState } from 'react';
import {
  Box,
  InputAdornment,
  Button,
  Typography,
  Badge,
  alpha,
  useTheme,
  Container,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Catalog } from './Catalog';
import { FilterDrawer } from './FilterDrawer';
import { useGetAllCategoryQuery } from '../../../shared';
import { StyledTextField } from '../../../shared/styled-components/StyledComponents';

export const Search = () => {
  const theme = useTheme();
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
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 }, px: { xs: 2, sm: 3 } }}>
      {/* Search Header Area */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', md: 'row' },
          gap: 3, 
          alignItems: { xs: 'stretch', md: 'center' }, 
          mb: { xs: 3, md: 5 },
          animation: 'fadeInDown 0.6s ease-out'
        }}
      >
        <Box sx={{ flex: 1, position: 'relative' }}>
          <StyledTextField
            fullWidth
            placeholder="What are you looking for?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            InputProps={{
              sx: { 
                borderRadius: '16px',
                height: 64,
                fontSize: '1.1rem',
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 500,
                boxShadow: theme.palette.mode === 'light' 
                  ? '0 4px 20px rgba(79, 124, 130, 0.08)' 
                  : '0 4px 20px rgba(0, 0, 0, 0.2)',
                background: theme.palette.background.paper,
                transition: 'all 0.3s',
                '&:hover': {
                  boxShadow: theme.palette.mode === 'light' 
                    ? '0 6px 24px rgba(79, 124, 130, 0.12)' 
                    : '0 6px 24px rgba(0, 0, 0, 0.3)',
                }
              },
              startAdornment: (
                <InputAdornment position="start" sx={{ pl: 1 }}>
                  <SearchIcon sx={{ color: 'primary.main', width: 28, height: 28 }} />
                </InputAdornment>
              ),
              endAdornment: input && (
                <InputAdornment position="end" sx={{ pr: 1 }}>
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    disableElevation
                    sx={{
                      borderRadius: '12px',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontFamily: '"Public Sans", sans-serif',
                      height: 44,
                      px: 3,
                    }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {searchTerm && (
          <Badge 
            color="primary" 
            variant="dot" 
            invisible={!filters}
            sx={{
              '& .MuiBadge-badge': {
                right: 6,
                top: 6,
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: `2px solid ${theme.palette.background.paper}`,
              }
            }}
          >
            <Button
              variant="outlined"
              onClick={() => setIsDrawerOpen(true)}
              sx={{ 
                height: 64, 
                whiteSpace: 'nowrap',
                borderRadius: '16px',
                borderWidth: '2px',
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'text.primary',
                borderColor: alpha(theme.palette.divider, 0.8),
                px: { xs: 3, md: 4 },
                display: 'flex',
                gap: 1.5,
                transition: 'all 0.3s',
                background: alpha(theme.palette.background.paper, 0.5),
                backdropFilter: 'blur(8px)',
                '&:hover': {
                  borderWidth: '2px',
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  background: alpha(theme.palette.primary.main, 0.04),
                }
              }}
            >
              <FilterListIcon sx={{ fontSize: 24 }} />
              <Box component="span" sx={{ display: { xs: 'none', sm: 'block' } }}>
                Filters
              </Box>
            </Button>
          </Badge>
        )}
      </Box>

      {/* Category Pills */}
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          py: 1,
          mb: 4,
          gap: 1.5,
          '&::-webkit-scrollbar': { display: 'none' },
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          animation: 'fadeInUp 0.6s ease-out 0.1s both'
        }}
      >
        <Button
          variant={selectedCategory === '' ? 'contained' : 'outlined'}
          onClick={() => handleCategoryClick('')}
          disableElevation
          sx={(theme) => ({ 
            borderRadius: '12px', 
            flexShrink: 0,
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: selectedCategory === '' ? 700 : 500,
            textTransform: 'none',
            minWidth: 'auto',
            px: 3,
            py: 1.25,
            borderWidth: selectedCategory === '' ? '1px' : '1px',
            borderColor: selectedCategory === '' ? 'transparent' : alpha(theme.palette.divider, 0.5),
            color: selectedCategory === '' ? 'primary.contrastText' : 'text.primary',
            '&:hover': {
              borderWidth: '1px',
            }
          })}
        >
          All Categories
        </Button>
        
        {!categoriesLoading &&
          categories?.map((cat) => {
            const categoryName = typeof cat === 'string' ? cat : cat.category_name;
            const categoryId = typeof cat === 'string' ? cat : cat.category_id || cat.category_name;
            const displayLabel = categoryName
              .split('_')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
              
            const isSelected = selectedCategory === categoryName;

            return (
              <Button
                key={categoryId}
                variant={isSelected ? 'contained' : 'outlined'}
                onClick={() => handleCategoryClick(categoryName)}
                disableElevation
                sx={(theme) => ({
                  borderRadius: '12px',
                  flexShrink: 0,
                  textTransform: 'none',
                  fontFamily: '"Public Sans", sans-serif',
                  fontWeight: isSelected ? 700 : 500,
                  minWidth: 'auto',
                  px: 3,
                  py: 1.25,
                  whiteSpace: 'nowrap',
                  borderWidth: '1px',
                  borderColor: isSelected ? 'transparent' : alpha(theme.palette.divider, 0.5),
                  color: isSelected ? 'primary.contrastText' : 'text.primary',
                  '&:hover': {
                    borderWidth: '1px',
                    borderColor: 'primary.main',
                    color: isSelected ? 'primary.contrastText' : 'primary.main',
                  }
                })}
              >
                {displayLabel}
              </Button>
            );
          })}
      </Box>

      <FilterDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onFilterChange={(newFilter) => setFilters(newFilter)}
        currentFilter={filters}
      />

      <Box sx={{ animation: 'fadeIn 0.8s ease-out 0.2s both' }}>
        <Catalog searchTerm={searchTerm} selectedCategory={selectedCategory} filters={filters} />
      </Box>

      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </Container>
  );
};
