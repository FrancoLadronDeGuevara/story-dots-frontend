export const getRandomProducts = (productsArray, count) => {
  const shuffled = [...productsArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};
