'use client'

import {Input} from '@/components/ui/input'
import {Button} from '@/components/ui/button'
import {useTraining} from './training-provider'

const DEMO_USER_EMAIL = 'demo@local'
const MY_USER_KEY = 'training:myUser'

export function AccountBar() {
	const {userEmail, setUserEmail} = useTraining()

	const isDemo = userEmail.trim().toLowerCase() === DEMO_USER_EMAIL

	const goDemo = () => {
		if (!isDemo) window.localStorage.setItem(MY_USER_KEY, userEmail)
		setUserEmail(DEMO_USER_EMAIL)
	}

	const goMy = () => {
		const my = window.localStorage.getItem(MY_USER_KEY) || 'local'
		setUserEmail(my)
	}

	return (
		<div className="flex flex-wrap items-center justify-between gap-3">
			<div className="text-sm font-medium">Training</div>
			<div className="flex items-center gap-2">
				<Button
					variant={isDemo ? 'outline' : 'default'}
					size="sm"
					onClick={goMy}
					className="h-9">
					My
				</Button>
				<Button
					variant={isDemo ? 'default' : 'outline'}
					size="sm"
					onClick={goDemo}
					className="h-9">
					Demo
				</Button>
				<span className="text-muted-foreground text-sm">Account</span>
				<Input
					value={userEmail}
					onChange={(e) => setUserEmail(e.target.value)}
					placeholder="email (local)"
					className="h-9 w-60"
				/>
			</div>
		</div>
	)
}
