import { useEffect, useState } from 'preact/hooks';
import { useTranslation } from 'react-i18next';

// Component that shows hours, minutes and seconds counting down to start of next day
export default () => {
  const { t } = useTranslation();
  let nextDay = new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000;
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
