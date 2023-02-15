import React, { useEffect, useState } from "react";
import { useFirebaseContext } from "../../../context/FirebaseContext";
import Books from "../Books/Books";

function BookListing({id}) {
  const { readList } = useFirebaseContext();
  const [books, setBooks] = useState([]);
  useEffect(() => {
    readList().then((books) => {
      return setBooks(books.docs);
    });
  }, []);
  //   console.log(books);
  if (books === []) {
    return (
      <div className="py-5">
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row" style={{ height: "80vh" }}>
            <div className="col-12">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h5>List Books here</h5>
            <div className="container">
              <div className="row">
                {books.map((book, i) => {
                  return (
                    <div className="col-md-6 col-lg-4 col-12 my-3" key={i}>
                      <Books
                        {...book.data()}
                        id={book.id}
                        link={`/books/${book.id}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookListing;
