import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import Button from '../../elements/Button';
import Icon from '../../elements/Icon';
import { toggleProductInFavourites } from '../../../redux/slices/shoppingSlice';

import type { Product } from '../../../typings/productTypes';

import './ProductBox.style.scss';

type Props = {
  product: Product;
  isLiked?: boolean;
};

const ProductBox = ({ product, isLiked = false }: Props): JSX.Element => {
  const dispatch = useDispatch();

  const handleAddToFavourites = () => {
    dispatch(toggleProductInFavourites(product.id));
    !isLiked
      ? toast.success(`Added ${product.title} to the favourites.`)
      : toast.success(`Removed ${product.title} from the favourites.`);
  }

  return (
    <div className="product-box">
      <LazyLoadImage
        src={product.image}
        alt={product.title}
        className="product-box__image"
        effect="opacity"
      />
      <div className="product-box__content">
        <h3 className="product-box__title">{product.title}</h3>
        <h5 className="product-box__price">{product.price} kr.</h5>
        <div className="product-box__footer">
          <div
            className={`product-box__like-icon ${isLiked ? 'product-box__like-icon--liked' : ''}`}
            onClick={handleAddToFavourites}  
          >
            <Icon
              name="heart"
              type="fas"
            />
          </div>
          <Button
            text="View"
            handler={() => {
              window.location.href = `/product/${product.id}`;
            }}
            variant="blue"
          />
        </div>
      </div>
    </div>
  );
}

export default ProductBox;
