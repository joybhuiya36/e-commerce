import React, { useEffect, useState } from "react";
import axiosIntance from "../../utils/axiosInstance";
import pic from "../../assets/profilepic.png";
import "./allTransactions.style.scss";

const AllTransactions = () => {
  const [allTrans, setAllTrans] = useState([]);
  useEffect(() => {
    axiosIntance.get("/trans/all").then((res) => setAllTrans(res.data.data));
  });
  return (
    <div className="mainDivTrans">
      <h2>AllTransactions</h2>
      <div className="allTrans">
        {allTrans.map((trans) => (
          <div className="trans">
            <div className="picName">
              <img src={pic} />
              <h3>{trans.user.name}</h3>
            </div>
            {trans.books.map((book) => (
              <div className="books">
                <img src={book.book.image} width={100} />
                <div className="titleQuantity">
                  <h4>{book.book.title}</h4>
                  <p>Quantity: {book.quantity}</p>
                </div>
              </div>
            ))}
            <hr />
            <h3>Total: ${trans.total.toFixed(2)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTransactions;
