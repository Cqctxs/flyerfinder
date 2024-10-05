"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {

  return (
    <>
    <div className="w-full h-screen flex flex-col">

      <Image src="/farm.png" alt="Cover Image" fill={true} className="absolute top-0 left-0 w-full h-full bg-cover -z-10" />
      <div
        className="flex flex-col flex-grow relative items-center justify-center"
      >
        <div className="font-advercase text-9xl p-10 bg-black/20 backdrop-blur-lg rounded-3xl text-white/70">Flyer Finder</div>
      </div>
    </div>
    <div className="w-full h-screen flex flex-col">
      
    <Image src="/farm.png" alt="Cover Image" fill={true} className="absolute top-0 left-0 w-full h-full bg-cover -z-10" />
    <div
      className="flex flex-col flex-grow relative items-center justify-center"
    >
      <div className="font-advercase text-9xl p-10 bg-black/20 backdrop-blur-lg rounded-3xl text-white/70">Flyer Finder</div>
    </div>
  </div>
  </>
  );
}