export interface CandidateProps {
	id: number
	name: string
	country: string
	image: string
	votes: number

	votedCandidateId: number | null
	onVote: (id: number) => void
}
