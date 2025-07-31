'use client'
import ErrorMessage from '@/components/ErrorMessage'
import Candidate from '@/components/Candidate'
import Loading from '@/components/Loading'
import { useEffect, useState } from 'react'

export interface CandidateType {
	id: number
	name: string
	country: string
	image: string
	votes: number
}

export default function Home() {
	const [candidates, setCandidates] = useState<CandidateType[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('http://localhost:3001/candidates')
				if (!res.ok) throw new Error('Failed to fetch candidates')
				const data = await res.json()
				setCandidates(data)
			} catch {
				setError('Unknown error')
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	if (loading) return <Loading />
	if (error) return <ErrorMessage message={error} />

	return (
		<main className='p-6 max-w-7xl mx-auto'>
			<h1 className='text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse uppercase tracking-widest'>
				Vote for Candidate
			</h1>
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{candidates.map(candidate => (
					<Candidate key={candidate.id} {...candidate} />
				))}
			</div>
		</main>
	)
}
