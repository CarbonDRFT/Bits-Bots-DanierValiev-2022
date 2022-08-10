import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function ProductInfo() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cartReducer);
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productid)
      );

      console.log(productTemp);
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "Add_to_cart", payload: product });
  };

  return (
    <Layout loading={loading}>
      <h1>Product info</h1>
      {product && (
        <div>
          <p>{product.title}</p>
          <img src={product.image} className="product__info--img" alt="" />
          <div className="product__description">
            <h3>Description</h3>
            <p>{product.description}</p>
            <div className="add__cart--btn my-3">
              <button onClick={() => addToCart(product)}>ADD TO CART</button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
