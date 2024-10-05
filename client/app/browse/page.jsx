"use client"

import { useState } from "react"
import Image from "next/image"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Navigation from "@/components/navigation"

// Mock data for flyers
const flyers = [
  { id: 1, company: "SuperMart", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-15", distance: 2.5 },
  { id: 2, company: "TechZone", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-20", distance: 1.8 },
  { id: 3, company: "FashionHub", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-18", distance: 3.2 },
  { id: 4, company: "HomeDecor", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-25", distance: 0.9 },
  { id: 5, company: "PetSupplies", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-22", distance: 4.1 },
  { id: 6, company: "SportsGear", image: "/placeholder.svg?height=200&width=300", expiryDate: "2024-03-17", distance: 2.7 },
]

export default function FlyerGrid() {
  const [sortBy, setSortBy] = useState("expiryDate")

  const sortedFlyers = [...flyers].sort((a, b) => {
    if (sortBy === "expiryDate") {
      return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
    } else if (sortBy === "distance") {
      return a.distance - b.distance
    }
    return 0
  })

  return (
    <>
    <Navigation />
      <div className="flex justify-end mb-4">
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedFlyers.map((flyer) => (
          <Card key={flyer.id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{flyer.company}</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Image
                src={flyer.image}
                alt={`${flyer.company} flyer`}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <span className="text-sm text-gray-600">Expires: {flyer.expiryDate}</span>
              <span className="text-sm text-gray-600">{flyer.distance.toFixed(1)} km away</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  )
}