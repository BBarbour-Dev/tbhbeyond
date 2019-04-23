import React, { useState, Fragment } from "react";

import {
  startingHitDie,
  startingDmgDie,
  rollStartingHP
} from "../../blackhackinfo/chargen";
import { FeatureData } from "../../blackhackinfo/classfeatures";

import warrior from "../../config/images/warrior.png";
import thief from "../../config/images/thief.png";
import cleric from "../../config/images/cleric.png";
import wizard from "../../config/images/wizard.png";

const CharClass = ({ char }) => {
  const [character, setCharacter] = char;
  const [activeInfo, setActiveInfo] = useState(character.charClass);
  const handleClick = e => {
    const hp = rollStartingHP(e.target.name);
    setCharacter({
      ...character,
      charClass: e.target.name,
      maxHP: hp,
      currentHP: hp,
      dmgDie: startingDmgDie(e.target.name),
      hitDie: startingHitDie(e.target.name)
    });
    setActiveInfo(e.target.name);
  };
  const infoDisplay = (charClass, FeatureData) => {
    return charClass ? (
      <ClassFeatures data={FeatureData} charClass={activeInfo} />
    ) : (
      <div
        style={{ minHeight: "20vh" }}
        className="has-text-centered message-body"
      >
        <p>Choose your class...</p>
      </div>
    );
  };

  return (
    <div className="column">
      <div className="columns is-centered">
        <div className="column is-four-fifths has-text-centered">
          <h2 className="is-size-4 mb2">Choose Class</h2>
          <div className="buttons mb1 center-buttons">
            <ClassButton
              name={"warrior"}
              activeInfo={activeInfo}
              handleClick={handleClick}
            />
            <ClassButton
              name={"thief"}
              activeInfo={activeInfo}
              handleClick={handleClick}
            />
            <ClassButton
              name={"cleric"}
              activeInfo={activeInfo}
              handleClick={handleClick}
            />
            <ClassButton
              name={"wizard"}
              activeInfo={activeInfo}
              handleClick={handleClick}
            />
          </div>
          <div className="message has-text-left">
            {infoDisplay(activeInfo, FeatureData)}
          </div>
        </div>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">Hit Points</h3>
          </label>
          <input
            type="number"
            className="input rect-input"
            value={character.maxHP}
            onChange={e =>
              setCharacter({ ...character, maxHP: e.target.value })
            }
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">Hit Die</h3>
          </label>
          <input
            disabled
            type="text"
            className="input rect-input"
            value={character.hitDie}
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">Dmg Die</h3>
          </label>
          <input
            disabled
            type="text"
            className="input rect-input"
            value={character.dmgDie}
          />
        </div>
      </div>
    </div>
  );
};

const ClassButton = ({ name, activeInfo, handleClick }) => {
  const activeButton = name === activeInfo ? "is-danger" : null;
  return (
    <button
      name={name}
      className={`button is-medium ${activeButton}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

const ClassFeatures = ({ data, charClass }) => {
  const currentClass = data[charClass];
  return (
    <div className="message-body">
      <ClassImg charClass={charClass} />
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
    </div>
  );
};

const ClassImg = ({ charClass }) => {
  const pickClassImg = charClass => {
    switch (charClass) {
      case "warrior":
        return warrior;
      case "thief":
        return thief;
      case "cleric":
        return cleric;
      case "wizard":
        return wizard;
      default:
        return null;
    }
  };
  return (
    <div className="has-text-centered">
      <figure className="image is-96x96 is-inline-block mb2">
        <img src={pickClassImg(charClass)} alt={charClass} />
      </figure>
    </div>
  );
};

export default CharClass;
