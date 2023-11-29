import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";

const CartIcon = () => {
  const count = useSelector((state) => state.cartCount.count);
  return (
    <div style={{ position: "relative" }}>
      <AiOutlineShoppingCart
        style={{
          color: "white",
          fontSize: "2rem",
          cursor: "pointer",
          marginRight: "50px",
        }}
      />
      <span
        style={{
          backgroundColor: "#292929",
          borderRadius: "50%",
          fontSize: ".8em",
          color: "white",
          padding: "1px 3px",
          textAlign: "center",
          position: "absolute",
          right: "2.5rem",
          top: "-.6rem",
        }}
      >
        {count}
      </span>
    </div>
  );
};

export default CartIcon;
