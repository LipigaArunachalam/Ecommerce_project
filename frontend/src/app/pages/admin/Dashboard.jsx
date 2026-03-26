import { useState, useMemo } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  Container,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { AdminTableLayout, useGetAdminQuery, useSearchUserQuery } from '../../../shared';
import { StatusLabel, StyledTextField } from '../../../shared/styled-components/StyledComponents';

export const AdminDashboard = () => {
  const { data: adminData } = useGetAdminQuery();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [city, setCity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const {
    data: searchResults,
    isFetching,
    error,
  } = useSearchUserQuery(
    { city: searchTerm, page: page + 1, limit: rowsPerPage },
    { skip: !searchTerm }
  );

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      setSearchTerm(city.trim());
      setPage(0);
    }
  };

  const flatData = useMemo(() => {
    if (!searchResults || searchResults.length === 0) return [];
    return searchResults.flatMap((group) =>
      group.users.map((user, idx) => ({
        ...user,
        _uniqueId: `${group._id}-${idx}`,
        role: group._id,
      }))
    );
  }, [searchResults]);

  const columns = [
    {
      key: 'username',
      label: 'Username',
      render: (row) => (
        <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
          {row.username}
        </Typography>
      ),
    },
    { key: 'email', label: 'Email' , render: (row) => (
      <Typography variant="body2" sx={{ textTransform: 'none' }}>
        {row.email}
      </Typography>
    )},
    {
      key: 'role',
      label: 'Role',
      render: (row) => (
        <StatusLabel color={row.role === 'seller' ? 'primary' : 'success'}>
          {row.role}
        </StatusLabel>
      ),
    },
  ];

  const searchHeader = (
    <Box sx={{ p: 2.5, borderBottom: '1px solid', borderColor: 'divider' }}>
      <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', gap: 2 }}>
        <StyledTextField
          fullWidth
          placeholder="Search ..."
          variant="outlined"
          size="small"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <Button
          variant="contained"
          startIcon={isFetching ? <CircularProgress size={20} color="inherit" /> : <Search />}
          type="submit"
          disabled={isFetching || !city.trim()}
          sx={{ textTransform: 'none', px: 3, whiteSpace: 'nowrap', fontWeight: 700, boxShadow: 'none' }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Box sx={{ px: 3, pt: 4, maxWidth: 'lg', mx: 'auto' }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          textTransform="capitalize"
          gutterBottom
          color="primary"
        >
          Welcome {adminData?.username} !!!
        </Typography>
        <Divider />
      </Box>

      {error && (
        <Box sx={{ px: 3, maxWidth: 'lg', mx: 'auto', mt: 2 }}>
          <Alert severity="error">An error occurred while searching. Please try again.</Alert>
        </Box>
      )}
      {searchTerm && !isFetching && searchResults?.length === 0 && (
        <Box sx={{ px: 3, maxWidth: 'lg', mx: 'auto', mt: 2 }}>
          <Alert severity="info">No users found in &quot;{searchTerm}&quot;.</Alert>
        </Box>
      )}

      <AdminTableLayout
        title="Search Customers and Sellers"
        columns={columns}
        data={flatData}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        isLoading={false}
        isError={false}
        getRowId={(row) => row._uniqueId}
        headerContent={searchHeader}
      />
    </>
  );
};
