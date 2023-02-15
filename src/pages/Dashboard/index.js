import React from "react";
import { Route, Routes } from "react-router-dom";
import ViewOrder from "../../components/Frontend/ViewOrder/ViewOrder";
import ViewOrderDetails from "../../components/Frontend/ViewOrderDetails/ViewOrderDetails";
import DashboardHome from "./DashboardHome";

function index() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/orders" element={<ViewOrder />} />
          <Route path="/orders/:id" element={<ViewOrderDetails/>} />
        </Routes>
      </main>
    </>
  );
}

export default index;
