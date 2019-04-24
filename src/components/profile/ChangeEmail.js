import React, { useState } from "react";

const ChangeEmail = ({ user, firebase }) => {
  const [email, setEmail] = useState("");
  const [emailTwo, setEmailTwo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const loadingButton = loading ? "is-loading" : null;
  const validation = email === "" || emailTwo === "";
  const handleChange = e => {
    e.preventDefault();
    if (email === emailTwo) {
      firebase
        .updateUserEmail(email)
        .then(() => {
          firebase.user(user.uid).set(
            {
              email
            },
            { merge: true }
          );
        })
        .then(() => {
          setLoading(false);
          setCompleted(true);
          setTimeout(() => {
            setCompleted(false);
          }, 5000);
        })
        .catch(err => setError(err));
    } else {
      setError({ message: "Email and confirm email must match." });
    }
  };
  return (
    <div className="columns">
      <div className="column is-two-fifths">
        <form onSubmit={handleChange}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Confirm Email</label>
            <div className="control">
              <input
                className="input"
                type="email"
                value={emailTwo}
                onChange={e => setEmailTwo(e.target.value)}
              />
            </div>
          </div>
          {completed && (
            <div className="notification is-success">Email updated!</div>
          )}
          {error && (
            <div className="notification is-danger">{error.message}</div>
          )}
          <button
            disabled={validation}
            type="submit"
            className={`button is-small is-outlined is-danger ${loadingButton}`}
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeEmail;
