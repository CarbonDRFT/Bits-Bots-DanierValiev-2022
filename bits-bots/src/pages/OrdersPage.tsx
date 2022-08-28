import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import DefaultLayout from '../layouts/DefaultLayout';
import ContentWrapper from '../components/elements/ContentWrapper';
import Icon from '../components/elements/Icon';
import Button from '../components/elements/Button';
import OrderBox from '../components/blocks/OrderBox';
import Loader from '../components/elements/Loader';
import { fetchOrdersForUser } from '../functions/fetchFunctions';

import type { Order } from '../typings/orderTypes';

import '../styles/orders.scss';

const OrdersPage = (): JSX.Element => {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(true);
  const { user } = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrdersForUser(user.uid).then(
      data => {
        setOrdersData(data);
        setIsOrdersLoading(false);
      }
    );
    // eslint-disable-next-line
  }, []);

  return (
    <DefaultLayout>
      <ContentWrapper>
        <h1>My orders</h1>
        {!isOrdersLoading ? (
          ordersData.length === 0 ? (
            <div className="no-orders-wrap">
              <Icon name="grip" type="fas" />
              <h3 className="success-wrap__text">Your haven't made any orders yet.</h3>
              <Button
                text="Go shopping"
                handler={() => navigate('/')}
              />
            </div>
          ) : (
            ordersData.map(
              (order, index) => (
                <OrderBox key={index} order={order} />
              )
            )
          )
        ) : (
          <div className="loader-wrap">
            <Loader />
          </div>
        )}
      </ContentWrapper>
    </DefaultLayout>
  );
}

export default OrdersPage;
