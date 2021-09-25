import React from "react";
import Rating from "react-rating";
import { deleteItemFromCart, getStorageCart } from "../../utilities/fakedb";
import "./Product.css";
const Product = (props) => {
  const { productId, productName, productImage, productSalePrice, rating } =
    props.product;
  const handelRemoveItems = (id) => {
    deleteItemFromCart(id);
  };

  const cartData = getStorageCart();
  let cartProdutId = 0;
  let button;
  for (const key in cartData) {
    cartProdutId = parseInt(key);
  }

  if (cartProdutId === productId) {
    button = (
      <>
        <button type="button" onClick={() => handelRemoveItems(productId)}>
          Remove From Cart
        </button>
      </>
    );
  } else {
    button = (
      <>
        <button
          onClick={() => props.handelClickItem(props.product)}
          type="button"
        >
          Add To Cart
        </button>
      </>
    );
  }
  return (
    <>
      <div className="product">
        <img src={productImage} alt="" />
        <h1>{productName}</h1>
        <h2>Price: $ {productSalePrice}</h2>
        <Rating
          initialRating={rating}
          emptySymbol="far fa-star icon-color"
          fullSymbol="fas fa-star icon-color"
        />
        <br />
        {button}
      </div>
    </>
  );
};

export default Product;
