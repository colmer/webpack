'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
	context: __dirname + '/frontend',

	entry: {
		home: "./home",
		about: "./about"
	},
    output: {
    	path: __dirname + '/public',
        filename: "[name].js",
        library: "[name]"
    },

    watch: NODE_ENV == 'development',

    watchOptions: {
    	aggregateTimeout: 100
    },

    devtool: NODE_ENV == 'development' ? "cheap-inline-module-source-map" : null,

    plugins: [
    	new webpack.NoErrorsPlugin(),
    	new webpack.DefinePlugin({
    		NODE_ENV: JSON.stringify(NODE_ENV)
    	})
    ],

    resolve: {
    	modulesDirectories: ['node_modules'],
    	extensions: ['', '.js']
    },

    resolveLoader: {
    	modulesDirectories: ['node_modules'],
    	moduleTemplates: ['*-loader', '*'],
    	extensions: ['', '.js']
    },

    module: {
    	loaders: [{
    		test: /\.js$/,
    		loader: 'babel',
    		query: {
		        presets: ['es2015'],
		        plugins: ['transform-runtime']
		    }
    	}]
    }
};

if(NODE_ENV == 'prodaction') {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin({
		    compress: {
		        warnings: false,
		        drop_console: true,
		        unsafe: true
		    }
		})
	)
}