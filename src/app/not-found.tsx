import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='max-w-7xl text-center mx-auto space-y-10 space-x-5'>
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Link href="/" className='border-orange-600 border text-white bg-orange-300 rounded-md px-2 py-1'>Return Home</Link>
        </div>
    )
}