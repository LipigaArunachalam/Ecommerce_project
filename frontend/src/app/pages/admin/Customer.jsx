import { useState } from 'react';
import { Typography } from '@mui/material';
import { AdminTableLayout, useGetAllCustomerQuery } from '../../../shared';

export const Customers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, isError } = useGetAllCustomerQuery({
    page: page + 1,
    limit: rowsPerPage,
  });

  const columns = [
    {
      key: 'customer_name',
      label: 'Name',
      render: (row) => (
        <Typography variant="body2" fontWeight={600} sx={{ textTransform: 'capitalize' }}>
          {row.customer_name}
        </Typography>
      ),
    },
    { key: 'customer_email', label: 'Email' },
    { key: 'customer_state', label: 'State' },
    { key: 'customer_city', label: 'City' },
    { key: 'customer_zip_code', label: 'Zipcode' },
  ];

  return (
    <AdminTableLayout
      title="Customers"
      columns={columns}
      data={data || []}
      page={page}
      onPageChange={(_, newPage) => setPage(newPage)}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      isLoading={isLoading}
      isError={isError}
      getRowId={(row) => row._id}
    />
  );
};
