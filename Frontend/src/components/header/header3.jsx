import React from "react";
import { Link, Route } from "react-router-dom";
import "./header3.style.scss";

const Header3 = () => {
  return (
    <div className="header3">
      <Link to="/add-book">Add Book</Link>
      <Link to="/edit-book">Edit Book</Link>
      <Link to="/all-user">All Users</Link>
      <Link to="/all-trans">All Transactions</Link>
    </div>
  );
};

export default Header3;
