import { Box, CircularProgress, Container, Typography } from "@mui/material";
import { useKeenSlider } from "keen-slider/react";
import useBrandStore from "../../../store/brandStore";

const BrandsSection = () => {
  const { brands, loading } = useBrandStore();

  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap",
    slides: {
      perView: 5,
      spacing: 15,
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
    created(s) {
      s.moveToIdx(1, true, { duration: 0 });
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 1, true, { duration: 2000 });
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 1, true, { duration: 2000 });
    },
  });

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 3 }}>
        <Typography variant="h4" sx={{ color: "#414141" }}>
          Nuestras Marcas
        </Typography>
        <Typography variant="h5" sx={{ color: "gray" }}>
          Tenemos las mejores marcas!
        </Typography>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          ref={sliderRef}
          className="keen-slider"
          sx={{
            my: 4,
            height: 100,
          }}
        >
          {brands.map((brand, index) => (
            <Box
              key={brand._id}
              className={`keen-slider__slide number-slide${index}`}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                src={brand.logo_url}
                alt={brand.name}
                sx={{
                  maxWidth: "80%",
                  maxHeight: "80%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default BrandsSection;
