import React from "react";
import "./home.style.scss";
import Service from "../../components/home/service";
import Book from "../../components/book/book";
import cover from "../../assets/cover.jpg";

const Home = () => {
  return (
    <div>
      <img src={cover} className="cover" />
      <Service />
      <Book />
    </div>
  );
};

export default Home;
