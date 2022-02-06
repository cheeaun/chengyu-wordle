const getIdiomStates = (hiddenIdiom, testIdiom) => {
  const letters1 =
    typeof testIdiom === 'string' ? testIdiom.split('') : testIdiom;
  const letters2 =
    typeof hiddenIdiom === 'string' ? hiddenIdiom.split('') : hiddenIdiom;
  const lettersLength = letters1.length;
  const states = Array.from({ length: lettersLength }, () => '⬜');
  if (lettersLength !== letters2.length) {
    throw new Error('idioms must have the same length');
  }
  const correctLetterIndices = [];
  for (let i = 0; i < lettersLength; i++) {
    const l1 = letters1[i];
    const l2 = letters2[i];
    if (l1 === l2) {
      states[i] = '🟩';
      correctLetterIndices.push(i);
    }
  }
  const presentLetterIndices = [];
  for (let i = 0; i < lettersLength; i++) {
    const l1 = letters1[i];
    const l2 = letters2[i];
    if (l1 !== l2) {
      const l1Index = letters2.findIndex(
        (l, index) =>
          l === l1 &&
          !correctLetterIndices.includes(index) &&
          !presentLetterIndices.includes(index),
      );
      if (l1Index !== -1) {
        states[i] = '🟧';
        presentLetterIndices.push(l1Index);
      }
    }
  }
  return states;
};

export default getIdiomStates;
