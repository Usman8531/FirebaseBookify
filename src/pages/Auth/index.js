import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import ForgetPassword from "./ForgetPassword";
import SignUp from "./SignUp";
import Login from "./Login";

function Index() {
  return (
    <>
      <Routes>
        <Route path="/signUp" element={<SignUp/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgetPassword" element={<ForgetPassword/>}/>
      </Routes>
    </>
  );
}

export default Index;
