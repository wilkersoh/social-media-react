import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

export default function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  /**
    When login, user change url to /register it will redirect back to home page
  */

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
}
