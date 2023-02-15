import "./App.scss";
import FirebaseContextProvider from "./context/FirebaseContext";
import Router from "./pages/Router";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <FirebaseContextProvider>
        <Router />
        <ToastContainer />
      </FirebaseContextProvider>
    </>
  );
}

export default App;
