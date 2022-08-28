import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import MainFormLayout from '../layouts/MainFormLayout';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input';

import type { FormEvent, ChangeEvent } from 'react';

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassowrd, setConfirmPassword] = useState<string>('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      email !== '' &&
      password !== '' &&
      confirmPassowrd !== '' &&
      password === confirmPassowrd
    ) {
      try {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        toast.success('Your account has been created successfully. You are being redirected to the login page.');
        navigate('/login');
      } catch (error) {
        console.log(error);
        toast.error('Registration failed! This email address is already in use!');
      }
    }
  }

  return (
    <MainFormLayout
      background="url('/img/login-background.jpg')"
    >
      <form
        onSubmit={(e: FormEvent) => handleSubmit(e)}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            minLength="6"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required
          />
          <Input
            label="Confirm password"
            type="password"
            name="confirm-password"
            minLength="6"
            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
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
}

export default LoginPage;
