import React from "react";
import NoCart from "./noCart";
import { useSelector } from "react-redux";
import CartBook from "../../components/cart/cartBook";

const CartPage = () => {
  const cartCount = useSelector((state) => state.cartCount.count);
  return (
    <div>
      {!cartCount && <NoCart />}
      {cartCount && <CartBook />}
    </div>
  );
};

export default CartPage;
