const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin');
const postCssScss = require('postcss-scss');
const autoprefixer = require('autoprefixer');
const postCssPresetEnv = require('postcss-preset-env');

require('dotenv').config();

const config = {
	mode: 'development',
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins: [
							[
								'@babel/plugin-transform-runtime',
								{
									absoluteRuntime: false,
									corejs: false,
									helpers: true,
									regenerator: true,
									useESModules: false,
								},
							],
						],
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.html$/,
				exclude: /node_modules/,
				use: { loader: 'html-loader' },
			},
			{
				test: /\.(sa|sc|c)ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					// 'style-loader',
					//
					MiniCssExtractPlugin.loader,
					// Translates CSS into CommonJS
					// 'css-loader',
					{
						loader: 'css-loader',
						options: {
							// sourceMap: true,
							// modules: true,
							importLoaders: 1,
							// localIdentName: '[name]__[local]___[hash:base64:5]',
						},
					},
					// Compiles Sass to CSS
					'sass-loader',
					{
						loader: 'postcss-loader',
						options: {
							// sourceMap: true,
							syntax: postCssScss,
							plugins: () => [
								autoprefixer,
								postCssPresetEnv({
									stage: 0,
									features: {
										'color-mod-function': true,
										'alpha-hex-colors': true,
									},
								}),
							],
						},
					},
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*'],
	},
	plugins: [
		new webpack.EnvironmentPlugin(['WP_REST_API_BASE_URL']),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: '[name].css',
			chunkFilename: '[id].css',
			// ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
};

module.exports = config;
