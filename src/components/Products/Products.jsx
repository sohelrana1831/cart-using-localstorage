import React, { useEffect, useState } from "react";
import { addDb, getStorageCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Products.css";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [displaySearchProduct, setDisplaySearchProduct] = useState([]);
  useEffect(() => {
    fetch("./data/products.json")
      .then((Response) => Response.json())
      .then((products) => {
        setProducts(products);
        setDisplaySearchProduct(products);
      });
  }, []);

  useEffect(() => {
    if (products.length) {
      const cartData = getStorageCart();
      const storedCart = [];
      for (const key in cartData) {
        const addedProduct = products.find(
          (product) => product.productId === parseInt(key)
        );
        if (addedProduct) {
          const quantity = cartData[key];
          addedProduct.quantity = quantity;
          storedCart.push(addedProduct);
        }
      }
      setCart(storedCart);
    }
  }, [products]);

  const handelClickItem = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    addDb(product.productId);
  };

  const handelSearch = (e) => {
    const searchValue = e.target.value;
    const searchMatch = products.filter((product) =>
      product.productName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setDisplaySearchProduct(searchMatch);
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>All Products</h1>
      <input
        className="search-input"
        type="text"
        onChange={handelSearch}
        name=""
        id=""
        placeholder="Search by product name..."
      />
      <div className="products-container">
        <div className="product-container">
          {displaySearchProduct.map((product) => (
            <Product
              key={product.productId}
              product={product}
              handelClickItem={handelClickItem}
            />
          ))}
        </div>
        <Cart cart={cart} />
      </div>
    </>
  );
};

export default Products;
