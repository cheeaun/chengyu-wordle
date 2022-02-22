import confetti from 'canvas-confetti';

export default () => {
  const end = Date.now() + 2 * 1000;
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
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
