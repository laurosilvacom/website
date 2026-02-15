import next from 'eslint-config-next'

const legacyArchitectureImports = ['@/components/*', '@/lib/*', '@/hooks/*']

export default [
	...next,
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		rules: {
			'no-restricted-imports': [
				'error',
				{
					patterns: legacyArchitectureImports,
				},
			],
			'react/no-unescaped-entities': 'off',
			'react-hooks/set-state-in-effect': 'off',
		},
	},
	{
		files: ['eslint.config.mjs'],
		rules: {
			'import/no-anonymous-default-export': 'off',
		},
	},
]
