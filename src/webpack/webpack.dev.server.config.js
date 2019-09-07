const path = require('path');
const nodeExternals = require('webpack-node-externals');

//
const globalConfig = require('./webpack.dev.config');

//
module.exports = {
	...globalConfig,
	///
	entry: {
		server: ['@babel/polyfill', './src/server/server.js'],
	},
	output: {
		path: path.join(__dirname, '../../dist'),
		filename: '[name].js',
	},
	target: 'node',
	externals: [nodeExternals()],
	node: {
		fs: 'empty',
		net: 'empty',
	},
};
