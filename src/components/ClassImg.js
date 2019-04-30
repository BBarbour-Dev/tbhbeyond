import React from "react";

import warrior from "../config/images/warrior.png";
import thief from "../config/images/thief.png";
import cleric from "../config/images/cleric.png";
import wizard from "../config/images/wizard.png";

const ClassImg = ({ charClass, size }) => {
  const pickClassImg = charClass => {
    switch (charClass) {
      case "warrior":
        return warrior;
      case "thief":
        return thief;
      case "cleric":
        return cleric;
      case "wizard":
        return wizard;
      default:
        return null;
    }
  };
  return (
    <figure className={`image is-${size}x${size} is-inline-block mb1`}>
      <img src={pickClassImg(charClass)} alt={charClass} />
    </figure>
  );
};

export default ClassImg;
