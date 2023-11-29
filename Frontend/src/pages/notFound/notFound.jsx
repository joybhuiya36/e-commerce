import React from "react";
import notfound from "../../assets/notfound2.png";
const NotFound = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "4em" }}>
      <h1>Not Found!</h1>
      <img src={notfound} width={1000} />
    </div>
  );
};

export default NotFound;
