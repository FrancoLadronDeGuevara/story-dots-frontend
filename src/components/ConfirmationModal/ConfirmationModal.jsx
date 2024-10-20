import { Backdrop, Box, Button, Fade, Modal, Typography } from "@mui/material";
import useConfirmationModalStore from "../../store/confirmationModalStore";
import { modalStyle } from "../../constants/styles";



const ConfirmationModal = () => {
  const { isModalOpen, title, closeModal, confirm } = useConfirmationModalStore();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={isModalOpen}
      onClose={closeModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={isModalOpen}>
        <Box sx={modalStyle}>
          <Typography id="transition-modal-title" variant="h4" component="h2" align="center">
            {title}
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button variant="outlined" color="success" onClick={confirm}>Confirmar</Button>
            <Button variant="contained" sx={{ ml: 2}} color="error" onClick={closeModal}>Cancelar</Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmationModal;
