import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Loader from "../components/loader";
import { toast } from "react-toastify";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("currentUser", JSON.stringify(result));
      console.log(result);
      setLoading(false);
      toast.success("Login successfull");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="login__parent">
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
          <div className="login-form">
            <h2 className="login">Login</h2>
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

            <button className="login__btn" onClick={login}>
              Login
            </button>

            <Link to="/signup">Click here to register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
