import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotForm = ({ firebase }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [sentPass, setSentPass] = useState(false);
  const validation = email === "";
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
        <div className="message">
          <div className="message-body">
            Your recovery email has been sent. <Link to="/login">Login</Link>{" "}
            with your new password.
          </div>
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
        className="button is-danger is-fullwidth"
        value="Recover Password"
      />
    </form>
  );
};

export default ForgotForm;
