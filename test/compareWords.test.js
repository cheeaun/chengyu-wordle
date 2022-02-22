import { assert, expect, test } from 'vitest';

import compareWords from '../src/utils/compareWords';

test('compareWords', () => {
  expect(compareWords()).toEqual([]);
  expect(compareWords('')).toEqual([]);
  expect(compareWords('', '')).toEqual([]);
  expect(compareWords(1)).toEqual([]);
  expect(compareWords(1, 2)).toEqual([]);

  const notSameLengthError = /same length/;
  expect(() => compareWords('a', '')).toThrowError(notSameLengthError);
  expect(() => compareWords('', 'bb')).toThrowError(notSameLengthError);
  expect(() => compareWords('a', 'bb')).toThrowError(notSameLengthError);
  expect(() => compareWords('aaa', 'bb')).toThrowError(notSameLengthError);

  assert(Array.isArray(compareWords('aa', 'bb'), 'returns an array'));
  expect(compareWords('aa', 'bb').length).toEqual(2);

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
    const result = compareWords(hidden, test);
    expect(result.join('')).toEqual(expectedResult);
  });
});
