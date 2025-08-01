import { NextRequest, NextResponse } from 'next/server'

const API_URL = 'http://localhost:3001/candidates'

export async function POST(request: NextRequest) {
	try {
		const { candidateId } = await request.json()

		if (typeof candidateId !== 'number' || isNaN(candidateId)) {
			return NextResponse.json(
				{ error: 'Invalid or missing candidateId' },
				{ status: 400 }
			)
		}

		const candidateRes = await fetch(`${API_URL}/${candidateId}`)
		if (!candidateRes.ok) {
			return NextResponse.json(
				{ error: 'Candidate not found' },
				{ status: 404 }
			)
		}

		const candidate = await candidateRes.json()

		const updatedCandidate = { ...candidate, votes: candidate.votes + 1 }

		const updateRes = await fetch(`${API_URL}/${candidateId}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(updatedCandidate),
		})

		if (!updateRes.ok) {
			return NextResponse.json(
				{ error: 'Failed to update votes' },
				{ status: 500 }
			)
		}

		const data = await updateRes.json()

		return NextResponse.json(data)
	} catch {
		return NextResponse.json(
			{ error: 'Internal Server Error' },
			{ status: 500 }
		)
	}
}
