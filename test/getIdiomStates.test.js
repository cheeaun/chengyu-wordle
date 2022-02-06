import { expect, test } from 'vitest';
import getIdiomStates from '../src/getIdiomStates';

// Good read:
// http://sonorouschocolate.com/notes/index.php?title=The_best_strategies_for_Wordle&fbclid=IwAR3gYfYPQzPFhvTAfI1sxRPK1JZkyVrN82l_ddchYCALWcKiKtzD9b0A2Zk#Assumptions_about_the_rules_of_Wordle

test('getIdiomStates', () => {
  const hiddenTestResults = [
    ['great', 'silly', '⬜⬜⬜⬜⬜'],
    ['silly', 'silly', '🟩🟩🟩🟩🟩'],
    ['abcde', 'edabc', '🟧🟧🟧🟧🟧'], // not valid, I know
    ['hotel', 'silly', '⬜⬜🟧⬜⬜'],
    ['daily', 'silly', '⬜🟧⬜🟩🟩'],
    ['llama', 'silly', '⬜⬜🟧🟧⬜'],
    ['small', 'silly', '🟩⬜🟧🟩⬜'],
    ['清清楚楚', '楚楚动人', '🟧🟧⬜⬜'],
  ];

  hiddenTestResults.forEach(([hidden, test, expectedResult]) => {
    const result = getIdiomStates(hidden, test);
    expect(result.join('')).toEqual(expectedResult);
  });
});
