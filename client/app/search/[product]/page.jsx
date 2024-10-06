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
import { useQuery, useQueryClient } from "@tanstack/react-query";

export default function ProductGrid({ params }) {
  const [sortBy, setSortBy] = useState("distance");
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [locationError, setLocationError] = useState(null);
  const [items, setItems] = useState([]);
  const queryClient = useQueryClient();

  const fetchProduct = async () => {
    let url;
    let options = {
      method: "GET",
    };

    if (sortBy === "price") {
      url = `http://localhost:3001/api/filter/price/${params.product}`;
    } else if (
      sortBy === "distance" &&
      coordinates.latitude &&
      coordinates.longitude
    ) {
      url = `http://localhost:3001/api/filter/location/${params.product}`;
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lat: coordinates.latitude,
          lon: coordinates.longitude,
        }),
      };
    } else {
      throw new Error("Invalid sorting method or missing coordinates");
    }

    const res = await fetch(url, options);
    return res.json();
  };

  const {
    isLoading,
    error,
    data: response,
  } = useQuery({
    queryKey: ["flyer", sortBy, coordinates],
    queryFn: fetchProduct,
    enabled: () =>
      sortBy === "price" ||
      (sortBy === "distance" && coordinates.latitude && coordinates.longitude),
  });

  useEffect(() => {
    if (response?.items) {
      setItems(response.items);
    }
  }, [response]);

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

  useEffect(() => {
    if (
      sortBy === "distance" &&
      coordinates.latitude &&
      coordinates.longitude
    ) {
      queryClient.invalidateQueries(["flyer"]);
    }
  }, [sortBy, coordinates, queryClient]);

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
            <h1 className="font-advercase text-4xl font-semibold">
              {params.product}:
            </h1>
            <Select onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="distance">Distance</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-10">
            {items.map((item) => (
              <Card className="overflow-hidden" key={item._id}>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {item.seller.store}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ProductImage
                    src={`https://api.findflyerswith.us/images/${item.seller.user}.png`}
                    alt={`${item.seller.store}'s flyer`}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <span className="text-sm text-gray-400">
                    {`$${item.item.price}`}
                  </span>
                </CardFooter>
              </Card>
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
