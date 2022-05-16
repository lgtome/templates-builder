module.exports = (wallaby) => ({
    files: ['src/**/*.js'],
    tests: ['__tests__/**/*.js'],
    env: {
        type: 'node',
    },
    compilers: {
        '**/*.js': wallaby.compilers.babel({
            /**@desc ava can be set up in the future...  */
            // presets: ['@ava/babel-preset-stage-4'],
        }),
    },
    testFramework: 'mocha',
})
