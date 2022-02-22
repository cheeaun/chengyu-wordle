import { useState } from 'preact/hooks';
import { Howler } from 'howler';
import LS from '../utils/LS';
import { KEY_PREFIX } from '../constants';

export default (props) => {
  const [volume, setVolume] = useState(Howler.volume());
  return (
    <span>
      {volume > 0.66 ? '🔊' : volume > 0.33 ? '🔉' : volume > 0 ? '🔈' : '🔇'}{' '}
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => {
          const { value } = e.target;
          Howler.volume(value);
          setVolume(value);
          LS.setItem(`${KEY_PREFIX}volume`, value);
        }}
        {...props}
      />
    </span>
  );
};
