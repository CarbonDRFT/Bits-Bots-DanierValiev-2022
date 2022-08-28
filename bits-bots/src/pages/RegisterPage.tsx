import { Link } from 'react-router-dom';

import MainFormLayout from '../layouts/MainFormLayout';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input';

const LoginPage = (): JSX.Element =>
  (
    <MainFormLayout
      background="url('/img/login-background.jpg')"
    >
      <form
        className="auth-box__form"
      >
        <h1 className="form__title">Register</h1>
        <p className="form__description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt neque veritatis minima sint, corporis vero nisi eum. In, nisi libero.
        </p>
        <div className="form__inputs">
          <Input
            label="Email"
            type="email"
            name="email"
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            required
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirm-password"
            required
          />
        </div>
        <div className="form__submit-wrap">
          <p>
            Already have an account? Click <Link to="/login">here</Link> to login.
          </p>
          <Button text="Sign up" variant="primary" />
        </div>
      </form>
    </MainFormLayout>
  );

export default LoginPage;
