import { sortProducts } from './product';
import { products, sortedProducts } from 'constants/testData';

test('[Utils] sortProduct function work properly', () => {
  expect(sortedProducts).toStrictEqual(sortProducts(products));
});
