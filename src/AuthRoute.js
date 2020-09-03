import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => {
  const user = localStorage.getItem("userIsLogged");

  /** If user not logged in, List pages can't be accessed, redirecting to Login page */
  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

export { AuthRoute as default };
