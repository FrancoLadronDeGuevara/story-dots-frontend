import Popover from "@mui/material/Popover";
import { Box, Button, Typography } from "@mui/material";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { useState } from "react";

const CookiesInformation = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <Box sx={{ display: "inline" }}>
      <Button aria-describedby={id} onClick={handleClick} sx={{ p: 0, m: 0 }}>
        <IoIosHelpCircleOutline size={30}/>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        sx={{
          backgroundColor: "#00000080",
          "& .MuiPaper-root": {
            width: "300px",
          },
        }}
      >
        <Typography sx={{ p: 2, color: "gray" }}>
          Utilizamos cookies para garantizar que nuestra plataforma funcione
          correctamente. Al iniciar sesión, nuestro sistema coloca un token de
          autenticación en las cookies de tu navegador. Este token es esencial
          para identificar a los usuarios registrados y mantener su sesión
          activa.
        </Typography>
      </Popover>
    </Box>
  );
};

export default CookiesInformation;