import React from "react";
import { Redirect, Route } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AuthRoute = ({ component: Component, ...rest }) => {
  const [user] = useAuth();
  return (
    <Route
      {...rest}
      render={props => (user ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

export default AuthRoute;
