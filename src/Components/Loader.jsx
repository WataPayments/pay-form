import React from "react";
import "../Styles/LoaderStyle.css";

const Loader = () => {
  return (
    <div className="loading">
      <span className="loading__dot"></span>
      <span className="loading__dot"></span>
      <span className="loading__dot"></span>
    </div>
  );
};

export default Loader;
