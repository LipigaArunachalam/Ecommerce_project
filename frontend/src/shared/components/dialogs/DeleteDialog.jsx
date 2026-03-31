import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';

export const DeleteDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Delete',
  description = 'Are you sure want to delete?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  isLoading,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { borderRadius: 2, minWidth: { xs: 280, sm: 320 }, p: 1 },
      }}
    >
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.125rem' }}>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isLoading}
          sx={{
            fontWeight: 600,
            borderRadius: 1.5,
            px: 3,
            bgcolor: 'error.main',
            '&:hover': { bgcolor: 'error.dark' },
          }}
        >
          {isLoading ? 'loading...' : confirmText}
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          disabled={isLoading}
          sx={{
            color: 'text.primary',
            borderColor: 'divider',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 1.5,
            px: 3,
          }}
        >
          {cancelText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
