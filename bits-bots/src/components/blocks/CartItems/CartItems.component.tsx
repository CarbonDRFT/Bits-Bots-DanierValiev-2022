import CartItemBox from '../CartItemBox';

import type { CartItem, CartItemVariant } from '../../../typings/productTypes';

import './CartItems.style.scss';

type Props = {
  items: CartItem[];
  withHeaders?: boolean;
  variant: CartItemVariant;
  fallbackComponent?: JSX.Element;
};

const CartItems = ({ items, withHeaders = true, variant = 'cart', fallbackComponent }: Props): JSX.Element =>
  (
    <div className="cart-items">
      {withHeaders ? (
        <CartItemBox item={{
          product: {
            id: 'header',
            title: 'Product name',
            category: 'Category',
            price: 'Price',
            description: '',
            image: 'Image',
          },
          quantity: 1,
        }} header variant={variant} />
      ) : null}
      {items && items.length > 0 ? items.map(
        item =>
        <CartItemBox key={item.product.id} item={item} variant={variant} />
      ) : fallbackComponent}
    </div>
  );

export default CartItems;
