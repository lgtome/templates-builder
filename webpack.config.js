const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = ({ development }) => ({
    mode: development ? 'development' : 'production',
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.[hash].js',
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            path: require.resolve('path-browserify'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [new CleanWebpackPlugin()],
})
