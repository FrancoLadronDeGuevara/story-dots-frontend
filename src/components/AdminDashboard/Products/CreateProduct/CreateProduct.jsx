import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useBrandStore from "../../../../store/brandStore";
import { useNavigate } from "react-router-dom";
import useSnackbarStore from "../../../../store/snackbarStore";
import useProductStore from "../../../../store/productStore";
import { validateProduct } from "../../../../utils/validations";

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    price: "",
    brand: "",
  });
  const [errors, setErrors] = useState([]);
  const { brands } = useBrandStore();
  const { showSnackbar } = useSnackbarStore();
  const { createProduct } = useProductStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    const validationErrors = validateProduct(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      createProduct(formData);
      showSnackbar("Producto creado con éxito", "success");
      setFormData({
        name: "",
        description: "",
        image_url: "",
        price: "",
        brand: "",
      });
      setErrors([]);
    } catch (error) {
      setErrors(Array.isArray(error) ? error.map((err) => err.msg) : [error]);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" textAlign="center" sx={{ mt: 2 }}>
        Crear Producto
      </Typography>
      <Box component="form" onSubmit={handleCreateProduct}>
        <FormControl fullWidth>
          <TextField
            label="Nombre"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            label="Descripción"
            type="text"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
          />
        </FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            my: 2,
            gap: 2,
          }}
        >
          <FormControl fullWidth>
            <TextField
              label="Precio"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              variant="outlined"
              required
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">$</InputAdornment>
                  ),
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="brand-select">Marca</InputLabel>
            <Select
              labelId="brand-select"
              id="brand-select"
              name="brand"
              value={formData.brand}
              label="Marca"
              onChange={handleChange}
              required
            >
              {brands.map((brand) => (
                <MenuItem key={brand._id} value={brand._id}>
                  {brand.name}
                </MenuItem>
              ))}
              <Button
                variant="standard"
                size="small"
                onClick={() => navigate("/admin/create-brand")}
                sx={{ bgcolor: "#f5f5f5", ml: 1, my: 1 }}
              >
                Agregar marca +
              </Button>
            </Select>
          </FormControl>
        </Box>
        <FormControl fullWidth>
          <TextField
            label="Imagen URL"
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
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
            Crear Producto
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateProduct;
