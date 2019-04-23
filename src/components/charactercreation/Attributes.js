import React from "react";
import { rollStats } from "../../blackhackinfo/chargen";

const Attributes = ({ char }) => {
  const [character, setCharacter] = char;
  const generateStats = e => {
    e.preventDefault();
    const statsArr = rollStats();
    setCharacter({
      ...character,
      str: statsArr[0],
      dex: statsArr[1],
      con: statsArr[2],
      int: statsArr[3],
      wis: statsArr[4],
      cha: statsArr[5]
    });
  };
  return (
    <div className="column">
      <div className="columns is-centered">
        <div className="column is-four-fifths has-text-centered">
          <h2 className="is-size-4 mb2">Attribute Scores</h2>
        </div>
      </div>
      <div className="columns is-centered is-mobile">
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">str</h3>
          </label>
          <input
            type="number"
            className="input square-input"
            value={character.str}
            onChange={e => setCharacter({ ...character, str: e.target.value })}
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">dex</h3>
          </label>
          <input
            type="number"
            className="input square-input"
            min="0"
            max="20"
            value={character.dex}
            onChange={e => setCharacter({ ...character, dex: e.target.value })}
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">con</h3>
          </label>
          <input
            type="number"
            className="input square-input"
            min="0"
            max="20"
            value={character.con}
            onChange={e => setCharacter({ ...character, con: e.target.value })}
          />
        </div>
      </div>
      <div className="columns is-centered is-mobile">
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">int</h3>
          </label>
          <input
            type="number"
            className="input square-input"
            min="0"
            max="20"
            value={character.int}
            onChange={e => setCharacter({ ...character, int: e.target.value })}
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">wis</h3>
          </label>
          <input
            type="number"
            className="input square-input"
            min="0"
            max="20"
            value={character.wis}
            onChange={e => setCharacter({ ...character, wis: e.target.value })}
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">cha</h3>
          </label>
          <input
            type="number"
            className="input square-input"
            min="0"
            max="20"
            value={character.cha}
            onChange={e => setCharacter({ ...character, cha: e.target.value })}
          />
        </div>
      </div>
      <div className="columns is-centered">
        <div className="column is-two-fifths has-text-centered">
          <h3 className="is-size-7">Roll 'Em</h3>
          <button
            style={{ marginBottom: "5vh" }}
            className="dice-button mt1"
            onClick={generateStats}
          >
            <span className="icon">
              <i className="fas fa-dice fa-3x has-text-danger" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
