'use client'

import { VoteButtonProps } from '@/types/VoteButtonProps'

export default function VoteButton({
	isMyVote,
	hasVoted,
	onClick,
}: VoteButtonProps) {
	const getButtonText = () => {
		if (isMyVote) return 'You Voted'
		if (hasVoted) return 'You can vote only once'
		return 'Vote'
	}

	const getButtonClass = () => {
		if (isMyVote) return 'bg-green-500 text-white cursor-default'
		if (hasVoted) return 'bg-gray-400 text-white cursor-not-allowed'
		return 'bg-pink-600 hover:bg-pink-700 text-white'
	}

	return (
		<button
			onClick={onClick}
			disabled={hasVoted && !isMyVote}
			className={`px-5 py-2 rounded-md font-semibold transition-colors duration-200 ${getButtonClass()}`}
		>
			{getButtonText()}
		</button>
	)
}
