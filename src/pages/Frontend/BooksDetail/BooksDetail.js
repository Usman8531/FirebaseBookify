import React from "react";
import BookDetails from "../../../components/Frontend/BookDetails/BookDetails";

function BooksDetail() {
  return (
    <>
      <div className="container py-2">
        <div className="row">
          <div className="col-12 text-center">
            <h1>Book Details</h1>
          </div>
        </div>
      </div>
      <BookDetails/>
    </>
  );
}

export default BooksDetail;
