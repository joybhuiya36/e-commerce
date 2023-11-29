import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";

import "./header2.style.scss";
import CartIcon from "../cart/cartIcon";
import { useSelector } from "react-redux";

const Header2 = () => {
  const user = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const handleCart = () => {
    navigate("/cart");
  };
  const handleTrans = () => {
    navigate("/trans");
  };
  return (
    <div className="header2">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/book">Books</Link>
        <Link to="/about">About Us</Link>
        <Link to="/">Contact Us</Link>
        {user == 2 && (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span
              style={{
                color: "white",
                fontSize: "2em",
                marginRight: "1em",
                cursor: "pointer",
              }}
              onClick={handleTrans}
            >
              <BiTransfer />
            </span>
            <span onClick={handleCart}>
              <CartIcon />
            </span>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header2;
