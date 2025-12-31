import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
	name: 'module',
	title: 'Module',
	type: 'document',

	fieldsets: [
		{
			name: 'media',
			title: 'Media',
			options: {collapsible: true, collapsed: false}
		},
		{
			name: 'landing',
			title: 'Landing Page',
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
			name: 'shortDescription',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required()
		}),
		defineField({
			name: 'wipLandingPageDescription',
			title: 'WIP Landing Page Description',
			type: 'array',
			fieldset: 'landing',
			of: [
				defineArrayMember({
					type: 'block',
					marks: {
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
				})
			]
		}),
		defineField({
			name: 'contributors',
			title: 'Contributors',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'object',
					name: 'contributorData',
					fields: [
						defineField({
							name: 'contributor',
							type: 'reference',
							to: [{type: 'contributor'}],
							validation: (Rule) => Rule.required()
						})
					],
					preview: {
						select: {
							title: 'contributor.name',
							media: 'contributor.picture'
						},
						prepare({title, media}) {
							return {title, media}
						}
					}
				})
			]
		}),
		defineField({
			name: 'audience',
			title: 'Audience',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{type: 'audience'}]
				})
			]
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			fieldset: 'media',
			options: {
				hotspot: true
			}
		}),
		defineField({
			name: 'resendAudienceId',
			title: 'Resend Audience ID',
			type: 'string',
			fieldset: 'landing',
			description:
				"The Resend audience ID for this workshop's newsletter subscribers"
		})
	],

	preview: {
		select: {
			title: 'title',
			media: 'image'
		},
		prepare({title, media}) {
			return {title, media}
		}
	}
})
