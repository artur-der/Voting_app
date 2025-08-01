'use client'

import Image from 'next/image'
import { CandidateProps } from '@/types/Candidate'
import VoteButton from '../VoteButton'

export default function Candidate({
	id,
	name,
	country,
	image,
	votes,
	votedCandidateId,
	onVote,
}: CandidateProps) {
	const isMyVote = votedCandidateId === id
	const hasVoted = votedCandidateId !== null

	const handleVote = () => {
		if (!hasVoted) {
			onVote(id)
		}
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
				Votes: {votes}
			</p>

			<VoteButton
				isMyVote={isMyVote}
				hasVoted={hasVoted}
				onClick={handleVote}
			/>
		</div>
	)
}
