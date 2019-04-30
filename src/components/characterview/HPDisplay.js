import React from "react";

const HPDisplay = ({ char, editable }) => {
  const [character, setCharacter] = char;
  return (
    <>
      <div className="columns is-centered is-mobile">
        <div className="column">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">Current HP</h3>
              </label>
              <input
                disabled={!editable}
                type="number"
                className="input rect-input"
                value={character.currentHP}
                onChange={e =>
                  setCharacter({
                    ...character,
                    currentHP: e.target.value,
                    lastUpdatedDate: new Date()
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">Max HP</h3>
              </label>
              <input
                disabled
                type="number"
                className="input rect-input"
                value={character.maxHP}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-mobile">
        <div className="column">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">Hit Dice</h3>
              </label>
              <input
                disabled={!editable}
                type="number"
                className="input rect-input"
                value={character.hitDiceNum}
                onChange={e =>
                  setCharacter({
                    ...character,
                    hitDiceNum: e.target.value,
                    lastUpdatedDate: new Date()
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">Max HD</h3>
              </label>
              <input
                disabled
                type="text"
                className="input rect-input"
                value={`${character.level}${character.hitDie}`}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-mobile">
        <div className="column">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">Armor Dice</h3>
              </label>
              <input
                disabled={!editable}
                type="number"
                className="input rect-input"
                value={character.armorDice}
                onChange={e =>
                  setCharacter({
                    ...character,
                    armorDice: e.target.value,
                    lastUpdatedDate: new Date()
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="column">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">AV</h3>
              </label>
              <input
                disabled
                type="number"
                className="input rect-input"
                value={character.armorValue}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HPDisplay;
