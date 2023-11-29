import React, { useState } from "react";
import "./searchBar.style.scss";
import { useDispatch } from "react-redux";
import { searchword } from "../../redux/slices/searchSlice";

const SearchBar = () => {
  const dispatch = useDispatch();
  const handleSearch = (e) => {
    dispatch(searchword(e.target.value));
  };

  return (
    <div>
      <input
        className="searchBar"
        type="text"
        placeholder="Search Here"
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
