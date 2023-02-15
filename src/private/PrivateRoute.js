import React from "react";
import { useFirebaseContext } from "../context/FirebaseContext";
import Login from "../pages/Auth/Login";

function PrivateRoute({ Component }) {
  const { isLoggedIn, authe } = useFirebaseContext();
  if (isLoggedIn) {
    return Component;
  }
  return <Login />;
}

export default PrivateRoute;
