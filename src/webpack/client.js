const path = require('path');
const merge = require('webpack-merge');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
// const { ReactLoadablePlugin } = require('react-loadable/webpack');

const baseConfig = require('./base');

const config = merge(baseConfig, {
	name: 'client',
	mode: 'development',
	entry: {
		app: ['./src/index.js'],
	},
	output: {
		path: path.resolve(__dirname, '../../public/build'),
		filename: '[name].js',
	},
	target: 'web',
	plugins: [
		// new ReactLoadablePlugin({
		// 	filename: path.resolve(__dirname, '../../buildServer/react-loadable.json'),
		// }),
		// Write out stats file to build directory.
		new StatsWriterPlugin({
			filename: '../../buildServer/stats.json', // Default
		}),
		// new webpack.optimize.CommonsChunkPlugin({
		// 	name: 'manifest',
		// 	minChunks: Infinity,
		// }),
	],
});

module.exports = config;
