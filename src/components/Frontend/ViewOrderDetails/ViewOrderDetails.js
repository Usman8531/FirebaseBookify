import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebaseContext } from "../../../context/FirebaseContext";

function ViewOrderDetails() {
  const { getOrder } = useFirebaseContext();
  const [orders, setOrders] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getOrder(id).then((value) => setOrders(value.docs));
  }, []);

  return (
    <>
      <div className="container text-center">
        <div className="row">
          <h1>Orders</h1>
          {orders.map((order) => {
            const data = order.data();
            return (
              <div className="col-12 col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">Order Details</h5>
                    <p className="card-text">Buyer Name : {data.displayName}</p>
                    <p className="card-text">Email : {data.userEmail}</p>
                    <p className="card-text">Quantity : {data.quantity}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ViewOrderDetails;
