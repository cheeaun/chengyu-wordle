import { pinyin } from 'pinyin-pro';

const py = pinyin;

export default ({ letter, pinyin, state }) => {
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
