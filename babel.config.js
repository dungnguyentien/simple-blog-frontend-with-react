module.exports = {
	presets: ['@babel/preset-env', '@babel/preset-react'],
	env: {
		test: {
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
				'@babel/plugin-proposal-class-properties',
				'transform-es2015-modules-commonjs',
				'babel-plugin-dynamic-import-node',
			],
		},
	},
};
