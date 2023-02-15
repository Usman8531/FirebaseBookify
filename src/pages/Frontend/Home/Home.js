import React from "react";
import BookListing from "../../../components/Frontend/BookListing/BookListing";

function Home() {
  return (
    <>
      <div className="container pt-3 text-center">
        <div className="row">
          <div className="col">
            <h1 className="text-dark">Home</h1>
          </div>
        </div>
      </div>
      <BookListing />
    </>
  );
}

export default Home;
