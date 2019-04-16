import React from "react";
import loader from "../config/images/loader.gif";

const Loader = () => {
  return (
    <section className="mt2">
      <div className="container">
        <div className="columns is-mobile is-centered">
          <img src={loader} alt="Loading..." />
        </div>
      </div>
    </section>
  );
};

export default Loader;
