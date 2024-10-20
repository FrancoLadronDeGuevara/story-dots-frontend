import { Alert, Snackbar } from "@mui/material";
import useSnackbarStore from "../../store/snackbarStore";

const GlobalSnackbar = () => {
  const { isOpen, message, severity, closeSnackbar } = useSnackbarStore();

  const handleClose = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackbar();
  };
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Alert severity={severity} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
