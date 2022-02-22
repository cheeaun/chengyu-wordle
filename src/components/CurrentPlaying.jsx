import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();
  const [playingCount, setPlayingCount] = useState(0);
  useEffect(() => {
    let fetchTimer, fetchRAF;
    const fetchPlayingCount = () => {
      fetch('https://chengyu-wordle-realtime-visitors.cheeaun.workers.dev/')
        .then((r) => {
          if (!r.ok) throw Error(r.statusText);
          return r.text();
        })
        .then((text) => {
          const count = +text;
          if (!count) throw Error('Zero or NaN');
          setPlayingCount(count);
        })
        .catch((e) => {
          setPlayingCount(0);
        });
      fetchTimer = setTimeout(() => {
        fetchRAF = requestAnimationFrame(fetchPlayingCount);
      }, 2 * 60 * 1000);
    };
    fetchPlayingCount();
    return () => {
      clearTimeout(fetchTimer);
      cancelAnimationFrame(fetchRAF);
    };
  }, []);

  if (playingCount <= 1) return null;

  return (
    <div id="current-playing">
      {t('ui.countPlaying', { count: playingCount })}
    </div>
  );
};
