import { render, screen } from '@testing-library/react';
import { within } from '@testing-library/dom';
import Product from './index';

import { products } from '../../products';
import { dataTestIds } from 'constants/testIds';
test('renders product correctly', () => {
  const product = products[0];
  render(<Product onVoteClick={() => {}} {...product} />);

  const productInfoContainer = screen.getByTestId(
    `${dataTestIds.productComponent}-productInfoContainer`,
  );

  // Description
  const description = within(productInfoContainer).getByText(
    product.description,
  );
  expect(description).toBeInTheDocument();

  // Title
  const title = within(productInfoContainer).getByText(product.title);
  expect(title).toBeInTheDocument();

  // Vote count
  const voteContainer = screen.getByTestId(
    `${dataTestIds.productComponent}-voteContainer`,
  );
  const voteCount = within(voteContainer).getByText(product.votes);

  expect(voteCount).toBeInTheDocument();
});
