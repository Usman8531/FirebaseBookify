import React from "react";
import { Link } from "react-router-dom";

function DashboardHome() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center flex-column my-5">
        <div className="row">
          <div className="col">
            <Link
              to={"/dashboard/listingBooks"}
              className="text-decoration-none btn btn-outline-primary"
            >
              <h3>Upload Books</h3>
            </Link>
            <Link
              to={"/"}
              className="my-2 text-decoration-none btn btn-outline-primary"
            >
              <h3>Go to Home</h3>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHome;
