import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../config/context";

import LoginForm from "./LoginForm";

const Login = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  return (
    <section className="content-gap">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-fifths box content-box">
            <h1 className="is-size-3">Login</h1>
            <hr />
            <LoginForm history={history} firebase={firebase} />
            <p className="mt2 is-pulled-right">
              Need an account? <Link to="/register">Register</Link>. Forgot your
              password? <Link to="/forgot-pass">Reset</Link> it.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
