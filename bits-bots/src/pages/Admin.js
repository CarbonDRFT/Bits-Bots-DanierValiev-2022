import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  collection,
  addDoc,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Modal, Tab, Tabs } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: 0,
    image: "",
    category: "",
  });

  const [show, setShow] = useState(false);
  const [add, setAdd] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        productsArray.push(obj);
        setLoading(false);
      });

      setProducts(productsArray);

      //   console.log(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrdersData();
  }, []);

  async function getOrdersData() {
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

  const editHandler = (item) => {
    setProduct(item);

    setShow(true);
  };
  const updateProduct = async () => {
    try {
      setLoading(true);
      await setDoc(doc(fireDB, "products", product.id), product);
      getData();
      handleClose();
      toast.success("product updated successfully");
    } catch (error) {
      toast.success("product update failed");
      setLoading(false);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);
      await addDoc(collection(fireDB, "products"), product);
      getData();
      handleClose();
      toast.success("Product added successfully");
    } catch (error) {
      toast.error("Product add failed");
      setLoading(false);
    }
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const deleteProduct = async (item) => {
    try {
      setLoading(true);
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted successfully");
      getData();
    } catch (error) {
      toast.failed("Product delete failed");
      setLoading(false);
    }
  };

  return (
    <Layout loading={loading}>
      <Tabs
        defaultActiveKey="products"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="products" title="Products">
          <div className="d-flex justify-content-between">
            <h3>Products list</h3>
            <button className="add__product" onClick={addHandler}>
              Add product
            </button>
          </div>
          <table className="table mt-3">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => {
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
                    <td>{item.category}</td>
                    <td>{item.price} Kr.</td>
                    <td>
                      <FaTrash
                        onClick={() => {
                          deleteProduct(item);
                        }}
                      />
                      <FaEdit onClick={() => editHandler(item)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Tab>
        <Tab eventKey="orders" title="Orders">
          {orders.map((order) => {
            return (
              <table className="table mt-3 orders">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Title</th>
                    <th>user</th>
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
                        <td>{item.userid} </td>
                        <td>{item.price} Kr.</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            );
          })}
        </Tab>
        <Tab eventKey="contact" title="Users" disabled></Tab>
      </Tabs>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {add === true ? "Add a product" : "Edit product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {" "}
          <div className="register-form">
            <input
              type="text"
              className="form-control"
              value={product.title}
              placeholder="title"
              onChange={(e) =>
                setProduct({ ...product, title: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              value={product.image}
              placeholder="image"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              value={product.price}
              placeholder="price"
              onChange={(e) =>
                setProduct({ ...product, price: e.target.value })
              }
            />
            <textarea
              type="text"
              rows={3}
              className="form-control"
              value={product.description}
              placeholder="description"
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
            <input
              type="text"
              className="form-control"
              value={product.category}
              placeholder="category"
              onChange={(e) =>
                setProduct({ ...product, category: e.target.value })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button>Close</button>
          {add ? (
            <button onClick={addProduct}>Save</button>
          ) : (
            <button onClick={updateProduct}>Save</button>
          )}
        </Modal.Footer>
      </Modal>
    </Layout>
  );
}
