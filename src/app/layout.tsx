import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/react-query-provider";
import Navbar from "../components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Stargaze NFT Dashboard",
  description: "Stargaze NFT Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className="bg-slate-700">
          <Navbar />
          {children}
        </body>
      </Providers>
    </html>
  );
}
