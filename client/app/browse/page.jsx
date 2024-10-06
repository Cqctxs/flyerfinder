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

// Mock data for flyers
const json = `{
  "success": true,
  "flyers": [
  {
      "_id": "6700dbdf79b45f34b8123392",
      "seller": {
        "store": "John's Store",
        "name": "John Doe",
        "phone": "555-555-5555",
        "email": "johndoe@email.com",
        "coordinates": {
          "lat": 43.77319084068962,
          "lon": -79.16688069831774
        }
      },
      "flyer": {
        "pages": [
          {
            "type": 0,
            "items": [
              {
                "name": "Organic Apples",
                "price": 2.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          },
          {
            "type": 0,
            "items": [
              {
                "name": "Organic Bananas",
                "price": 2.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          }
        ]
      },
      "validUntil": "2024-10-10T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "6700dc39aef25994e38ade89",
      "seller": {
        "store": "John's Store",
        "name": "John Doe",
        "phone": "555-555-5555",
        "email": "johndoe@email.com",
        "coordinates": {
          "lat": 43.807244912657715,
          "lon": -79.22407422493382
        }
      },
      "flyer": {
        "pages": [
          {
            "type": 1,
            "items": [
              {
                "name": "Organic Apples",
                "price": 1.99,
                "image": "https://example.com/apples.jpg"
              },
              {
                "name": "Organic Peaches",
                "price": 2.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          },
          {
            "type": 0,
            "items": [
              {
                "name": "Organic Bananas",
                "price": 2.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          }
        ]
      },
      "validUntil": "2024-10-10T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "670133d0160cac7e78b6b130",
      "seller": {
        "store": "John's Store",
        "name": "John Doe",
        "phone": "555-555-5555",
        "email": "johndoe@email.com",
        "coordinates": {
          "lat": 43.807244912657715,
          "lon": -79.22407422493382
        }
      },
      "flyer": {
        "pages": [
          {
            "type": 1,
            "items": [
              {
                "name": "Organic Apples",
                "price": 4.99,
                "image": "https://example.com/apples.jpg"
              },
              {
                "name": "Organic Peaches",
                "price": 4.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          },
          {
            "type": 0,
            "items": [
              {
                "name": "Organic Bananas",
                "price": 4.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          }
        ]
      },
      "validUntil": "2024-10-10T00:00:00.000Z",
      "__v": 0
    },
    {
      "_id": "6700db91fd9bee496318c2e5",
      "seller": {
        "store": "John's Store",
        "name": "John Doe",
        "phone": "555-555-5555",
        "email": "johndoe@email.com",
        "coordinates": {
          "lat": 43.77030841676703,
          "lon": -79.18480033176169
        }
      },
      "flyer": {
        "pages": [
          {
            "type": 0,
            "items": [
              {
                "name": "Organic Apples",
                "price": 3.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          },
          {
            "type": 0,
            "items": [
              {
                "name": "Organic Bananas",
                "price": 1.99,
                "image": "https://example.com/apples.jpg"
              }
            ]
          }
        ]
      },
      "validUntil": "2024-10-10T00:00:00.000Z",
      "__v": 0
    }
  ]
}`;
// const flyers = [
//   { id: 1, company: "SuperMart", image: "/images/apple.png", expiryDate: "2024-03-15", distance: 2.5 },
//   { id: 2, company: "TechZone", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-20", distance: 1.8 },
//   { id: 3, company: "FashionHub", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-18", distance: 3.2 },
//   { id: 4, company: "HomeDecor", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-25", distance: 0.9 },
//   { id: 5, company: "PetSupplies", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-22", distance: 4.1 },
//   { id: 6, company: "SportsGear", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-17", distance: 2.7 },

// ]

export default function FlyerGrid() {
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
  const data = JSON.parse(json);
  console.log(data);
  const flyers = data.flyers;

  // Location
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [error, setError] = useState(null);

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
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
    getLocation();
  }, []);
  console.log(coordinates);

  const [sortBy, setSortBy] = useState("expiryDate");

  const sortedFlyers = [...flyers].sort((a, b) => {
    if (sortBy === "expiryDate") {
      return (
        new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
      );
    } else if (sortBy === "distance") {
      return (
        cosineDistanceBetweenPoints(
          coordinates.latitude,
          coordinates.longitude,
          a.seller.coordinates.lat, // Ensure correct access to latitude
          a.seller.coordinates.lon // Ensure correct access to longitude
        ) -
        cosineDistanceBetweenPoints(
          coordinates.latitude,
          coordinates.longitude,
          b.seller.coordinates.lat, // Ensure correct access to latitude
          b.seller.coordinates.lon // Ensure correct access to longitude
        )
      );
    }
    return 0;
  });

  return (
    <>
      <Navigation />
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
          <Link href={`/flyer/${flyer._id}`}>
            <Card key={flyer._id} className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl">{flyer.seller.store}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Image
                  src={flyer.image}
                  alt={`${flyer.store}'s flyer`}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
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
                      flyer.seller.coordinates.lat,
                      flyer.seller.coordinates.lon
                    ).toFixed(2)}
                  km
                </span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}
