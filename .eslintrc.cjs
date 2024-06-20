module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: ['xo', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
	overrides: [
		{
			env: {
				node: true,
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script',
			},
		},
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'react/jsx-no-target-blank': 'off',

		'react/prop-types': 'off',
		camelcase: 'off',
		'no-negated-condition': 'off',
		'guard-for-in': 'off',
		'no-await-in-loop': 'off',
	},
};
