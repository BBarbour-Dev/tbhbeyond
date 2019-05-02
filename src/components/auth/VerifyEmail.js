import React, { useContext, useState } from "react";

import { FirebaseContext } from "../../config/context";
import useAuth from "../../hooks/useAuth";

const VerifyEmail = () => {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth();
  const [verify, setVerify] = useState(false);
  const resend = () => {
    firebase.sendEmailVerification();
    setVerify(true);
    setTimeout(() => setVerify(false), 5000);
  };
  return (
    <section className="content-gap">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-fifths box content-box">
            <h1 className="is-size-3">Verify Email</h1>
            <hr />
            <div className="has-text-centered">
              <p className="mb1">
                A verification email has been sent to{" "}
                <span className="has-text-danger">{user.email}</span>. Please
                verify your email.
              </p>
              {verify ? (
                <div className="message">
                  <div className="message-body">
                    Another verification email has been sent. Please check your
                    junk or spam folders if you do not see it.
                  </div>
                </div>
              ) : null}
              <button className="button is-danger" onClick={resend}>
                Resend Verification
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifyEmail;
