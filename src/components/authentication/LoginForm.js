import React, { useState } from "react";

const LoginForm = ({ history, firebase }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    firebase
      .loginUser(email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setError(null);
        history.push("/");
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
      {error && (
        <div className="message is-danger">
          <div className="message-body">{error.message}</div>
        </div>
      )}
      <input
        disabled={validation}
        type="submit"
        className="button is-fullwidth is-danger"
        value="Login"
      />
    </form>
  );
};

export default LoginForm;
