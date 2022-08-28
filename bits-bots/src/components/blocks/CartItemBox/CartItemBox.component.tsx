import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Button from '../../elements/Button';
import Icon from '../../elements/Icon';
import { removeProduct } from '../../../functions/updateFunctions';
import {
  addProductToCart,
  removeProductFromCart, 
  removeOneProductFromCart,
  toggleProductInFavourites
} from '../../../redux/slices/shoppingSlice';
import { toggleEditModalOpen, setCurrentEditedItem } from '../../../redux/slices/uiSlice';

import type { CartItem, CartItemVariant } from '../../../typings/productTypes';

import './CartItemBox.style.scss';

type Props = {
  item: CartItem;
  favourite?: boolean;
  header?: boolean;
  variant: CartItemVariant;
};

const CartItemBox = ({ item, favourite, header, variant }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = () => {
    toast.success(`${item.product.title} has successfully been removed.`);
    removeProduct(item.product).then(() => setTimeout(() => window.location.reload(), 1750));
  }

  return (
    <div className={`cart-item ${header ? 'cart-item--header' : ''} ${variant === 'orders' ? 'cart-item--orders' : ''}`}>
      <div className="cart-item__info-wrap">
        {!header ? (
          <img src={item.product.image} alt={item.product.title} className="cart-item__image" />
        ) : <div className="cart-item__image">{item.product.image}</div>}
        <div className="cart-item__content">
          <p
            className="cart-item__name"
            onClick={() => !header && navigate(`/product/${item.product.id}`)}  
          >{item.product.title}</p>
          <p className="cart-item__price">{header ? 'Price' : `${(item.product.price as number) * item.quantity} kr.`}</p>
          {variant === 'cart' || variant === 'orders' ? <p className="cart-item__count">{header ? 'Amount' : `${item.quantity}x`}</p> : null}
          {variant === 'list' ? <p className="cart-item__count">{item.product.category}</p> : null}
        </div>
      </div>
      <div className="cart-item__buttons">
        {variant === 'cart' && !header ? (
          <>
            <Button
              text="+"
              handler={() => dispatch(addProductToCart(item.product))}
            />
            <Button
              text="-"
              handler={() => dispatch(removeOneProductFromCart(item.product.id))}
            />
            <Button
              text="Delete"
              variant="red"
              handler={() => {
                dispatch(removeProductFromCart(item.product.id));
                toast.success(`Successfully ${item.product.title} from the cart.`);
              }}  
            />
          </>
        ) : null}
        {variant === 'favourites' && !header ? (
          <Button
            text="Remove"
            variant="red"
            handler={() => {
              dispatch(toggleProductInFavourites(item.product.id));
              toast.success(`Successfully removed ${item.product.title} from the favourites.`);
            }}  
          />
        ) : null}
        {variant === 'list' && !header ? (
          <>
            <Button
              icon={<Icon name="file-pen" type="fas" />}
              variant="blue"
              handler={() => {
                dispatch(setCurrentEditedItem(item.product));
                dispatch(toggleEditModalOpen());
              }}
            />
            <Button
              icon={<Icon name="trash" type="fas" />}
              variant="red-primary"
              handler={handleDelete}
            />
          </>
        ) : null}
        {header ? <span>Actions</span> : null}
      </div>
    </div>
  );
}

export default CartItemBox;
