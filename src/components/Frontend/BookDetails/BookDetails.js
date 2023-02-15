import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebaseContext } from "../../../context/FirebaseContext";

function BookDetails() {
  const { id } = useParams();
  const { getSingleBook, getImgURL, orderBook } = useFirebaseContext();
  const [data, setData] = useState(null);
  const [url, setURL] = useState(null);
  let [quantity, setQuantity] = useState(0);
  const addBook = () => {
    setQuantity(quantity + 1);
  };
  const removeBook = () => {
    quantity === 0 ? setQuantity(quantity) : setQuantity(quantity - 1);
  };

  useEffect(() => {
    getSingleBook(id).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageURL = data.imageURL;
      getImgURL(imageURL).then((url) => setURL(url));
    }
  }, []);

  //

  const placeOrder = async () => {
    if (quantity === 0) {
      toast("No Items is added");
    } else {
      const result = await orderBook(id, quantity);
      toast("Order Is Placed");
      setTimeout(() => {
        setQuantity(0);
      }, 2000);
    }
  };

  // Spinner on top  before data loading
  if (data === null) {
    return (
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="row" style={{ height: "80vh" }}>
          <div className="col-12">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container my-3 ">
        <div className="row d-flex justify-content-around">
          <div className="col-md-6 col-12">
            {
              <img
                src={url}
                alt=""
                className="img-fluid"
                style={{ height: "25rem" }}
              />
            }
          </div>
          <div className="col-md-6 col-12 ps-5">
            <h2>Details</h2>
            <h4 className="">
              <span className="">Book Name </span>: {data.name}
            </h4>
            <h6 className="">
              <span className="">Book Price </span>: {data.price}
            </h6>
            <h6 className="">
              <span className="">Seller Name </span>: {data.displayName}
            </h6>
            <h6 className="">
              <span className="">Seller Email </span>: {data.userEmail}
            </h6>
            <h6 className="">
              <span className="">IsbnNUmber </span>: {data.isbnNumber}
            </h6>
            <p>
              seller image
              <img
                src={data.userPhotoURL}
                alt=""
                className="img-fluid d-block"
              />
            </p>{" "}
            <Link>
              <button className="btn btn-primary" onClick={placeOrder}>
                Buy Now
              </button>
            </Link>
            <div className="col-3 my-2">
              <div className="border d-flex justify-content-between rounded-pill">
                <button
                  className="btn btn-sm-primary fw-bold fs-4"
                  onClick={addBook}
                >
                  +
                </button>
                <p className="mb-0 fw-bold fs-4 pb-0">{quantity}</p>
                <button
                  className="btn btn-sm-primary fw-bold fs-4"
                  onClick={removeBook}
                >
                  -
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BookDetails;
