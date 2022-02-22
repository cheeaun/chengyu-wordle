export default 'matchMedia' in window &&
  window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all';
