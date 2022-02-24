import { useEffect, useState } from 'preact/hooks';

export default () => {
  let hidden, visibilityChange;
  if ('hidden' in document) {
    hidden = 'hidden';
    visibilityChange = 'visibilitychange';
  } else if ('mozHidden' in document) {
    hidden = 'mozHidden';
    visibilityChange = 'mozvisibilitychange';
  } else if ('webkitHidden' in document) {
    hidden = 'webkitHidden';
    visibilityChange = 'webkitvisibilitychange';
  }

  const [isVisible, setIsVisible] = useState(!document[hidden]);
  useEffect(() => {
    const handleVisibilityChange = () => setIsVisible(!document[hidden]);
    try {
      document.addEventListener(visibilityChange, handleVisibilityChange);
    } catch (e) {}
    return () => {
      try {
        document.removeEventListener(visibilityChange, handleVisibilityChange);
      } catch (e) {}
    };
  }, []);

  return isVisible;
};
