import {
  Alert,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Fade,
  FormControl,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { modalStyle } from "../../../../constants/styles";
import { useState } from "react";
import useConfirmationModalStore from "../../../../store/confirmationModalStore";
import useBrandStore from "../../../../store/brandStore";
import useSnackbarStore from "../../../../store/snackbarStore";
import { validateBrand } from "../../../../utils/validations";

const ModalEditBrand = ({ brand, isOpen, handleClose }) => {
  const [brandName, setBrandName] = useState(brand.name);
  const [brandLogo, setBrandLogo] = useState(brand.logo_url);
  const [errors, setErrors] = useState([]);
  const { showModal } = useConfirmationModalStore();
  const { showSnackbar } = useSnackbarStore();
  const { loading, updateBrand } = useBrandStore();
  const handleUpdate = (e) => {
    e.preventDefault();

    const validationErrors = validateBrand({
      name: brandName,
      logoUrl: brandLogo,
    });

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    showModal("¿Deseas actualizar la marca?", async () => {
      try {
        await updateBrand({
          id: brand._id,
          name: brandName,
          logo_url: brandLogo,
        });
        handleClose();
        showSnackbar("La marca se actualizo correctamente", "success");
      } catch (error) {
        if (Array.isArray(error)) {
          setErrors(error.map((err) => err.msg));
        } else {
          setErrors([error]);
        }
      }
    });
  };

  return (
    <Modal
      aria-labelledby="Modal editar marca"
      aria-describedby="Formulario para editar una marca"
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isOpen}>
        <Box sx={modalStyle}>
          <Typography variant="h6" align="center">
            ID: {brand._id}
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Nombre"
                name="brandName"
                autoFocus
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                fullWidth
                label="Logo URL"
                name="brandLogo"
                autoFocus
                value={brandLogo}
                onChange={(e) => setBrandLogo(e.target.value)}
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
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="outlined"
              color="success"
              type="submit"
              onClick={handleUpdate}
              disabled={
                (brandName === brand.name && brandLogo === brand.logo_url) ||
                loading
              }
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
      </Fade>
    </Modal>
  );
};

export default ModalEditBrand;
