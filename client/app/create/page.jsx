"use client";

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
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navigation from "@/components/navigation";
import withAuth from "@/components/withAuth";
import Image from "next/image";

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
  const [totalPages, setTotalPages] = useState(1);
  const [flyer, setFlyer] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState(Array(2).fill(0));
  const [type, setType] = useState(2);
  const [prices, setPrices] = useState([]);

  const nextPage = () => {
    setSelectedProducts([]);
    setPrices([]);
    setType(2);
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };
  const handlePageTypeChange = (value) => {
    console.log(value);
    setType(value);
    setSelectedProducts(Array(value).fill(0));
    setPrices(Array(value).fill(0));
  };
  const handleProductSelect = (i, productId) => {
    selectedProducts[i] = productId;
  };
  const handlePriceChange = (i, price) => {
    prices[i] = price;
  };

  const renderProductSelector = (i) => {
    return (
      <div className="space-y-2">
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
        {selectedProducts[i] != 0 && (
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
                value={prices[key] || ""}
                onChange={(e) => handlePriceChange(index, e.target.value)}
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
            value={type}
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

        <div className="space-y-4">
          <h2 className="text-xl font-bold">
            Page {page} of {totalPages}
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
            <Button
              onClick={() => nextPage()}
              disabled={page === totalPages}
            >
              Next <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default withAuth(Page);
