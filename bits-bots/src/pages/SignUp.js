import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/loader";
import { toast } from "react-toastify";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/login");
  };

  const register = async () => {
    try {
      setLoading(true);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      setLoading(false);
      toast.success("Registration successfull, you can now log in");
      navigateLogin();
      setEmail("");
      setPassword("");
      setCpassword("");
    } catch (error) {
      console.log(error);
      toast.error("Registration failed: Email already in use");
      setLoading(false);
    }
  };
  return (
    <div className="register__parent">
      {loading && <Loader />}
      <div className="row">
        <div className="col-md-5">
          <lottie-player
            src="https://assets1.lottiefiles.com/packages/lf20_olqvwn7h.json"
            background="transparent"
            speed="1"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4">
          <div className="register-form">
            <h2 className="register">Register</h2>
            <input
              type="text"
              className="form__control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form__control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="text"
              className="form__control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
            />
            <button className="register" onClick={register}>
              Register
            </button>
            <Link to="/login">Click here to register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
