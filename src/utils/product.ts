import { products } from '../products';

import { Product } from 'Product-Types';

export const sortProducts = (products: Product[]) =>
  products
    .slice()
    .sort((productA, productB) => productB.votes - productA.votes);

// In real word scenario, we will fetch products from api
export const fetchProducts = () => {
  return products;
};
