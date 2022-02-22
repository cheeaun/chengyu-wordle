import { toClipboard } from 'copee';

export default (text, fn = () => {}) => {
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
