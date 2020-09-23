module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'standard'
  ],
  rules: {
    'no-console': 'off',
    'no-useless-constructor': 'off'
  }
}
