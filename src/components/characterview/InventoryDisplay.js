import React from "react";

const InventoryDisplay = ({ char }) => {
  const [character, setCharacter] = char;
  return (
    <>
      <h3 className="is-size-4 mb1">Equipment</h3>
      <div className="field">
        <div className="control">
          <textarea
            className="textarea"
            value={character.inventory}
            onChange={e =>
              setCharacter({
                ...character,
                inventory: e.target.value,
                lastUpdatedDate: new Date()
              })
            }
          />
        </div>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-two-fifths">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">Coins</h3>
              </label>
              <input
                type="number"
                className="input rect-input"
                value={character.coins}
                onChange={e =>
                  setCharacter({
                    ...character,
                    coins: e.target.value,
                    lastUpdatedDate: new Date()
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="column is-two-fifths">
          <div className="field">
            <div className="control has-text-centered">
              <label>
                <h3 className="is-size-6">Item Encumb.</h3>
              </label>
              <input
                disabled
                type="number"
                className="input rect-input"
                value={character.str}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryDisplay;
