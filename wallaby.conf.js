module.exports = (wallaby) => ({
  files: ['src/**/*.js'],
  tests: ['__tests__/**/*.js'],
  env: {
    type: 'node',
  },
  compilers: {
    '**/*.js': wallaby.compilers.babel({}),
  },
  testFramework: 'mocha',
})
