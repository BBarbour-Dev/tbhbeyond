import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../config/context";
import { withRouter } from "react-router-dom";

import { defaultAvatar } from "../../config/constants";

const LoginForm = ({ history, toggle }) => {
  const firebase = useContext(FirebaseContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [error, setError] = useState(null);
  const [registerModal, setRegisterModal] = useState(toggle);
  const cleanUp = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordTwo("");
    setError(null);
    setRegisterModal(!registerModal);
  };
  const handleSumbit = e => {
    e.preventDefault();
    if (password === passwordTwo) {
      firebase
        .createNewUser(email, password)
        .then(authUser => {
          firebase.user(authUser.user.uid).set(
            {
              username,
              email,
              avatar: defaultAvatar,
              joined: new Date(),
              role: "user",
              about: {
                location: "",
                website: "",
                social: {
                  facebook: "",
                  instagram: "",
                  twitter: ""
                },
                bio: ""
              }
            },
            { merge: true }
          );
        })
        .then(() => {
          cleanUp();
        })
        .catch(err => {
          setError(err);
        });
    } else {
      setError({ message: "Passwords must match." });
    }
  };
  const validation =
    username === "" || email === "" || password === "" || passwordTwo === "";
  return (
    <form onSubmit={handleSumbit}>
      <div className="field">
        <label className="label">Username</label>
        <div className="control">
          <input
            type="text"
            value={username}
            className="input"
            onChange={e => setUsername(e.target.value)}
          />
        </div>
      </div>
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
      <div className="field">
        <label className="label">Confirm Password</label>
        <div className="control">
          <input
            type="password"
            value={passwordTwo}
            className="input"
            onChange={e => setPasswordTwo(e.target.value)}
          />
        </div>
      </div>
      {error && <div className="notification is-danger">{error.message}</div>}
      <input
        disabled={validation}
        type="submit"
        className="button is-fullwidth"
        value="Register"
      />
    </form>
  );
};

export default withRouter(LoginForm);
