const path = require('path');
const nodeExternals = require('webpack-node-externals');

//
const globalConfig = require('./webpack.config');

//
module.exports = {
	...globalConfig,
	//
	mode: 'development',
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
