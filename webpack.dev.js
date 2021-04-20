const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',
    watch: true,
    watchOptions: {
        aggregateTimeout: 500
    },
    stats: {
        children: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            linkType: 'text/css',
        }),
        new UglifyJsPlugin({
            test: /\.js(\?.*)?$/i,
            sourceMap: true
        }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: [path.resolve(__dirname, 'dist')] }
        }),
        new webpack.SourceMapDevToolPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                        loader:  "css-loader",
                        options: {
                            sourceMap: true
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        },
                    },
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                    minimize: true,
                }
            }
        ],
    }
});