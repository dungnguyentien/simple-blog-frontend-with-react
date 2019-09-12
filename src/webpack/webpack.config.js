const webpack = require('webpack');
const path = require('path');
require('dotenv').config();

const config = {
	mode: 'development',
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
				test: /\.(s[ac]ss|css)$/i,
				// use: [
				// 	// Creates `style` nodes from JS strings
				// 	'style-loader',
				// 	// Translates CSS into CommonJS
				// 	'css-loader',
				// 	// Compiles Sass to CSS
				// 	'sass-loader'
				// ]
				use: [
					'isomorphic-style-loader',
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
						},
					},
					'sass-loader',
					// 'postcss-loader',
				],
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.wasm', '.mjs', '*'],
	},
	plugins: [new webpack.EnvironmentPlugin(['WP_REST_API_BASE_URL'])],
};

module.exports = config;
