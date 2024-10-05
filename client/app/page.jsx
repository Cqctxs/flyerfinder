import Navigation from "@/components/navigation";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="w-full h-screen flex flex-col">
        <Image src="/images/farm.png" alt="Cover Image" fill={true} className="absolute top-0 left-0 w-full h-full bg-cover -z-10" />
        <div className="flex flex-col flex-grow relative items-center justify-center">
          <div className="font-advercase text-9xl p-10 bg-black/20 backdrop-blur-lg rounded-3xl text-white/70 -translate-y-16">
            Flyer Finder
            <div className="text-4xl mt-4 text-center">Find the best deals in your area</div>
          </div>
        </div>
      </div>
      <div className='h-screen w-full'>
        <div className="font-advercase text-5xl p-10 text-center">
          Flyer Finder is your one-stop shop for local deals and digital flyers. Say goodbye to paper clutter and hello to a more sustainable way to find savings!
          <div className="font-sans text-4xl mt-10 text-left ml-10">
            With Flyer Finder, you can:
          </div>
          <ul className="font-sans list-disc list-inside text-2xl mt-4 text-left ml-14">
            <li>Browse digital flyers: Easily access flyers from your favorite local businesses, all in one place.</li>
            <li>Discover exclusive deals: Uncover hidden gems and special offers you won't find anywhere else.</li>
            <li>Save paper, save trees: Reduce your environmental impact by choosing digital flyers.</li>
            <li>Enjoy secure and verifiable flyers: Our blockchain technology ensures flyers are authentic and tamper-proof.</li>
            <li>Support local businesses: Connect with businesses in your community and discover new places to shop.</li>
          </ul>
          <div className="text-5xl mt-10">
            Use Flyer Finder today and start exploring a world of savings while helping the planet!
          </div>
        </div>
      </div>
    </>
  );
}