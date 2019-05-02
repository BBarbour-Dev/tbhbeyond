import React, { useState } from "react";

const SpellDisplay = ({ char, editable }) => {
  const [character, setCharacter] = char;
  const option = character.charClass === "cleric" ? "Prayer" : "Spell";
  const [addSpellModal, setAddSpellModal] = useState(false);
  return (
    <>
      <h3 className="is-size-4 mb1">{`${option}s`}</h3>
      {editable ? (
        <button
          className="button is-pulled-right is-danger mb1"
          onClick={e => setAddSpellModal(!addSpellModal)}
        >
          Add {option}
        </button>
      ) : null}
      <table className="table is-striped is-fullwidth">
        <tbody>
          <tr>
            <th>Level</th>
            <th>Name</th>
            <th style={{ width: "50%" }}>Effect</th>
            {editable ? (
              <>
                <th>Edit</th>
                <th>Delete</th>
              </>
            ) : null}
          </tr>
          <SpellList char={[character, setCharacter]} editable={editable} />
        </tbody>
      </table>
      <AddSpellModal
        toggle={[addSpellModal, setAddSpellModal]}
        char={[character, setCharacter]}
        option={option}
      />
    </>
  );
};

const SpellList = ({ char, editable, firebase, charID }) => {
  const [character, setCharacter] = char;
  const [editSpellModal, setEditSpellModal] = useState(false);
  const handleDelete = deleteIndex => {
    const newSpellList = character.spells.filter(
      (spell, index) => index !== deleteIndex
    );
    setCharacter({ ...character, spells: newSpellList });
    firebase.character(charID).set(character, { merge: true });
  };
  return (
    <>
      {character.spells.map((spell, index) => {
        return (
          <tr key={index}>
            <td>{spell.level}</td>
            <td>{spell.name}</td>
            <td>{spell.effect}</td>
            {editable ? (
              <>
                <td>
                  <button
                    className="edit-item-button has-text-danger"
                    onClick={e => setEditSpellModal(!editSpellModal)}
                  >
                    <i className="fa fa-edit" />
                  </button>
                  <EditSpellModal
                    firebase={firebase}
                    char={[character, setCharacter]}
                    toggleEdit={[editSpellModal, setEditSpellModal]}
                    index={index}
                    charID={charID}
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
              </>
            ) : null}
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
  const validation = (newSpell.level =
    "" ||
    newSpell.level < 0 ||
    newSpell.level > 10 ||
    newSpell.name === "" ||
    newSpell.effect === "");
  const closeModal = () => {
    setAddSpellModal(!addSpellModal);
  };
  const handleSubmit = () => {
    const spellList = character.spells;
    setCharacter({
      ...character,
      spells: [...spellList, newSpell],
      lastUpdatedDate: new Date()
    });
    setNewSpell(spellSchema);
    closeModal();
  };
  const modalOpened = addSpellModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Add {option}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="control">
              <label className="label">Level</label>
              <input
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
            disabled={validation}
            className="button is-fullwidth is-danger"
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
  const [spell, setSpell] = useState(character.spells[index]);
  const validation =
    spell.level === "" ||
    spell.level < 0 ||
    spell.level > 10 ||
    spell.name === "" ||
    spell.effect === "";
  const closeModal = () => {
    setEditSpellModal(!editSpellModal);
  };
  const handleSubmit = () => {
    const spellList = character.spells;
    spellList[index] = spell;
    setCharacter({
      ...character,
      spells: spellList,
      lastUpdatedDate: new Date()
    });
    closeModal();
  };
  const modalOpened = editSpellModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit {spell.name}</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="field">
            <div className="control">
              <label className="label">Level</label>
              <input
                className="input square-input"
                type="number"
                value={spell.level}
                onChange={e => setSpell({ ...spell, level: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                value={spell.name}
                onChange={e => setSpell({ ...spell, name: e.target.value })}
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label">Effect</label>
              <textarea
                className="textarea"
                value={spell.effect}
                onChange={e => setSpell({ ...spell, effect: e.target.value })}
              />
            </div>
          </div>
          <button
            disabled={validation}
            className="button is-fullwidth is-danger"
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

export default SpellDisplay;
