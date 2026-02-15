import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
	name: 'module',
	title: 'Module',
	type: 'document',

	fieldsets: [
		{
			name: 'media',
			title: 'Media',
			options: {collapsible: true, collapsed: false},
		},
		{
			name: 'landing',
			title: 'Landing Page',
			options: {collapsible: true, collapsed: false},
		},
	],

	fields: [
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'shortDescription',
			type: 'text',
			rows: 3,
			validation: (Rule) => Rule.required(),
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
										title: 'URL',
									},
								],
							},
						],
					},
				}),
			],
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
							validation: (Rule) => Rule.required(),
						}),
					],
					preview: {
						select: {
							title: 'contributor.name',
							media: 'contributor.picture',
						},
						prepare({title, media}) {
							return {title, media}
						},
					},
				}),
			],
		}),
		defineField({
			name: 'audience',
			title: 'Audience',
			type: 'array',
			of: [
				defineArrayMember({
					type: 'reference',
					to: [{type: 'audience'}],
				}),
			],
		}),
		defineField({
			name: 'image',
			title: 'Image',
			type: 'image',
			fieldset: 'media',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'resendAudienceId',
			title: 'Resend Audience ID',
			type: 'string',
			fieldset: 'landing',
			description: "The Resend audience ID for this workshop's newsletter subscribers",
		}),
		defineField({
			name: 'testSequence',
			title: 'Test drip sequence',
			type: 'boolean',
			fieldset: 'landing',
			description:
				'When on, new signups receive the email sequence every minute instead of daily. Turn off for production.',
			initialValue: false,
		}),
		defineField({
			name: 'emailLessons',
			title: 'Email Drip Sequence',
			type: 'array',
			fieldset: 'landing',
			description:
				'Ordered lessons to drip after signup. Default cadence sends one per day in this order.',
			of: [
				defineArrayMember({
					name: 'emailLesson',
					type: 'object',
					fields: [
						defineField({
							name: 'post',
							title: 'Post',
							type: 'reference',
							to: [{type: 'post'}],
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'subject',
							type: 'string',
							description: 'Optional subject override for the email send',
						}),
						defineField({
							name: 'preheader',
							type: 'string',
							description: 'Optional preheader / preview text',
						}),
						defineField({
							name: 'sendOffsetDays',
							title: 'Send offset (days)',
							type: 'number',
							description:
								'Days after signup to send. Leave blank to use position-based cadence.',
							validation: (Rule) => Rule.min(0).max(60),
						}),
					],
					preview: {
						select: {
							title: 'subject',
							postTitle: 'post.title',
							offset: 'sendOffsetDays',
						},
						prepare({title, postTitle, offset}) {
							return {
								title: title || postTitle,
								subtitle:
									typeof offset === 'number' ? `Send +${offset}d` : 'Default cadence',
							}
						},
					},
				}),
			],
		}),
	],

	preview: {
		select: {
			title: 'title',
			media: 'image',
		},
		prepare({title, media}) {
			return {title, media}
		},
	},
})
