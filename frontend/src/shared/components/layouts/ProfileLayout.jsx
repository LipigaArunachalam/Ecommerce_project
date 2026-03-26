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
  alpha
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
    <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, sm: 3 } }}>
      <Paper
        elevation={0}
        sx={(theme) => ({
          p: { xs: 3, md: 5 },
          borderRadius: '24px',
          background: theme.palette.mode === 'light' 
            ? 'rgba(255, 255, 255, 0.75)' 
            : 'rgba(18, 26, 30, 0.75)',
          backdropFilter: 'blur(20px) saturate(200%)',
          border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(79, 124, 130, 0.12)' : 'rgba(184, 227, 233, 0.08)'}`,
          boxShadow: theme.palette.mode === 'light'
            ? '0 12px 48px rgba(79, 124, 130, 0.08)'
            : '0 12px 48px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          position: 'relative',
        })}
      >
        {/* Decorative background blob */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: (theme) => alpha(theme.palette.primary.main, 0.05),
            filter: 'blur(60px)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            display="flex"
            flexDirection={{ xs: 'column', md: 'row' }}
            alignItems={{ xs: 'center', md: 'flex-start' }}
            justifyContent="space-between"
            gap={4}
            mb={5}
          >
            <Box
              display="flex"
              flexDirection={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              gap={3}
            >
              <Avatar
                sx={(theme) => ({
                  width: 110,
                  height: 110,
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                  fontSize: '3rem',
                  fontWeight: 800,
                  fontFamily: '"Public Sans", sans-serif',
                  boxShadow: `0 8px 24px ${alpha(theme.palette.primary.main, 0.3)}`,
                  border: `4px solid ${theme.palette.background.paper}`,
                })}
              >
                {data[avatarKey]?.charAt(0).toUpperCase()}
              </Avatar>
              <Box textAlign={{ xs: 'center', sm: 'left' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    fontFamily: '"Public Sans", sans-serif',
                    textTransform: 'capitalize',
                    mb: 1,
                  }}
                >
                  {data[nameKey]}
                </Typography>
                <Chip
                  label={data[roleKey]?.toUpperCase()}
                  color="primary"
                  variant="outlined"
                  icon={<Person sx={{ fontSize: 16 }} />}
                  sx={{
                    fontFamily: '"Public Sans", sans-serif',
                    fontWeight: 700,
                    borderRadius: '8px',
                    borderWidth: '1.5px',
                    letterSpacing: '0.02em',
                    px: 0.5,
                  }}
                />
              </Box>
            </Box>
            
            {actions && (
              <Box sx={{ width: { xs: '100%', md: 'auto' }, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                {actions}
              </Box>
            )}
          </Box>

          <Divider sx={{ mb: 5, opacity: 0.5 }} />

          <Grid container spacing={3}>
            {fields.map((field, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper
                  variant="outlined"
                  sx={(theme) => ({
                    p: 2.5,
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    background: alpha(theme.palette.background.paper, 0.4),
                    borderColor: alpha(theme.palette.primary.main, 0.1),
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: alpha(theme.palette.primary.main, 0.04),
                      transform: 'translateY(-2px)',
                      borderColor: alpha(theme.palette.primary.main, 0.2),
                    },
                  })}
                >
                  <Box
                    sx={(theme) => ({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 40,
                      height: 40,
                      borderRadius: '10px',
                      background: alpha(theme.palette.primary.main, 0.1),
                      color: theme.palette.primary.main,
                      flexShrink: 0,
                    })}
                  >
                    {field.icon}
                  </Box>
                  <Box sx={{ overflow: 'hidden' }}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        fontFamily: '"Public Sans", sans-serif',
                        display: 'block',
                        mb: 0.5,
                      }}
                    >
                      {field.label}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 600,
                        fontFamily: '"Public Sans", sans-serif',
                        wordBreak: 'break-word',
                      }}
                    >
                      {field.value || '—'}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};
