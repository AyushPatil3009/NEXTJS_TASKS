import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Link from "next/link";

import { ThemeProvider } from "@/app/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MyStore",
    template: "%s | MyStore",
  },
  description: "MyStore digital marketing platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav style={{ backgroundColor: "Aqua", color:"black" }}>My Global Navbar</nav>
        
        <nav className="navbar">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/products">Products</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
        <br></br>

        <ThemeProvider>
        {/* The current page's content gets injected here */}
        <main>{children}</main> 
        </ThemeProvider>

        <br></br>
        
        <nav style={{ backgroundColor: "White", color:"black" }}>My Global footer</nav>
      </body>
    </html>
  );
}
// justify-content: flex-start;   → Left side
// justify-content: center;       → Center
// justify-content: flex-end;     → Right side