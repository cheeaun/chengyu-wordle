import { useState, useEffect, useMemo } from 'preact/hooks';
import pinyin from 'pinyin';
const py = (str) =>
  pinyin(str, { segment: true, group: true }).flat().join(' ').trim();
import { useTranslation, Trans } from 'react-i18next';
import copy from 'copy-text-to-clipboard';

// Always need to wrap localStorage in a try/catch block because
// it can throw an exception in some browsers (e.g. Safari)
const LS = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      return localStorage.setItem(key, value);
    } catch (e) {
      return null;
    }
  },
  removeItem: (key) => {
    try {
      return localStorage.removeItem(key);
    } catch (e) {
      return null;
    }
  },
};

// Data
import idiomsTxt from '../game-data/all-idioms.txt?raw';
const idioms = idiomsTxt.split('\n');
import gameIdioms from '../game-data/game-idioms.csv';
const games = gameIdioms.slice(1).map((row) => ({
  id: row[0],
  idiom: row[1],
}));

const MAX_LETTERS = 4;
const MAX_KEYS = 20;
const MAX_STEPS = 6;
const MIN_IDIOMS = 6;
const KEY_PREFIX = 'cywd-';

window.clearGames = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(KEY_PREFIX)) {
      localStorage.removeItem(key);
    }
  }
};

window.allGames = () => {
  const allGames = new Map();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith(KEY_PREFIX)) {
      const game = JSON.parse(localStorage.getItem(key));
      allGames.set(key.replace(KEY_PREFIX, ''), game);
    }
  }
  return allGames;
};

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
      const l1Index = letters2.indexOf(l1);
      if (
        l1Index !== -1 &&
        !correctLetterIndices.includes(l1Index) &&
        !presentLetterIndices.includes(l1Index)
      ) {
        states[i] = '🟧';
        presentLetterIndices.push(l1Index);
      }
    }
  }
  return states;
};

window.getIdiomStates = getIdiomStates;

const getBoardGameState = (boardStates) => {
  const won = boardStates.some(
    (row) => !!row.length && row.every((s) => s === '🟩'),
  );
  if (won) return 'won';
  const lastRow = boardStates[boardStates.length - 1];
  const lost = !!lastRow.length && lastRow.every((s) => s !== '🟩');
  if (lost) return 'lost';
  return null;
};

// v = letter values of the row
// s = submitted state of the row (after user press enter)
const blankBoard = () =>
  Array.from({ length: MAX_STEPS }, () => ({
    v: Array.from({ length: MAX_LETTERS }, () => ''),
    s: false,
  }));

const getIdiomsKeys = (idiom, prevPassedIdioms, prevKeys, depth = 0) => {
  let passedIdioms = prevPassedIdioms || new Set();
  passedIdioms.add(idiom);
  let keys = prevKeys || new Set();
  const idiomLetters = idiom.split('');
  idiomLetters.forEach((letter) => keys.add(letter));
  let consecutiveFailures = 0;
  lettersCycle: for (let i = 0; i < games.length; i++) {
    const letter = idiomLetters[(i + 1) % MAX_LETTERS];
    const anotherIdiom = games.find(
      ({ idiom }) => !passedIdioms.has(idiom) && idiom.includes(letter),
    );
    if (anotherIdiom) {
      for (let j = 0; j < anotherIdiom.idiom.length; j++) {
        keys.add(anotherIdiom.idiom[j]);

        if (keys.size >= MAX_KEYS) {
          break lettersCycle;
        }
      }
      passedIdioms.add(anotherIdiom.idiom);
      consecutiveFailures = 0;
    } else {
      if (consecutiveFailures >= MAX_LETTERS + 1) {
        // Too many failures, stop
        break lettersCycle;
      }
      consecutiveFailures += 1;
    }
  }

  // Try the next idiom
  if (keys.size < MAX_KEYS || passedIdioms.size < MIN_IDIOMS) {
    const nextIdiom = [...passedIdioms][++depth];
    if (nextIdiom) {
      const { passedIdioms: _passedIdioms, keys: _keys } = getIdiomsKeys(
        nextIdiom,
        passedIdioms,
        keys,
        depth,
      );
      passedIdioms = _passedIdioms;
      keys = _keys;
    }
  }

  // Still not enough keys, choose a random idiom
  if (keys.size < MAX_KEYS || passedIdioms.size < MIN_IDIOMS) {
    const randomIdiom = games[Math.floor(Math.random() * games.length)].idiom;
    if (randomIdiom) {
      const { passedIdioms: _passedIdioms, keys: _keys } = getIdiomsKeys(
        randomIdiom,
        passedIdioms,
        keys,
        0,
      );
      passedIdioms = _passedIdioms;
      keys = _keys;
    }
  }

  // Something very wrong happened
  if (keys.size < MAX_KEYS || passedIdioms.size < MIN_IDIOMS) {
    const gameID = games.find((g) => g.idiom === idiom)?.id;
    console.error(gameID, {
      possibleIdioms: passedIdioms.size,
      keySize: keys.size,
      consecutiveFailures,
    });
  }

  return {
    passedIdioms,
    keys,
  };
};

// Check if all idioms have enough keys/idioms
// games.forEach((game) => {
//   getIdiomsKeys(game.idiom);
// });

const PlayIcon = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" {...props}>
    <title>▶️</title>
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clip-rule="evenodd"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" {...props}>
    <title>✖️</title>
    <path
      fill="currentColor"
      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
    ></path>
  </svg>
);

const startDate = new Date(2022, 0, 27); // 27 January 2022
const getTodayGame = () => {
  const today = new Date().setHours(0, 0, 0, 0);
  const diff = today - startDate;
  const dayCount = Math.floor(diff / (1000 * 60 * 60 * 24));
  return games[Math.max(0, dayCount % games.length)];
};

// Component that shows hours, minutes and seconds counting down to start of next day
const Countdown = () => {
  const { t } = useTranslation();
  let nextDay = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
  const nextStartDate = new Date(+startDate + 24 * 60 * 60 * 1000);
  if (nextDay < nextStartDate) {
    nextDay = nextStartDate;
  }
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('00');
  const [seconds, setSeconds] = useState('00');
  const [isNow, setIsNow] = useState(false);
  // update countdown every second
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = nextDay - new Date();
      if (diff <= 0) {
        setIsNow(true);
        clearInterval(timer);
        return;
      }
      setHours(
        Math.floor(diff / (1000 * 60 * 60))
          .toString()
          .padStart(2, '0'),
      );
      setMinutes(
        Math.floor((diff / (1000 * 60)) % 60)
          .toString()
          .padStart(2, '0'),
      );
      setSeconds(
        Math.floor((diff / 1000) % 60)
          .toString()
          .padStart(2, '0'),
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  if (isNow) {
    return <a href="./">{t('ui.countdownNow')}</a>;
  }
  return (
    <time class="countdown">
      {hours}:{minutes}:{seconds}
    </time>
  );
};

const CodeInput = ({ code, url }) => {
  const { t } = useTranslation();
  return (
    code && (
      <input
        readOnly
        value={code}
        class="idiom-code"
        onClick={(e) => {
          e.target.focus();
          e.target.select();
          if (navigator.clipboard?.writeText) {
            navigator.clipboard
              .writeText(url || code)
              .then(() => {
                alert(t('ui.copiedURL'));
              })
              .catch((e) => {});
          } else {
            copy(url || code);
            alert(t('ui.copiedURL'));
          }
        }}
      />
    )
  );
};

export function App() {
  const { t, i18n } = useTranslation();

  const [skipFirstTime, setSkipFirstTime] = useState(
    LS.getItem(`${KEY_PREFIX}skipFirstTime`) || false,
  );

  const [currentGame, setCurrentGame] = useState(
    games.find((g) => g.id === location.hash.slice(1)) || getTodayGame(),
  );
  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setCurrentGame(
        games.find((g) => g.id === location.hash.slice(1)) || getTodayGame(),
      );
    });
  }, []);

  const [board, setBoard] = useState(
    JSON.parse(LS.getItem(`${KEY_PREFIX}${currentGame.id}`))?.board ||
      blankBoard(),
  );
  useEffect(() => {
    const cachedGame = LS.getItem(`${KEY_PREFIX}${currentGame.id}`);
    if (cachedGame) {
      setBoard(JSON.parse(cachedGame).board);
    } else {
      setBoard(blankBoard());
    }
  }, [currentGame.id]);

  const boardStates = useMemo(() => {
    return board.map((row, i) => {
      if (row.s) {
        return getIdiomStates(currentGame.idiom, row.v);
      }
      return [];
    });
  }, [board]);

  // Save to localStorage every time board changes
  useEffect(() => {
    // Only store in localStorage if board has some values
    if (board && board.some((row) => row.v.some((v) => v))) {
      LS.setItem(
        `${KEY_PREFIX}${currentGame.id}`,
        JSON.stringify({
          board,
          gameState: getBoardGameState(boardStates),
        }),
      );
    }
  }, [boardStates]);

  const [definition, setDefinition] = useState(null);
  useEffect(() => {
    setDefinition(null);
    fetch(
      `https://baidu-hanyu-idiom.cheeaun.workers.dev/?wd=${currentGame.idiom}`,
    )
      .then((r) => r.json())
      .then((r) => {
        if (r.definition) {
          setDefinition(r.definition);
        }
      })
      .catch(() => {});
  }, [currentGame.idiom]);

  const currentStep = board?.findIndex((row) => row.s === false) || 0;

  // Set current step to first empty item in board
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false); // false | won | lost
  const [showInfoModal, setShowInfoModal] = useState(false);

  const currentGameKeys = useMemo(() => {
    const { keys } = getIdiomsKeys(currentGame.idiom);

    // SPOILER inside console.log!
    const allPossibleIdioms = idioms.filter((idiom) => {
      // check if idiom contains 4 letters from keys
      return idiom.split('').every((letter) => keys.has(letter));
    });
    const possibleIdioms = allPossibleIdioms
      .map((idiom) => {
        return `${idiom} (${py(idiom)})`;
      })
      .sort((a, b) => a.localeCompare(b, 'zh'));
    if (console.groupCollapsed) {
      console.groupCollapsed(
        `${possibleIdioms.length} Possible Idioms [${currentGame.id}] (${keys.size} keys):`,
      );
      console.log(`${possibleIdioms
        .map((idiom, i) => `${i + 1}. ${idiom}`)
        .join('\n')}

🚨SPOILER🚨 Type 'ANSWER' to see the answer.`);
      console.groupEnd();
    }
    window.ANSWER = `${currentGame.idiom} (${py(currentGame.idiom)})`;

    return [...keys].sort((a, b) => a.localeCompare(b, 'zh'));
  }, [currentGame.idiom]);

  const handleLetter = (letter, overwrite = false) => {
    if (!board[currentStep]) return;
    if (gameState) return;
    const newBoard = [...board];
    let columnIndex = newBoard[currentStep].v.findIndex((v) => v === '');
    if (overwrite) {
      if (columnIndex === -1) {
        columnIndex = 3;
      } else {
        columnIndex--;
      }
    }
    if (columnIndex !== -1) {
      newBoard[currentStep].v[columnIndex] = letter;
      setBoard(newBoard);
    }
  };

  const correctKeys = new Set();
  const presentKeys = new Set();
  const absentKeys = new Set();
  board.forEach((row, i) => {
    if (!row.s) return;
    row.v.forEach((letter, j) => {
      const state = boardStates[i][j];
      if (state === '🟩') {
        correctKeys.add(letter);
      } else if (state === '🟧') {
        presentKeys.add(letter);
      } else if (state === '⬜') {
        absentKeys.add(letter);
      }
    });
  });

  const handleEnter = () => {
    if (gameState) return;
    console.log('handleEnter');
    setShowError(false);

    const row = board[currentStep];
    if (!row) return;
    const currentIdiom = row.v.join('');
    const valid = idioms.includes(currentIdiom);
    if (valid) {
      row.s = true;
      setBoard([...board]);
    } else {
      setTimeout(() => {
        setShowError(true);
      }, 10);
    }
    console.log({ currentIdiom, valid });
  };

  const gameState = useMemo(() => {
    return getBoardGameState(boardStates);
  }, [boardStates]);

  useEffect(() => {
    if (gameState === 'won') {
      setShowModal('won');
    } else if (gameState === 'lost') {
      setShowModal('lost');
    } else {
      setShowModal(false);
    }
  }, [gameState]);

  const handleBackspace = () => {
    if (gameState) return;
    const newBoard = [...board];
    // Get last column with value
    const row = newBoard[currentStep];
    if (!row || row.s) return;
    let columnIndex = -1;
    for (let i = row.v.length - 1; i >= 0; i--) {
      if (row.v[i] !== '') {
        columnIndex = i;
        break;
      }
    }
    if (columnIndex !== -1) {
      row.v[columnIndex] = '';
      setBoard(newBoard);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      // Enter
      if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
      }
    });
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (gameState) return;
      if (e.metaKey || e.ctrlKey || !e.key) {
        return;
      }
      const key = e.key.toLowerCase();
      if (key === 'enter') {
        e.preventDefault();
        e.stopPropagation();
        handleEnter();
      } else if (key === 'backspace') {
        e.preventDefault();
        handleBackspace();
      } else if (/^arrow(left|right)/i.test(key)) {
        // This will cycle through all letters with same starting pinyin letter
        const row = board[currentStep];
        const value = [...row.v].reverse().find((v) => v !== '');
        if (value) {
          const pinyinLetter = py(value)[0];
          const possibleLetters = currentGameKeys.filter(
            (k) => py(k)[0] === pinyinLetter,
          );
          if (possibleLetters.length <= 1) return;
          const letterIndex = possibleLetters.indexOf(value);
          const nextLetter =
            key === 'arrowright'
              ? possibleLetters[(letterIndex + 1) % possibleLetters.length]
              : possibleLetters[
                  (letterIndex + possibleLetters.length - 1) %
                    possibleLetters.length
                ];
          if (nextLetter) {
            handleLetter(nextLetter, true);
          }
        }
      } else {
        // Type "a" will trigger the first letter pinyin that starts with "ā"
        const letter = currentGameKeys.find((k) => {
          const firstPinyinChar = py(k)[0];
          return (
            firstPinyinChar.localeCompare(key, 'en', {
              sensitivity: 'base',
            }) === 0
          );
        });
        if (letter) {
          e.preventDefault();
          handleLetter(letter);
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [currentGameKeys, board, currentStep, gameState]);

  const permalink = location.origin + location.pathname + '#' + currentGame.id;
  const emojiResults = boardStates
    .map((row) => row.join(''))
    .join('\n')
    .trim();
  const attempts = gameState === 'won' ? emojiResults.split('\n').length : 'X';
  const shareText = `${t('app.title')} [${
    currentGame.id
  }] ${attempts}/6\n\n${emojiResults}`;
  const shareTextWithLink = `${shareText}\n\n${permalink}`;

  const hints = useMemo(() => {
    const hints = [];
    const letters = currentGame.idiom.split('');

    // 1. Absent letters hints
    const absentHints = currentGameKeys
      .filter((k) => {
        return !letters.includes(k) && !absentKeys.has(k);
      })
      .slice(0, -1) // Don't reveal at least one letter
      .slice(0, 3) // But still max 3 letters
      .map((letter) => {
        return t('hints.absentLetter', {
          letter,
          pinyin: py(letter),
        });
      })
      .sort(() => Math.random() - 0.5);
    hints.push(...absentHints);

    // 2. Definition hints
    if (
      definition?.zh &&
      letters.filter((c) => definition.zh.includes(c)).length <= 2
      // Only show hint if definition contains 2 or less of the characters in the idiom
      // Else, the definition basically revealed the answer
    ) {
      hints.push(`ℹ️ ${definition.zh}`);
    }
    if (definition?.en) hints.push(`ℹ️ ${definition.en}`);

    // 3. Letter hints
    const letterHints = letters
      .filter((c) => !correctKeys.has(c) && !presentKeys.has(c))
      .slice(0, -1) // Don't reveal at least one letter
      .map((letter) => {
        return t('hints.presentLetter', {
          letter,
          pinyin: py(letter),
        });
      })
      .sort(() => Math.random() - 0.5);
    hints.push(...letterHints);

    // 4. Pinyin hints
    const pinyinHint = letters
      .map((c) => py(c)[0])
      .join('')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    // https://stackoverflow.com/a/37511463/20838
    hints.push(t('hints.abbreviatedPinyin', { pinyinHint }));

    return hints;
  }, [correctKeys, currentGame.idiom, definition]);
  const hintIndex = useState(0);
  useEffect(() => {
    hintIndex.current = 0;
  }, [currentGame.idiom]);
  const showHint = () => {
    if (gameState) return;
    const hint = hints[hintIndex.current];
    hintIndex.current = (hintIndex.current + 1) % hints.length;
    alert(hint);
  };

  return (
    <>
      <header>
        <div class="inner">
          <button
            type="button"
            onClick={() => {
              setShowInfoModal(true);
            }}
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>ℹ️</title>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <h1>{t('app.title')}</h1>
          <button
            type="button"
            onClick={() => {
              setShowModal(gameState || 'play');
            }}
          >
            {t('common.play')}
          </button>
        </div>
      </header>
      <div id="board">
        {board.map((row, index) => {
          return (
            <div
              className={`row ${
                currentStep === index && showError ? 'error' : ''
              } ${currentStep === index ? 'current' : ''}`}
              key={index}
            >
              {row.v.map((letter, i) => (
                <div
                  className={`letter ${letter ? 'lettered' : ''} ${
                    boardStates[index][i] ?? ''
                  } ${boardStates[index][i] ? '🌈' : ''}`}
                  key={i}
                >
                  <ruby>
                    {letter || <span style={{ opacity: 0 }}>一</span>}
                    <rp>(</rp>
                    <rt>{py(letter) || <>&nbsp;</>}</rt>
                    <rp>)</rp>
                  </ruby>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div id="keyboard">
        <div class="inner">
          <div class="keys">
            {currentGameKeys.map((key, i) => (
              <button
                class={`${correctKeys.has(key) ? '🟩' : ''} ${
                  presentKeys.has(key) ? '🟧' : ''
                } ${absentKeys.has(key) ? '⬜' : ''}`}
                type="button"
                tabIndex={-1}
                onClick={() => {
                  handleLetter(key);
                }}
              >
                <ruby>
                  {key}
                  <rp>(</rp>
                  <rt>{py(key)}</rt>
                  <rp>)</rp>
                </ruby>
              </button>
            ))}
          </div>
          <div class="row">
            <button type="button" onClick={handleEnter} tabIndex={-1}>
              {t('common.enter')}
            </button>
            <button type="button" class="stuck" onClick={showHint}>
              {t('ui.hint')}
            </button>
            <button type="button" onClick={handleBackspace} tabIndex={-1}>
              <svg height="24" viewBox="0 0 24 24" width="24">
                <path
                  fill="currentColor"
                  d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div
        id="modal"
        class={showModal ? 'appear' : ''}
        onClick={(e) => {
          if (e.target === e.currentTarget) setShowModal(null);
        }}
      >
        <CloseIcon
          height="24"
          width="24"
          class="close"
          onClick={() => {
            setShowModal(null);
          }}
        />
        <div class="content">
          <h2>
            {showModal === 'won'
              ? '🎉🎉🎉'
              : showModal === 'lost'
              ? '😭😭😭'
              : '👾👾👾'}
          </h2>
          {showModal === 'play' && (
            <p>
              <CodeInput code={currentGame.id} url={permalink} />
            </p>
          )}
          {/(won|lost)/i.test(showModal) && (
            <>
              <p>
                <b class="answer">
                  <ruby>
                    {currentGame.idiom}
                    <rp>(</rp>
                    <rt>{py(currentGame.idiom)}</rt>
                    <rp>)</rp>
                  </ruby>
                </b>
                <div class="definition">
                  {definition?.zh}
                  {definition?.zh && definition?.en && <br />}
                  {definition?.en}
                </div>
                <small>
                  <a
                    href={`https://hanyu.baidu.com/s?wd=${currentGame.idiom}&from=zici`}
                    target="_blank"
                  >
                    📖 {t('glossary.baidu')}
                  </a>
                </small>
              </p>
              <div class="results">{shareTextWithLink}</div>
              <button
                id="share"
                onClick={async () => {
                  try {
                    if (
                      // Edge/ or Edg/
                      /edge?\//i.test(navigator.userAgent) ||
                      // Windows
                      /windows/.test(navigator.userAgent)
                    ) {
                      throw new Error('Web Share API not working well here');
                    }
                    await navigator.share({ text: shareTextWithLink });
                  } catch (e) {
                    try {
                      await navigator.clipboard.writeText(shareTextWithLink);
                      alert(t('ui.copiedResults'));
                    } catch (e2) {
                      copy(shareTextWithLink);
                      alert(t('ui.copiedResults'));
                    }
                  }
                }}
              >
                {t('common.share')}{' '}
                <svg height="16" width="16" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                  ></path>
                </svg>
              </button>
              &nbsp;&nbsp;
              <a
                class="button tweet"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareTextWithLink,
                )}`}
                target="_blank"
              >
                <svg
                  height="16"
                  width="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>{t('common.tweet')}</title>
                  <path
                    fill="currentColor"
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
              &nbsp;&nbsp;
              <CodeInput code={currentGame.id} url={permalink} />
            </>
          )}
          <div class="footer">
            {/won|lost/i.test(gameState) &&
              getTodayGame().id === currentGame.id && (
                <p>
                  <big>
                    <Trans
                      i18nKey="ui.nextIdiom"
                      components={[<Countdown />]}
                    />
                  </big>
                </p>
              )}
            <div>
              {getTodayGame().id !== currentGame.id && (
                <>
                  <a href="./" class="button strong">
                    <PlayIcon width={20} height={20} /> {t('ui.playTodayGame')}
                  </a>
                  <br />
                </>
              )}
              <button
                type="button"
                onClick={() => {
                  const yes = confirm(t('ui.confirmRandom'));
                  if (yes) {
                    const rand = Math.round(Math.random() * (games.length - 1));
                    const randGame = games[rand];
                    location.hash = `#${randGame.id}`;
                    setShowModal(null);
                  }
                }}
              >
                <PlayIcon width={20} height={20} /> {t('common.random')}
              </button>{' '}
              <button
                type="button"
                onClick={() => {
                  // Ask user for idiom ID, load game if ID is valid
                  let id = prompt(t('ui.promptIdiom'));
                  try {
                    id = new URL(id).hash.slice(1);
                  } catch (e) {}
                  if (id) {
                    const game = games.find((g) => g.id === id);
                    if (game) {
                      location.hash = `#${game.id}`;
                      setShowModal(null);
                    } else {
                      alert('Invalid idiom ID');
                    }
                  }
                }}
              >
                <PlayIcon width={20} height={20} /> {t('common.choose')}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        id="info-modal"
        class={showInfoModal || !skipFirstTime ? 'appear' : ''}
      >
        {skipFirstTime && (
          <CloseIcon
            height="32"
            width="32"
            class="close"
            onClick={() => {
              setShowInfoModal(false);
            }}
          />
        )}
        <div class="content">
          <p class="locale-selector">
            🌐{' '}
            <a
              href="./?lng=en"
              hreflang="en"
              rel={i18n.resolvedLanguage === 'en' ? undefined : 'alternate'}
              class={`${i18n.resolvedLanguage === 'en' ? 'selected' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                i18n.changeLanguage('en');
              }}
            >
              English
            </a>{' '}
            &#8901;{' '}
            <a
              href="./?lng=zh-CN"
              hreflang="zh-CN"
              rel={i18n.resolvedLanguage === 'zh' ? undefined : 'alternate'}
              class={`${i18n.resolvedLanguage === 'zh' ? 'selected' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                i18n.changeLanguage('zh-CN');
              }}
            >
              中文
            </a>
          </p>
          <h2>{t('howToPlay.heading')}</h2>
          <p>{t('howToPlay.how1')}</p>
          <p>{t('howToPlay.how2')}</p>
          <p>{t('howToPlay.how3')}</p>
          <ul>
            <li>🟩⬜⬜⬜ {t('howToPlay.spotCorrect')}</li>
            <li>⬜🟧⬜⬜ {t('howToPlay.spotPresent')}</li>
            <li>
              ⬜⬜<span style={{ opacity: 0.5 }}>⬛</span>⬜{' '}
              {t('howToPlay.spotAbsent')}
            </li>
          </ul>
          <p>{t('howToPlay.how4')}</p>
          {skipFirstTime ? (
            <>
              <h2>{t('about.heading')}</h2>
              <p>
                <Trans
                  i18nKey="about.about1"
                  components={[
                    <a
                      href="https://github.com/cheeaun/chengyu-wordle/"
                      target="_blank"
                    />,
                    <a href="https://cheeaun.com" target="_blank" />,
                    <a
                      href="https://www.powerlanguage.co.uk/wordle/"
                      target="_blank"
                    />,
                    <a href="https://powerlanguage.co.uk/" target="_blank" />,
                  ]}
                />
              </p>
              <h2>{t('feedback.heading')}</h2>
              <ul>
                <li>
                  <a href="https://t.me/+ykuhfiImLd1kNjk1" target="_blank">
                    {t('feedback.telegramGroup')}
                  </a>
                </li>
                <li>
                  <Trans
                    i18nKey="feedback.githubDiscussions"
                    components={[
                      <a
                        href="https://github.com/cheeaun/chengyu-wordle/discussions"
                        target="_blank"
                      />,
                    ]}
                  />
                </li>
                <li>
                  <Trans
                    i18nKey="feedback.githubIssues"
                    components={[
                      <a
                        href="https://github.com/cheeaun/chengyu-wordle/issues"
                        target="_blank"
                      />,
                    ]}
                  />
                </li>
                <li>
                  <a href="https://twitter.com/cheeaun" target="_blank">
                    {t('feedback.twitter')}
                  </a>
                </li>
                <li>
                  <a href="https://t.me/cheeaun" target="_blank">
                    {t('feedback.telegram')}
                  </a>
                </li>
              </ul>
              <details id="debugging-container">
                <summary>{t('debugging.heading')}</summary>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(t('debugging.confirmResetGame'))) {
                      LS.removeItem(KEY_PREFIX + currentGame.id);
                      location.reload();
                    }
                  }}
                >
                  {t('debugging.resetGame')}
                </button>
                &nbsp;
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(t('debugging.confirmClearDB'))) {
                      clearGames();
                      location.reload();
                    }
                  }}
                >
                  {t('debugging.clearDB')}
                </button>
              </details>
            </>
          ) : (
            <p>
              <button
                type="button"
                class="large"
                onClick={() => {
                  setShowInfoModal(false);
                  LS.setItem(KEY_PREFIX + 'skipFirstTime', 1);
                  setSkipFirstTime(true);
                }}
              >
                <PlayIcon width="20" height="20" /> {t('ui.startPlay')}
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );
}
