import React from "react";
import { BsCart4 } from "react-icons/bs";

const NoCart = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "20em",
      }}
    >
      <span style={{ fontSize: "2em", opacity: ".5", color: "#292929" }}>
        <BsCart4 style={{ fontSize: "3rem" }} />
        <br /> No Cart Found
      </span>
    </div>
  );
};

export default NoCart;
