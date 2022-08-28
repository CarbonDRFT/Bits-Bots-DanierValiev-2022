import { useNavigate } from 'react-router-dom';

import Button from '../../elements/Button';

import './CartTotal.style.scss';

type Props = {
  totalPrice: number;
};

const CartTotal = ({ totalPrice }: Props): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="card-total">
       {totalPrice ? (
        <>
          <p className="card-total__price">Total: {totalPrice} kr.</p>
          <Button
            text="Checkout"
            variant="blue-primary"
            handler={() => navigate('/checkout')}
          />
        </>
       ) : null}
    </div>
  );
}

export default CartTotal;
