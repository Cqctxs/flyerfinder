import NavButton from "@/public/components/navbutton";
import Image from "next/image";
import Link from "next/link";
import { BadgePlus, Search } from 'lucide-react';

export default function Home() {
  return (
    <>
      <nav className="sticky top-0 w-full flex justify-between items-center p-4 shadow-md z-50 bg-black/20 backdrop-blur-lg rounded-xl">
        <div className="m-2">
          <Link href="/" className='block p-2'>
            <div className="flex items-center justify-center">
              <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
            </div>
          </Link>
        </div>
        <div className="flex justify-normal">
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
      <div className="w-full h-screen flex flex-col">
        <Image src="/images/farm.png" alt="Cover Image" fill={true} className="absolute top-0 left-0 w-full h-full bg-cover -z-10" />
        <div className="flex flex-col flex-grow relative items-center justify-center">
          <div className="font-advercase text-9xl p-10 bg-black/20 backdrop-blur-lg rounded-3xl text-white/70 -translate-y-16">
            Flyer Finder
            <div className="text-4xl mt-4 text-center">Find the best deals in your area</div>
          </div>
        </div>
      </div>
      <div className="w-full h-screen flex flex-col">
        <Image src="/images/farm.png" alt="Cover Image" fill={true} className="absolute top-0 left-0 w-full h-full bg-cover -z-10" />
        <div className="flex flex-col flex-grow relative items-center justify-center">
          <div className="font-advercase text-9xl p-10 bg-black/20 backdrop-blur-lg rounded-3xl text-white/70">Flyer Finder</div>
        </div>
      </div>
    </>
  );
}