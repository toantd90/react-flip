import { Product as ProductType } from 'Product-Types';

import { dataTestIds } from 'constants/testIds';

import styles from './product.module.scss';

type Props = {
  onVoteClick: (productId: string) => void;
} & ProductType;

const Product = (props: Props) => {
  const {
    description,
    title,
    votes,
    id,
    productImageUrl,
    submitterAvatarUrl,
    url,
    onVoteClick,
  } = props;

  const handleOnVoteClick = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    onVoteClick(id);
  };

  return (
    <div
      className={styles.productContainer}
      data-key={id}
      data-testid={`${dataTestIds.productComponent}-productContainer-${id}`}
    >
      <img
        src={productImageUrl}
        alt={title}
        className={styles.productImage}
      />
      <div
        className={styles.productInfoContainer}
        data-testid={`${dataTestIds.productComponent}-productInfoContainer`}
      >
        <div
          className={styles.voteContainer}
          data-testid={`${dataTestIds.productComponent}-voteContainer`}
        >
          <div
            className={styles.upVoteBtn}
            onClick={handleOnVoteClick}
            data-testid={`${dataTestIds.productComponent}-voteBtn`}
          />
          {votes}
        </div>
        <a href={url} className={styles.productUrl}>
          {title}
        </a>
        {description}

        <div className={styles.submittedBy}>
          <span>Submitted by:</span>
          <img
            src={submitterAvatarUrl}
            alt={'submitterAvatar'}
            className={styles.submitterAvatar}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
