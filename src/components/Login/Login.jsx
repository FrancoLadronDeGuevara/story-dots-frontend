import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import CookiesInformation from "./CookiesInformation/CookiesInformation";
import { useState } from "react";
import useUserStore from "../../store/userStore";
import useSnackbarStore from "../../store/snackbarStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, getUser } = useUserStore();
  const { showSnackbar } = useSnackbarStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showSnackbar("Bienvenido", "success");
      getUser();
    } catch (error) {
      showSnackbar(error, "error");
    }
  };

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        maxWidth="sm"
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 1,
          backgroundColor: "#fff",
          boxShadow: 1,
          mx: 1,
        }}
      >
        <Typography variant="h3" textAlign="center">
          Iniciar sesión
        </Typography>

        <FormControl fullWidth sx={{ my: 2, minWidth: 120 }}>
          <TextField
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
        </FormControl>
        <FormControl fullWidth sx={{ my: 2, minWidth: 120 }}>
          <TextField
            label="Contraseña"
            type="password"
            required
            value={password}
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormControl>
        <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
          <CookiesInformation />
          <Typography sx={{ color: "gray" }}>
            Las &apos;Cookies&apos; deben estar habilitadas en su navegador
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            type="submit"
            disabled={loading}
            variant="contained"
            sx={{ m: 1, minWidth: 120 }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Iniciar sesión"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
