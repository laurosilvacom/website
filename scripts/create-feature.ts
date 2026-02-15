import {existsSync, mkdirSync, writeFileSync} from 'node:fs'
import {join} from 'node:path'

function toKebabCase(value: string) {
	return value
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.replace(/\s+/g, '-')
		.replace(/-+/g, '-')
}

function toPascalCase(value: string) {
	return value
		.split('-')
		.filter(Boolean)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('')
}

const inputName = process.argv[2]

if (!inputName) {
	console.error('Usage: pnpm feature:new <feature-name>')
	process.exit(1)
}

const featureName = toKebabCase(inputName)

if (!featureName) {
	console.error('Feature name must contain letters or numbers.')
	process.exit(1)
}

const featureDir = join(process.cwd(), 'app', 'features', featureName)

if (existsSync(featureDir)) {
	console.error(`Feature "${featureName}" already exists.`)
	process.exit(1)
}

const serverDir = join(featureDir, 'server')
const componentsDir = join(featureDir, 'components')

mkdirSync(serverDir, {recursive: true})
mkdirSync(componentsDir, {recursive: true})

const featureTypeName = toPascalCase(featureName)

writeFileSync(
	join(serverDir, 'index.ts'),
	[
		`export type ${featureTypeName}Id = string`,
		'',
		`export const FEATURE_ID = '${featureName}'`,
		'',
	].join('\n'),
)

writeFileSync(join(componentsDir, 'index.ts'), ['export {}', ''].join('\n'))

writeFileSync(
	join(featureDir, 'README.md'),
	[
		`# ${featureTypeName} Feature`,
		'',
		'## Structure',
		'',
		'- `server/` for domain logic and data access',
		'- `components/` for feature-specific UI',
		'',
	].join('\n'),
)

console.log(`Created app/features/${featureName}`)
