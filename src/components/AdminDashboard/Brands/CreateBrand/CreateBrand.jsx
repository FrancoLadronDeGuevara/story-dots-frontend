import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useBrandStore from "../../../../store/brandStore";
import useSnackbarStore from "../../../../store/snackbarStore";
import { validateBrand } from "../../../../utils/validations";

const CreateBrand = () => {
  const [brandName, setBrandName] = useState("");
  const [brandLogo, setBrandLogo] = useState("");
  const [errors, setErrors] = useState([]);
  const { createBrand } = useBrandStore();
  const { showSnackbar } = useSnackbarStore();

  const handleCreateBrand = async (e) => {
    e.preventDefault();

    const validationErrors = validateBrand({
      name: brandName,
      logoUrl: brandLogo,
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createBrand({ name: brandName, logo_url: brandLogo });
      showSnackbar("Marca creada con éxito", "success");
      setBrandName("");
      setBrandLogo("");
      setErrors([]);
    } catch (error) {
      if (Array.isArray(error)) {
        setErrors(error.map((err) => err.msg));
      } else {
        setErrors([error]);
      }
    }
  };

  return (
    <Container maxWidth={false}>
      <Typography variant="h4" textAlign="center" sx={{ mt: 2 }}>
        Crear Marca
      </Typography>
      <Box component="form" onSubmit={handleCreateBrand}>
        <FormControl fullWidth>
          <TextField
            label="Nombre"
            type="text"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Logo URL"
            type="text"
            value={brandLogo}
            onChange={(e) => setBrandLogo(e.target.value)}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        {errors.length > 0 && (
          <Box mt={2}>
            {errors.map((error, index) => (
              <Alert key={index} severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            ))}
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
          <Button variant="contained" color="success" type="submit">
            Crear Marca
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateBrand;
