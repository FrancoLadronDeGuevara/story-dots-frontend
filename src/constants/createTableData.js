export const createBrandData = (_id, name, logo_url) => ({ _id, name, logo_url });

export const createProductData = (_id, name, description, price, image_url, brand) => ({
    _id,
    name,
    description,
    price,
    image_url,
    brand
});