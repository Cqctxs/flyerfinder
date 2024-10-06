'use client';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState({ 1: 2 });
  const [selectedProducts, setSelectedProducts] = useState({});
  const [prices, setPrices] = useState({});

  const handleProductSelect = (index, productId) => {
    setSelectedProducts((prev) => ({
      ...prev,
      [`${currentPage}-${index}`]: productId,
    }));
  };

  const handlePriceChange = (index, price) => {
    setPrices((prev) => ({
      ...prev,
      [`${currentPage}-${index}`]: price,
    }));
  };

  const handlePageTypeChange = (page, items) => {
    setItemsPerPage((prev) => ({
      ...prev,
      [page]: items,
    }));
  };

  const renderProductSelector = (index) => {
    const key = `${currentPage}-${index}`;
    const selectedProductId = selectedProducts[key];
    const selectedProduct = products.find((p) => p.id === selectedProductId);

    return (
      <div key={index} className="space-y-2">
        <Select
          onValueChange={(value) => handleProductSelect(index, parseInt(value))}
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
            value={itemsPerPage[currentPage]?.toString() || "2"}
            onValueChange={(value) =>
              handlePageTypeChange(currentPage, parseInt(value))
            }
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
            Page {currentPage} of {totalPages}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: itemsPerPage[currentPage] || 2 }, (_, i) =>
              renderProductSelector(i)
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          {currentPage === totalPages ? (
            <Button onClick={() => console.log("Submit flyer")}>
              Submit Flyer
            </Button>
          ) : (
            <Button
              onClick={() =>
                setCurrentPage((prev) => Math.min(totalPages, prev + 1))
              }
              disabled={currentPage === totalPages}
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
