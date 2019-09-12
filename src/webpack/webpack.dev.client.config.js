const path = require('path');
const globalConfig = require('./webpack.config');

const config = {
	...globalConfig,
	// client side
	mode: 'development',
	entry: {
		vendor: ['@babel/polyfill', 'react'],
		app: ['./src/index.js'],
	},
	output: {
		path: path.resolve(__dirname, '../../public/build'),
		filename: '[name].js',
	},
	target: 'web',
};

module.exports = config;
