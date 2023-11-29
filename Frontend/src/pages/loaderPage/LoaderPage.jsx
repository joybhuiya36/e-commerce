import React from "react";
import Loader from "../../components/loader/loader";
import "./loaderPage.style.scss";

const LoaderPage = () => {
  return (
    <div>
      <div className="loaderBG"></div>
      <div className="spinner">
        <Loader />
      </div>
    </div>
  );
};

export default LoaderPage;
