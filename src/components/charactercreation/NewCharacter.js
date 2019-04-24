import React, { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import { FirebaseContext } from "../../config/context";
import useAuth from "../../hooks/useAuth";

import Attributes from "./Attributes";
import CharClass from "./CharClass";
import Background from "./Background";
import Equipment from "./Equipment";
import Spells from "./Spells";
import Review from "./Review";

import { CharacterSchema } from "../../blackhackinfo/characterschema";

const NewCharacter = ({ history }) => {
  const firebase = useContext(FirebaseContext);
  const [user] = useAuth();
  const [character, setCharacter] = useState(CharacterSchema);
  const [currentStep, setCurrentStep] = useState(0);
  const backward = () => {
    let step = currentStep;
    setCurrentStep(step - 1);
  };
  const forward = () => {
    let step = currentStep;
    setCurrentStep(step + 1);
  };
  const stepsArr = [
    <Attributes char={[character, setCharacter]} />,
    <CharClass char={[character, setCharacter]} />,
    <Background char={[character, setCharacter]} />,
    <Equipment char={[character, setCharacter]} />,
    <Spells char={[character, setCharacter]} />,
    <Review
      char={[character, setCharacter]}
      firebase={firebase}
      user={user}
      history={history}
      schema={CharacterSchema}
    />
  ];
  const backDisable = currentStep === 0;
  const nextDisable = currentStep === stepsArr.length - 1;
  return (
    user && (
      <section className="content-gap">
        <div className="container">
          <div className="columns is-centered">
            <div
              className="column is-three-fifths box"
              style={{ padding: "3rem" }}
            >
              <h1 className="is-size-2 mb2">New Character</h1>
              <div className="columns is-centered">
                <div className="column is-four-fifths ">
                  <button
                    disabled={backDisable}
                    className="button is-pulled-left is-medium"
                    onClick={backward}
                  >
                    <span>
                      <i className="fas fa-caret-left" /> Prev
                    </span>
                  </button>
                  <button
                    disabled={nextDisable}
                    className="button is-pulled-right is-medium"
                    onClick={forward}
                  >
                    <span>
                      Next <i className="fas fa-caret-right" />
                    </span>
                  </button>
                </div>
              </div>
              <hr className="mt1 mb1" />
              <div className="columns">{stepsArr[currentStep]}</div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default withRouter(NewCharacter);
