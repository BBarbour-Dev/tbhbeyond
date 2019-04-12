import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../config/context";
import { withRouter } from "react-router-dom";

const LoginForm = ({ history, toggle }) => {
  const firebase = useContext(FirebaseContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loginModal, setLoginModal] = useState(toggle);
  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);
        setLoginModal(!loginModal);
      })
      .catch(err => {
        setError(err);
      });
  };
  const validation = email === "" || password === "";
  return (
    <form onSubmit={handleSubmit}>
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
      <div className="field">
        <label className="label">Password</label>
        <div className="control">
          <input
            type="password"
            value={password}
            className="input"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="notification is-danger">{error.message}</div>}
      <input
        disabled={validation}
        type="submit"
        className="button is-fullwidth"
        value="Login"
      />
    </form>
  );
};

export default withRouter(LoginForm);
