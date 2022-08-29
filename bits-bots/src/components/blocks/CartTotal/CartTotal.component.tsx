import { useNavigate } from 'react-router-dom';

import Button from '../../elements/Button';

import './CartTotal.style.scss';

type Props = {
  totalPrice: number;
  hideSubmit?: boolean;
};

const CartTotal = ({ totalPrice, hideSubmit }: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="card-total">
       {totalPrice ? (
        <>
          <p className="card-total__price">Total: {totalPrice} kr.</p>
          {!hideSubmit ? (
            <Button
              text="Checkout"
              variant="blue-primary"
              handler={() => navigate('/checkout')}
            />
          ) : null}
        </>
       ) : null}
    </div>
  );
}

export default CartTotal;
