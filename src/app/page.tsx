"use client";

import { useState, useEffect } from "react";
import { MovieCard } from "@/components/MovieCard";
import {CartSummary} from "@/components/CartSummary"
import dotenv from "dotenv";
dotenv.config();

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  price: number;
}

interface CartItem extends Movie {
  quantity: number;
}

export default function Home() {
  const API_KEY = process.env.API_KEY;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Render movies based on search terms input, render movies by popularity if no search input
  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    } else {
      fetchPopularMovies();
    }
  }, [searchTerm]);

  // If there are cart data in localStorage, CartSummary will render the cart data
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save the cart to localStorage everytime there is a new item in the cart
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // search movies based on search input
  const fetchMovies = async (query: string) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      setMovies(
        data.results
          .map((movie: Movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            price: 0,
          }))
          .slice(0, 9)
      );
    } catch (error) {
      console.error("Error fetching movies", error);
      setMovies([]);
    }
  };

  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch popular movies");
      }
      const data = await response.json();
      setMovies(
        data.results
          .map((movie: Movie) => ({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            price: 0,
          }))
          .slice(0, 9)
      );
    } catch (error) {
      console.error("Error fetching popular movies:", error);
      setMovies([]);
    }
  };

  const addToCart = (movie: Movie) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === movie.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === movie.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...movie, quantity: 1 }];
      }
    });
  };

  const updatePrice = (id: number, price: number) => {
    setMovies((prevMovies) =>
      prevMovies.map((movie) => (movie.id === id ? { ...movie, price } : movie))
    );
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, price } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">
        VirtualReality Movie Store
      </h1>
      <div className="flex flex-row gap-8">
        <div className="flex-grow">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search name of the movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 rounded border border-gray-700 focus:outline-none focus:border-gray-500"
            ></input>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onAddToCart={addToCart}
                onUpdatePrice={updatePrice}
              />
            ))}
          </div>
        </div>
        <div className="w-96">
          <CartSummary cart={cart} onClearCart={clearCart} />
        </div>
      </div>
    </div>
  );
}
