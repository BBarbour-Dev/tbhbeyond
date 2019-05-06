import React from "react";
import tbhlogo from "../config/images/tbhlogo.png";

const Landing = () => {
  return (
    <>
      <section className="hero landing">
        <div className="hero-body landing-backdrop">
          <div className="container" />
          <div className="columns is-centered">
            <div className="column is-three-fifths">
              <h1
                className="is-size-1 has-text-white has-text-centered"
                style={{ marginTop: "4rem" }}
              >
                The Black Hack: <span className="has-text-danger">Beyond</span>
              </h1>
            </div>
          </div>
          <div className="columns is-centered">
            <div className="column is-one-fifth">
              <h2 className="is-size-5 has-text-grey-lighter has-text-centered is-hidden-touch">
                This unofficial app lets you create, manage, and update your
                Black Hack 2E characters.
              </h2>
            </div>
          </div>
        </div>
      </section>
      <section className="content-gap">
        <div className="container">
          <div className="columns is-centered is-gapless">
            <div className="column is-two-fifths">
              <div className="has-text-centered">
                <figure className="is-square">
                  <img
                    src={tbhlogo}
                    alt="The Black Hack: Beyond"
                    style={{ height: "25rem" }}
                  />
                </figure>
              </div>
            </div>
            <div className="column is-two-fifths box">
              <div
                className="writing"
                style={{ padding: "3rem", lineHeight: "2.5" }}
              >
                <h2 className="is-size-5 has-text-centered mb1 writing">
                  What is The Black Hack 2E?
                </h2>
                <p
                  className="has-text-justified"
                  style={{ textIndent: "1.5rem" }}
                >
                  The Second Edition of The Black Hack is a slick, lightweight,
                  and fast OSR (Old School Revival) roleplaying game. It
                  combines the grit of old school gaming with the gratifying
                  mechanics of modern roleplaying games.
                </p>
                <p
                  className="has-text-justified"
                  style={{ textIndent: "1.5rem" }}
                >
                  Written by David Black and published by Gold Piece
                  Productions, it has become a Platinum Best Seller on
                  DrivethruRPG.{" "}
                </p>
                <p>This site was created by a humble fan who loves the RPG.</p>
                <p
                  className="has-text-justified is-pulled-right"
                  style={{ marginBottom: "2rem" }}
                >
                  <a
                    className="has-text-danger has-text-weight-bold"
                    href="https://www.drivethrurpg.com/product/255088/The-Black-Hack-Second-Edition"
                    target="_blank"
                  >
                    Check it out!
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Landing;
