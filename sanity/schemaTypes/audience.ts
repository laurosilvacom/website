import {defineField, defineType} from 'sanity'

export default defineType({
	name: 'audience',
	title: 'Audience',
	type: 'document',

	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'description',
			type: 'text',
			rows: 2,
		}),
	],

	preview: {
		select: {
			title: 'title',
		},
		prepare({title}) {
			return {title}
		},
	},
})
