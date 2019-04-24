const roll3d6 = () => {
  const dieOne = Math.floor(Math.random() * 6) + 1;
  const dieTwo = Math.floor(Math.random() * 6) + 1;
  const dieThree = Math.floor(Math.random() * 6) + 1;
  return dieOne + dieTwo + dieThree;
};

export const rollStats = () => {
  const statsArray = [];
  let i = 0;
  while (i < 6) {
    let stat = roll3d6();
    statsArray.push(stat);
    if (stat >= 14 && i < 5) {
      statsArray.push(7);
      i += 2;
    } else {
      i++;
    }
  }
  return statsArray;
};

export const rollStartingHP = charClass => {
  switch (charClass) {
    case "warrior":
      return Math.floor(Math.random() * 4 + 7);
    case "thief":
      return Math.floor(Math.random() * 6 + 3);
    case "cleric":
      return Math.floor(Math.random() * 6 + 5);
    case "wizard":
      return Math.floor(Math.random() * 4 + 1);
    default:
      return 0;
  }
};

export const startingHitDie = charClass => {
  switch (charClass) {
    case "warrior":
      return "d8";
    case "thief":
      return "d6";
    case "cleric":
      return "d8";
    case "wizard":
      return "d4";
    default:
      return "d4";
  }
};

export const startingDmgDie = charClass => {
  switch (charClass) {
    case "warrior":
      return "d6*";
    case "thief":
      return "d6";
    case "cleric":
      return "d8";
    case "wizard":
      return "d4";
    default:
      return "d4";
  }
};

export const validateCharacter = character => {
  const errors = [];
  !character.name && errors.push("Your character needs a name.");
  !character.background && errors.push("Your character needs a background.");
  !character.charClass && errors.push("Your character needs a class.");
  if (character.maxHP < 1 || character.maxHP > 11) {
    errors.push("Your HP is incorrect.");
  }
  if (character.str < 3 || character.str > 18) {
    errors.push("Your STR must be between 3 and 18");
  }
  if (character.dex < 3 || character.dex > 18) {
    errors.push("Your DEX must be between 3 and 18");
  }
  if (character.con < 3 || character.con > 18) {
    errors.push("Your CON must be between 3 and 18");
  }
  if (character.int < 3 || character.int > 18) {
    errors.push("Your INT must be between 3 and 18");
  }
  if (character.wis < 3 || character.wis > 18) {
    errors.push("Your WIS must be between 3 and 18");
  }
  if (character.cha < 3 || character.cha > 18) {
    errors.push("Your CHA must be between 3 and 18");
  }
  return errors;
};
