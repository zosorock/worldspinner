module.exports = {
  root: true,
  extends: [
    'react-app',
    'react-app/jest',
    'airbnb',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  rules: {
    'react/jsx-filename-extension': [
      'error',
      { extensions: ['.jsx', '.js'] },
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/no-unstable-nested-components': ['warn', { allowAsProps: true }],
    'react/function-component-definition': [
      'error',
      { namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
    ],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '**/setupTests.js',
          '**/tailwind.config.js',
          '**/postcss.config.js',
          '**/*.test.js',
        ],
      },
    ],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
