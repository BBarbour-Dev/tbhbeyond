import React, { useState } from "react";

export const CharInfoModal = ({ toggleEdit, char }) => {
  const [character, setCharacter] = char;
  const [editCharInfoModal, setEditCharInfoModal] = toggleEdit;
  const [level, setLevel] = useState(character.level);
  const [name, setName] = useState(character.name);
  const [xp, setXp] = useState(character.xp);
  const [background, setBackground] = useState(character.background);
  const [description, setDescription] = useState(character.description);
  const [maxHP, setMaxHP] = useState(character.maxHP);
  const [armorValue, setArmorValue] = useState(character.armorValue);
  const [str, setStr] = useState(character.str);
  const [dex, setDex] = useState(character.dex);
  const [con, setCon] = useState(character.con);
  const [int, setInt] = useState(character.int);
  const [wis, setWis] = useState(character.wis);
  const [cha, setCha] = useState(character.cha);
  const validation =
    level < 0 ||
    level > 10 ||
    xp < 0 ||
    xp > 10 ||
    maxHP < 0 ||
    armorValue < 0 ||
    str < 3 ||
    str > 18 ||
    dex < 3 ||
    dex > 18 ||
    con < 3 ||
    con > 18 ||
    int < 3 ||
    int > 18 ||
    wis < 3 ||
    wis > 18 ||
    cha < 3 ||
    cha > 18 ||
    name === "" ||
    background === "" ||
    description === "";
  const closeModal = () => {
    setEditCharInfoModal(!editCharInfoModal);
  };
  const handleSubmit = () => {
    setCharacter({
      ...character,
      level,
      name,
      xp,
      background,
      description,
      maxHP,
      armorValue,
      str,
      dex,
      con,
      int,
      wis,
      cha,
      lastUpdatedDate: new Date()
    });
    closeModal();
  };
  const modalOpened = editCharInfoModal ? "is-active" : null;
  return (
    <div className={`modal ${modalOpened}`}>
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Edit Character Info</p>
          <button className="delete" onClick={closeModal} />
        </header>
        <section className="modal-card-body">
          <div className="columns is-centered">
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">Level</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={level}
                    onChange={e => setLevel(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">XP</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={xp}
                    onChange={e => setXp(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">Max HP</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={maxHP}
                    onChange={e => setMaxHP(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">AV</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={armorValue}
                    onChange={e => setArmorValue(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="columns">
            <div className="column">
              <div className="field">
                <div className="control">
                  <label className="label">Name</label>
                  <input
                    className="input"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Background</label>
                  <textarea
                    className="textarea"
                    value={background}
                    onChange={e => setBackground(e.target.value)}
                  />
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <label className="label">Description</label>
                  <textarea
                    className="textarea"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="columns is-centered">
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label ">STR</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={str}
                    onChange={e => setStr(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">DEX</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={dex}
                    onChange={e => setDex(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">CON</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={con}
                    onChange={e => setCon(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">INT</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={int}
                    onChange={e => setInt(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">WIS</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={wis}
                    onChange={e => setWis(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="column is-2">
              <div className="field">
                <div className="control has-text-centered">
                  <label className="label">CHA</label>
                  <input
                    className="input square-input"
                    type="number"
                    value={cha}
                    onChange={e => setCha(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
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
