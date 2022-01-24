import { useState, useEffect, useMemo } from 'preact/hooks';
import pinyin from 'pinyin';
const py = (str) =>
  pinyin(str, { segment: true, group: true }).flat().join(' ').trim();

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

window.clearGames = () => {
  // loop all keys in localStorage, if the key starts with 'cywd-', delete it
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('cywd-')) {
      localStorage.removeItem(key);
    }
  }
};

window.allGames = () => {
  const allGames = new Map();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('cywd-')) {
      const game = JSON.parse(localStorage.getItem(key));
      allGames.set(key.replace('cywd-', ''), game);
    }
  }
  return allGames;
};

const getBoardGameState = (board) => {
  const reversedBoard = [...board].reverse();
  const lastRowsWithValuesIndex = reversedBoard.findIndex((row) =>
    row.some((item) => item.v)
  );
  const lastRowWithValues = reversedBoard[lastRowsWithValuesIndex];
  if (lastRowWithValues) {
    const won = lastRowWithValues.every((item) => item.s === 'correct');
    if (won) return 'won';
    const rowHasStates = lastRowWithValues.every((item) => !!item.s);
    // Since board is reversed, index 0 = last row
    if (lastRowsWithValuesIndex === 0 && !won && rowHasStates) {
      return 'lost';
    }
  }
  return null;
};

const blankBoard = () =>
  Array.from({ length: MAX_STEPS }, () =>
    Array.from({ length: MAX_LETTERS }, () => ({ v: '', s: null }))
  );

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
      ({ idiom }) => !passedIdioms.has(idiom) && idiom.includes(letter)
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

  // DEBUG
  if (keys.size < MAX_KEYS || passedIdioms.size < MAX_STEPS) {
    const nextIdiom = [...passedIdioms][++depth];
    if (nextIdiom) {
      const { passedIdioms: _passedIdioms, keys: _keys } = getIdiomsKeys(
        nextIdiom,
        passedIdioms,
        keys,
        depth
      );
      passedIdioms = _passedIdioms;
      keys = _keys;
    }
  }

  // Still not enough keys?
  if (keys.size < MAX_KEYS || passedIdioms.size < MAX_STEPS) {
    const randomIdiom = games[Math.floor(Math.random() * games.length)].idiom;
    if (randomIdiom) {
      const { passedIdioms: _passedIdioms, keys: _keys } = getIdiomsKeys(
        randomIdiom,
        passedIdioms,
        keys,
        0
      );
      passedIdioms = _passedIdioms;
      keys = _keys;
    }
  }

  if (keys.size < MAX_KEYS || passedIdioms.size < MAX_STEPS) {
    const gameID = games.find((g) => g.idiom === idiom)?.id;
    console.log(gameID, {
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

export function App() {
  const [currentGame, setCurrentGame] = useState(
    games.find((g) => g.id === location.hash.slice(1)) || games[0]
  );
  useEffect(() => {
    window.addEventListener('hashchange', () => {
      setCurrentGame(
        games.find((g) => g.id === location.hash.slice(1)) || games[0]
      );
    });
  }, []);

  // v = value, s = state
  // States (default "null"):
  // - correct: letter is in the idiom adnd in the correct spot (green)
  // - present: letter is in the idiom but in the wrong spot (yellow)
  // - absent: letter is NOT in the idiom in any spot (gray)
  const [board, setBoard] = useState(
    JSON.parse(localStorage.getItem(`cywd-${currentGame.id}`))?.board ||
      blankBoard()
  );
  useEffect(() => {
    const cachedGame = localStorage.getItem(`cywd-${currentGame.id}`);
    if (cachedGame) {
      setBoard(JSON.parse(cachedGame).board);
    } else {
      setBoard(blankBoard());
    }
  }, [currentGame.id]);

  // Save to localStorage every time board changes
  useEffect(() => {
    // Only store in localStorage if board has some values
    if (board && board.some((row) => row.some((cell) => cell.v))) {
      localStorage.setItem(
        `cywd-${currentGame.id}`,
        JSON.stringify({
          board,
          gameState: getBoardGameState(board),
        })
      );
    }
  }, [board]);

  // const [currentStep, setCurrentStep] = useState(0);
  const currentStep =
    board?.findIndex((row) => row.some((cell) => !cell.s)) || 0;
  // console.log({ currentStep, board });

  // Set current step to first empty item in board
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false); // false | won | lost
  const [showInfoModal, setShowInfoModal] = useState(false);

  // const passedIdioms = [currentGame.idiom];
  const currentGameKeys = useMemo(() => {
    const { passedIdioms, keys } = getIdiomsKeys(currentGame.idiom);

    // SPOILER inside console.log!
    const possibleIdioms = [...passedIdioms]
      .map((idiom) => {
        return `${idiom} (${py(idiom)})`;
      })
      .sort((a, b) => a.localeCompare(b, 'zh'));
    console.log(`POSSIBLE IDOMS [${currentGame.id}] (${keys.size} keys):
${possibleIdioms.map((idiom, i) => `${i + 1}. ${idiom}`).join('\n')}

🚨SPOILER🚨 Type 'ANSWER' to see the answer.
`);
    window.ANSWER = `${currentGame.idiom} (${py(currentGame.idiom)})`;

    return [...keys].sort((a, b) => a.localeCompare(b, 'zh'));
  }, [currentGame.idiom]);

  const handleLetter = (letter, overwrite = false) => {
    if (!board[currentStep]) return;
    if (gameState) return;
    const newBoard = [...board];
    let columnIndex = newBoard[currentStep].findIndex((item) => item.v === '');
    if (overwrite) {
      if (columnIndex === -1) {
        columnIndex = 3;
      } else {
        columnIndex--;
      }
    }
    const column = newBoard[currentStep][columnIndex];
    if (column) {
      column.v = letter;
      setBoard(newBoard);
    }
  };

  const flatBoard = board.flat();
  const correctKeys = [];
  const presentKeys = [];
  const absentKeys = [];
  flatBoard.forEach((item) => {
    if (item.s === 'correct') {
      correctKeys.push(item.v);
    } else if (item.s === 'present') {
      presentKeys.push(item.v);
    } else if (item.s === 'absent') {
      absentKeys.push(item.v);
    }
  });

  const handleEnter = () => {
    if (gameState) return;
    console.log('handleEnter');
    setShowError(false);

    // if (currentStep === MAX_STEPS - 1 || !board[currentStep]) {
    //   renderModal();
    //   return;
    // }

    const currentIdiom = board[currentStep].map((item) => item.v).join('');
    const valid = idioms.includes(currentIdiom);
    if (valid) {
      board[currentStep].forEach((item, i) => {
        if (currentGame.idiom[i] === item.v) {
          item.s = 'correct';
        } else if (currentGame.idiom.split('').includes(item.v)) {
          item.s = 'present';
        } else {
          item.s = 'absent';
        }
      });
      setBoard([...board]);

      // Go next step
      // setCurrentStep(currentStep + 1);
    } else {
      setTimeout(() => {
        setShowError(true);
      }, 10);
    }
    console.log({ currentIdiom, valid });
  };

  const gameState = useMemo(() => {
    return getBoardGameState(board);
  }, [board]);

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
    if (!newBoard[currentStep]) return;
    const column = [...newBoard[currentStep]]
      .reverse()
      .find((item) => item.v !== '' && item.s === null);
    if (column) {
      column.v = '';
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
        const lastColumnWithValue = [...board[currentStep]]
          .reverse()
          .find((item) => item.v !== '');
        const value = lastColumnWithValue?.v;
        if (value) {
          const pinyinLetter = py(value)[0];
          const possibleLetters = currentGameKeys.filter(
            (k) => py(k)[0] === pinyinLetter
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
  }, [currentGameKeys, currentStep, gameState]);

  const permalink = location.origin + location.pathname + '#' + currentGame.id;
  const emojiResults = board
    .map((rows) =>
      rows.some((item) => !!item.v)
        ? `\n${rows
            .map(
              ({ s }) =>
                ({
                  correct: '🟩',
                  present: '🟨',
                  absent: '⬜',
                }[s])
            )
            .join('')}`
        : ''
    )
    .join('')
    .trim();
  const attempts = gameState === 'won' ? emojiResults.split('\n').length : 'X';
  const shareText = `Chengyu Wordle [${currentGame.id}] ${attempts}/6\n\n${emojiResults}\n\n${permalink}`;

  return (
    <>
      <header>
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
        {/* <a href="https://github.com/cheeaun/chengyu-wordle" target="_blank">
          Source
        </a> */}
        <h1>
          Chengyu Wordle <sup>beta</sup>
        </h1>
        <button
          type="button"
          onClick={() => {
            setShowModal(gameState || 'play');
          }}
        >
          Play
        </button>
      </header>
      <div id="board">
        {board.map((letters, index) => {
          return (
            <div
              className={`row ${
                currentStep === index && showError ? 'error' : ''
              } ${currentStep === index ? 'current' : ''}`}
              key={index}
            >
              {letters.map((letter, i) => (
                <div
                  className={`letter ${letter.v ? 'lettered' : ''} ${
                    letter.s ?? ''
                  }`}
                  key={i}
                >
                  <ruby>
                    {letter.v || <span style={{ opacity: 0 }}>一</span>}
                    <rp>(</rp>
                    <rt>{py(letter.v) || <>&nbsp;</>}</rt>
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
                class={`${correctKeys.includes(key) ? 'correct' : ''} ${
                  presentKeys.includes(key) ? 'present' : ''
                } ${absentKeys.includes(key) ? 'absent' : ''}`}
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
              Enter
            </button>
            <button type="button" onClick={handleBackspace} tabIndex={-1}>
              <svg height="24" viewBox="0 0 24 24" width="24">
                <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"></path>
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
            <a href={permalink}>🔗 {location.host + '/#' + currentGame.id}</a>
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
                <br />{' '}
                <small>
                  <a href={permalink}>🔗 {currentGame.id}</a>
                  &nbsp;&nbsp;
                  <a
                    href={`https://cc-cedict.org/editor/editor.php?handler=QueryDictionary&querydictionary_search=${currentGame.idiom}`}
                    target="_blank"
                  >
                    📖 CC-CEDICT
                  </a>
                </small>
              </p>
              <div class="results">{shareText}</div>
              <button
                id="share"
                onClick={async () => {
                  try {
                    await navigator.share({ text: shareText });
                  } catch (e) {
                    try {
                      await navigator.clipboard.writeText(shareText);
                      alert('Copied results to clipboard');
                    } catch (e2) {}
                  }
                }}
              >
                Share{' '}
                <svg height="16" width="16" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"
                  ></path>
                </svg>
              </button>
            </>
          )}
          <p>
            <button
              type="button"
              onClick={() => {
                const yes = confirm(
                  'Are you sure you want to start a new random game?'
                );
                if (yes) {
                  const rand = Math.round(Math.random() * (games.length - 1));
                  const randGame = games[rand];
                  location.hash = `#${randGame.id}`;
                  setShowModal(null);
                }
              }}
            >
              <PlayIcon width={20} height={20} /> Random
            </button>{' '}
            <button
              type="button"
              onClick={() => {
                // Ask user for idiom ID, load game if ID is valid
                const id = prompt('Enter idiom ID:');
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
              <PlayIcon width={20} height={20} /> Choose
            </button>
          </p>
        </div>
      </div>
      <div id="info-modal" class={showInfoModal ? 'appear' : ''}>
        <CloseIcon
          height="24"
          width="24"
          class="close"
          onClick={() => {
            setShowInfoModal(false);
          }}
        />
        <div class="content">
          <h2>How to play</h2>
          <p>Guess the idiom in 6 tries.</p>
          <p>
            Each guess must be a valid 4-letter idiom. Hit the enter button to
            submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the idiom.
          </p>
          <ul>
            <li>🟩⬜⬜⬜ Green = correct spot</li>
            <li>⬜🟨⬜⬜ Yellow = wrong spot</li>
            <li>
              ⬜⬜<span style={{ opacity: 0.5 }}>⬛</span>⬜ Gray = not in any
              spot
            </li>
          </ul>
          <h2>About</h2>
          <p>
            <a
              href="https://github.com/cheeaun/chengyu-wordle/"
              target="_blank"
            >
              Built
            </a>{' '}
            by{' '}
            <a href="https://cheeaun.com" target="_blank">
              Chee Aun
            </a>
            .{' '}
            <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">
              Wordle
            </a>{' '}
            ©️{' '}
            <a href="https://powerlanguage.co.uk/" target="_blank">
              Josh Wardle
            </a>
            .
          </p>
          <h2>Feedback channels</h2>
          <ul>
            <li>
              <a href="https://t.me/+ykuhfiImLd1kNjk1" target="_blank">
                Telegram group
              </a>
            </li>
            <li>
              <a
                href="https://github.com/cheeaun/chengyu-wordle/discussions"
                target="_blank"
              >
                GitHub Discussions
              </a>
              (for developers)
            </li>
            <li>
              <a
                href="https://github.com/cheeaun/chengyu-wordle/issues"
                target="_blank"
              >
                GitHub Issues
              </a>{' '}
              (for bugs)
            </li>
            <li>
              <a href="https://twitter.com/cheeaun" target="_blank">
                @cheeaun on Twitter
              </a>
            </li>
            <li>
              <a href="https://t.me/cheeaun" target="_blank">
                @cheeaun on Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
