const roll3d6 = () => {
  return Math.floor(Math.random() * (18 - 3)) + 3;
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
      return "1d8";
    case "thief":
      return "1d6";
    case "cleric":
      return "1d8";
    case "wizard":
      return "1d4";
    default:
      return "1d4";
  }
};

export const startingDmgDie = charClass => {
  switch (charClass) {
    case "warrior":
      return "1d6*";
    case "thief":
      return "1d6";
    case "cleric":
      return "1d8";
    case "wizard":
      return "1d4";
    default:
      return "1d4";
  }
};
