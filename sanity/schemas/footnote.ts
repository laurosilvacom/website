import {defineField, defineType} from 'sanity'

export default defineType({
	name: 'footnote',
	title: 'Footnote',
	type: 'object',
	fields: [
		defineField({
			name: 'id',
			title: 'ID',
			type: 'string',
			description: 'Unique identifier for the footnote'
		}),
		defineField({
			name: 'content',
			title: 'Content',
			type: 'array',
			of: [
				{
					type: 'block',
					styles: [],
					lists: [],
					marks: {
						decorators: [
							{title: 'Strong', value: 'strong'},
							{title: 'Emphasis', value: 'em'},
							{title: 'Code', value: 'code'}
						],
						annotations: [
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
				}
			]
		})
	],
	preview: {
		select: {
			id: 'id',
			content: 'content'
		},
		prepare({id, content}) {
			const text = content?.[0]?.children?.[0]?.text || 'Empty footnote'
			return {
				title: `Footnote ${id || 'unnamed'}`,
				subtitle: text.substring(0, 50)
			}
		}
	}
})

