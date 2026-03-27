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
  useTheme,
} from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: 'none',
  // border: `1px solid ${alpha(theme.palette.divider, 0.4)}`,
  backgroundColor: alpha(theme.palette.background.paper, 0.3),
  backdropFilter: 'blur(12px)',
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' 
    ? alpha(theme.palette.primary.main, 0.04) 
    : alpha(theme.palette.primary.main, 0.06),
}));

const HeaderCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontWeight: 700,
  fontSize: '0.75rem',
  textTransform: 'uppercase',
  padding: theme.spacing(2.5, 3),
  // borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  letterSpacing: '0.06em',
  fontFamily: '"Public Sans", sans-serif',
}));

const StyledRow = styled(TableRow)(({ theme }) => ({
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.03),
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.05)}`,
    position: 'relative',
    zIndex: 1,
  },
}));

const DataCell = styled(TableCell)(({ theme }) => ({
  padding: theme.spacing(2.5, 3),
  // borderBottom: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
  fontSize: '0.9rem',
  fontFamily: '"Public Sans", sans-serif',
  fontWeight: 500,
  color: theme.palette.text.primary,
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
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 3, fontFamily: '"Public Sans", sans-serif' }}>
          An error occurred while fetching data. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: { xs: 3, md: 5 } }}>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        gap={2}
        mb={4}
        sx={{ px: { xs: 1, md: 0 } }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 800, 
            fontFamily: '"Public Sans", sans-serif',
            letterSpacing: '-0.03em',
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
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
          borderRadius: '24px',
          background: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.8)' 
            : 'rgba(18, 26, 30, 0.8)',
          backdropFilter: 'blur(24px) saturate(200%)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          boxShadow: theme.palette.mode === 'light'
            ? '0 8px 32px 0 rgba(79, 124, 130, 0.08)'
            : '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
      >
        {headerContent && <Box sx={{ p: 3 }}>{headerContent}</Box>}
        
        <StyledTableContainer component={Paper} elevation={0} square>
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
                <StyledRow key={getRowId(row) || index}>
                  {columns.map((col) => (
                    <DataCell key={col.key}>
                      {col.key === 'order_id' ? (
                        <Typography
                          variant="subtitle2"
                          sx={{
                            color: 'primary.main',
                            fontWeight: 700,
                            fontFamily: '"Public Sans", sans-serif',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '6px',
                            background: alpha(theme.palette.primary.main, 0.08),
                            transition: 'all 0.2s',
                            '&:hover': { 
                              background: alpha(theme.palette.primary.main, 0.15),
                              transform: 'scale(1.02)'
                            }
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
                  <DataCell colSpan={columns.length} align="center" sx={{ py: 12 }}>
                    <Typography 
                      variant="body1" 
                      color="text.secondary"
                      sx={{ fontFamily: '"Public Sans", sans-serif', fontWeight: 500 }}
                    >
                      No data found
                    </Typography>
                  </DataCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </StyledTableContainer>

        <Box sx={{ 
          borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          background: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.4)' 
            : 'rgba(0, 0, 0, 0.2)',
        }}>
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
              px: { xs: 1, sm: 3 },
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'text.secondary',
                fontFamily: '"Public Sans", sans-serif',
              },
              '& .MuiTablePagination-select': {
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 600,
              }
            }}
          />
        </Box>
      </Card>
    </Container>
  );
};
