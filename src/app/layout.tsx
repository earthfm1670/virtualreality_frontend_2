import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuyMovie - VirtualReality Movie Store",
  description:
    "Browse and purchase your favorite movie online at the price that is right for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-gray-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}
