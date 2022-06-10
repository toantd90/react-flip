import { faker } from '@faker-js/faker';

export const products = new Array(10).fill().map((_) => ({
  id: faker.datatype.uuid(),
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  url: faker.internet.url(),
  votes: faker.datatype.number({ min: 10, max: 100 }),
  submitterAvatarUrl: faker.image.avatar(),
  productImageUrl: faker.image.imageUrl(200, 200, 'product', true),
}));
