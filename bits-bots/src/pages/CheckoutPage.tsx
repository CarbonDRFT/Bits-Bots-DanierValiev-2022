import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import Loader from '../components/elements/Loader';
import Input from '../components/elements/Input';
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
  const [address, setAddress] = useState<string>('');
  const [pin, setPin] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const dispatch = useDispatch();
  const cardItemsTotal = cartItems.reduce((accumulator, item) => accumulator + item.quantity * (item.product.price as number), 0);

  if (cartItems.length === 0) return <Navigate to="/" />;

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
        dispatch(resetCart());
      });
    }
  }

  return (
    <DefaultLayout>
      <ContentWrapper maxWidth="96rem">
        <h1>Checkout</h1>
        {loading ? (
          <div className="loader-wrap">
            <Loader />
          </div>
        ) : (
          <>
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
                amount={cardItemsTotal * 100}
                email={user.email}
                currency="NOK"
                reconfigureOnUpdate={false}
              />
            ) : null}
          </>
        )}
      </ContentWrapper>
    </DefaultLayout>
  );
}

export default CheckoutPage;
