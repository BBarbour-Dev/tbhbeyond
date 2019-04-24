import React from "react";

const Background = ({ char }) => {
  const [character, setCharacter] = char;

  return (
    <div className="column">
      <div className="columns is-centered">
        <div className="column is-four-fifths has-text-centered">
          <h2 className="is-size-3 mb1">Roleplay Details</h2>
          <div className="field">
            <div className="control mb2">
              <label>
                <h3 className="is-size-6">Name</h3>
              </label>
              <input
                type="text"
                className="input"
                value={character.name}
                onChange={e =>
                  setCharacter({ ...character, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="field">
            <div className="control mb2">
              <label>
                <h3 className="is-size-6">Background</h3>
                <div className="message">
                  A short sentence that encapsulates an interesting time your
                  past. Should tie you to the narrative and also highlight one
                  specific skill or narrow field of proficiency.
                </div>
              </label>
              <input
                type="text"
                className="input"
                value={character.background}
                onChange={e =>
                  setCharacter({ ...character, background: e.target.value })
                }
              />
            </div>
          </div>
          <div className="field">
            <div className="control mb2">
              <label>
                <h3 className="is-size-6">Additional Description</h3>
              </label>
              <textarea
                className="textarea"
                value={character.description}
                onChange={e =>
                  setCharacter({ ...character, description: e.target.value })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Background;
