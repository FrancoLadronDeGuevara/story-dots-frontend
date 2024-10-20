export const productNameRegex = /^(?!\s*$)(?!^\d+$)[A-Za-zÀ-ÿ0-9\s&'.,()-]{3,100}$/;

export const descriptionRegex = /^(?!\s*$)(?!^\d+$).{10,500}$/s;

export const priceRegex = /^(?!0(\.0{1,2})?$)(\d{1,6}(\.\d{1,2})?)$/;

export const productImageUrlRegex = /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i;

export const brandNameRegex = /^(?!\s*$)[A-Za-zÀ-ÿ0-9\s&'-]{2,50}$/;

export const brandLogoUrlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\.?)(\/[\w\-._~:\/?#[\]@!$&'()*+,;=]*)?$/;