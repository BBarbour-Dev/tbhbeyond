import React from "react";

const AttributeDisplay = ({ char }) => {
  const [character] = char;
  return (
    <>
      <h3 className="is-size-4 mb1">Attributes</h3>
      <p className="is-size-5">
        <span className="os-span">STR:</span> {character.str}
      </p>
      <p className="is-size-5">
        <span className="os-span">DEX:</span> {character.dex}
      </p>
      <p className="is-size-5">
        <span className="os-span">CON:</span> {character.con}
      </p>
      <p className="is-size-5">
        <span className="os-span">INT:</span> {character.int}
      </p>
      <p className="is-size-5">
        <span className="os-span">WIS:</span> {character.wis}
      </p>
      <p className="is-size-5">
        <span className="os-span">CHA:</span> {character.cha}
      </p>
    </>
  );
};

export default AttributeDisplay;
