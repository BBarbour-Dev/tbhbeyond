import React from "react";

const Inventory = ({ char }) => {
  const [character, setCharacter] = char;
  const inventoryUpdate = e => {
    setCharacter({
      ...character,
      inventory: e.target.value
    });
  };
  return (
    <div className="column">
      <div className="columns is-centered">
        <div className="column is-four-fifths has-text-centered">
          <h2 className="is-size-2 mb2">Equipment</h2>
          <div className="field">
            <div className="control">
              <textarea
                className="textarea"
                value={character.inventory}
                placeholder="List your items here."
                rows="10"
                onChange={e => inventoryUpdate(e)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="columns is-mobile is-centered">
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">Coin Purse</h3>
          </label>
          <input
            type="number"
            className="input rect-input"
            value={character.coins}
            onChange={e =>
              setCharacter({ ...character, coins: e.target.value })
            }
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">Armor Value</h3>
          </label>
          <input
            type="number"
            className="input rect-input"
            value={character.armorValue}
            onChange={e =>
              setCharacter({ ...character, armorValue: e.target.value })
            }
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
          <label>
            <h3 className="is-size-6">Armor Dice</h3>
          </label>
          <input
            type="number"
            className="input rect-input"
            value={character.armorDice}
            onChange={e =>
              setCharacter({ ...character, armorDice: e.target.value })
            }
          />
        </div>
        <div className="column is-one-fifth has-text-centered">
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
  );
};

export default Inventory;
