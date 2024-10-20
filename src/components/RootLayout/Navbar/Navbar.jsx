import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import useUserStore from "../../../store/userStore";
import useSnackbarStore from "../../../store/snackbarStore";
import useConfirmationModalStore from "../../../store/confirmationModalStore";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useUserStore();
  const { showSnackbar } = useSnackbarStore();
  const { showModal } = useConfirmationModalStore();

  const handleLogout = () => {
    showModal("¿Deseas cerrar sesión?", async () => {
      try {
        await logout();
        showSnackbar("Sesión cerrada", "success");
      } catch (error) {
        showSnackbar(error, "error");
      }
    });
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#f5f5f5", top: 0 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#424242" }}>
          <Typography variant="h6" component="div">
            INICIO
          </Typography>
        </Link>
        <Box>
          {user?.role === "admin" && (
            <Link
              to="/admin/products"
              style={{
                textDecoration: "none",
                color: "#424242",
                marginRight: 10,
              }}
            >
              <Button size="small" variant="outlined" sx={{ bgcolor: "#f5f5f5" }}>
                PANEL
              </Button>
            </Link>
          )}
          {isAuthenticated ? (
            <Button
              size="small"
              variant="contained"
              color="error"
              onClick={handleLogout}
            >
              Cerrar Sesion
            </Button>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button size="small" variant="contained" color="error">
                Iniciar Sesion
              </Button>
            </Link>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
