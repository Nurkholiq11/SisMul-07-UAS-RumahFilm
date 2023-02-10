import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { IconX } from '@tabler/icons';

export default function Modal({ title, children, btnCancel, btnConfirm, open, onClose, onConfirm, loading }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Dialog fullScreen={fullScreen} fullWidth open={open} onClose={onClose} maxWidth="md" sx={{ zIndex: 101 }}>
        {loading ? (
          <Backdrop open={loading}>
            <Stack alignItems="center">
              <CircularProgress color="inherit" />
            </Stack>
          </Backdrop>
        ) : (
          open && (
            <>
              <DialogTitle
                sx={{
                  background: theme.palette.primary.main,
                  color: '#fff',
                  mb: 2,
                }}
                id="responsive-dialog-title"
              >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Typography variant="h6" sx={{ color: '#fff' }}>
                    {title}
                  </Typography>
                  <IconButton onClick={onClose}>
                    <IconX />
                  </IconButton>
                </Stack>
              </DialogTitle>
              <DialogContent>{children}</DialogContent>
              <DialogActions sx={{ pr: 2.5 }}>
                {btnConfirm && (
                  <Button variant="contained" size="small" onClick={onConfirm} autoFocus>
                    {btnConfirm || 'Yes'}
                  </Button>
                )}
                {btnCancel && (
                  <Button size="small" autoFocus onClick={onClose} color="secondary" variant="outlined">
                    {btnCancel || 'No'}
                  </Button>
                )}
              </DialogActions>
            </>
          )
        )}
      </Dialog>
    </>
  );
}

Modal.propTypes = {
  title: PropTypes.string,
  severity: PropTypes.string,
  children: PropTypes.node,
  btnCancel: PropTypes.string,
  btnConfirm: PropTypes.string,
  open: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
};
