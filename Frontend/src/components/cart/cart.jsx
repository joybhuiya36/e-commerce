import React from "react";
import "./cart.style.scss";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import StarRating from "../../components/icons/starRating";
import { increase } from "../../redux/slices/cartCountSlice";
import { addToCart } from "../../redux/slices/bookCartSlice";

const Cart = ({
  id,
  title,
  author,
  price,
  rating,
  genre,
  year,
  pages,
  stock,
  image,
  onRemove,
  onPage,
}) => {
  const user = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleEdit = () => {
    navigate("/edit-book", {
      state: {
        id,
        title,
        author,
        price,
        genre,
        year,
        pages,
        stock,
        image,
      },
    });
  };
  return (
    <div className="cart">
      <img
        src={image}
        onClick={() => onPage(id)}
        style={{ cursor: "pointer" }}
      />
      <h4>{title}</h4>
      <p>${price}</p>
      <p>
        <StarRating rating={rating} />
      </p>
      <span className="btn">
        {user == 2 && (
          <button
            onClick={() => {
              dispatch(increase());
              dispatch(
                addToCart({ _id: id, title: title, price: price, image: image })
              );
            }}
          >
            Add To Cart
          </button>
        )}
        {user == 1 && (
          <span className="editbtn" onClick={handleEdit}>
            <TiEdit />
          </span>
        )}
        {user == 1 && (
          <span className="dltbtn" onClick={() => onRemove(id)}>
            <RiDeleteBin6Fill />
          </span>
        )}
      </span>
    </div>
  );
};

export default Cart;
