import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { modalStyle } from "../../../../constants/styles";
import { useEffect, useState } from "react";
import useConfirmationModalStore from "../../../../store/confirmationModalStore";
import useSnackbarStore from "../../../../store/snackbarStore";
import useProductStore from "../../../../store/productStore";
import useBrandStore from "../../../../store/brandStore";
import { useNavigate } from "react-router-dom";
import { validateProduct } from "../../../../utils/validations";

const ModalEditProduct = ({ product, isOpen, handleClose }) => {
  const navigate = useNavigate();
  const { showModal } = useConfirmationModalStore();
  const { showSnackbar } = useSnackbarStore();
  const { loading, updateProduct } = useProductStore();
  const { brands } = useBrandStore();
  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    image_url: product.image_url,
    price: product.price,
    brand: product.brand._id,
  });
  const [errors, setErrors] = useState([]);
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    const hasChanges = Object.keys(formData).some(key => {
      if (key === 'brand') {
        return formData[key] !== product.brand._id;
      }
      return formData[key] !== product[key];
    });
    setIsFormChanged(hasChanges);
  }, [formData, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationErrors = validateProduct(formData);

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    showModal("¿Deseas actualizar el producto?", async () => {
      try {
        await updateProduct({
          id: product._id,
          ...formData,
        });
        handleClose();
        showSnackbar("El producto se actualizó correctamente", "success");
      } catch (error) {
        setErrors(Array.isArray(error) ? error.map((err) => err.msg) : [error]);
      }
    });
  };

  return (
    <Modal
      aria-labelledby="Modal editar producto"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={isOpen}>
        <Box sx={{ ...modalStyle, overflow: "auto", maxHeight: "90vh" }}>
          <Typography variant="h6" align="center">
            ID: {product._id}
          </Typography>
          <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }} onSubmit={handleUpdate}>
            <FormControl fullWidth>
              <TextField
                size="small"
                margin="normal"
                required
                fullWidth
                label="Nombre"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Descripción"
                multiline
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormControl>
            <Box sx={{ display: "flex", gap: 2, my: 1 }}>
              <FormControl fullWidth>
                <TextField
                  label="Precio"
                  type="number"
                  size="small"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  }}
                />
              </FormControl>
              <FormControl fullWidth>
                <InputLabel id="brand-select">Marca</InputLabel>
                <Select
                  labelId="brand-select"
                  id="brand-select"
                  name="brand"
                  size="small"
                  value={formData.brand}
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
                size="small"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
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
            <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
              <Button
                variant="outlined"
                color="success"
                type="submit"
                disabled={loading || !isFormChanged}
              >
                {loading ? <CircularProgress size={24} /> : "Actualizar"}
              </Button>
              <Button
                variant="contained"
                sx={{ ml: 2 }}
                color="error"
                onClick={handleClose}
              >
                Cancelar
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ModalEditProduct;