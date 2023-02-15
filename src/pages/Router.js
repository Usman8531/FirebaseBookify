import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Frontend from "./Frontend";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

import "../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import PrivateRoute from "../private/PrivateRoute";
import { useFirebaseContext } from "../context/FirebaseContext";
function Router() {
  // const navigate = useNavigate();
  const { isLoggedIn } = useFirebaseContext();
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/*"
            element={<PrivateRoute Component={<Frontend />} />}
          />
          <Route
            path="/auth/*"
            element={isLoggedIn ? <Navigate to={"/"} /> : <Auth />}
          />
          <Route
            path="/dashboard/*"
            element={<PrivateRoute Component={<Dashboard />} />}
          />
          <Route path="*" element={<h1>No page</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
