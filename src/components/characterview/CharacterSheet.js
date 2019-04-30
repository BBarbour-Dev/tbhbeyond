import React, { useState, useEffect, useRef } from "react";

import HPDisplay from "./HPDisplay";
import AttributeDisplay from "./AttributeDisplay";
import CharInfoDisplay from "./CharInfoDisplay";
import InventoryDisplay from "./InventoryDisplay";
import SpellDisplay from "./SpellDisplay";
import { CharInfoModal } from "./CharInfoModal";

const CharacterSheet = ({ char, firebase, current, charID }) => {
  const [character, setCharacter] = char;
  const urlRef = useRef(null);
  const editable = current && character.creatorUserId === current.uid;
  const caster =
    character.charClass === "wizard" || character.charClass === "cleric";
  const [charInfoModal, setCharInfoModal] = useState(false);
  const [copied, setCopied] = useState("");
  const clipboardCopy = e => {
    urlRef.current.select();
    document.execCommand("copy");
    e.target.focus();
    setCopied("Copied!");
    setTimeout(() => setCopied(""), 3000);
  };
  useEffect(() => {
    const updateFirebase = firebase
      .character(charID)
      .set(character, { merge: true });
    return () => updateFirebase;
  }, [character]);
  return (
    <>
      {editable ? (
        <button
          className="button is-outlined is-danger is-pulled-right"
          onClick={() => setCharInfoModal(true)}
        >
          <span className="icon">
            <i className="fa fa-edit" />
          </span>
          <span>Edit</span>
        </button>
      ) : null}
      <CharInfoDisplay char={[character]} />
      <hr />
      <div className="columns is-centered">
        <div className="column is-two-fifths">
          <AttributeDisplay char={[character]} />
        </div>
        <div className="column is-two-fifths has-text-centered">
          <HPDisplay char={[character, setCharacter]} editable={editable} />
        </div>
      </div>
      <hr />
      <div className="columns">
        <div className="column">
          <InventoryDisplay char={[character, setCharacter]} />
        </div>
      </div>
      {caster ? (
        <>
          <hr />
          <div className="columns">
            <div className="column">
              <SpellDisplay
                char={[character, setCharacter]}
                editable={editable}
              />
            </div>
          </div>
        </>
      ) : null}
      <hr />
      <div className="has-text-centered">
        <p>
          <button
            className="button is-small is-outlined is-danger"
            onClick={e => clipboardCopy(e)}
          >
            <span className="icon is-small">
              <i className="fas fa-share-alt" />
            </span>
            <span>Share</span>
          </button>{" "}
          <input
            type="text"
            className="input is-small"
            style={{ width: "25%" }}
            ref={urlRef}
            value={window.location.href.toString()}
          />{" "}
          {copied ? (
            <span className="tag is-normal is-light">{copied}</span>
          ) : null}
        </p>
      </div>
      <CharInfoModal
        toggleEdit={[charInfoModal, setCharInfoModal]}
        char={[character, setCharacter]}
      />
    </>
  );
};

export default CharacterSheet;
