import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import MainFormLayout from "../layouts/MainFormLayout";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import { loginSchema } from "../validations/userValidations";

const LoginPage = (): JSX.Element => {
  const auth = getAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { ref: emailRef, ...emailProps } = register("email");
  const { ref: passwordRef, ...passwordProps } = register("password");

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      const loginResult = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("currentUser", JSON.stringify(loginResult));
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error("The login credentials are incorrect!");
    }
  };

  return (
    <MainFormLayout background="url('/img/login-background.jpg')">
      <form className="auth-box__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="form__title">Sign in</h1>

        <div className="form__inputs">
          <Input
            label="Email"
            innerRef={emailRef}
            error={errors?.email?.message as string}
            {...emailProps}
          />
          <Input
            label="Password"
            type="password"
            innerRef={passwordRef}
            error={errors?.password?.message as string}
            {...passwordProps}
          />
        </div>
        <div className="form__submit-wrap">
          <p>
            Don't have an account yet? Click <Link to="/register">here</Link> to
            register.
          </p>
          <Button text="Login" variant="primary" type="onSubmit" />
        </div>
      </form>
    </MainFormLayout>
  );
};

export default LoginPage;
