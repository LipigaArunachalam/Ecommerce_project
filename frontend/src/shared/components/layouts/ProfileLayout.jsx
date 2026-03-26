import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Grid,
  Divider,
  Chip,
  CircularProgress,
  Alert,
  Stack,
} from '@mui/material';
import { Person } from '@mui/icons-material';

export const ProfileLayout = ({
  data,
  isLoading = false,
  isError = false,
  fields = [],
  nameKey = 'username',
  roleKey = 'role',
  avatarKey = 'username',
  actions,
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error">Error loading profile.</Alert>
      </Container>
    );
  }

  if (!data) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="info">Profile data not available.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4, m: 0 }}>
      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 2,
        }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space between"
          gap={3}
          mb={4}
        >
          <Box
            display="flex"
            flexDirection={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            gap={3}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontSize: '2.5rem',
              }}
            >
              {data[avatarKey]?.charAt(0).toUpperCase()}
            </Avatar>
            <Box textAlign={{ xs: 'center', sm: 'left' }}>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ textTransform: 'capitalize' }}
              >
                {data[nameKey]}
              </Typography>
              <Chip
                label={data[roleKey]?.toUpperCase()}
                color="primary.main"
                variant="outlined"
                icon={<Person />}
              />
            </Box>
          </Box>
          {actions && <Box>{actions}</Box>}
          {/* <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontSize: '2.5rem',
            }}
          >
            {data[avatarKey]?.charAt(0).toUpperCase()}
          </Avatar>
          <Box textAlign={{ xs: 'center', sm: 'left' }}>
            <Typography
              variant="h4"
              fontWeight="bold"
              gutterBottom
              sx={{ textTransform: 'capitalize' }}
            >
              {data[nameKey]}
            </Typography>
            <Chip
              label={data[roleKey]?.toUpperCase()}
              color="primary.main"
              variant="outlined"
              icon={<Person />}
            />
          </Box> */}
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Grid container spacing={3}>
          {fields.map((field, idx) => (
            <Grid item xs={12} sm={6} key={idx}>
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                {field.icon}
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">
                    {field.label}
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {field.value || 'N/A'}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};
