var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        a: './main.js',
        b: './main2.js'   
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].[chunkhash:8].bundle.min.js'
 },
    module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                    presets: ['es2015', 'react'],
                    compact: false
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
            screw_ie8: true, // React doesn't support IE8
            warnings: false
          },
          mangle: {
            screw_ie8: true
          },
          output: {
            comments: false,
            screw_ie8: true
          }
        }),
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('production')
          }
        }),
        new HtmlWebpackPlugin({
            filename: 'aView.html',
            chunks: ['a'],
            template: 'base.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'bView.html',
            chunks: ['b'],
            template: 'base.html'
        }),
        new CleanWebpackPlugin(['build'], {
          verbose: true,
          dry: false,
        })
    ],
    devtool: 'source-map'
};