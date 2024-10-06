'use client';

import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import { format } from 'date-fns';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone } from "lucide-react";

import { useState } from "react";

export default function Flyer({ params }) {
  const [index, setIndex] = useState(0)

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % flyerData.flyer.length)
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + flyerData.flyer.length) % flyerData.flyer.length)
  }

  const fetchFlyer = async () => {
    const res = await fetch(
      `https://api.findflyerswith.us/flyer/${params.slug}`
    );
    return res.json();
  };

  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["flyerByID"],
    queryFn: fetchFlyer,
  });

  const flyerData = response?.flyer;
  console.log(JSON.stringify(flyerData));

  if (isLoading) {
    return (
      <div>
        <Navigation />
        <p className="flex justify-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navigation />
        <p>Error loading flyer data.</p>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      {flyerData && (
        <div className="container mx-auto p-4">
          <Card className="w-full max-w-5xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-5xl font-advercaseBold">{flyerData.seller.store}</CardTitle>
              <div className="flex items-center justify-center mt-2">
                <Phone className="w-4 h-4 mr-2" />
                <span>{flyerData.seller.phone}</span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {flyerData.flyer[index].pages.map((page, pageIndex) => (
                <div key={pageIndex} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {page.items.map((item, itemIndex) => (
                    <Card key={itemIndex} className="overflow-hidden">
                      <div className="relative">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={500}
                          height={500}
                          objectFit="cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold flex justify-between">
                          {item.name}
                          <span className="text-red-600">New Sale!</span>
                          </h3>
                        <p className="text-3xl font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
          <p className="text-center mt-4 text-xl text-muted-foreground">
            Valid until: {format(new Date(flyerData.validUntil), 'MMMM d, yyyy')}
          </p>
        </div>
      )}
    </div>
  );
}