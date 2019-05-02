import React, { useState, Fragment } from "react";

import ClassImg from "../ClassImg";
import { FeatureData } from "../../blackhackinfo/classfeatures";

const CharInfoDisplay = ({ char }) => {
  const [character] = char;
  const [classModal, setClassModal] = useState(false);
  return (
    <>
      <div className="columns">
        <div className="column is-one-fifths has-text-right is-hidden-mobile">
          <ClassImg charClass={character.charClass} size={96} />
        </div>
        <div className="column is-four-fifths">
          <h1 className="is-size-1">{character.name}</h1>
          <h2 className="is-size-4 mb1">
            Level {character.level} {character.charClass}{" "}
            <button
              style={{ marginTop: "0.35rem" }}
              className="button is-danger is-small"
              onClick={e => setClassModal(!classModal)}
            >
              Class Info
            </button>
          </h2>
          <p>
            <strong>XP:</strong> {character.xp}/{character.level}
          </p>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <div className="message">
            <div className="message-body">
              <p className="mb1">
                <strong>Background:</strong> {character.background}
              </p>
              {character.description && (
                <p>
                  <strong>Description:</strong> {character.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <ViewClassModal toggle={[classModal, setClassModal]} char={[character]} />
    </>
  );
};

const ViewClassModal = ({ toggle, char }) => {
  const [classModal, setClassModal] = toggle;
  const [character] = char;
  const currentClass = FeatureData[character.charClass];
  const closeModal = () => {
    setClassModal(!classModal);
  };
  const modalOpened = classModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Class Features</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <h4 className="is-size-6">Attack Damage</h4>
          <p>{character.dmgDie}</p>
          <hr />
          {currentClass.map((el, index) => {
            const length = currentClass.length - 1;
            return (
              <Fragment key={el.feature}>
                <h4 className="is-size-6">{el.feature}</h4>
                <p>{el.description}</p>
                {index < length ? <hr /> : null}
              </Fragment>
            );
          })}
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  );
};

export default CharInfoDisplay;
