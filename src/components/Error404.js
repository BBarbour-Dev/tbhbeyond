import React from "react";
import skull from "../config/images/skull.png";

const Error404 = () => {
  return (
    <section className="content-gap">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-three-fifths box content-box">
            <h1 className="is-size-3">
              Page does not exist
              <hr />
              <div className="has-text-centered">
                <img style={{ height: "50vh" }} src={skull} alt="Skull" />
              </div>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error404;
