import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import MainFormLayout from "../layouts/MainFormLayout";
import Button from "../components/elements/Button";
import Input from "../components/elements/Input";
import { registerSchema } from "../validations/userValidations";

const LoginPage = (): JSX.Element => {
  const auth = getAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { ref: emailRef, ...emailProps } = register("email");
  const { ref: passwordRef, ...passwordProps } = register("password");
  const { ref: confirmPasswordRef, ...confirmPasswordProps } =
    register("confirmpassword");

  const onSubmit = async (data: any) => {
    const { email, password } = data;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success(
        "Your account has been created successfully. You are being redirected to the login page."
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Creating the account failed. The email is possibly in use!");
    }
  };

  return (
    <MainFormLayout background="url('/img/login-background.jpg')">
      <form onSubmit={handleSubmit(onSubmit)} className="auth-box__form">
        <h1 className="form__title">Register</h1>
        <p className="form__description">
          Account needs to be created in order to browse our site.
        </p>
        <p className="form__description">
          We kindly ask you to create an account
        </p>
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
          <Input
            label="Confirm password"
            type="password"
            innerRef={confirmPasswordRef}
            error={errors?.confirmpassword?.message as string}
            {...confirmPasswordProps}
          />
        </div>
        <div className="form__submit-wrap">
          <p>
            Already have an account? Click <Link to="/login">here</Link> to
            login.
          </p>
          <Button text="Sign up" variant="primary" />
        </div>
      </form>
    </MainFormLayout>
  );
};

export default LoginPage;
