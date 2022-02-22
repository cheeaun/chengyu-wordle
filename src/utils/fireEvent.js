export default (...props) => {
  if (window.plausible) {
    plausible(...props);
  }
};
