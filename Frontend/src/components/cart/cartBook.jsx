import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart2 from "./cart2";
import "./cartBook.style.scss";
import axiosIntance from "../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  removeToCart,
  removeMany,
  clearCart,
} from "../../redux/slices/bookCartSlice";
import { decreaseMany, countZero } from "../../redux/slices/cartCountSlice";

const CartBook = () => {
  const bookData = useSelector((state) => state.bookCart.cart);
  const totalCost = useSelector((state) => state.bookCart.total);
  const dispatch = useDispatch();
  //   console.log(bookData);
  const handleCheckout = () => {
    axiosIntance.get("/wallet/balance").then((res) => {
      const balance = res.data.data.balance;
      if (balance >= totalCost) {
        axiosIntance.post("/cart/checkout").then((res) => {
          if (res.data.success) {
            toast("Successfully Checked Out!");
            dispatch(clearCart());
            dispatch(countZero());
          }
        });
      } else {
        toast("Insufficient Balance!");
      }
    });
  };
  const handleFullRemove = (_id, quantity, price) => {
    // console.log(_id, quantity, price);
    dispatch(removeMany({ _id, price, quantity }));
    dispatch(decreaseMany(quantity));
  };
  return (
    <div>
      {bookData.map((x) => (
        <Cart2
          key={x._id}
          _id={x._id}
          title={x.title}
          price={x.price}
          image={x.image}
          quantity={x.quantity}
          onRemove={handleFullRemove}
        />
      ))}
      <h3 style={{ textAlign: "center", marginBottom: "1em" }}>
        Total: ${totalCost.toFixed(2)}
      </h3>
      <div className="checkoutbtn">
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartBook;
