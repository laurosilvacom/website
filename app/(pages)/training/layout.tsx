'use client'

import type {ReactNode} from 'react'
import Container from '@/components/container'
import {TrainingProvider} from '@/components/training/training-provider'
import {AccountBar} from '@/components/training/account-bar'
import {TrainingSubnav} from '@/components/training/training-subnav'

export default function TrainingLayout({children}: {children: ReactNode}) {
	return (
		<TrainingProvider>
			<section className="pt-24 pb-8 lg:pt-32">
				<Container width="wide" className="space-y-4">
					<AccountBar />
					<TrainingSubnav />
				</Container>
			</section>
			<section className="pb-24">
				<Container width="wide">{children}</Container>
			</section>
		</TrainingProvider>
	)
}
