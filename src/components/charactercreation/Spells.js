import React, { useState } from "react";

const Spells = ({ char }) => {
  const [character, setCharacter] = char;
  const [addSpellModal, setAddSpellModal] = useState(false);
  const notSpellcaster =
    character.charClass === "warrior" ||
    character.charClass === "thief" ||
    character.charClass === "";
  const option = character.charClass === "cleric" ? "Prayer" : "Spell";
  return (
    <div className="column">
      <div className="columns is-centered">
        <div className="column is-four-fifths has-text-centered">
          <h2 className="is-size-3 mb2">Spells and Prayers</h2>
          {notSpellcaster && (
            <div className="notification">
              Your class cannot learn spells or prayers.
            </div>
          )}
          <button
            disabled={notSpellcaster}
            className="button is-pulled-right is-outlined is-danger mb1"
            onClick={e => setAddSpellModal(!addSpellModal)}
          >
            Add {option}
          </button>
          <table className="table is-striped is-fullwidth">
            <tbody>
              <tr>
                <th>Level</th>
                <th>Name</th>
                <th style={{ width: "50%" }}>Effect</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
              <SpellList char={[character, setCharacter]} />
            </tbody>
          </table>
        </div>
      </div>
      <AddSpellModal
        toggle={[addSpellModal, setAddSpellModal]}
        char={[character, setCharacter]}
        option={option}
      />
    </div>
  );
};

const SpellList = ({ char }) => {
  const [character, setCharacter] = char;
  const [editSpellModal, setEditSpellModal] = useState(false);
  const handleDelete = deleteIndex => {
    const newSpellList = character.spells.filter(
      (spell, index) => index !== deleteIndex
    );
    setCharacter({ ...character, spells: newSpellList });
  };
  return (
    <>
      {character.spells.map((spell, index) => {
        return (
          <tr key={index}>
            <td>{spell.level}</td>
            <td>{spell.name}</td>
            <td>{spell.effect}</td>
            <td>
              <button
                className="edit-item-button has-text-danger"
                onClick={e => setEditSpellModal(!editSpellModal)}
              >
                <i className="fa fa-edit" />
              </button>
              <EditSpellModal
                char={[character, setCharacter]}
                toggleEdit={[editSpellModal, setEditSpellModal]}
                index={index}
              />
            </td>
            <td>
              <button
                className="edit-item-button has-text-danger"
                onClick={e => handleDelete(index)}
              >
                <i className="fa fa-times-circle" />
              </button>
            </td>
          </tr>
        );
      })}
    </>
  );
};

const AddSpellModal = ({ toggle, char, option }) => {
  const [addSpellModal, setAddSpellModal] = toggle;
  const spellSchema = { level: 1, name: "", effect: "" };
  const [newSpell, setNewSpell] = useState(spellSchema);
  const [character, setCharacter] = char;
  const closeModal = () => {
    setAddSpellModal(!addSpellModal);
  };
  const handleSubmit = () => {
    const spellList = character.spells;
    setCharacter({ ...character, spells: [...spellList, newSpell] });
    setNewSpell(spellSchema);
    closeModal();
  };
  const modalOpened = addSpellModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div style={{ width: "60vh" }} className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add {option}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="control">
              <label className="label">Level</label>
              <input
                disabled
                className="input square-input"
                type="number"
                value={newSpell.level}
                onChange={e =>
                  setNewSpell({ ...newSpell, level: e.target.value })
                }
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                value={newSpell.name}
                onChange={e =>
                  setNewSpell({ ...newSpell, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Effect</label>
              <textarea
                className="textarea"
                value={newSpell.effect}
                onChange={e =>
                  setNewSpell({ ...newSpell, effect: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="button is-fullwidth is-outlined is-danger"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  );
};

const EditSpellModal = ({ toggleEdit, char, index }) => {
  const [character, setCharacter] = char;
  const [editSpellModal, setEditSpellModal] = toggleEdit;
  const [editedSpell, setEditedSpell] = useState(character.spells[index]);
  const closeModal = () => {
    setEditSpellModal(!editSpellModal);
  };
  const handleSubmit = () => {
    const spellList = character.spells;
    spellList[index] = editedSpell;
    setCharacter({ ...character, spells: spellList });
    setEditedSpell(character.spells[index]);
    closeModal();
  };
  const modalOpened = editSpellModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div style={{ width: "60vh" }} className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit {editedSpell.name}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="control">
              <label className="label">Level</label>
              <input
                disabled
                className="input square-input"
                type="number"
                value={editedSpell.level}
                onChange={e =>
                  setEditedSpell({ ...editedSpell, level: e.target.value })
                }
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                value={editedSpell.name}
                onChange={e =>
                  setEditedSpell({ ...editedSpell, name: e.target.value })
                }
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Effect</label>
              <textarea
                className="textarea"
                value={editedSpell.effect}
                onChange={e =>
                  setEditedSpell({ ...editedSpell, effect: e.target.value })
                }
              />
            </div>
          </div>
          <button
            className="button is-fullwidth is-outlined is-danger"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </section>
        <footer className="modal-card-foot" />
      </div>
    </div>
  );
};

export default Spells;
