import {defineField, defineType} from 'sanity'

export default defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96
			},
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'publishedAt',
			title: 'Published at',
			type: 'datetime',
			initialValue: () => new Date().toISOString(),
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'summary',
			title: 'Summary',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{
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
				},
				{
					type: 'image',
					fields: [
						{
							name: 'alt',
							type: 'string',
							title: 'Alternative text'
						}
					]
				},
				{
					type: 'code'
				},
				{
					type: 'footnote'
				}
			]
		}),
		defineField({
			name: 'tags',
			title: 'Tags',
			type: 'array',
			of: [{type: 'string'}],
			options: {
				layout: 'tags'
			}
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
			publishedAt: 'publishedAt'
		},
		prepare({title, publishedAt}) {
			return {
				title,
				subtitle: publishedAt
					? new Date(publishedAt).toLocaleDateString()
					: 'No publish date'
			}
		}
	}
})
