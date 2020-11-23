'use strict'

const path = require('path')

// eslint-disable-next-line no-undef
const rootDir = path.join(__dirname, 'src')

const config = {
  globals: {
    __DEV__: true,
    'ts-jest': {
      tsConfig: {
        allowJs: true,
        types: ['jest']
      },
      babelConfig: true
    }
  },
  transform: {
    '^.+\\.(js|jsx|mjs)$': 'babel-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  transformIgnorePatterns: ['/node_modules/(?!(xxxx.*?\\.js$))'],
  testRegex: '(?:/__tests__/[^_].*|\\.(?:test|spec))\\.(?:[tj]sx?)$',
  testPathIgnorePatterns: ['/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '@(components|helper|redux|config|modules|style)?/(.*)': '<rootDir>/src/$1/$2',
    '\\.(css|less|scss|sss|styl)$': '<rootDir>/node_modules/jest-css-modules'
  },
  modulePaths: ['<rootDir>'],
  rootDir,
  setupFiles: [],
  snapshotSerializers: [],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/prettier\\.config\\.js$',
    '/jest\\.config\\.js$',
    '\\.snap$',
    '\\.json$'
  ]
}

config.globals.__STORYBOOK__ = false

// eslint-disable-next-line no-undef
module.exports = config
