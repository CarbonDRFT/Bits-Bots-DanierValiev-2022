import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import Loader from '../components/elements/Loader';
import Input from '../components/elements/Input';
import Button from '../components/elements/Button';
import Icon from '../components/elements/Icon';
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

  if (cartItems.length === 0) return <Navigate to="/" />;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

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
        setSuccessfulSubmit(true);
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
          !successfulSubmit ? (
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
                required
              />
              <Button variant="blue-primary" text="Submit" />
            </form>
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
