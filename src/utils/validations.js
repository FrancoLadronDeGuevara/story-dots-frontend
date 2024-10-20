import {
  brandLogoUrlRegex,
  brandNameRegex,
  descriptionRegex,
  priceRegex,
  productImageUrlRegex,
  productNameRegex,
} from "../constants/regularExpressions";

export const validateBrand = ({ name, logoUrl }) => {
  const errors = [];

  if (!brandNameRegex.test(name)) {
    errors.push("Por favor, ingresa un nombre de marca válido");
  }

  if (!brandLogoUrlRegex.test(logoUrl)) {
    errors.push("Por favor, ingresa una URL de imagen válida");
  }

  return errors;
};

export const validateProduct = ({
  name,
  description,
  image_url,
  price,
  brand,
}) => {
  const errors = [];

  if (!productNameRegex.test(name)) {
    errors.push("Por favor, ingresa un nombre de producto válido");
  }

  if (!productImageUrlRegex.test(image_url)) {
    errors.push("Por favor, ingresa una URL de imagen válida");
  }

  if (!descriptionRegex.test(description)) {
    errors.push("Por favor, ingresa una descripción válida");
  }

  if (!priceRegex.test(price)) {
    errors.push("Por favor, ingresa un precio válido");
  }

  if (!brand) {
    errors.push("Por favor, selecciona una marca");
  }

  return errors;
};
