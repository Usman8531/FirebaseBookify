import React from "react";
import { Routes, Route } from "react-router-dom";
import Footer from "../../components/Frontend/Footer";
import Header from "../../components/Frontend/Header";
import About from "./About";
import BooksDetail from "./BooksDetail";
import Home from "./Home";
// import ListingBooks from "../Dashboard/ListingBooks";

function index() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books/:id" element={<BooksDetail/>} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default index;
