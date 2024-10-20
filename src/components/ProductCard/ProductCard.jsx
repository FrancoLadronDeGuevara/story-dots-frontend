import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { formatPrice } from "../../utils/formatPrice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Card
      sx={{
        width: 200,
        height: 380,
        display: "flex",
        flexDirection: "column",
        ":hover": { boxShadow: 10 },
      }}
    >
      <Box sx={{ height: 150, position: "relative" }}>
        <CardMedia
          component="img"
          image={product.image_url}
          alt={product.name}
          sx={{
            width: "100%",
            height: "100%",
            mx: "auto",
            objectFit: "contain",
          }}
        />
        <Box
          component="img"
          alt="logo"
          src={product.brand.logo_url}
          sx={{
            position: "absolute",
            top: 0,
            right: 10,
            width: 40,
            height: 40,
            objectFit: "contain",
          }}
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, py: 0 }}>
        <Box sx={{ height: 50, display: "flex", alignItems: "center" }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: "bold", color: "#414141" }}
          >
            {product.name}
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "red",
            fontSize: 24,
            textAlign: "right",
          }}
        >
          {formatPrice(product.price)}
        </Typography>
        <Typography
          variant="body2"
          color="darkgrey"
          sx={{
            textAlign: "justify",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxHeight: 80,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            my: 1,
          }}
        >
          {product.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => navigate(`/product/${product._id}`)}
          size="small"
          color="primary"
          sx={{ width: "100%" }}
        >
          Ver Detalles
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
