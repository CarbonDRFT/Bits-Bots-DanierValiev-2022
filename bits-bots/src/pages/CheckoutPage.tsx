import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import Loader from '../components/elements/Loader';
import CartItems from '../components/blocks/CartItems';
import CartTotal from '../components/blocks/CartTotal';
import Input from '../components/elements/Input';
import Icon from '../components/elements/Icon';
import Button from '../components/elements/Button';
import { addOrder } from '../functions/updateFunctions';
import { resetCart } from '../redux/slices/shoppingSlice';

import type { FormEvent, ChangeEvent } from 'react';

import type { RootState } from '../redux/store';

import '../styles/checkout.scss';

const CheckoutPage = (): JSX.Element => {
  const { cartItems } = useSelector((state: RootState) => state.shopping);
  const { user } = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [successfulSubmit, setSuccessfulSubmit] = useState<boolean>(false);
  const [address, setAddress] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItemsTotal = cartItems.reduce((accumulator, item) => accumulator + item.quantity * (item.product.price as number), 0);

  // if (cartItems.length === 0) return <Navigate to="/cart" />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  }

  const payNow = async () => {
    if (
      name !== '' &&
      address !== '' &&
      pin !== '' &&
      phoneNumber !== ''
    ) {
      setLoading(true);
      addOrder({
        name,
        address,
        pincode: parseInt(pin),
        phone: parseInt(phoneNumber),
      }, cartItems, user).then(() => {
        setLoading(false);
        setSuccessfulSubmit(true);
        dispatch(resetCart());
      });
    }
  }

  if (cartItems.length === 0) return (
    <DefaultLayout>
      <ContentWrapper maxWidth="96rem">
        <div className="cart-items__empty-wrap">
          <Icon name="shopping-basket" type="fas" />
          <p className="cart-items__empty-label">There are no items in your cart yet.</p>
        </div>
        <div className="button-wrapper" style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}>
          <Button
            text="Go shopping"
            handler={() => navigate('/')}
          />
        </div>
      </ContentWrapper>
    </DefaultLayout>
  );

  return (
    <DefaultLayout>
      <ContentWrapper maxWidth="96rem">
        <h1>Checkout cart</h1>
        {loading ? (
          <div className="loader-wrap">
            <Loader />
          </div>
        ) : (
          !successfulSubmit ? (
            <>
              <CartItems items={cartItems} variant="cart" fallbackComponent={
                <div className="cart-items__empty-wrap">
                  <Icon name="shopping-basket" type="fas" />
                  <p className="cart-items__empty-label">There are no items in your cart yet.</p>
                </div>
              } />
              <CartTotal totalPrice={cartItemsTotal} hideSubmit />
              <form onSubmit={(e: FormEvent) => handleSubmit(e)}>
                <Input
                  label="Full name"
                  name="fullname"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  required
                />
                <Input
                  label="Address"
                  name="address"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                  required
                />
                <Input
                  label="PIN code"
                  name="pincode"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPin(e.target.value)}
                  type="number"
                  required
                />
                <Input
                  label="Phone number"
                  name="phonenumber"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                  type="number"
                  contentStyles={{
                    marginBottom: '2.4rem',
                  }}
                  required
                />
              </form>
              {(
                name !== '' &&
                address !== '' &&
                pin !== '' &&
                phoneNumber !== ''
              ) ? (
                <StripeCheckout
                  stripeKey="pk_test_51Lbr5bF8MYzIRH5hDfaCGOUkGBAumRexCCLwQ2NudpiCfkhSriLhHWV5OItxv8IAw6YppAbKXkSXqAhQ3sIoTwGf00RBGfkCkK"
                  token={payNow}
                  label="Pay now"
                  name="Pay with your credit card"
                  amount={cartItemsTotal * 100}
                  email={user.email}
                  currency="NOK"
                  reconfigureOnUpdate={false}
                />
              ) : null}
            </>
          ) : (
            <div className="success-wrap">
              <Icon name="check-circle" type="fas" />
              <h3 className="success-wrap__text">Your order has been successfully submited.</h3>
              <Button
                text="View my orders"
                handler={() => navigate('/orders')}
              />
            </div>
          )
        )}
      </ContentWrapper>
    </DefaultLayout>
  );
}

export default CheckoutPage;
