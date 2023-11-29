import React, { useEffect, useState } from "react";
import axiosIntance from "../../utils/axiosInstance";
import "./userTransaction.style.scss";

const UserTransaction = () => {
  const [trans, setTrans] = useState([]);
  useEffect(() => {
    axiosIntance.get("/trans/view").then((res) => setTrans(res.data.data));
  });
  return (
    <div className="transPage">
      <h2>Transactions</h2>
      <div className="allTransDiv">
        {trans.map((tran, i) => (
          <div key={i} className="oneTrans">
            {tran.books.map((book, j) => (
              <div key={j} className="bookDetails">
                <img src={book.book.image} />
                <div className="nameQuantity">
                  <h4>{book.book.title}</h4>
                  <p>Quantity: {book.quantity}</p>
                </div>
              </div>
            ))}
            <hr />
            <h3>Total: ${tran.total.toFixed(2)}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTransaction;
