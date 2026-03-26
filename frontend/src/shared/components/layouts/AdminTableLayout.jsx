import React from 'react';
import {
  Box,
  Card,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Container,
  TablePagination,
  CircularProgress,
  Alert,
  styled,
  alpha,
} from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  boxShadow: 'none',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.4),
  backdropFilter: 'blur(8px)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.background.neutral || alpha(theme.palette.grey[500], 0.08),
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 700,
  fontSize: '12px',
  textTransform: 'uppercase',
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  letterSpacing: '0.05em',
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    transition: theme.transitions.create('background-color'),
  },
}));

const DataCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontSize: '14px',
}));

export const AdminTableLayout = ({
  title,
  columns = [],
  data = [],
  page = 0,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
  totalCount,
  isLoading = false,
  isError = false,
  headerActions,
  headerContent,
  getRowId = (row) => row.id || row._id,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          An error occurred while fetching data. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
        mb={4}
      >
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {title}
        </Typography>
        {headerActions && (
          <Box display="flex" gap={1.5} width={{ xs: '100%', sm: 'auto' }}>
            {headerActions}
          </Box>
        )}
      </Box>

      <Card
        sx={{
          borderRadius: 4,
          background: (theme) => theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.7)' 
            : 'rgba(20, 28, 30, 0.7)',
          backdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.125)',
          boxShadow: '0 8px 32px 0 rgba(79, 124, 130, 0.15)',
          overflow: 'hidden',
        }}
      >
        {headerContent && <Box sx={{ p: 2.5 }}>{headerContent}</Box>}
        
        <StyledTableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <StyledTableHead>
              <TableRow>
                {columns.map((col) => (
                  <HeaderCell key={col.key}>
                    {col.label}
                  </HeaderCell>
                ))}
              </TableRow>
            </StyledTableHead>

            <TableBody>
              {data.map((row, index) => (
                <StyledRow
                  key={getRowId(row) || index}
                >
                  {columns.map((col) => (
                    <DataCell key={col.key}>
                      {col.key === 'order_id' ? (
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          #{row[col.key]}
                        </Typography>
                      ) : col.render ? (
                        col.render(row)
                      ) : (
                        row[col.key]
                      )}
                    </DataCell>
                  ))}
                </StyledRow>
              ))}
              {data.length === 0 && (
                <TableRow>
                  <DataCell colSpan={columns.length} align="center" sx={{ py: 10 }}>
                    <Typography variant="body1" color="text.secondary">
                      No data found
                    </Typography>
                  </DataCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <TablePagination
          component="div"
          count={totalCount ?? (data.length < rowsPerPage ? page * rowsPerPage + data.length : -1)}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 25]}
          sx={{
            py: 1,
            px: 2,
            borderTop: `1px solid ${alpha('#919EAB', 0.12)}`,
            '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'text.secondary',
            },
          }}
        />
      </Card>
    </Container>
  );
};
