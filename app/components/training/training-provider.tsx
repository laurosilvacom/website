'use client'

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode
} from 'react'
import type {TrainingData, TrainingDiaryEntry} from '@/lib/training/types'
import {
	getDefaultTrainingData,
	loadTrainingData,
	saveTrainingData
} from '@/lib/training/storage'

type TrainingContextValue = {
	userEmail: string
	setUserEmail: (email: string) => void
	data: TrainingData
	setData: (updater: (prev: TrainingData) => TrainingData) => void
	upsertTdEntry: (entry: TrainingDiaryEntry) => void
	deleteTdEntry: (id: string) => void
}

const TrainingContext = createContext<TrainingContextValue | null>(null)

function getInitialUserEmail(): string {
	if (typeof window === 'undefined') return 'local'
	return window.localStorage.getItem('training:activeUser') || 'local'
}

export function TrainingProvider({children}: {children: ReactNode}) {
	const [userEmail, setUserEmailState] = useState(getInitialUserEmail)
	const [data, setDataState] = useState<TrainingData>(() => {
		if (typeof window === 'undefined') return getDefaultTrainingData()
		return loadTrainingData(userEmail)
	})

	useEffect(() => {
		setDataState(loadTrainingData(userEmail))
		window.localStorage.setItem('training:activeUser', userEmail)
	}, [userEmail])

	const setData = useCallback(
		(updater: (prev: TrainingData) => TrainingData) => {
			setDataState((prev) => {
				const next = updater(prev)
				saveTrainingData(userEmail, next)
				return next
			})
		},
		[userEmail]
	)

	const setUserEmail = useCallback((email: string) => {
		setUserEmailState(email.trim() || 'local')
	}, [])

	const upsertTdEntry = useCallback(
		(entry: TrainingDiaryEntry) => {
			setData((prev) => {
				const idx = prev.tdEntries.findIndex((e) => e.id === entry.id)
				const tdEntries = [...prev.tdEntries]
				if (idx >= 0) tdEntries[idx] = entry
				else tdEntries.push(entry)
				tdEntries.sort((a, b) =>
					a.date < b.date ? -1 : a.date > b.date ? 1 : 0
				)
				return {...prev, tdEntries}
			})
		},
		[setData]
	)

	const deleteTdEntry = useCallback(
		(id: string) => {
			setData((prev) => ({
				...prev,
				tdEntries: prev.tdEntries.filter((e) => e.id !== id)
			}))
		},
		[setData]
	)

	const value = useMemo<TrainingContextValue>(
		() => ({
			userEmail,
			setUserEmail,
			data,
			setData,
			upsertTdEntry,
			deleteTdEntry
		}),
		[userEmail, setUserEmail, data, setData, upsertTdEntry, deleteTdEntry]
	)

	return (
		<TrainingContext.Provider value={value}>
			{children}
		</TrainingContext.Provider>
	)
}

export function useTraining() {
	const ctx = useContext(TrainingContext)
	if (!ctx) throw new Error('useTraining must be used within TrainingProvider')
	return ctx
}
