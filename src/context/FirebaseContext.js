import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyAujmcj8x6xcVgQySY5jEDD5T_Nzkv4WP8",
  authDomain: "bookify-reactapp.firebaseapp.com",
  projectId: "bookify-reactapp",
  storageBucket: "bookify-reactapp.appspot.com",
  messagingSenderId: "150006142552",
  appId: "1:150006142552:web:4003e754b9d45cbe891c2d",
  measurementId: "G-NVV5D2WNPX",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
const FirebaseContext = createContext();
function FirebaseContextProvider({ children }) {
  // New User SignUp in App

  //   Old User Login
  const auth = getAuth(app);
  const [users, setUser] = useState(null);
  const [authe, setAuthe] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
        setUser(user);
        setAuthe(false);
      } else {
        // User is signed out
        // ...
        setAuthe(false);
        setUser(null);
      }
    });
  });
  const isLoggedIn = users ? true : false;

  //   Logout user
  const logOut = async () => {
    await auth.signOut();
    // toast("User LogOut")
  };

  // storing data in firebase
  const firestore = getFirestore(app);

  // Storage in firebase
  const storage = getStorage(app);

  const addListing = async (name, isbnNumber, price, cover) => {
    const imageREf = ref(
      storage,
      `uploads/images//${Date.now()}-${cover.name}`
    );
    const uploadedImg = await uploadBytes(imageREf, cover);
    await addDoc(collection(firestore, "books"), {
      name,
      isbnNumber,
      price,
      imageURL: uploadedImg.ref.fullPath,
      userID: users.uid,
      userEmail: users.email,
      displayName: users.displayName,
      userPhotoURL: users.photoURL,
    });
  };

  // read document
  const readList = () => {
    return getDocs(collection(firestore, "books"));
  };
  // download img

  const getImgURL = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  // get single document
  const getSingleBook = async (id) => {
    const docRef = doc(firestore, "books", id);
    const result = await getDoc(docRef);
    return result;
  };

  // place order

  const orderBook = async (bookId, quantity) => {
    const collectionRef = collection(firestore, "books", bookId, "order");
    const result = await addDoc(collectionRef, {
      userName: users.displayName,
      userID: users.uid,
      userEmail: users.email,
      displayName: users.displayName,
      userPhotoURL: users.photoURL,
      quantity,
    });
    return result;
  };

  // orders
  const [Loader, setLoader] = useState();
  const fetchMyOrders = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userID", "==", userId));
    const results = await getDocs(q);
    setLoader(results);
    return results;
  };
  const Findbooks = Loader ? false : true;
  // order

  const getOrder = async (bookId) => {
    const collectionRef = collection(firestore, "books", bookId, "order");
    const result = await getDocs(collectionRef);
    return result;
  };
  return (
    <>
      <FirebaseContext.Provider
        value={{
          app,
          isLoggedIn,
          logOut,
          authe,
          addListing,
          readList,
          getImgURL,
          getSingleBook,
          orderBook,
          fetchMyOrders,
          users,
          getOrder,
          Findbooks,
        }}
      >
        {children}
      </FirebaseContext.Provider>
    </>
  );
}
export const useFirebaseContext = () => {
  return useContext(FirebaseContext);
};
export default FirebaseContextProvider;
