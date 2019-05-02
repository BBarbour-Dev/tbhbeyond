import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../config/context";

import RegisterForm from "./RegisterForm";

const Register = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  return (
    <section className="content-gap">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-fifths box content-box">
            <h1 className="is-size-3">Register</h1>
            <hr />
            <RegisterForm firebase={firebase} history={history} />
            <p className="mt2 is-pulled-right">
              Have an account? <Link to="/login">Login</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
