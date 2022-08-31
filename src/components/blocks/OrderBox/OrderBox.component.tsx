import CartItems from '../CartItems';

import type { Order } from '../../../typings/orderTypes';

import './OrderBox.style.scss';

type Props = {
  order: Order;
  extraData?: boolean;
};

const OrderBox = ({ order, extraData }: Props): JSX.Element => {
  const cardItemsTotal = order.cartItems.reduce((accumulator, item) => accumulator + item.quantity * (item.product.price as number), 0);

  return (
    <div className="order-box">
      <h3 className="order-box__title">{order.addressInfo.name}</h3>
      <div className="order-box__columns">
        <div className="order-box__column">
          <h4 className="order-box__entry">Adress:</h4>
          <h4 className="order-box__entry">Phone:</h4>
          <h4 className="order-box__entry">PIN Code:</h4>
          {extraData ? <h4 className="order-box__entry">User ID:</h4> : null}
          {extraData ? <h4 className="order-box__entry">Email:</h4> : null}
          <h4 className="order-box__entry">Total:</h4>
        </div>
        <div className="order-box__column">
          <h4 className="order-box__entry">{order.addressInfo.address}</h4>
          <h4 className="order-box__entry">{order.addressInfo.phone}</h4>
          <h4 className="order-box__entry">{order.addressInfo.pincode}</h4>
          {extraData ? <h4 className="order-box__entry">{order.userid}</h4> : null}
          {extraData ? <h4 className="order-box__entry">{order.email}</h4> : null}
          <h4 className="order-box__entry">{cardItemsTotal} kr.</h4>
        </div>
      </div>
      <CartItems items={order.cartItems} variant="orders" />
    </div>
  );
}

export default OrderBox;
