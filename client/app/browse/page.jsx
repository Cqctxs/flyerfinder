"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navigation from "@/components/navigation";
import { useQuery } from "@tanstack/react-query";

export default function FlyerGrid() {
  const fetchFlyers = async () => {
    const res = await fetch("https://api.findflyerswith.us/flyer");
    return res.json();
  };

  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["flyer"],
    queryFn: fetchFlyers,
  });

  const flyers = response?.flyers;

  const cosineDistanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const p1 = (lat1 * Math.PI) / 180;
    const p2 = (lat2 * Math.PI) / 180;
    const deltaP = p2 - p1;
    const deltaLon = lon2 - lon1;
    const deltaLambda = (deltaLon * Math.PI) / 180;
    const a =
      Math.sin(deltaP / 2) * Math.sin(deltaP / 2) +
      Math.cos(p1) *
        Math.cos(p2) *
        Math.sin(deltaLambda / 2) *
        Math.sin(deltaLambda / 2);
    const d = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * R;
    return d / 1000;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Location
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [locationError, setLocationError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            setLocationError(error.message);
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);

  const [sortBy, setSortBy] = useState("expiryDate");

  const sortedFlyers = flyers
    ? [...flyers].sort((a, b) => {
        if (sortBy === "expiryDate") {
          return (
            new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
          );
        } else if (sortBy === "distance") {
          return (
            cosineDistanceBetweenPoints(
              coordinates.latitude,
              coordinates.longitude,
              a.seller.coords.lat,
              a.seller.coords.lon
            ) -
            cosineDistanceBetweenPoints(
              coordinates.latitude,
              coordinates.longitude,
              b.seller.coords.lat,
              b.seller.coords.lon
            )
          );
        }
        return 0;
      })
    : [];

  return (
    <>
      <Navigation />
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <h1>Loading...</h1>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500">{error.message}</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4 px-10">
            <h1 className="font-advercase text-4xl font-semibold">Flyers</h1>
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="expiryDate">Expiry Date</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
            {sortedFlyers.map((flyer) => (
              <Link key={flyer._id} href={`/flyer/${flyer._id}`}>
                <Card className="overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      {flyer.seller.store}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ProductImage
                      src={`https://api.findflyerswith.us/images/${flyer.seller.user}.png`}
                      alt={`${flyer.seller.store}'s flyer`}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <span className="text-sm text-gray-400">
                      Expires: {formatDate(flyer.validUntil)}
                    </span>
                    <span className="text-sm text-gray-400">
                      Distance:{" "}
                      {coordinates.latitude &&
                        cosineDistanceBetweenPoints(
                          coordinates.latitude,
                          coordinates.longitude,
                          flyer.seller.coords.lat,
                          flyer.seller.coords.lon
                        ).toFixed(2)}
                      km
                    </span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function ProductImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);

  const handleError = () => {
    setImgSrc("/images/default.png");
  };

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={300}
      height={200}
      className="w-full h-48 object-cover"
      onError={handleError}
    />
  );
}
