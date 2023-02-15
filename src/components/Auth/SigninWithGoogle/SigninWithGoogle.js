import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useFirebaseContext } from "../../../context/FirebaseContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function SigninWithGoogle() {
  const navigate = useNavigate();
  const { app } = useFirebaseContext();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const SinupWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        toast("SingUp successful");
        navigate("/");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        toast(errorMessage);
        toast(errorCode);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  return (
    <>
      <button className="btn btn-danger" onClick={SinupWithGoogle}>
        SignIn With Google
      </button>
    </>
  );
}

export default SigninWithGoogle;
