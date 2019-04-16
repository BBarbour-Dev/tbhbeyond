import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../config/context";

const ForgetForm = ({ toggle, login }) => {
  const [forgetModal, setForgetModal] = toggle;
  const [loginModal, setLoginModal] = login;
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [sentPass, setSentPass] = useState(false);
  const validation = email === "";
  const swapLogin = () => {
    setForgetModal(!forgetModal);
    setLoginModal(!loginModal);
  };
  const cleanUp = () => {
    setEmail("");
  };
  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .resetUserPassword(email)
      .then(() => {
        setSentPass(!sentPass);
        cleanUp();
      })
      .catch(err => {
        setError(err);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      {sentPass && (
        <div className="notification is-success">
          Your recovery email has been sent.{" "}
          <a href="#1" onClick={swapLogin}>
            Login
          </a>{" "}
          with your new password.
        </div>
      )}
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input
            type="email"
            value={email}
            className="input"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="notification is-danger">{error.message}</div>}
      <input
        disabled={validation}
        type="submit"
        className="button is-fullwidth"
        value="Recover Password"
      />
    </form>
  );
};

export default ForgetForm;
