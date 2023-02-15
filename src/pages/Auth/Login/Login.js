import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseContext } from "../../../context/FirebaseContext";
import SigninWithGoogle from "../../../components/Auth/SigninWithGoogle/SigninWithGoogle";
const initialValue = {
  email: "",
  password: "",
};
function Login() {
  const { app, authe } = useFirebaseContext();

  const auth = getAuth(app);

  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email) {
      toast("Enter your Name Correctly");
      return;
    }
    if (!password) {
      toast("Enter your password Correctly");
      return;
    } else {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast("Login Successful");
          navigate("/");
          // ...
        })
        .catch((error) => {
          toast(error.message);
        });
    }
  };
  return (
    <>
      {authe ? (
        <div className="py-5" style={{ height: "100vh" }}>
          <div className="container d-flex justify-content-center align-items-center">
            <div className="row ">
              <div className="col-12">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid ms-0 me-0 auth-bg--img">
          <div className="row d-flex justify-content-center align-items-center flex-column py-5">
            <div className="col-11 col-md-6 py-5">
              <div className="row align-items-center">
                <div className="col-12 card login--card py-5">
                  <h1 className="text-center fw-bolder pt-3 pb-2">Login</h1>
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
                        placeholder="Enter Full Name *"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-10 offset-1 py-2">
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
                        placeholder="Enter password *"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="row">
                      <div className="col-12 px-5 py-2 col-md-6">
                        <input
                          type="checkbox"
                          className="form-check-input me-2"
                        />
                        <label
                          className="form-check-label"
                          forhtml="reverseCheck1"
                        >
                          Keep me LoggedIn
                        </label>
                      </div>
                      <div className="col-12 px-5 py-2 col-md-6">
                        <Link
                          className="text-decoration-none text-secondary"
                          to={"/auth/forgetpassword"}
                        >
                          ForgetPassword
                        </Link>
                      </div>
                    </div>
                    <div className="row pb-2 pt-1 mt-3 mb-2">
                      <div className="col-md-5 col-11 offset-1">
                        <p>
                          Already an Account...?{" "}
                          <Link
                            className="text-decoration-none text-secondary"
                            to={"/auth/signUp"}
                          >
                            SignUp
                          </Link>
                        </p>
                      </div>
                      <div className="col-md-3 col-11 px-5">
                        <input
                          type="submit"
                          className="btn btn-outline-secondary card--btn"
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12 text-center">
                      <SigninWithGoogle />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
