import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const userid = JSON.parse(localStorage.getItem("currentUser")).user.uid;
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);

      //   console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      <h1>My completed orders</h1>
      {orders
        .filter((obj) => obj.userid == userid)
        .map((order) => {
          return (
            <div className="order__table__container">
              <table className="table mt-3 orders">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {order.cartItems.map((item) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={item.image}
                            alt="product"
                            height="80"
                            width="80"
                          />
                        </td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })}
    </Layout>
  );
}
