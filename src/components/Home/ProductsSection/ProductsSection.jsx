import { useEffect, useState } from "react";
import { Box, Container, Skeleton, Typography } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import useProductStore from "../../../store/productStore";
import ProductCard from "../../ProductCard/ProductCard";
import "keen-slider/keen-slider.min.css"; // Asegúrate de tener este import para los estilos de Keen Slider

const ProductsSection = () => {
  const { products, loading } = useProductStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderReady, setSliderReady] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setSliderReady(true);
    },
    breakpoints: {
      "(max-width: 900px)": {
        slides: { perView: 3, spacing: 10 },
      },
      "(max-width: 600px)": {
        slides: { perView: 2, spacing: 10 },
      },
      "(max-width: 400px)": {
        slides: { perView: 1, spacing: 10 },
      },
    },
  });

  useEffect(() => {
    if (!loading && products.length > 0 && sliderReady) {
      instanceRef.current?.update();
    }
  }, [loading, products, sliderReady, instanceRef]);

  const showArrows = !loading && products.length > 0 && sliderReady;

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ color: "#414141" }}>
          Ofertas de la semana
        </Typography>
        <Typography variant="h6" sx={{ color: "gray" }}>
          Mirá las ofertas que tenemos para vos!
        </Typography>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 6,
          }}
        >
          {[...Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              variant="rectangular"
              sx={{
                bgcolor: "grey.500",
                width: 200,
                height: 350,
                borderRadius: 2,
              }}
            />
          ))}
        </Box>
      ) : (
        <Box className="navigation-wrapper" sx={{ position: "relative" }}>
          <Box ref={sliderRef} className="keen-slider" sx={{ my: 3 }}>
            {products?.map((product, index) => (
              <Box
                className={`keen-slider__slide number-slide${index}`}
                key={product._id}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  py: 3,
                }}
              >
                <ProductCard product={product} />
              </Box>
            ))}
          </Box>

          {showArrows && (
            <>
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />
              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef?.current?.track?.details?.slides?.length - 1
                }
              />
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

function Arrow(props) {
  const disabled = props.disabled ? " arrow--disabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${
        props.left ? "arrow--left" : "arrow--right"
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        width: 40,
        height: 40,
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 1,
        left: props.left ? "-20px" : "auto",
        right: props.left ? "auto" : "-20px",
        cursor: "pointer",
        fill: "#d81d26",
      }}
    >
      {props.left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!props.left && (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}

export default ProductsSection;
