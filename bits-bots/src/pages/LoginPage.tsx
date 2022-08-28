import { useState, FormEvent, ChangeEvent } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

import MainFormLayout from '../layouts/MainFormLayout';
import Button from '../components/elements/Button';
import Input from '../components/elements/Input';

const LoginPage = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const auth = getAuth();
  const navigate = useNavigate();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const loginResult = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('currentUser', JSON.stringify(loginResult));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <MainFormLayout
      background="url('/img/login-background.jpg')"
    >
      <form
        className="auth-box__form"
        onSubmit={(e: FormEvent) => handleSubmit(e)}
      >
        <h1 className="form__title">Sign in</h1>
        <p className="form__description">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt neque veritatis minima sint, corporis vero nisi eum. In, nisi libero.
        </p>
        <div className="form__inputs">
          <Input
            label="Email"
            type="email"
            name="email"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleEmailChange(e)}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            required
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlePasswordChange(e)}  
          />
        </div>
        <div className="form__submit-wrap">
          <p>
            Don't have an account yet? Click <Link to="/register">here</Link> to register.
          </p>
          <Button text="Login" variant="primary" />
        </div>
      </form>
    </MainFormLayout>
  );
}

export default LoginPage;
