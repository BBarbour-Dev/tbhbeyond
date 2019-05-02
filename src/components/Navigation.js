import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import { FirebaseContext } from "../config/context";
import useAuth from "../hooks/useAuth";
import logo from "../config/images/logo.png";

const Navigation = () => {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth();
  const [burgerOpen, setBurgerOpen] = useState(false);
  const burgerActive = burgerOpen ? "is-active" : null;
  return (
    <nav className="navbar nav-box-shadow" style={{ height: "4rem" }}>
      <div className="navbar-brand">
        <Link className="is-hidden-mobile" to="/">
          <img src={logo} alt="TBH Beyond" style={{ height: "100%" }} />
        </Link>
        <Link className="is-hidden-tablet navbar-item" to="/">
          <span className="is-size-3">
            <i className="fa fa-home is-hidden-tablet" />
          </span>
        </Link>
        <div
          className={`navbar-burger burger ${burgerActive}`}
          onClick={() => setBurgerOpen(!burgerOpen)}
        >
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className={`navbar-menu ${burgerActive}`}>
        {user ? (
          <div className="navbar-end">
            <div className="navbar-item">
              <i
                className="fas fa-scroll has-text-danger"
                style={{ marginRight: "0.5rem" }}
              />{" "}
              <Link to="/characters/manage">Characters</Link>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
              <span className="navbar-link">
                <i
                  className="fa fa-user has-text-danger"
                  style={{ marginRight: "0.5rem" }}
                />{" "}
                Profile
              </span>

              <div className="navbar-dropdown">
                <Link className="navbar-item" to={`/user/${user.uid}`}>
                  View
                </Link>
                <Link className="navbar-item" to="/user/edit-profile">
                  Edit
                </Link>
              </div>
            </div>
            <div
              style={{ cursor: "pointer" }}
              className="navbar-item"
              onClick={firebase.logoutUser}
            >
              <i
                className="fas fa-sign-out-alt has-text-danger"
                style={{ marginRight: "0.5rem" }}
              />{" "}
              Logout
            </div>
          </div>
        ) : (
          <div className="navbar-end">
            <Link className="navbar-item" to="/login">
              <i
                className="fas fa-sign-in-alt has-text-danger"
                style={{ marginRight: "0.5rem" }}
              />{" "}
              Login
            </Link>
            <Link className="navbar-item" to="/register">
              <i
                className="fas fa-user-plus has-text-danger"
                style={{ marginRight: "0.5rem" }}
              />{" "}
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default withRouter(Navigation);
