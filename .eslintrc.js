module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "semi": ["error", "always"],
    "quotes": ["error", "single"],
    "no-param-reassign": ["off"],
    "no-restricted-syntax": ["off"],
  },
};
