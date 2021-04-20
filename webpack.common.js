const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js',
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    target: "web",
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Production',
            template: path.resolve(__dirname, 'src/index.html'),
            inject: true,
            chunks: ['index'],
            filename: 'index.html'
        }),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin(),
            new CssMinimizerPlugin(),
        ]
    }
};
