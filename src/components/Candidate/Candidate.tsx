'use client'

import { CandidateProps } from '@/types/Candidate'
import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function Candidate({
	id,
	name,
	country,
	image,
	votes,
}: CandidateProps) {
	const [hasVoted, setHasVoted] = useState(false)
	const [localVotes, setLocalVotes] = useState(votes)

	useEffect(() => {
		const votedCandidates = JSON.parse(
			localStorage.getItem('votedCandidates') || '[]'
		)
		setHasVoted(votedCandidates.includes(id))
	}, [id])

	const handleVote = () => {
		if (hasVoted) return

		setLocalVotes(localVotes + 1)
		setHasVoted(true)

		const votedCandidates = JSON.parse(
			localStorage.getItem('votedCandidates') || '[]'
		)
		localStorage.setItem(
			'votedCandidates',
			JSON.stringify([...votedCandidates, id])
		)
	}

	return (
		<div className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center transition-transform transform hover:scale-105 duration-300'>
			<div className='relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-pink-500 mb-4'>
				<Image
					src={image}
					alt={name}
					fill
					style={{ objectFit: 'cover' }}
					sizes='(max-width: 640px) 112px, 128px'
					priority
				/>
			</div>
			<h2 className='text-lg sm:text-xl font-semibold text-gray-800'>{name}</h2>
			<p className='text-gray-500 mb-2'>{country}</p>
			<p className='text-md sm:text-lg font-bold text-pink-600 mb-4'>
				Votes: {localVotes}
			</p>
			<button
				onClick={handleVote}
				disabled={hasVoted}
				className={`px-5 py-2 rounded-md font-semibold transition-colors duration-200 ${
					hasVoted
						? 'bg-gray-400 cursor-not-allowed'
						: 'bg-pink-600 hover:bg-pink-700 text-white'
				}`}
			>
				{hasVoted ? 'Voted' : 'Vote'}
			</button>
		</div>
	)
}
