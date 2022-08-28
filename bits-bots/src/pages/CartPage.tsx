import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import CartItems from '../components/blocks/CartItems';
import CartTotal from '../components/blocks/CartTotal';
import Loader from '../components/elements/Loader';
import Icon from '../components/elements/Icon';
import { fetchProductData } from '../functions/fetchFunctions';

import type { RootState } from '../redux/store';
import type { CartItem } from '../typings/productTypes';

const CartPage = (): JSX.Element => {
  const [favouriteItemsData, setFavouriteItemsData] = useState<CartItem[]>([]);
  const [isFavouriteItemsLoading, setIsFavouriteItemsLoading] = useState<boolean>(false);
  const { cartItems, favourites } = useSelector((state: RootState) => state.shopping);
  const cardItemsTotal = cartItems.reduce((accumulator, item) => accumulator + item.quantity * (item.product.price as number), 0);

  useEffect(() => {
    setIsFavouriteItemsLoading(true);
    fetchProductData().then(data => {
      setFavouriteItemsData(data.map(
        item => {
          return {
            product: item,
            quantity: 1,
          }
        }
      ).filter(
        item =>
        favourites.includes(item.product.id)
      )
    )});
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setFavouriteItemsData(favouriteItemsData.filter(
      item =>
      favourites.includes(item.product.id)
    ));
    // eslint-disable-next-line
  }, [favourites]);

  useEffect(() => {
    if (favourites.length === 0 || favouriteItemsData.length > 0) setIsFavouriteItemsLoading(false);
    // eslint-disable-next-line
  }, [favouriteItemsData]);

  return (
    <DefaultLayout>
      <ContentWrapper>
        <h1>My cart</h1>
        <CartItems items={cartItems} variant="cart" fallbackComponent={
          <div className="cart-items__empty-wrap">
            <Icon name="shopping-basket" type="fas" />
            <p className="cart-items__empty-label">There are no items in your cart yet.</p>
          </div>
        } />
        <CartTotal totalPrice={cardItemsTotal} />
        <h1>My favourites</h1>
        {!isFavouriteItemsLoading ? (
          <CartItems items={favouriteItemsData} variant="favourites" fallbackComponent={
            <div className="cart-items__empty-wrap">
              <Icon name="heart" type="fas" />
              <p className="cart-items__empty-label">You have no favourite items yet.</p>
            </div>
          } />
        ) : (
          <div className="loader-wrap">
            <Loader />
          </div>
        )}
      </ContentWrapper>
    </DefaultLayout>
  );
}

export default CartPage;
