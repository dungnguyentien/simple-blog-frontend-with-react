const path = require('path');
const globalConfig = require('./webpack.dev.config');

const config = {
	...globalConfig,
	// client side
	entry: {
		vendor: ['@babel/polyfill', 'react'],
		app: ['./src/index.js']
	},
	output: {
		path: path.resolve(__dirname, '../../public/build'),
		filename: '[name].js'
	},
	target: 'web'
};

module.exports = config;
