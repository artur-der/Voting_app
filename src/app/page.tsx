'use client'

import ErrorMessage from '@/components/ErrorMessage'
import Candidate from '@/components/Candidate'
import Loading from '@/components/Loading'
import { useEffect, useState } from 'react'
import { CandidateProps } from '@/types/Candidate'

export default function Home() {
	const [candidates, setCandidates] = useState<CandidateProps[]>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [votedCandidateId, setVotedCandidateId] = useState<number | null>(null)

	useEffect(() => {
		const fetchCandidates = async () => {
			try {
				const res = await fetch('http://localhost:3001/candidates')
				if (!res.ok) throw new Error('Failed to fetch candidates')

				const data: CandidateProps[] = await res.json()
				const sorted = data.sort((a, b) => b.votes - a.votes)
				setCandidates(sorted)

				const storedId = localStorage.getItem('votedCandidate')
				if (storedId) {
					const parsedId = Number(storedId)
					if (!isNaN(parsedId) && sorted.some(c => c.id === parsedId)) {
						setVotedCandidateId(parsedId)
					}
				}
			} catch {
				setError('Unknown error')
			} finally {
				setLoading(false)
			}
		}

		fetchCandidates()
		const interval = setInterval(fetchCandidates, 5000)

		return () => clearInterval(interval)
	}, [])

	const handleVote = async (id: number) => {
		if (votedCandidateId !== null) return

		try {
			const res = await fetch('/api/vote', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ candidateId: Number(id) }),
			})

			if (!res.ok) throw new Error('Failed to vote')

			const updatedCandidate = await res.json()

			setCandidates(prev =>
				prev
					.map(c => (c.id === id ? updatedCandidate : c))
					.sort((a, b) => b.votes - a.votes)
			)
			setVotedCandidateId(id)
			localStorage.setItem('votedCandidate', id.toString())
		} catch {
			alert('Помилка голосування')
		}
	}

	if (loading) return <Loading />
	if (error) return <ErrorMessage message={error} />

	return (
		<main className='p-6 max-w-7xl mx-auto'>
			<h1 className='text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-600 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg animate-pulse uppercase tracking-widest'>
				Vote for Candidate
			</h1>

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
				{candidates.map(candidate => (
					<Candidate
						key={candidate.id}
						{...candidate}
						votedCandidateId={votedCandidateId}
						onVote={handleVote}
					/>
				))}
			</div>
		</main>
	)
}
