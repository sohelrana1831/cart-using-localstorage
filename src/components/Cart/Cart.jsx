import React from "react";
import { clearFromCart } from "../../utilities/fakedb";
import "./Cart.css";
const Cart = (props) => {
  const { cart } = props;
  let totalQuantity = 0;

  for (const product of cart) {
    if (!product.quantity) {
      product.quantity = 1;
    }
    totalQuantity = totalQuantity + product.quantity;
  }

  const priceReduce = cart.reduce((previeusPrice, currentPrice) => {
    return (
      (parseFloat(previeusPrice) + parseFloat(currentPrice.productSalePrice)) *
      totalQuantity
    );
  }, 0);
  const handelRemoveFromCart = () => {
    clearFromCart();
  };
  // console.log(totalQuantity);
  const shippingCost = priceReduce ? 15 : 0;
  const tax = (priceReduce + shippingCost) * 0.1;
  const total = priceReduce + shippingCost + tax;
  return (
    <div className="cart">
      <h1>Order Summary</h1>
      <div className="cart-items">
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>Quantity: </td>
              <td>{totalQuantity}</td>
            </tr>
            <tr>
              <td>Amount: </td>
              <td>$ {priceReduce.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Shipping: </td>
              <td>$ {shippingCost.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tax: </td>
              <td>$ {tax.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Total amount: </td>
              <td>$ {total.toFixed(2)}</td>
            </tr>
          </tbody>
          <tfoot></tfoot>
        </table>
        <button type="button" onClick={handelRemoveFromCart}>
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Cart;
