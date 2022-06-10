import { createRef, useState } from 'react';

import Product from 'components/Product';
import { useFlip } from './useFlip';
import { Product as ProductType } from 'Product-Types';

import { fetchProducts, sortProducts } from 'utils/product';

import styles from './productList.module.scss';

const ProductList = () => {
  let listRef = createRef<HTMLDivElement>();
  useFlip(listRef);

  const products = fetchProducts();

  const [sortedProducts, setSortedProducts] = useState<ProductType[]>(
    sortProducts(products),
  );

  const handleOnVoteClick = (productId: string) => {
    setSortedProducts(
      sortProducts(
        sortedProducts.map((product) =>
          product.id === productId
            ? { ...product, votes: product.votes + 1 }
            : product,
        ),
      ),
    );
  };

  return (
    <div className={styles.productListContainer}>
      <h1 className={styles.header}>Popular Products</h1>
      {sortedProducts.length ? (
        <div ref={listRef}>
          {sortedProducts.map((product: any) => (
            <Product
              key={product.id}
              onVoteClick={handleOnVoteClick}
              {...product}
            />
          ))}
        </div>
      ) : (
        <div>There is no products</div>
      )}
    </div>
  );
};

export default ProductList;
