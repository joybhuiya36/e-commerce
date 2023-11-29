import React from "react";
import { FidgetSpinner } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <FidgetSpinner
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
        ballColors={["#27ad61	", "#27ad61", "#27ad61"]}
        backgroundColor="#292929"
      />
    </div>
  );
};

export default Loader;
