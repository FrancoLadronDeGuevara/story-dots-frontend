export const formatPrice = (price) => {
    return new Intl.NumberFormat("es-Ar", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };