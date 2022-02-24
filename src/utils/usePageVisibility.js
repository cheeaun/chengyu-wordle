// https://github.com/amir4rab/useVisibility
import { useEffect, useState } from 'preact/hooks';

const getDocumentHiddenProp = () => {
  if (typeof document.hidden !== 'undefined') return 'hidden';
  if (typeof document.msHidden !== 'undefined') return 'msHidden';
  if (typeof document.webkitHidden !== 'undefined') return 'webkitHidden';
};

const getIsDocumentHidden = () => {
  if (typeof document !== 'undefined')
    return !document[getDocumentHiddenProp()];
  return false;
};

const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());

  const toggleVisibility = () => {
    setIsVisible(getIsDocumentHidden());
  };

  useEffect(() => {
    document.addEventListener('visibilitychange', toggleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', toggleVisibility);
    };
  }, []);

  return isVisible;
};

export default usePageVisibility;
