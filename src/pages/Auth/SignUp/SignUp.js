import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useFirebaseContext } from "../../../context/FirebaseContext";
import SigninWithGoogle from "../../../components/Auth/SigninWithGoogle/SigninWithGoogle";
const initialState = {
  name: "",
  email: "",
  password: "",
  Confirm_password: "",
};
function SignUp() {
  const navigate = useNavigate();
  const { app } = useFirebaseContext();
  const auth = getAuth(app);
  const [authe, setAuthe] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-useless-escape
    var pattern =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const { email, name, password, Confirm_password } = formData;
    if (!email || !email.match(pattern)) {
      toast("Enter your Email Correctly");
      return;
    }
    if (!name || name.length < 3) {
      toast("Enter your Name Correctly");
      return;
    }
    if (!password || password.length < 4) {
      toast("Enter your Password Correctly");
      return;
    }
    if (password !== Confirm_password) {
      toast("Your Password Does't Match");
      return;
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast("SignUp Successful");
          setAuthe(true);
          navigate("/");
          // ...
        })
        .catch((error) => {
          toast(error);
          // const errorCode = error.code;
          setAuthe(false);
          // const errorMessage = error.message;
          // ..
        });
    }
  };
  return (
    <>
      <div className="container-fluid ms-0 me-0 auth-bg--img">
        <div className="row d-flex justify-content-center align-items-center flex-column py-5">
          <div className="col-11 col-md-5 py-md-5 py-2">
            <div className="row align-items-center">
              <div className="col-12 card login--card">
                <h1 className="text-center fw-bolder pt-3 pb-2">SignUp</h1>
                <p className="text-center fw-bold text-dark opacity-50">
                  Create your account to get full access
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="col-10 offset-1 pt-2">
                    <label
                      htmlFor="name"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="form-control input--radius py-2"
                      required
                      placeholder="Enter Full Name *"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-10 offset-1 py-2">
                    <label
                      htmlFor="email"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      className="form-control input--radius py-2"
                      required
                      placeholder="Enter Email *"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-10 offset-1 pb-2">
                    <label
                      htmlFor="password"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      className="form-control input--radius py-2"
                      required
                      placeholder="Enter Password *"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-10 offset-1 pb-2">
                    <label
                      htmlFor="password"
                      className="fw-semibold py-2 ps-2 fs-5"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="Confirm_password"
                      className="form-control input--radius py-1"
                      required
                      placeholder="Confirm Password*"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="row pb-2 pt-2">
                    <div className="col-md-5  col-11 offset-1">
                      <p>
                        Already an Account...?{" "}
                        <Link
                          className="text-decoration-none text-secondary"
                          to={"/auth/login"}
                        >
                          login
                        </Link>
                      </p>
                    </div>
                    <div className="col-md-3 col-12 px-5">
                      <input
                        type="submit"
                        value={"Create Account"}
                        className="btn btn-outline-secondary card--btn"
                      />
                    </div>
                  </div>
                    <div className="col-md-6 col-12 text-center">
                     <SigninWithGoogle/>
                    </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}

export default SignUp;
