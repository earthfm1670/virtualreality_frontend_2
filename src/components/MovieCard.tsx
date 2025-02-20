"use client";

import type React from "react";
import { useState } from "react";
import Image from "next/image";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price: number;
}

interface MovieCardProps {
  movie: Movie;
  onAddToCart: (movie: Movie) => void;
  onUpdatePrice: (id: number, price: number) => void;
}

export function MovieCard({
  movie,
  onAddToCart,
  onUpdatePrice,
}: MovieCardProps) {
  const [price, setPrice] = useState("");

  // set price to movie, use regex to exclude negative numbers
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPrice(value);
      const numericPrice = parseInt(value) || 0;
      onUpdatePrice(movie.id, numericPrice);
    }
  };

  const isValidPrice = parseInt(price) > 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 border border-gray-700 flex flex-col h-full">
      {/* div container for poster image */}
      <div className="relative w-full pb-[450px] mb-4">
        <Image
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "/placeholder.svg"
          }
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="rounded-md"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 flex-grow">{movie.title}</h3>
      <div className="mt-auto">
        {/* div container for input */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            value={price}
            onChange={handlePriceChange}
            placeholder="Enter price"
            className="w-32 px-2 py-1 bg-gray-700 text-gray-100 rounded"
          ></input>
          <span>฿</span>
        </div>
        <button
          onClick={() =>
            isValidPrice && onAddToCart({ ...movie, price: parseInt(price) })
          }
          className={`w-full font-semibold py-2 px-4 rounded transition-colors ${
            isValidPrice
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
