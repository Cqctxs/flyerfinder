"use client";

import * as React from "react";
import { format, sub } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/navigation";
import withAuth from "@/components/withAuth";
import Image from "next/image";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

// Mock product data
const products = [
  { id: 1, name: "Apple", image: "/images/apple.png" },
  { id: 2, name: "Banana", image: "/images/banana.png" },
  { id: 3, name: "Orange", image: "/images/orange.png" },
  { id: 4, name: "Pear", image: "/images/pear.png" },
  { id: 5, name: "Grapes", image: "/images/grape.png" },
  { id: 6, name: "Strawberry", image: "/images/strawberry.png" },
  { id: 7, name: "Carrots", image: "/images/carrot.png" },
  { id: 8, name: "Lettuce", image: "/images/lettuce.png" },
  { id: 9, name: "Spinach", image: "/images/spinach.png" },
  { id: 10, name: "Bread", image: "/images/bread.png" },
];

const Page = () => {

    const router = useRouter();
  const { auth } = useAuth();
  const [totalPages, setTotalPages] = useState(1);
  const [flyer, setFlyer] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState(Array(2).fill(""));
  const [type, setType] = useState(2);
  const [prices, setPrices] = useState(Array(2).fill(0));
  const [date, setDate] = useState(null);

  const nextPage = () => {
    const updatedFlyer = [...flyer];
    updatedFlyer.push({
      products: selectedProducts,
      prices: prices,
      type: type,
    });
    setFlyer(updatedFlyer);
    setSelectedProducts(Array(2).fill(""));
    setPrices(Array(2).fill(0));
    setType(2);
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setSelectedProducts(flyer[flyer.length - 1].products);
    setPrices(flyer[flyer.length - 1].prices);
    setType(flyer[flyer.length - 1].type);
    flyer.pop();
    setPage((prev) => prev - 1);
  };
  const handlePageTypeChange = (value) => {
    setType(value);
    setSelectedProducts(Array(value).fill(""));
    setPrices(Array(value).fill(0));
  };
  const handleProductSelect = (i, value) => {
    const updatedProducts = [...selectedProducts];
    updatedProducts[i] = products.find((p) => p.id === parseInt(value)).name;
    setSelectedProducts(updatedProducts);
  };
  const handlePriceChange = (i, price) => {
    const updatedPrices = [...prices];
    updatedPrices[i] = price;
    setPrices(updatedPrices);
  };

  const submitFlyer = async () => {
    const updatedFlyer = [...flyer];
    updatedFlyer.push({
      products: selectedProducts,
      prices: prices,
      type: type,
    });
    setFlyer(updatedFlyer);

    const subFlyer = [];
    for (let i = 0; i < updatedFlyer.length; i++) {
      subFlyer.push({
        type: updatedFlyer[i].type,
        items: updatedFlyer[i].products.map((product, j) => ({
          name: product,
          price: updatedFlyer[i].prices[j],
          image: products.find((p) => p.name === product).image,
        })),
      });
    }
    const seller = {
      user: auth.user,
      store: auth.store,
      phone: auth.phone,
      coords: auth.coords,
    };
    const validUntil = date;
    const request = JSON.stringify({
      seller: seller,
      flyer: subFlyer,
      validUntil: validUntil,
    });
    console.log(request);
    try {
        const response = await fetch("https://api.findflyerswith.us/flyer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: request,
        });
        if (response.ok) {
            console.log("Flyer created successfully");
        }
    } catch (error) {
        console.error("Failed to create flyer");
    }
    router.push("/browse");
  };

  const renderProductSelector = (i) => {
    const selectedProduct = products.find(
      (p) => p.name === selectedProducts[i]
    );

    return (
      <div key={i} className="space-y-2">
        <Select
          onValueChange={(value) => handleProductSelect(i, parseInt(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id.toString()}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedProduct && (
          <Card>
            <CardContent className="p-4">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                width={100}
                height={100}
                className="mb-2"
              />
              <p className="font-semibold text-xl">{selectedProduct.name}</p>
              <Input
                type="number"
                placeholder="Price"
                onChange={(e) => handlePriceChange(i, e.target.value)}
                className="mt-2"
              />
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <>
      <Navigation />
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        <h1 className="font-advercase text-4xl font-semibold">Create Flyer</h1>
        <div className="space-y-2">
          <Label htmlFor="total-pages" className="text-xl">
            Number of Pages
          </Label>
          <Input
            id="total-pages"
            type="number"
            min="1"
            value={totalPages}
            onChange={(e) => setTotalPages(parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="page-type" className="text-xl">
            Items per Page
          </Label>
          <Select
            onValueChange={(value) => handlePageTypeChange(parseInt(value))}
          >
            <SelectTrigger id="page-type">
              <SelectValue placeholder="Select items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 items</SelectItem>
              <SelectItem value="4">4 items</SelectItem>
              <SelectItem value="6">6 items</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-xl">
            Flyer Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? new Date(date).toISOString() : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Page {page + 1} of {totalPages}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: type }, (_, i) => renderProductSelector(i))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button onClick={() => prevPage()} disabled={page === 0}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {page === totalPages - 1 ? (
            <Button onClick={submitFlyer}>
              Submit Flyer
            </Button>
          ) : (
            <Button onClick={() => nextPage()} disabled={page === totalPages}>
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(Page);
