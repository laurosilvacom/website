'use client'

import React, {useState, useEffect, useRef, useCallback} from 'react'
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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/tooltip'
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

	const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '')
	const [selectedTag, setSelectedTag] = useState(
		searchParams.get('tag') || 'all'
	)
	const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance')
	const [isSearchFocused, setIsSearchFocused] = useState(false)

	// Check if filters are active
	const hasActiveFilters =
		searchTerm || selectedTag !== 'all' || sortBy !== 'relevance'

	// Update search parameters and navigate - using useCallback to memoize
	const updateSearchParams = useCallback(
		(params: Record<string, string | null>) => {
			const newParams = new URLSearchParams(searchParams.toString())

			Object.entries(params).forEach(([key, value]) => {
				if (
					value &&
					((key === 'sort' && value !== 'relevance') || value !== 'all')
				) {
					newParams.set(key, value)
				} else {
					newParams.delete(key)
				}
			})

			// Create the new URL - if no params, just use the pathname
			const newUrl = newParams.toString()
				? `${pathname}?${newParams.toString()}`
				: pathname

			router.push(newUrl)
		},
		[searchParams, pathname, router]
	)

	// Handle search input changes
	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setSearchTerm(newValue)
	}

	// Apply search when user stops typing
	useEffect(() => {
		const timer = setTimeout(() => {
			updateSearchParams({q: searchTerm || null})
		}, 300)

		return () => clearTimeout(timer)
	}, [searchTerm, updateSearchParams])

	// Clear all filters
	const clearAllFilters = () => {
		setSearchTerm('')
		setSelectedTag('all')
		setSortBy('relevance')
		router.push(pathname)

		// Focus the search input after clearing
		if (searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}

	// Clear search input only
	const clearSearch = () => {
		setSearchTerm('')
		updateSearchParams({q: null})

		// Focus the search input after clearing
		if (searchInputRef.current) {
			searchInputRef.current.focus()
		}
	}

	// Keep state in sync with URL
	useEffect(() => {
		setSearchTerm(searchParams.get('q') || '')
		setSelectedTag(searchParams.get('tag') || 'all')
		setSortBy(searchParams.get('sort') || 'relevance')
	}, [searchParams])

	return (
		<div className="space-y-4">
			<div className="mb-4 flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
				{/* Search input with clear button - USING TEXT TYPE INSTEAD OF SEARCH */}
				<div className="relative flex-grow">
					<div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
						<SearchIcon
							className="text-muted-foreground h-4 w-4"
							aria-hidden="true"
						/>
					</div>

					<Input
						ref={searchInputRef}
						type="text" // Changed from "search" to "text" to avoid double 'X'
						placeholder="Search articles..."
						value={searchTerm}
						onChange={handleSearchChange}
						onFocus={() => setIsSearchFocused(true)}
						onBlur={() => setIsSearchFocused(false)}
						className={`pr-10 pl-10 ${isSearchFocused ? 'ring-primary ring-2' : ''}`}
						aria-label="Search articles"
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

				{/* Tags filter */}
				<Select
					value={selectedTag}
					onValueChange={(value) => {
						setSelectedTag(value)
						updateSearchParams({tag: value})
					}}>
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

				{/* Sort options */}
				<Select
					value={sortBy}
					onValueChange={(value) => {
						setSortBy(value)
						updateSearchParams({sort: value})
					}}>
					<SelectTrigger className="w-[180px]" aria-label="Sort articles">
						<SelectValue placeholder="Sort by Relevance" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="relevance">Sort by Relevance</SelectItem>
						<SelectItem value="newest">Sort by Newest</SelectItem>
					</SelectContent>
				</Select>

				{/* RSS button with tooltip */}
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button variant="outline" size="icon" asChild>
								<a href="/blog/rss.xml" aria-label="RSS Feed">
									<RssIcon className="h-4 w-4" />
									<VisuallyHidden>RSS Feed</VisuallyHidden>
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>Subscribe via RSS</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			{/* Active filters summary */}
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
								<span>&ldquo;{searchTerm}&rdquo;</span>
								<button
									onClick={clearSearch}
									className="hover:text-foreground focus:ring-primary ml-1 rounded-full focus:ring-2 focus:outline-none"
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
									className="hover:text-foreground focus:ring-primary ml-1 rounded-full focus:ring-2 focus:outline-none"
									aria-label={`Remove tag filter ${selectedTag}`}>
									<XCircleIcon className="h-3.5 w-3.5" />
								</button>
							</Badge>
						)}

						{sortBy !== 'relevance' && (
							<Badge variant="outline" className="flex items-center gap-1">
								<span>Sorted by {sortBy}</span>
								<button
									onClick={() => {
										setSortBy('relevance')
										updateSearchParams({sort: null})
									}}
									className="hover:text-foreground focus:ring-primary ml-1 rounded-full focus:ring-2 focus:outline-none"
									aria-label="Remove sort preference">
									<XCircleIcon className="h-3.5 w-3.5" />
								</button>
							</Badge>
						)}

						<Button
							variant="ghost"
							size="sm"
							onClick={clearAllFilters}
							className="h-8 text-sm font-normal">
							Clear all
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
