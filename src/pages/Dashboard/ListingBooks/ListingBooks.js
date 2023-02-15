import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useFirebaseContext } from "../../../context/FirebaseContext";
const initialValue = {
  name: "",
  isbnNumber: "",
  price: "",
};
function ListingBooks() {
  const { addListing } = useFirebaseContext();
  const [formData, setFormData] = useState(initialValue);
  const [cover, setCover] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, isbnNumber, price } = formData;
    if (name.length < 3) {
      toast("Enter your Name Correctly");
      return;
    }
    if (!isbnNumber) {
      toast("Enter your isbnNumber Correctly");
      return;
    }
    if (!price) {
      toast("Enter your Price");
      return;
    } else {
      await addListing(name, isbnNumber, price, cover);
      toast("Book is uploaded");
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };
  return (
    <>
      <div className="container-fluid ms-0 me-0 auth-bg--img">
        <div className="row d-flex justify-content-center align-items-center flex-column py-1">
          <div className="col-11 col-md-6 py-1">
            <div className="row align-items-center">
              <div className="col-12 card login--card py-md-5 py-2">
                <h1 className="text-center fw-bolder pt-2 pb-2">
                  Upload Content
                </h1>
                <p className="text-center fw-bold text-dark opacity-50">
                  Enter Book Details
                </p>
                <form action="" onSubmit={handleSubmit}>
                  <div className="col-10 offset-1 pt-2">
                    <label
                      htmlFor="name"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Name
                    </label>
                    <input
                      type="name"
                      name="name"
                      className="form-control input--radius py-2"
                      required
                      placeholder="Enter Full Name *"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-10 offset-1 py-2">
                    <label
                      htmlFor="isbnNumber"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      isbnNumber
                    </label>
                    <input
                      type="text"
                      name="isbnNumber"
                      className="form-control input--radius py-2"
                      required
                      placeholder="isbnNumber *"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-10 offset-1 py-2">
                    <label
                      htmlFor="isbnNumber"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="form-control input--radius py-2"
                      required
                      placeholder="Price *"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-10 offset-1 py-2">
                    <label
                      htmlFor="isbnNumber"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Upload File
                    </label>
                    <input
                      type="file"
                      name="price"
                      className="form-control input--radius py-2"
                      required
                      onChange={(e) => setCover(e.target.files[0])}
                    />
                  </div>
                  <div className="row pb-2 pt-1 mt-3 mb-2 d-flex justify-content-between">
                    <div className="col-md-3 col-11 px-5">
                      <input
                        type="submit"
                        value={"Create"}
                        className="btn btn-outline-secondary card--btn"
                      />
                    </div>
                    <div className="col-md-4 col-11 px-5">
                      <NavLink
                        className="btn btn-outline-danger card--btn"
                        to={"/"}
                      >
                        {" "}
                        Go to Home
                      </NavLink>
                    </div>
                    <div className="col-md-3 col-11 px-5">
                      <NavLink
                        className="btn btn-outline-info card--btn "
                        to={"/dashboard/orders"}
                      >
                        {" "}
                        order
                      </NavLink>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingBooks;
