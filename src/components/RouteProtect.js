import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const [user] = useAuth();
  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export const HideRoute = ({ component: Component, ...rest }) => {
  const [user] = useAuth();
  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Component {...props} />)}
    />
  );
};

export const VerifyRoute = ({ component: Component, ...rest }) => {
  const [user] = useAuth();
  return (
    <Route
      {...rest}
      render={props =>
        user && user.emailVerified ? (
          <Component {...props} />
        ) : (
          <Redirect to="/verify-email" />
        )
      }
    />
  );
};
