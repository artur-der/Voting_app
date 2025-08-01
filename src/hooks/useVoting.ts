import { useState, useEffect } from 'react'

export const useVoting = () => {
	const [votedCandidateId, setVotedCandidateId] = useState<number | null>(null)

	useEffect(() => {
		const storedId = localStorage.getItem('votedCandidate')
		if (storedId) {
			setVotedCandidateId(Number(storedId))
		}
	}, [])

	const vote = async (id: number) => {
		const res = await fetch('/api/vote', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ candidateId: id }),
		})
		if (!res.ok) throw new Error('Failed to vote')
		localStorage.setItem('votedCandidate', id.toString())
		setVotedCandidateId(id)
		return await res.json()
	}

	return { votedCandidateId, vote }
}
