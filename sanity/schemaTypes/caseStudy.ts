import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
	name: 'caseStudy',
	title: 'Case Study',
	type: 'document',

	fields: [
		defineField({
			name: 'client',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {
				source: 'client',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'type',
			title: 'Project Type',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'domain',
			title: 'Domain',
			type: 'string',
			description: 'e.g. google.com — used for favicon display',
		}),
		defineField({
			name: 'tags',
			type: 'array',
			of: [{type: 'string'}],
			options: {layout: 'tags'},
		}),
		defineField({
			name: 'challenge',
			title: 'Challenge',
			type: 'array',
			of: [defineArrayMember({type: 'text', rows: 4})],
		}),
		defineField({
			name: 'approach',
			title: 'Approach',
			type: 'array',
			of: [defineArrayMember({type: 'text', rows: 4})],
		}),
		defineField({
			name: 'outcome',
			title: 'Outcome',
			type: 'array',
			of: [defineArrayMember({type: 'text', rows: 4})],
		}),
		defineField({
			name: 'techStack',
			title: 'Tech Stack',
			type: 'array',
			of: [{type: 'string'}],
			options: {layout: 'tags'},
		}),
		defineField({
			name: 'testimonial',
			title: 'Testimonial',
			type: 'object',
			fields: [
				defineField({
					name: 'quote',
					type: 'text',
					rows: 3,
				}),
				defineField({
					name: 'name',
					type: 'string',
				}),
				defineField({
					name: 'title',
					type: 'string',
				}),
				defineField({
					name: 'image',
					type: 'image',
					options: {hotspot: true},
				}),
			],
		}),
		defineField({
			name: 'order',
			title: 'Sort Order',
			type: 'number',
			description: 'Lower numbers appear first',
		}),
	],

	preview: {
		select: {
			title: 'client',
			subtitle: 'title',
		},
		prepare({title, subtitle}) {
			return {title, subtitle}
		},
	},
})
