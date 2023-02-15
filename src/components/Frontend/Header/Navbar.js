/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useFirebaseContext } from "../../../context/FirebaseContext";
function Navbar() {
  const { isLoggedIn, logOut } = useFirebaseContext();
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>
              Logo
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    to={"/"}
                    className="nav-link active"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  {isLoggedIn ? (
                    <button
                      className="nav-link btn btn-primary"
                      onClick={logOut}
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink to={"/auth/login"}>
                      <button className="nav-link btn btn-primary">
                        Login
                      </button>
                    </NavLink>
                  )}
                </li>
              </ul>
              {isLoggedIn ? (
                <form className="d-flex">
                  <NavLink to={"dashboard"}>
                    <button className="btn btn-danger" type="submit">
                      Dashboard
                    </button>
                  </NavLink>
                </form>
              ) : (
                <></>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
