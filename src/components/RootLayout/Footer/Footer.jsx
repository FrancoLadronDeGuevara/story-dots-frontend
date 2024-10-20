import { Box, Container, Divider, Link, Typography } from "@mui/material";
import { FaFacebookSquare } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", py: 2, gap: 4 }}>
        <Link
          href="https://www.facebook.com/FrancoDeGuevara/"
          target="_blank"
          sx={{ ":hover": { transition: "ease-in-out 0.2s", scale: 1.2 } }}
        >
          <FaFacebookSquare
            size={40}
            style={{ cursor: "pointer", color: "#3b5998" }}
          />
        </Link>
        <Link
          href="https://franco-guevara-portfolio.vercel.app/"
          target="_blank"
          sx={{ ":hover": { transition: "ease-in-out 0.2s", scale: 1.2 } }}
        >
          <FaBriefcase
            size={40}
            style={{ cursor: "pointer", color: "#c26f0a" }}
          />
        </Link>
        <Link
          href="https://wa.me/543815367724?text=Hola%20Franco%20Guevara!"
          target="_blank"
          sx={{ ":hover": { transition: "ease-in-out 0.2s", scale: 1.2 } }}
        >
          <FaWhatsappSquare
            size={40}
            style={{ cursor: "pointer", color: "#25D366" }}
          />
        </Link>
      </Box>
      <Divider />
      <Typography
        variant="body2"
        component="p"
        sx={{
          textAlign: "center",
          py: 1
        }}
      >
        © Franco Guevara {new Date().getFullYear()}
      </Typography>
    </Container>
  );
};

export default Footer;
