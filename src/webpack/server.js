const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

//
const baseConfig = require('./base');

//
module.exports = merge(baseConfig, {
	name: 'server',
	mode: 'development',
	entry: {
		server: ['@babel/polyfill', './src/server/server.js'],
	},
	output: {
		path: path.join(__dirname, '../../buildServer'),
		filename: 'server.js',
	},
	target: 'node',
	externals: [nodeExternals()],
	node: {
		fs: 'empty',
		net: 'empty',
	},
	plugins: [
		new webpack.optimize.LimitChunkCountPlugin({
			maxChunks: 1,
		}),
	],
});
