import React, { useState } from "react";

import { validateCharacter } from "../../blackhackinfo/chargen";

import warrior from "../../config/images/warrior.png";
import thief from "../../config/images/thief.png";
import cleric from "../../config/images/cleric.png";
import wizard from "../../config/images/wizard.png";

const Review = ({ char, firebase, user, schema, history }) => {
  console.log(typeof firebase.characters);
  const [character, setCharacter] = char;
  const [validationErrors] = useState(validateCharacter(character));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    setCharacter({
      ...character,
      creatorUserId: user.uid,
      createdDate: new Date(),
      lastUpdatedDate: new Date()
    });
    setLoading(true);
    firebase
      .addCharacter(character)
      .then(() => {
        setLoading(false);
        setCharacter(schema);
        history.push("/");
      })
      .catch(err => {
        setError(err);
      });
  };
  const isLoading = loading ? "is-loading" : null;
  return (
    <div className="column">
      <div className="columns is-centered">
        <div className="column is-three-fifths">
          <h2 className="is-size-3 mb1 has-text-centered mb2">Review</h2>
          {validationErrors.length === 0 ? (
            <CharacterSummary char={[character]} />
          ) : (
            <ErrorDisplay errors={validationErrors} />
          )}
          <hr />
          {error && (
            <div className="message is-danger">
              <div className="message-body">{error.message}</div>
            </div>
          )}
          <button
            disabled={validationErrors.length > 0}
            className={`button is-fullwidth is-outlined is-danger ${isLoading}`}
            onClick={e => handleSubmit(e)}
          >
            Finalize Character
          </button>
        </div>
      </div>
    </div>
  );
};

const ErrorDisplay = ({ errors }) => {
  return (
    <div className="message is-danger">
      <div className="message-body">
        <ul>
          {errors.map((error, index) => {
            return <li key={index}>{error}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

const CharacterSummary = ({ char }) => {
  const [character] = char;
  return (
    <>
      <h2 className="is-size-3 mb1">{character.name}</h2>
      <ClassImg charClass={character.charClass} />
      <h3 className="is-size-4 mb1">
        Level {character.level} {character.charClass}
      </h3>
      <p>
        <strong>Hit Dice:</strong> {character.hitDiceNum}
        {character.hitDie}
      </p>
      <p>
        <strong>Hit Points:</strong> {character.currentHP}/{character.maxHP}
      </p>
      <p>
        <strong>Attack Damage:</strong> {character.dmgDie}
      </p>
      <hr />
      <h3 className="is-size-5">Background</h3>
      <div className="message">
        <div className="message-body">
          <p>{character.background}</p>
        </div>
      </div>
      <h3 className="is-size-5">Description</h3>
      <div className="message">
        <div className="message-body">
          <p>{character.description}</p>
        </div>
      </div>
      <hr />
      <h3 className="is-size-5">Attributes</h3>
      <p>
        <strong>STR:</strong> {character.str}
      </p>
      <p>
        <strong>DEX:</strong> {character.dex}
      </p>
      <p>
        <strong>CON:</strong> {character.con}
      </p>
      <p>
        <strong>INT:</strong> {character.int}
      </p>
      <p>
        <strong>WIS:</strong> {character.wis}
      </p>
      <p>
        <strong>CHA:</strong> {character.cha}
      </p>
      <hr />
      <h3 className="is-size-5 is-inline-flex">Inventory</h3>
      <div className="message">
        <div className="message-body">
          <p>{character.inventory}</p>
        </div>
      </div>
      <p>
        <strong>Armor Value:</strong> {character.armorValue}
      </p>
      <p>
        <strong>Armor Dice:</strong> {character.armorDice}
      </p>
      <p>
        <strong>Encumbered:</strong> {character.str}
      </p>
      <p className="mb2">
        <strong>Coins:</strong> {character.coins}
      </p>
      {character.spells.length > 0 && (
        <>
          <hr />
          <h3 className="is-size-5 is-inline-flex">
            {character.charClass === "wizard" ? "Spells" : "Prayers"}
          </h3>
          {character.spells.map((spell, index) => {
            return (
              <p key={index}>
                Lv.{spell.level} - <strong>{spell.name}</strong> -{" "}
                {spell.effect}
              </p>
            );
          })}
        </>
      )}
    </>
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
    <figure className="image is-64x64 is-inline-block mb1">
      <img src={pickClassImg(charClass)} alt={charClass} />
    </figure>
  );
};

export default Review;
