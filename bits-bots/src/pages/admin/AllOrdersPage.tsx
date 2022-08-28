import { useState, useEffect } from 'react';

import DefaultLayout from '../../layouts/DefaultLayout';
import ContentWrapper from '../../components/elements/ContentWrapper';
import OrderBox from '../../components/blocks/OrderBox';
import Loader from '../../components/elements/Loader';
import { fetchAllOrders } from '../../functions/fetchFunctions';

import type { Order } from '../../typings/orderTypes';

const OrdersPage = (): JSX.Element => {
  const [ordersData, setOrdersData] = useState<Order[]>([]);
  const [isOrdersLoading, setIsOrdersLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAllOrders().then(
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
        <h1>All Orders</h1>
        {!isOrdersLoading ? (
          ordersData.map(
            (order, index) => (
              <OrderBox key={index} order={order} extraData />
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
