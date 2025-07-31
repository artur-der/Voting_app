export default function Loading() {
	return (
		<div className='flex items-center justify-center h-40 flex-col'>
			<div className='w-10 h-10 border-4 border-pink-500 border-t-transparent rounded-full animate-spin'></div>
			<p className='mt-3 text-pink-600 font-medium uppercase tracking-wide'>
				Loading candidates...
			</p>
		</div>
	)
}
