'use client'

import {useState, useEffect, useRef, useTransition} from 'react'
import {usePathname, useRouter, useSearchParams} from 'next/navigation'
import {Input} from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {Button} from '@/components/ui/button'
import {RssIcon, SearchIcon, XCircleIcon} from 'lucide-react'
import {Badge} from '@/components/ui/badge'
import {VisuallyHidden} from '@/components/ui/visually-hidden'

interface BlogSearchProps {
	allTags: string[]
	totalPosts: number
	filteredCount: number
}

export function BlogSearch({
	allTags,
	totalPosts,
	filteredCount
}: BlogSearchProps) {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const searchInputRef = useRef<HTMLInputElement>(null)
	const [isPending, startTransition] = useTransition()

	const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
	const [selectedTag, setSelectedTag] = useState(
		searchParams.get('tag') || 'all'
	)
	const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance')

	const hasActiveFilters =
		searchTerm || selectedTag !== 'all' || sortBy !== 'relevance'

	const updateSearchParams = (params: Record<string, string | null>) => {
		const newParams = new URLSearchParams(searchParams.toString())

		for (const [key, value] of Object.entries(params)) {
			if (
				value &&
				((key === 'sort' && value !== 'relevance') || value !== 'all')
			) {
				newParams.set(key, value)
			} else {
				newParams.delete(key)
			}
		}

		const newUrl = newParams.toString()
			? `${pathname}?${newParams.toString()}`
			: pathname

		startTransition(() => {
			router.push(newUrl)
		})
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			updateSearchParams({q: searchTerm || null})
		}, 300)

		return () => clearTimeout(timer)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchTerm])

	const clearAllFilters = () => {
		setSearchTerm('')
		setSelectedTag('all')
		setSortBy('relevance')
		startTransition(() => {
			router.push(pathname)
		})
		searchInputRef.current?.focus()
	}

	const clearSearch = () => {
		setSearchTerm('')
		updateSearchParams({q: null})
		searchInputRef.current?.focus()
	}

	useEffect(() => {
		setSearchTerm(searchParams.get('q') || '')
		setSelectedTag(searchParams.get('tag') || 'all')
		setSortBy(searchParams.get('sort') || 'relevance')
	}, [searchParams])

	return (
		<div className="space-y-4">
			<div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
				<div className="relative flex-grow">
					<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
						<SearchIcon className="text-muted-foreground h-4 w-4" aria-hidden="true" />
					</div>
					<Input
						ref={searchInputRef}
						type="text"
						placeholder="Search articles..."
						value={searchTerm}
						onChange={handleSearchChange}
						className="pl-10 pr-10"
						aria-label="Search articles"
						disabled={isPending}
					/>
					{searchTerm && (
						<button
							onClick={clearSearch}
							className="text-muted-foreground hover:text-foreground absolute inset-y-0 right-2 flex items-center"
							aria-label="Clear search">
							<XCircleIcon className="h-5 w-5" />
						</button>
					)}
				</div>

				<Select
					value={selectedTag}
					onValueChange={(value) => {
						setSelectedTag(value)
						updateSearchParams({tag: value})
					}}
					disabled={isPending}>
					<SelectTrigger className="w-[150px]" aria-label="Filter by tag">
						<SelectValue placeholder="Tags..." />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All Tags</SelectItem>
						{allTags.map((tag) => (
							<SelectItem key={tag} value={tag}>
								{tag}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select
					value={sortBy}
					onValueChange={(value) => {
						setSortBy(value)
						updateSearchParams({sort: value})
					}}
					disabled={isPending}>
					<SelectTrigger className="w-[180px]" aria-label="Sort articles">
						<SelectValue placeholder="Sort by Relevance" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="relevance">Sort by Relevance</SelectItem>
						<SelectItem value="newest">Sort by Newest</SelectItem>
					</SelectContent>
				</Select>

				<Button variant="outline" size="icon" asChild>
					<a href="/blog/rss.xml" aria-label="RSS Feed">
						<RssIcon className="h-4 w-4" />
						<VisuallyHidden>RSS Feed</VisuallyHidden>
					</a>
				</Button>
			</div>

			<div className="flex items-center justify-between">
				<div className="text-muted-foreground text-sm">
					{filteredCount === totalPosts ? (
						<span>Showing all {totalPosts} posts</span>
					) : (
						<span>
							Showing {filteredCount} of {totalPosts} posts
						</span>
					)}
				</div>

				{hasActiveFilters && (
					<div className="flex items-center space-x-2">
						{searchTerm && (
							<Badge variant="outline" className="flex items-center gap-1">
								<span>{searchTerm}</span>
								<button
									onClick={clearSearch}
									aria-label={`Remove search for ${searchTerm}`}>
									<XCircleIcon className="h-3.5 w-3.5" />
								</button>
							</Badge>
						)}

						{selectedTag !== 'all' && (
							<Badge variant="outline" className="flex items-center gap-1">
								<span>{selectedTag}</span>
								<button
									onClick={() => {
										setSelectedTag('all')
										updateSearchParams({tag: null})
									}}
									aria-label={`Remove tag filter ${selectedTag}`}>
									<XCircleIcon className="h-3.5 w-3.5" />
								</button>
							</Badge>
						)}

						{sortBy !== 'relevance' && (
							<Badge variant="outline" className="flex items-center gap-1">
								<span>{sortBy}</span>
								<button
									onClick={() => {
										setSortBy('relevance')
										updateSearchParams({sort: null})
									}}
									aria-label="Remove sort preference">
									<XCircleIcon className="h-3.5 w-3.5" />
								</button>
							</Badge>
						)}

						<Button
							variant="outline"
							size="sm"
							onClick={clearAllFilters}
							disabled={isPending}>
							Clear all
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
