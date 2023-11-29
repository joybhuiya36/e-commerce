import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./bookDetails.style.scss";
import { useDispatch, useSelector } from "react-redux";
import StarRating from "../../components/icons/starRating";
import { increase, decrease } from "../../redux/slices/cartCountSlice";
import { addToCart, removeToCart } from "../../redux/slices/bookCartSlice";
import ReviewRating from "../../components/reviewRating/reviewRating";

const BookDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const user = useSelector((state) => state.user.role);
  const {
    _id,
    title,
    author,
    price,
    rating,
    genre,
    year,
    pages,
    stock,
    image,
  } = location.state.singleBook[0];
  // console.log(location.state.singleBook[0]);

  const cartCount = useSelector((state) => state.cartCount.count);

  return (
    <div>
      <div className="bookDetails">
        <div className="left">
          <img src={image} alt={title} />
        </div>
        <div className="right">
          <h3>{title}</h3>
          <p>Author: {author}</p>
          <p>Price: ${price}</p>
          <p>
            Rating:
            <StarRating rating={rating} />
          </p>
          <p>Genre: {genre}</p>
          <p>Publication Year: {year}</p>
          <p>Pages: {pages}</p>
          <p>Stock: {stock}</p>
          {user === 2 && (
            <div className="plusminus">
              <button
                onClick={() => {
                  dispatch(decrease());
                  dispatch(removeToCart({ _id, price }));
                  setCount(count - 1);
                }}
                disabled={cartCount == 0 || count == 0}
              >
                -
              </button>
              {count}
              <button
                onClick={() => {
                  dispatch(increase());
                  dispatch(
                    addToCart({
                      _id,
                      title,
                      price,
                      image,
                    })
                  );
                  setCount(count + 1);
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <ReviewRating bookId={_id} />
      </div>
    </div>
  );
};

export default BookDetails;
