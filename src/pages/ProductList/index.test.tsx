import { fireEvent, render, screen, within } from '@testing-library/react';
import ProductList from './index';

import { sortedProducts } from 'constants/testData';
import { dataTestIds } from 'constants/testIds';
import * as productUtils from 'utils/product';
import { Product } from 'Product-Types';

test('renders popular products text', () => {
  jest.spyOn(productUtils, 'fetchProducts').mockReturnValue(sortedProducts);

  render(<ProductList />);
  const pageTitle = screen.getByText(/Popular Products/i);
  expect(pageTitle).toBeInTheDocument();
});

test('renders no product text when there is no data', () => {
  jest.spyOn(productUtils, 'fetchProducts').mockReturnValue([] as Product[]);

  render(<ProductList />);
  const pageTitle = screen.getByText(/There is no products/i);
  expect(pageTitle).toBeInTheDocument();
});

test('renders list of products', () => {
  jest.spyOn(productUtils, 'fetchProducts').mockReturnValue(sortedProducts);

  render(<ProductList />);
  const productElements = screen.queryAllByTestId(
    new RegExp(`${dataTestIds.productComponent}-productContainer`, 'i'),
  );
  expect(productElements).toHaveLength(sortedProducts.length);
});

test('renders list of products correctly after up vote a product', async () => {
  jest.spyOn(productUtils, 'fetchProducts').mockReturnValue(sortedProducts);

  render(<ProductList />);

  const products = screen.queryAllByTestId(
    new RegExp(`${dataTestIds.productComponent}-productContainer`, 'i'),
  );

  const firstProduct = products[0];
  const firstProductTitle = within(firstProduct).getByText(
    sortedProducts[0].title,
  );
  expect(firstProductTitle).toBeInTheDocument();

  const secondProduct = products[1];
  const secondProductTitle = within(secondProduct).getByText(
    sortedProducts[1].title,
  );

  expect(secondProductTitle).toBeInTheDocument();

  const upVoteButton = within(secondProduct).getByTestId(
    `${dataTestIds.productComponent}-voteBtn`,
  );

  fireEvent.click(upVoteButton);

  const reorderProducts = screen.queryAllByTestId(
    new RegExp(`${dataTestIds.productComponent}-productContainer`, 'i'),
  );

  const reorderFirstProduct = reorderProducts[0];
  const reorderFirstProductTitle = await within(reorderFirstProduct).findByText(
    sortedProducts[1].title,
  );
  expect(reorderFirstProductTitle).toBeInTheDocument();

  const reorderSecondProduct = reorderProducts[1];
  const reorderSecondProductTitle = within(reorderSecondProduct).getByText(
    sortedProducts[0].title,
  );
  expect(reorderSecondProductTitle).toBeInTheDocument();
});
