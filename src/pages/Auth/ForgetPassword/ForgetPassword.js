import React, { useState } from "react";
import { toast } from "react-toastify";
const initialValue = {
  email: "",
};
function ForgetPassword() {
  const [formData, setFormData] = useState(initialValue);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email } = formData;
    if (!email) {
      toast("Enter Correct Email");
    }
    console.log(email);
  };
  return (
    <>
      <div className="container-fluid ms-0 me-0 auth-bg--img">
        <div className="row d-flex justify-content-center align-items-center flex-column py-5">
          <div className="col-11 col-md-6 py-5">
            <div className="row align-items-center">
              <div className="col-12 card login--card py-5">
                <h1 className="text-center fw-bolder pt-3 pb-2">
                  Forgot Password
                </h1>
                <p className="text-center fw-bold text-dark opacity-50">
                  Enter Login Details to get access
                </p>
                <form action="" onSubmit={handleSubmit}>
                  <div className="col-10 offset-1 pt-2">
                    <label
                      htmlFor="name"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control input--radius py-2"
                      required
                      placeholder="Enter Email*"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row pb-2 pt-1 mt-3 mb-2 text-end">
                    <div className="col-md-12 col-11 px-5">
                      <input
                        type="submit"
                        value={"Send Link"}
                        className="btn btn-outline-secondary card--btn"
                      />
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

export default ForgetPassword;
