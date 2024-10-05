import Link from 'next/link';

export default function NavButton({ href, children }) {
    return (
        <div className="m-2">
            <Link href={href} className='block bg-black text-white p-4 rounded-lg hover:bg-gray-800 transition-colors duration-300'>
                <div className="flex items-center justify-center">
                    {children}
                </div>
            </Link>
        </div>
    );
}