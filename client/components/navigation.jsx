import Link from 'next/link';
import Image from 'next/image';

import { BadgePlus, Search } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

export default function Navigation() {
  return (
    <nav className="sticky top-0 w-full flex justify-between items-center p-4 shadow-md z-50 bg-black/20 backdrop-blur-lg rounded-b-xl">
      <div className="m-2">
        <Link href="/" className='block p-2'>
          <div className="flex items-center justify-center">
            <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
          </div>
        </Link>
      </div>
      <div className="flex items-center">
        <input className="resize-none w-64 h-12 rounded-full stroke-none m-2 p-4 bg-black/20" placeholder="Search for produce here:" />
        <div className="m-2">
          <Link href="/create" className='block bg-black/20 text-white p-2 rounded-full hover:bg-black/60 transition-colors duration-300'>
            <div className="flex items-center justify-center">
              <BadgePlus className="h-8 w-8" />
            </div>
          </Link>
        </div>
        <div className="m-2">
          <Link href="/browse" className='block bg-black/20 text-white p-2 rounded-full hover:bg-black/60 transition-colors duration-300'>
            <div className="flex items-center justify-center">
              <Search className="h-8 w-8" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}