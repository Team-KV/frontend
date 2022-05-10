import * as React from 'react';
import Stack from '@mui/material/Stack';
import { Snackbar as MuiSnackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from 'hooks';
import { hideSnackbar } from 'redux/slices/snackbarSlice';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Snackbar() {
  const dispatch = useAppDispatch();
  const snackbarOpen = useAppSelector((state) => state.snackbar.snackbarOpen);
  const snackbarType = useAppSelector((state) => state.snackbar.snackbarType);
  const snackbarMessage = useAppSelector(
    (state) => state.snackbar.snackbarMessage
  );

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') return;
    dispatch(hideSnackbar());
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <MuiSnackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarType}
          sx={{ width: '100%', marginX: 'auto' }}
        >
          {snackbarMessage}
        </Alert>
      </MuiSnackbar>
    </Stack>
  );
}
