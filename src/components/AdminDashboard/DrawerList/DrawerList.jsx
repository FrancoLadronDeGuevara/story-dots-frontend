import {
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { FaHome } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { BsBagPlusFill } from "react-icons/bs";
import { BsFillBagFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import useSnackbarStore from "../../../store/snackbarStore";
import useConfirmationModalStore from "../../../store/confirmationModalStore";
import useUserStore from "../../../store/userStore";

const itemsList = [
  {
    value: 0,
    name: "Ir al Inicio",
    path: "/",
    icon: <FaHome size={20} />,
  },
  {
    value: 1,
    name: "Productos",
    path: "products",
    icon: <FaCartShopping size={20} />,
  },
  {
    value: 2,
    name: "Marcas",
    path: "brands",
    icon: <BsFillBagFill size={20} />,
  },
];

const createList = [
  {
    name: "Crear producto",
    path: "create-product",
    icon: <FaCartPlus size={20} />,
  },
  {
    name: "Crear marca",
    path: "create-brand",
    icon: <BsBagPlusFill />,
  },
];

const DrawerList = () => {
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbarStore();
  const { showModal } = useConfirmationModalStore();
  const { logout } = useUserStore();

  const handleLogoutUser = () => {
    showModal("¿Deseas cerrar sesión?", async () => {
      try {
        await logout();
        showSnackbar("Sesión cerrada", "success");
        navigate("/");
      } catch (error) {
        showSnackbar(error, "error");
      }
    });
  };

  return (
    <div>
      <Divider />
      <Avatar
        alt="user profile image"
        src="https://cdn-icons-png.flaticon.com/512/3251/3251650.png"
        sx={{ m: 2, width: 100, height: 100, mx: "auto" }}
      />
      <Box sx={{ width: "100%", textAlign: "center" }}>
        <Typography sx={{ my: 2, fontWeight: "bold", color: "#424242" }}>
          Administrador
        </Typography>
      </Box>
      <Divider />
      <List>
        {itemsList.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(text.path)}
          >
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {createList.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
            onClick={() => navigate(text.path)}
          >
            <ListItemButton>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogoutUser}>
            <ListItemIcon>
              <IoLogOut size={20} style={{ color: "#d81d26" }} />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );
};

export default DrawerList;
