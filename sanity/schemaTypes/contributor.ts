import {defineField, defineType} from 'sanity'

export default defineType({
	name: 'contributor',
	title: 'Contributor',
	type: 'document',

	fields: [
		defineField({
			name: 'name',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'picture',
			title: 'Picture',
			type: 'image',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'bio',
			type: 'text',
			rows: 3
		})
	],

	preview: {
		select: {
			title: 'name',
			media: 'picture'
		},
		prepare({title, media}) {
			return {title, media}
		}
	}
})
