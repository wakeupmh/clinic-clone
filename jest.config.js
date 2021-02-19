module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.js',
    '!<rootDir>/src/config/**/*',
    '!<rootDir>/src/**/models/*',
    '!<rootDir>/src/**/schema.js',
    '!<rootDir>/src/**/index.js',
    '!<rootDir>/src/infrastructure/http/**/*',
    '!<rootDir>/src/infrastructure/logging/**/*',
    '!<rootDir>/src/infrastructure/storage/**/*',
    '!<rootDir>/src/infrastructure/middlewares/*.js'
  ]
}
