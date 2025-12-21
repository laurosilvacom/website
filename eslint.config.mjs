import next from 'eslint-config-next'

export default [
	...next,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		rules: {
			'react/no-unescaped-entities': 'off',
			'react-hooks/set-state-in-effect': 'off'
		}
	},
	{
		files: ['eslint.config.mjs'],
		rules: {
			'import/no-anonymous-default-export': 'off'
		}
	}
]
