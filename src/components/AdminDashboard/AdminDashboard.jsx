import {
    AppBar,
    Box,
    CssBaseline,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
  } from "@mui/material";
  import { LuMenuSquare } from "react-icons/lu";

  import { useState } from "react";
  import { Outlet } from "react-router-dom";
  import DrawerList from "./DrawerList/DrawerList";
  
  const drawerWidth = 240;
  
  const AdminDashboard = ({window}) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
  
    const handleDrawerClose = () => {
      setIsClosing(true);
      setMobileOpen(false);
    };
  
    const handleDrawerTransitionEnd = () => {
      setIsClosing(false);
    };
  
    const handleDrawerToggle = () => {
      if (!isClosing) {
        setMobileOpen(!mobileOpen);
      }
    };
  
    const container =
      window !== undefined ? () => window().document.body : undefined;
  
    return (
      <>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              backgroundColor: "#f2f2f2",
            }}
          >
            <Toolbar>
              <IconButton
                color="#414141"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <LuMenuSquare size={30} />
              </IconButton>
              <Typography
                variant="h6"
                sx={{
                  color: "#424242",
                  textAlign: "center",
                  width: "100%",
                  display: { xs: "none", sm: "block" },
                }}
              >
                PANEL ADMINISTRADOR
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onTransitionEnd={handleDrawerTransitionEnd}
              onClose={handleDrawerClose}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              <DrawerList />
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                  backgroundColor: "#f2f2f2",
                },
              }}
              open
            >
              <DrawerList />
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              py: 10
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </>
    );
  };
  
  export default AdminDashboard;