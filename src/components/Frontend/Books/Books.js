import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirebaseContext } from "../../../context/FirebaseContext";

function Books({ name, displayName, price, isbnNumber, imageURL, id,link }) {
  const { getImgURL } = useFirebaseContext();
  const [url, setURL] = useState();
  useEffect(() => {
    getImgURL(imageURL).then((image) => setURL(image));
  }, []);

  return (
    <>
      <div className="card">
        <img
          src={url}
          className="card-img-top img-fluid"
          style={{ height: "15rem" }}
          alt="Book Img"
        />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            Seller of this book is {displayName} and the price of this book is{" "}
            {price} and isbnNumber of this book {isbnNumber}
          </p>
          <Link className="btn btn-primary" to={`${link}`}>
            View
          </Link>
        </div>
      </div>
    </>
  );
}

export default Books;
