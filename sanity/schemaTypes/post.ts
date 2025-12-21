import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',

	fieldsets: [
		{
			name: 'media',
			title: 'Media',
			options: {collapsible: true, collapsed: false}
		}
	],

	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'publishedAt',
			type: 'datetime',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'summary',
			type: 'text',
			rows: 2,
			validation: (Rule) => Rule.required()
		}),

		defineField({
			name: 'heroImage',
			title: 'Hero image',
			type: 'image',
			fieldset: 'media',
			options: {hotspot: true},
			validation: (Rule) => Rule.required(),
			fields: [
				defineField({
					name: 'alt',
					type: 'string',
					validation: (Rule) => Rule.required()
				}),
				defineField({
					name: 'caption',
					type: 'string'
				})
			]
		}),

		defineField({
			name: 'content',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'block',
					marks: {
						annotations: [
							{
								name: 'footnote',
								type: 'object',
								title: 'Footnote Reference',
								fields: [
									{
										name: 'footnoteId',
										type: 'string',
										title: 'Footnote ID',
										description: 'ID of the footnote to reference'
									}
								]
							},
							{
								name: 'link',
								type: 'object',
								fields: [
									{
										name: 'href',
										type: 'url',
										title: 'URL'
									}
								]
							}
						]
					}
				}),

				defineArrayMember({type: 'code'}),

				defineArrayMember({
					type: 'image',
					options: {hotspot: true},
					fields: [
						defineField({
							name: 'alt',
							type: 'string',
							validation: (Rule) => Rule.required()
						}),
						defineField({
							name: 'caption',
							type: 'string'
						})
					]
				}),

				defineArrayMember({type: 'footnote'})
			]
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{type: 'string'}],
			options: {layout: 'tags'}
		}),
		defineField({
			name: 'draft',
			title: 'Draft',
			type: 'boolean',
			initialValue: false
		})
	],

	preview: {
		select: {
			title: 'title',
			media: 'heroImage'
		},
		prepare({title, media}) {
			return {title, media}
		}
	}
})
