import React, { useState } from "react";

const ChangePassword = ({ firebase }) => {
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadingButton = loading ? "is-loading" : null;
  const validation = password === "" || passwordTwo === "";
  const handleChange = e => {
    e.preventDefault();
    if (password === passwordTwo) {
      firebase
        .updateUserPassword(password)
        .then(() => {
          setLoading(false);
          setCompleted(true);
          setTimeout(() => {
            setCompleted(false);
          }, 5000);
        })
        .catch(err => setError(err));
    } else {
      setError({ message: "Passwords must match." });
    }
  };
  return (
    <div className="columns">
      <div className="column is-two-fifths">
        <form onSubmit={handleChange}>
          <div className="field">
            <label className="label">New Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control">
              <input
                className="input"
                type="password"
                value={passwordTwo}
                onChange={e => setPasswordTwo(e.target.value)}
              />
            </div>
          </div>
          {completed && (
            <div className="message">
              <div className="message-body">Password updated!</div>
            </div>
          )}
          {error && (
            <div className="message is-danger">
              <div className="message-body">{error.message}</div>
            </div>
          )}
          <button
            disabled={validation}
            type="submit"
            className={`button is-small is-danger ${loadingButton}`}
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
