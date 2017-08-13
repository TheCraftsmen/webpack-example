var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        a: './main.js',
        b: './main2.js'   
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[hash].bundle.js'
 },
    module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                    presets: ['es2015']
            }
        }
    ]
    },
    stats: {
        colors: true
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'aView.html',
            chunks: ['a']
        }),
        new HtmlWebpackPlugin({
            filename: 'bView.html',
            chunks: ['b']
        }),
    ],
    devtool: 'source-map'
};