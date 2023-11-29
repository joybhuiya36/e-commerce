import React, { useEffect, useState } from "react";
import axiosIntance from "../../utils/axiosInstance";
import ReviewCart from "./reviewCart";
import StarRating from "../icons/starRating2";
import { useSelector } from "react-redux";
import "./reviewRating.style.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReviewRating = ({ bookId }) => {
  const isUser = useSelector((state) => state.user.role);
  const userId = useSelector((state) => state.user.id);
  const [reviewRating, setReviewRating] = useState([]);
  const [totalRating, setTotalRating] = useState(0);
  const [ratingS, setRating] = useState(0);
  const [reviewS, setReview] = useState("");
  const [trigger, setTrigger] = useState(false);
  const [editClick, setEditClick] = useState(false);

  useEffect(() => {
    axiosIntance
      .get("/feedback/all")
      .then((res) => {
        const arr = res.data.data;

        const resData = arr.filter((x) => x.book == bookId);
        setTotalRating(resData[0].totalRating);
        setReviewRating(resData[0].reviews);
      })
      .catch((err) => {
        setTotalRating(0);
        setReviewRating([]);
      });
  }, [trigger]);
  const handleRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!editClick) {
      axiosIntance
        .post("/feedback/add", {
          bookId: bookId,
          review: reviewS,
          rating: ratingS,
        })
        .catch(() => toast("Already Review Rating is Submitted!"));
    } else {
      axiosIntance.patch("/feedback/edit", { bookId: bookId, review: reviewS });
      setTimeout(() => {
        setEditClick(false);
      }, 1000);
    }
    setReview("");
    setRating(0);
    setTimeout(() => {
      setTrigger(!trigger);
    }, 500);
  };
  const handleEdit = () => {
    const userReview = reviewRating.filter((x) => {
      if (x.user._id == userId) return x;
    });
    const { review, rating } = userReview[0];
    setReview(review);
    setRating(rating);
    setEditClick(true);
  };
  const handleRemove = () => {
    axiosIntance.post("/feedback/remove", { bookId });
    setTimeout(() => {
      setTrigger(!trigger);
    }, 500);
  };
  return (
    <div style={{ textAlign: "center", color: "#292929" }}>
      <ToastContainer />
      <h2 style={{ textDecoration: "underline" }}>Review Rating</h2>
      <div style={{ textAlign: "left", margin: "3em 16em" }}>
        <h1>
          <span style={{ fontSize: "2em" }}>{totalRating.toFixed(1)}</span>/5
        </h1>
        <span style={{ fontSize: "3em" }}>
          <StarRating rating={totalRating} />
        </span>
      </div>
      {reviewRating.map((x) => (
        <ReviewCart
          key={x.user._id}
          id={x.user._id}
          name={x.user.name}
          review={x.review}
          rating={x.rating}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      ))}
      <br />
      <br />
      {isUser == 2 && (
        <div className="reviewForm">
          <form onSubmit={handleSubmit}>
            <label>
              Rating:
              <input
                type="number"
                min="0"
                max="5"
                value={ratingS}
                onChange={handleRatingChange}
              />
            </label>
            <br />
            <label>
              Review:
              <textarea value={reviewS} onChange={handleReviewChange} />
            </label>
            <br />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewRating;
