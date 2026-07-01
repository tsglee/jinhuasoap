module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'node_modules', 'site/'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: '18.3' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/prop-types': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    // 全形空白 U+3000（如 TierNotice 的「　·　」分隔）是刻意的中文排版，
    // 不是手誤。eslint:recommended 預設已 skipStrings，這裡一併 skipTemplates
    // 讓樣板字串裡的全形空白同等對待。
    'no-irregular-whitespace': [
      'error',
      { skipStrings: true, skipTemplates: true, skipJSXText: true },
    ],
  },
};
