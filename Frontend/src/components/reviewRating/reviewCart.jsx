import React from "react";
import StarRating from "../icons/starRating";
import { useSelector } from "react-redux";
import "./reviewCart.style.scss";
import pic from "../../assets/profilepic.png";

const ReviewCart = ({ id, name, review, rating, onEdit, onRemove }) => {
  const userId = useSelector((state) => state.user.id);
  return (
    <div className="reviewCart">
      <div className="left">
        <div>
          <div className="picName">
            <img src={pic} />
            <h3>{name}</h3>
          </div>
          <StarRating rating={rating} />
          <p>{review}</p>
        </div>
      </div>
      <div className="right">
        {id == userId && (
          <div>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onRemove}>X</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewCart;
