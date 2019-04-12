import React, { useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { FirebaseContext } from "../config/context";

import { LoginModal, RegisterModal, ForgetModal } from "./auth/modals";

const Navigation = props => {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth(firebase);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const burgerActive = burgerOpen ? "is-active" : null;
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            TBH Beyond
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
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Link
            </Link>
            <Link className="navbar-item" to="/">
              Link
            </Link>
          </div>
          {user ? (
            <NavEndLoggedIn user={user} firebase={firebase} />
          ) : (
            <NavEndLoggedOut />
          )}
        </div>
      </div>
    </nav>
  );
};

const NavEndLoggedIn = ({ user, firebase }) => {
  return (
    <div className="navbar-end">
      <a href="#" className="navbar-item">
        {user.username}
      </a>
      <a href="#" className="navbar-item" onClick={firebase.logoutUser}>
        Logout
      </a>
    </div>
  );
};

const NavEndLoggedOut = () => {
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const [forgetModal, setForgetModal] = useState(false);
  return (
    <div className="navbar-end">
      <a
        href="#!"
        className="navbar-item"
        onClick={() => setLoginModal(!loginModal)}
      >
        Login
      </a>
      <a
        href="#!"
        className="navbar-item"
        onClick={() => setRegisterModal(true)}
      >
        Register
      </a>
      <LoginModal
        toggle={[loginModal, setLoginModal]}
        register={[registerModal, setRegisterModal]}
        forget={[forgetModal, setForgetModal]}
      />
      <RegisterModal
        toggle={[registerModal, setRegisterModal]}
        login={[loginModal, setLoginModal]}
      />
      <ForgetModal
        toggle={[forgetModal, setForgetModal]}
        login={[loginModal, setLoginModal]}
      />
    </div>
  );
};

export default withRouter(Navigation);
