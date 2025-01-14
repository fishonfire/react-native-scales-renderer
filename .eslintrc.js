module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error', { semi: false, singleQuote: true }],
    'no-console': ['error', { allow: ['error', 'warn', 'debug'] }],
    'react-hooks/rules-of-hooks': 'error',
  },
}
