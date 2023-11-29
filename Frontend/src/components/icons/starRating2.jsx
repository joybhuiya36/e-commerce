import React, { useState } from "react";
import StarRatings from "react-star-ratings";

const Foo = ({ rating }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="#27ad61"
      numberOfStars={5}
      name="rating"
      starDimension="40px"
      starSpacing="1px"
    />
  );
};

export default Foo;
