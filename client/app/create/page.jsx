"use client";

import * as React from "react";
import { format } from "date-fns";
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

// Mock product data
const products = [
  { name: "Apple", image: "/images/apple.png" },
  { name: "Banana", image: "/images/banana.png" },
  { name: "Orange", image: "/images/orange.png" },
  { name: "Pear", image: "/images/pear.png" },
  { name: "Grapes", image: "/images/grape.png" },
  { name: "Strawberry", image: "/images/strawberry.png" },
  { name: "Carrots", image: "/images/carrot.png" },
  { name: "Lettuce", image: "/images/lettuce.png" },
  { name: "Spinach", image: "/images/spinach.png" },
  { name: "Bread", image: "/images/bread.png" },
];

const Page = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [flyer, setFlyer] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState(Array(2).fill(""));
  const [type, setType] = useState(2);
  const [prices, setPrices] = useState(Array(2).fill(0));
  const [date, setDate] = useState(null);

  const nextPage = () => {
    flyer.push({ products: selectedProducts, prices: prices, type: type, date: date});
    setSelectedProducts(Array(2).fill(""));
    setPrices(Array(2).fill(0));
    setType(2);
    setDate(null);
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setSelectedProducts(flyer[-1].products);
    setPrices(flyer[-1].prices);
    setType(flyer[-1].type);
    setDate(flyer[-1].date);
    flyer.pop();
    setPage((prev) => prev - 1);
  };
  const handlePageTypeChange = (value) => {
    setType(value);
    console.log(type);
    setSelectedProducts(Array(value).fill(""));
    setPrices(Array(value).fill(0));
  };
  const handleProductSelect = (i, value) => {
    selectedProducts[i] = products[value].name;
    console.log(selectedProducts);
  };
  const handlePriceChange = (i, price) => {
    prices[i] = price;
  };

  const renderProductSelector = (i) => {
    const selectedProduct = products.find((p) => p.name === selectedProducts[i]);

    return (
      <div className="space-y-2">
        {i}
        <Select onValueChange={(value) => handleProductSelect(i, value)}>
          <SelectTrigger>
            {selectedProducts[i] === '' ? (
              <SelectValue placeholder="Select a product" />
            ) : (
              <SelectValue>{products[selectedProducts[i]].name}</SelectValue>
            )}
          </SelectTrigger>
          <SelectContent>
            {products.map((product, index) => (
              <SelectItem key={index} value={index.toString()}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedProduct !== "" && (
          <Card>
            <CardContent className="p-4">
              <Image
                src={products[selectedProducts[i]].image}
                alt={products[selectedProducts[i]].name}
                width={100}
                height={100}
                className="mb-2"
              />
              <p className="font-semibold text-xl">
                {products[selectedProducts[i]].name}
              </p>
              <Input
                type="number"
                placeholder="Price"
                value={prices[i] || ""}
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
            value={totalPages+1}
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
                {date ? format(date, "PPP") : <span>Pick a date</span>}
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
            Page {page+1} of {totalPages+1}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: type }, (_, i) => renderProductSelector(i))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button onClick={() => prevPage()} disabled={page === 1}>
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {page === totalPages ? (
            <Button onClick={() => console.log("Submit flyer")}>
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
