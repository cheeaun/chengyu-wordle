import {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
} from 'preact/hooks';
import { pinyin } from 'pinyin-pro';
const py = pinyin;
window.pinyin = pinyin;

import { toJpeg } from 'html-to-image';
import { useTranslation, Trans } from 'react-i18next';

import toast, { Toaster, useToasterStore } from 'react-hot-toast';
const alert = (text) => toast(text);

import Switch from 'rc-switch';

import { toClipboard } from 'copee';
const copy = (text, fn = () => {}) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(fn)
      .catch((e) => {});
  } else {
    toClipboard(text);
    fn();
  }
};

import getIdiomStates from './getIdiomStates';

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

const fireEvent = (...props) => {
  if (window.plausible) {
    plausible(...props);
  }
};

// Data
import idiomsTxt from '../game-data/all-idioms.txt?raw';
const idioms = idiomsTxt.split('\n');
import gameIdioms from '../game-data/game-idioms.csv';
const games = gameIdioms.slice(1).map((row) => ({
  id: row[0],
  idiom: row[1],
}));

const KEY_PREFIX = 'cywd-';
const HARD_MODE = JSON.parse(LS.getItem(`${KEY_PREFIX}hardMode`) || false);
const MAX_GAMES_BEFORE_SHOW_DASHBOARD = 7000;
const MAX_LETTERS = 4;
const MAX_KEYS = HARD_MODE ? 40 : 20;
const MAX_STEPS = 6;
const MIN_IDIOMS = HARD_MODE ? 10 : 6;

if (HARD_MODE) {
  fireEvent('Hard mode');
}

// Check letters with multiple pinyins
// const letter2PY = new Map();
// const differentPinyins = [];
// games.forEach((game) => {
//   const letters = game.idiom.split('');
//   const pinyins = pinyin(game.idiom, { type: 'array' });
//   letters.forEach((letter, i) => {
//     if (!letter2PY.has(letter)) {
//       letter2PY.set(letter, pinyins[i]);
//     } else if (letter2PY.get(letter) !== pinyins[i]) {
//       differentPinyins.push({
//         id: game.id,
//         idiom: game.idiom,
//         letter,
//         pinyins: [letter2PY.get(letter), pinyins[i]].join(' '),
//       });
//     }
//   });
// });
// console.log({
//   differentPinyins: `id,idiom,letter,pinyins\n${differentPinyins
//     .map((row) => `${row.id},${row.idiom},${row.letter},${row.pinyins}`)
//     .join('\n')}`,
// });

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

const ShareIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path>
  </svg>
);

const DownloadIcon = (props) => (
  <svg viewBox="0 0 330 330" fill="currentColor" {...props}>
    <title>⬇️</title>
    <path d="m154 256 1 1h2v1h1l1 1h2v1h8v-1h2l1-1h1v-1h2l1-1 70-70a15 15 0 0 0-22-22l-44 45V25a15 15 0 0 0-30 0v184l-44-45a15 15 0 1 0-22 22z" />
    <path d="M315 160c-8 0-15 7-15 15v115H30V175a15 15 0 0 0-30 0v130c0 8 7 15 15 15h300c8 0 15-7 15-15V175c0-8-7-15-15-15z" />
  </svg>
);

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
          copy(url || code, () => {
            alert(t('ui.copiedURL'));
          });
        }}
      />
    )
  );
};

const Letter = ({ letter, pinyin, state }) => {
  return (
    <div
      class={`letter ${letter ? 'lettered' : ''} ${state ?? ''} ${
        state ? '🌈' : ''
      }`}
    >
      <ruby>
        {letter || <span style={{ opacity: 0 }}>一</span>}
        <rp>(</rp>
        <rt>{pinyin || py(letter) || <>&nbsp;</>}</rt>
        <rp>)</rp>
      </ruby>
    </div>
  );
};

import confetti from 'canvas-confetti';
let confettiRAF;
const blastConfetti = () => {
  const colors = ['#008000', '#FFA500'];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 80,
      origin: { x: 0, y: 1 },
      colors: colors,
      shapes: ['square'],
      disableForReducedMotion: true,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 80,
      origin: { x: 1, y: 1 },
      colors: colors,
      shapes: ['square'],
      disableForReducedMotion: true,
    });
    confettiRAF = requestAnimationFrame(frame);
  })();
};
const stopConfetti = () => {
  cancelAnimationFrame(confettiRAF);
};
const IdiomsDashboard = () => {
  const { t } = useTranslation();
  let wonCount = 0;
  let lostCount = 0;
  const idioms = games.map((game) => {
    // Get board from localStorage
    const boardGame = JSON.parse(LS.getItem(`${KEY_PREFIX}${game.id}`));
    if (boardGame && boardGame.gameState) {
      const { board, gameState } = boardGame;
      if (gameState === 'won') {
        wonCount++;
      } else if (gameState === 'lost') {
        lostCount++;
      }
      return (
        <a
          href={`/#${game.id}`}
          class={`board ${gameState}`}
          title={`${game.id} (${gameState})`}
        >
          {gameState === 'won' ? '🟩' : '🟧'}
        </a>
      );
    } else {
      return (
        <a href={`/#${game.id}`} class="board" title={`${game.id}`}>
          ⬜
        </a>
      );
    }
  });

  useEffect(() => {
    blastConfetti();
    return stopConfetti;
  }, []);

  return (
    <>
      <h2>
        {t('dashboard.heading', {
          gamesCount: MAX_GAMES_BEFORE_SHOW_DASHBOARD,
        })}
      </h2>
      <p>{t('dashboard.subheading')}</p>
      <p>
        <Trans
          i18nKey="dashboard.totalGamesPlayed"
          values={{
            gamesCountOverTotal: `${wonCount + lostCount} / ${games.length}`,
          }}
          components={[<b />]}
        />
        <br />
        <Trans
          i18nKey="dashboard.wonLost"
          values={{
            wonCount,
            lostCount,
          }}
          components={[<b />, <b />]}
        />
      </p>
      <div class="boards">{idioms}</div>
    </>
  );
};

const ShareImageButton = ({ header, footer, boardStates, id }) => {
  const { t } = useTranslation();
  const imageRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const imageOpts = {
    canvasWidth: 1080,
    canvasHeight: 1080,
    quality: 0.5,
  };

  // Update image when light/dark mode kicks in
  const [mediaChanged, setMediaChanged] = useState();
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const colorSchemeChange = (event) => {
      console.log(event.matches);
      setMediaChanged(event.matches);
    };
    media.addEventListener('change', colorSchemeChange);
    return () => {
      media.removeEventListener('change', colorSchemeChange);
    };
  });

  useEffect(() => {
    toJpeg(imageRef.current, imageOpts).then((dataURL) => {
      setImageSrc(dataURL);
    });
  }, [boardStates, id, mediaChanged]);

  const fileName = `chengyu-wordle-${id}.jpg`;

  return (
    <>
      <a
        id="share-image-button"
        class="button"
        href={imageSrc}
        download={fileName}
        target="_blank"
      >
        {t('common.image')} <DownloadIcon width="12" height="12" />
      </a>
      <div id="share-image-container">
        <div id="share-image" ref={imageRef}>
          <p class="header">
            <b>{header}</b>
          </p>
          <div class="board">
            {boardStates.map((row) => {
              return (
                <div>
                  {row.map((letter) => {
                    return <span class={`tile ${letter}`} />;
                  })}
                </div>
              );
            })}
          </div>
          <p class="footer">{footer}</p>
        </div>
      </div>
    </>
  );
};

const prefersColorSchemeSupported =
  'matchMedia' in window &&
  window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all';

export function App() {
  const { t, i18n } = useTranslation();

  const [showDashboard, setShowDashboard] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false); // false | won | lost
  const [showInfoModal, setShowInfoModal] = useState(false);

  const [colorScheme, setColorScheme] = useState(
    LS.getItem(`${KEY_PREFIX}colorScheme`) || 'auto',
  );
  useEffect(() => {
    if (!prefersColorSchemeSupported) return;
    const html = document.querySelector('html');
    if (colorScheme === 'dark') {
      html.classList.add('dark-mode');
      html.classList.remove('light-mode');
    } else if (colorScheme === 'light') {
      html.classList.add('light-mode');
      html.classList.remove('dark-mode');
    } else {
      html.classList.remove('dark-mode', 'light-mode');
    }
  }, [colorScheme]);

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
      setShowDashboard(false);
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

  const [currentGameKeys, currentGameKeysPinyin] = useMemo(() => {
    const { keys } = getIdiomsKeys(currentGame.idiom);
    const allPossibleIdioms = idioms.filter((idiom) => {
      // check if idiom contains 4 letters from keys
      return idiom.split('').every((letter) => keys.has(letter));
    });

    // Pinyin mappings
    const keysPinyin = new Map();
    allPossibleIdioms.forEach((idiom) => {
      const idiomPinyin = pinyin(idiom, { type: 'array' });
      idiomPinyin.forEach((pinyin, i) => {
        if (keysPinyin.has(idiom[i])) {
          keysPinyin.get(idiom[i]).add(pinyin);
        } else {
          keysPinyin.set(idiom[i], new Set([pinyin]));
        }
      });
    });

    // SPOILER inside console.log!
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

    const sortedKeys = [...keys].sort((a, b) => a.localeCompare(b, 'zh'));
    return [sortedKeys, keysPinyin];
  }, [currentGame.idiom]);

  const handleLetter = (letter, overwrite = false) => {
    if (!board[currentStep]) return;
    if (gameState) return;
    setShowError(false);

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

          const possibleLettersSet = new Set();
          currentGameKeysPinyin.forEach((pinyins, letter) => {
            pinyins.forEach((pinyin) => {
              const firstPinyinChar = pinyin[0];
              if (
                firstPinyinChar.localeCompare(pinyinLetter, 'en', {
                  sensitivity: 'base',
                }) === 0
              ) {
                possibleLettersSet.add(letter);
              }
            });
          });
          const possibleLetters = [...possibleLettersSet];

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
      } else if (/[a-z]/i.test(key)) {
        // Type "a" will trigger the first letter pinyin that starts with "ā"
        let breakLoop = false;
        currentGameKeysPinyin.forEach((pinyins, letter) => {
          if (breakLoop) return;
          pinyins.forEach((pinyin) => {
            if (breakLoop) return;
            const firstPinyinChar = pinyin[0];
            if (
              firstPinyinChar.localeCompare(key, 'en', {
                sensitivity: 'base',
              }) === 0
            ) {
              e.preventDefault();
              breakLoop = true;
              handleLetter(letter);
            }
          });
        });
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
    };
  }, [currentGameKeys, currentGameKeysPinyin, board, currentStep, gameState]);

  const permalink = location.origin + location.pathname + '#' + currentGame.id;
  const shortPermalink =
    location.host + location.pathname + '#' + currentGame.id;
  const emojiResults = boardStates
    .map((row) => row.join(''))
    .join('\n')
    .trim();
  const attempts = gameState === 'won' ? emojiResults.split('\n').length : 'X';
  const attemptsText = `${attempts}/${MAX_STEPS}`;
  const shareText = `${t('app.title')} [${currentGame.id}]${
    HARD_MODE ? ' 🔥' : ''
  } ${attemptsText}\n\n${emojiResults}`;
  const shareTextWithLink = `${shareText}\n\n${shortPermalink}`;

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
  }, [currentGame.idiom, definition]);
  const hintIndex = useRef(0);
  useEffect(() => {
    hintIndex.current = 0;
  }, [currentGame.idiom]);
  const showHint = () => {
    if (gameState) return;
    const hint = hints[hintIndex.current];
    hintIndex.current = (hintIndex.current + 1) % hints.length;
    alert(hint);
  };

  // Limit number of toasts
  // https://github.com/timolins/react-hot-toast/issues/31#issuecomment-803359550
  const { toasts } = useToasterStore();
  const TOAST_LIMIT = 1;
  useEffect(() => {
    toasts
      .filter((t, i) => t.visible && i >= TOAST_LIMIT)
      .forEach((t) => toast.dismiss(t.id));
  }, [toasts]);

  const gamesPlayedCount = useMemo(() => {
    // Only count games played if info modal is open
    if (!showInfoModal) return;
    try {
      const keys = Object.keys(localStorage).filter((k) => {
        const isPrefixed = k.startsWith(KEY_PREFIX);
        if (!isPrefixed) return false;
        const gameID = k.slice(KEY_PREFIX.length);
        return isPrefixed && games.find((g) => g.id === gameID);
      });
      return keys.length;
    } catch (e) {}
  }, [showInfoModal]);

  useEffect(() => {
    if (!gamesPlayedCount || gamesPlayedCount < 10) return;
    const precision = gamesPlayedCount < 100 ? 1 : 2;
    const count = +gamesPlayedCount.toPrecision(precision);
    fireEvent('Games Played', {
      props: {
        count,
      },
    });
  }, [gamesPlayedCount]);

  const GamesCount = useCallback(
    () => (
      <b>
        {gamesPlayedCount}
        {gamesPlayedCount >= MAX_GAMES_BEFORE_SHOW_DASHBOARD && (
          <>
            {' '}
            /{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowInfoModal(false);
                setShowDashboard(true);
              }}
            >
              {games.length}
            </a>
          </>
        )}
      </b>
    ),
    [gamesPlayedCount],
  );

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
            {gameState ? (
              t('common.play')
            ) : (
              <svg width="16" height="16" viewBox="0 0 290 290">
                <title>...</title>
                <path
                  fill="currentColor"
                  d="M255 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70zM35 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70zM145 110a35 35 0 1 0 0 70 35 35 0 0 0 0-70z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>
      <div id="board" class={`${gameState} ${HARD_MODE ? 'hard-mode' : ''}`}>
        {board.map((row, index) => {
          const pinyins = pinyin(row.v.join(''), { type: 'array' });
          return (
            <div
              className={`row ${
                currentStep === index && showError ? 'error' : ''
              } ${currentStep === index ? 'current' : ''}`}
              key={index}
            >
              {row.v.map((letter, i) => (
                <Letter
                  key={i}
                  letter={letter}
                  pinyin={pinyins[i]}
                  state={boardStates[index][i]}
                />
              ))}
            </div>
          );
        })}
      </div>
      <div id="keyboard" class={`${gameState} ${HARD_MODE ? 'hard-mode' : ''}`}>
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
                  <rt>
                    {currentGameKeysPinyin.has(key)
                      ? [...currentGameKeysPinyin.get(key)]
                          .sort((a, b) => a.localeCompare(b, 'zh'))
                          .join(' ⸱ ')
                      : py(key)}
                  </rt>
                  <rp>)</rp>
                </ruby>
              </button>
            ))}
          </div>
          <div class="row">
            <button type="button" onClick={handleEnter} tabIndex={-1}>
              {t('common.enter')}
            </button>
            {HARD_MODE ? (
              <b class="hard">{t('ui.hardMode')}</b>
            ) : (
              <button type="button" class="stuck" onClick={showHint}>
                {t('ui.hint')}
              </button>
            )}
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
              : '🐯🐯🐯'}
          </h2>
          {showModal === 'play' && (
            <p>
              {t('ui.idiomId')}{' '}
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
                  {definition?.zh
                    ? definition.zh.split('').map((c) => {
                        const p = py(c);
                        if (p === c) return c;
                        return (
                          <ruby>
                            {c}
                            <rp>(</rp>
                            <rt>{py(c)}</rt>
                            <rp>)</rp>
                          </ruby>
                        );
                      })
                    : ''}
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
                  &nbsp; &nbsp;
                  <a
                    href={`https://www.zdic.net/hans/${currentGame.idiom}`}
                    target="_blank"
                  >
                    📖 {t('glossary.zdic')}
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
                    copy(shareTextWithLink);
                    await navigator.share({ text: shareTextWithLink });
                  } catch (e) {
                    copy(shareTextWithLink, () => {
                      alert(t('ui.copiedResults'));
                    });
                  }
                }}
              >
                {t('common.share')} <ShareIcon width="16" height="16" />
              </button>
              &nbsp;
              <ShareImageButton
                id={currentGame.id}
                header={t('app.title')}
                footer={`[${currentGame.id}]${
                  HARD_MODE ? ' 🔥' : ''
                } ${attemptsText}`}
                boardStates={boardStates}
              />
              &nbsp;
              <a
                class="button facebook"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  permalink,
                )}&hashtag=${encodeURIComponent('#chengyuwordle')}`}
                target="_blank"
                onClick={() => {
                  copy(shareTextWithLink);
                }}
              >
                <svg width="16" height="16" viewBox="0 0 96.1 96.1">
                  <title>Facebook</title>
                  <path
                    fill="currentColor"
                    d="M72 0H59.7c-14 0-23 9.3-23 23.7v10.9H24c-1 0-2 .8-2 2v15.7c0 1.1 1 2 2 2h12.6v39.9c0 1 .8 2 2 2h16.3c1 0 2-1 2-2v-40h14.6c1 0 2-.8 2-1.9V36.5a2 2 0 0 0-2-2H56.8v-9.2c0-4.4 1.1-6.7 6.9-6.7H72c1 0 2-.9 2-2V2c0-1.1-1-2-2-2z"
                  />
                </svg>
              </a>
              &nbsp;
              <a
                class="button tweet"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareTextWithLink,
                )}`}
                target="_blank"
              >
                <svg height="16" width="16" viewBox="0 0 24 24">
                  <title>{t('common.tweet')}</title>
                  <path
                    fill="currentColor"
                    d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                  />
                </svg>
              </a>
              &nbsp;
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
                  fireEvent('Click: Random');
                  const yes = confirm(t('ui.confirmRandom'));
                  if (yes) {
                    const rand = Math.round(Math.random() * (games.length - 1));
                    const randGame = games[rand];
                    location.hash = `#${randGame.id}`;
                    setShowModal(null);
                    fireEvent('Game load: Random');
                  }
                }}
              >
                <PlayIcon width={20} height={20} /> {t('common.random')}
              </button>{' '}
              <button
                type="button"
                onClick={() => {
                  fireEvent('Click: Idiom ID');
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
                      fireEvent('Game load: Idiom ID');
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
          {prefersColorSchemeSupported && (
            <p class="color-scheme-selector">
              <button
                type="button"
                class={colorScheme === 'dark' ? 'active' : ''}
                onClick={() => {
                  LS.setItem(`${KEY_PREFIX}colorScheme`, 'dark');
                  setColorScheme('dark');
                }}
              >
                🌑
              </button>{' '}
              <button
                type="button"
                class={colorScheme === 'auto' ? 'active' : ''}
                onClick={() => {
                  LS.removeItem(`${KEY_PREFIX}colorScheme`);
                  setColorScheme('auto');
                }}
              >
                🌓
              </button>{' '}
              <button
                type="button"
                class={colorScheme === 'light' ? 'active' : ''}
                onClick={() => {
                  LS.setItem(`${KEY_PREFIX}colorScheme`, 'light');
                  setColorScheme('light');
                }}
              >
                🌕
              </button>
            </p>
          )}{' '}
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
          {skipFirstTime && gamesPlayedCount > 0 && (
            <div id="stats">
              <p>
                <Trans i18nKey="ui.gamesPlayed" components={[<GamesCount />]} />
              </p>
              <div id="config">
                <p>
                  <label>
                    {t('ui.hardMode')}
                    <Switch
                      defaultChecked={HARD_MODE}
                      onChange={(checked) => {
                        LS.setItem(
                          `${KEY_PREFIX}hardMode`,
                          checked ? 'true' : 'false',
                        );
                        setTimeout(() => {
                          location.reload();
                        }, 310); // Wait for Switch to animate
                      }}
                    />
                  </label>
                </p>
              </div>
            </div>
          )}
          <h2>{t('howToPlay.heading')}</h2>
          <p>{t('howToPlay.how1')}</p>
          <p>{t('howToPlay.how2')}</p>
          <p>{t('howToPlay.how3')}</p>
          <div class="example-idiom">
            {'九牛一毛'.split('').map((letter, i) => (
              <Letter
                key={letter}
                letter={letter}
                state={i === 0 ? '🟩' : ''}
              />
            ))}
          </div>
          <p>{t('howToPlay.spotCorrect')}</p>
          <div class="example-idiom">
            {'理所当然'.split('').map((letter, i) => (
              <Letter
                key={letter}
                letter={letter}
                state={i === 1 ? '🟧' : ''}
              />
            ))}
          </div>
          <p>{t('howToPlay.spotPresent')}</p>
          <div class="example-idiom">
            {'爱不释手'.split('').map((letter, i) => (
              <Letter
                key={letter}
                letter={letter}
                state={i === 2 ? '⬜' : ''}
              />
            ))}
          </div>
          <p>{t('howToPlay.spotAbsent')}</p>
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
                    <a href="https://cheeaun.com/projects/" target="_blank" />,
                    <a
                      href="https://www.nytimes.com/games/wordle/"
                      target="_blank"
                    />,
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
                <summary>
                  {t('debugging.heading')} ({__COMMIT_HASH__})
                </summary>
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
      {showDashboard && (
        <div id="dashboard-modal">
          <CloseIcon
            height="24"
            width="24"
            class="close"
            onClick={() => {
              setShowDashboard(false);
            }}
          />
          <IdiomsDashboard />
        </div>
      )}
      <Toaster
        containerStyle={{
          top: '3.5em',
        }}
        toastOptions={{
          className: 'toast',
          style: {
            pointerEvents: 'none',
          },
        }}
      />
    </>
  );
}
