import React, { useContext } from "react";
import { FirebaseContext } from "../../config/context";

import ForgotForm from "./ForgotForm";

const ForgotPass = () => {
  const firebase = useContext(FirebaseContext);
  return (
    <section className="content-gap">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-fifths box content-box">
            <h1 className="is-size-3">Forgot Password</h1>
            <hr />
            <ForgotForm firebase={firebase} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPass;
