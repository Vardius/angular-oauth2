var loaders = require("./loaders");
var webpack = require('webpack');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'angular-symfony-acl.min.js',
        path: 'dist'
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: ["node_modules"]
    },
    plugins: [
        new webpack.ProvidePlugin({_: 'lodash'}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(
            {
                warning: false,
                mangle: true,
                comments: false
            }
        )
    ],
    module: {
        loaders: loaders
    }
};