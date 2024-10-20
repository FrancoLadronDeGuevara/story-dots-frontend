import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../store/productStore";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  Typography,
  Paper,
  Chip,
  Rating,
} from "@mui/material";
import { formatPrice } from "../../utils/formatPrice";
import { getRandomProducts } from "../../utils/randomProducts";
import ProductCard from "../ProductCard/ProductCard";

const ProductDetails = () => {
  const { id } = useParams();
  const { getProduct, product, products, loading } = useProductStore();

  useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  const randomProducts = getRandomProducts(products, 4);

  const ProductInfoSkeleton = () => (
    <Box>
      <Skeleton variant="text" width="40%" height={28} />
      <Skeleton variant="text" width="70%" height={40} />
      <Skeleton variant="text" width="30%" height={60} sx={{ my: 3 }} />
      <Skeleton variant="text" width="50%" height={24} />
      <Skeleton variant="text" width="50%" height={24} sx={{ mt: 1 }} />
    </Box>
  );

  return (
    <Container maxWidth="lg" sx={{ my: 5 }}>
      <Box sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6} sx={{ height: 400 }}>
            {loading ? (
              <Skeleton
                variant="rounded"
                sx={{ bgcolor: "lightgray", width: "100%", height: "100%" }}
              />
            ) : (
              <Box
                component="img"
                src={product?.image_url}
                alt={product?.name}
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            {loading ? (
              <ProductInfoSkeleton />
            ) : (
              <Box>
                <Chip label={product?.brand?.name} sx={{ mb: 1 }} />
                <Typography variant="h4" sx={{ color: "#424242", mt: 1 }}>
                  {product?.name}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", mb: 2, mt: 1 }}
                >
                  <Rating value={5} precision={0.5} readOnly />
                  <Typography variant="body2" sx={{ ml: 1, color: "gray" }}>
                    ({Math.floor(Math.random() * 100)} opiniones)
                  </Typography>
                </Box>
                <Typography
                  variant="h4"
                  sx={{ color: "#d81d26", my: 3, fontWeight: "bold" }}
                >
                  {formatPrice(product?.price)}
                </Typography>
                <Typography variant="body1" sx={{ color: "gray" }}>
                  - Origen: Argentina
                </Typography>
                <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
                  - Envío: Gratuito
                </Typography>
                <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
                  - Stock: {Math.floor(Math.random() * 100)} unidades
                  disponibles
                </Typography>
                <Typography variant="body1" sx={{ color: "gray", mt: 1 }}>
                  - SKU: {id?.slice(0, 10)}
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            color: "#424242",
            borderBottom: "2px solid #d81d26",
            pb: 1,
            mb: 2,
          }}
        >
          Descripción
        </Typography>
        {loading ? (
          <Skeleton variant="text" height={100} />
        ) : (
          <Typography variant="body1" sx={{ color: "gray", mt: 2 }}>
            {product?.description}
          </Typography>
        )}
      </Box>

      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ color: "#424242", mb: 3 }}>
          También te puede interesar
        </Typography>
        <Grid container spacing={2}>
          {randomProducts.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={product._id}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProductDetails;
