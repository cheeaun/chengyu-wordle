module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-custom-properties': {},
    'postcss-dark-theme-class': {
      darkSelector: '.dark-mode',
      lightSelector: '.light-mode',
    },
  },
};
