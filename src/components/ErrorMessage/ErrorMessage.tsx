import { ErrorProps } from '@/types/ErrorMessage'

export default function Error({ message }: ErrorProps) {
	return <p className='text-center mt-10 text-red-600'>Error: {message}</p>
}
