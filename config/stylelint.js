module.exports = {
  plugins: [
    'stylelint-scss'
  ],
  extends: [
    'stylelint-config-standard',
    'stylelint-prettier/recommended'
  ],
  rules: {
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'max-nesting-depth': 4,
    'selector-max-type': 2,
    'selector-max-class': 3,
    'selector-max-id': 1
  }
}
