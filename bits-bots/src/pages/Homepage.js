import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import { bitsBotsProducts } from "../bits-bots-project";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Homepage() {
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  //   async function adddata() {
  //     try {
  //       await addDoc(collection(fireDB, "users"), { name: "danier", age: 26 });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

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

  //   function addProductsData() {
  //     bitsBotsProducts.map(async (product) => {
  //       try {
  //         await addDoc(collection(fireDB, "products"), product);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });
  //   }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "Add_to_cart", payload: product });
  };

  return (
    <Layout loading={loading}>
      <h1>Home</h1>

      <div className="container">
        <div className="d-flex w-50">
          <input
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="search items"
          />
          <select
            name=""
            id=""
            className="form-control"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="console">Console</option>
            <option value="ps4g">PS4 games</option>
            <option value="ps5g">PS5 games</option>
            <option value="xbone">Xbox One games</option>
            <option value="xbxs">Xbox Series X|S</option>
            <option value="nintendog">Nintendo games</option>
            <option value="wiig">Wii Games</option>
          </select>
        </div>
        <div className="row">
          {products
            .filter((obj) => obj.title.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.includes(filterType))
            .map((product) => {
              return (
                <div className="col-md-4">
                  <div className="product__container">
                    <div className="m-2 p-1 product__content position-relative">
                      <div className="product__image--container">
                        <img
                          src={product.image}
                          alt=""
                          className="product__img"
                        />
                        <h5>Price: {product.price}kr.</h5>
                      </div>
                    </div>
                    <div className="product__action">
                      <p>{product.title}</p>
                      <div className="d-flex">
                        <button onClick={() => addToCart(product)}>
                          Add to cart
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/product-info/${product.id}`);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* <button onClick={adddata}>Add data to firebase</button>
      <button onClick={getData}>get data from firebase</button> */}
    </Layout>
  );
}
