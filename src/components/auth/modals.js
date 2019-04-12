import React from "react";
import LoginForm from "./loginform";
import RegisterForm from "./registerform";
import ForgetForm from "./forgetform";

const LoginModal = ({ toggle, register, forget }) => {
  const [loginModal, setLoginModal] = toggle;
  const [registerModal, setRegisterModal] = register;
  const [forgetModal, setForgetModal] = forget;
  const closeModal = () => {
    setLoginModal(!loginModal);
  };
  const swapRegister = () => {
    setLoginModal(!loginModal);
    setRegisterModal(!registerModal);
  };
  const swapForget = () => {
    setLoginModal(!loginModal);
    setForgetModal(!forgetModal);
  };
  const modalOpened = loginModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Login</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="box">
            <p>
              Need an account?{" "}
              <a href="#!" onClick={swapRegister}>
                Register
              </a>
              .
            </p>
            <p>
              Forgot your password?{" "}
              <a href="#!" onClick={swapForget}>
                Reset
              </a>{" "}
              it.
            </p>
          </div>
          <LoginForm />
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  );
};

const RegisterModal = ({ toggle, login }) => {
  const [registerModal, setRegisterModal] = toggle;
  const [loginModal, setLoginModal] = login;
  const closeModal = () => {
    setRegisterModal(!registerModal);
  };
  const swapModal = () => {
    setRegisterModal(!registerModal);
    setLoginModal(!loginModal);
  };
  const modalOpened = registerModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Register</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="box">
            Have an account?{" "}
            <a href="#!" onClick={swapModal}>
              Login
            </a>
            .
          </div>
          <RegisterForm />
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  );
};

const ForgetModal = props => {
  const [forgetModal, setForgetModal] = props.toggle;
  const [loginModal, setLoginModal] = props.login;
  const closeModal = () => {
    setForgetModal(!forgetModal);
  };

  const modalOpened = forgetModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Forgot Password</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <ForgetForm
            toggle={[forgetModal, setForgetModal]}
            login={[loginModal, setLoginModal]}
          />
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  );
};

export { LoginModal, RegisterModal, ForgetModal };
