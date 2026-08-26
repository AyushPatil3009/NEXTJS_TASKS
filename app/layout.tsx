import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "./src/components/navbar";
import Footer from "./src/components/footer";

// 1. Import cookies
import { cookies } from "next/headers";

// Add this import at the top
import { ThemeProvider } from "./src/context/ThemeContext";

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
    default: "NovaTech",
    template: "%s | NovaTech",
  },
  description: "Smart technology products by NovaTech.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {

 // 2. Read the cookie! (Next.js 15+ cookies() is a Promise)
  const cookieStore = await cookies();

  const isAdmin= cookieStore.get("role")?.value==="admin";
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* Wrap your layout in the Client Provider */}
        <ThemeProvider>
          <Navbar isAdmin={isAdmin} />
          {children}
          <Footer />
        </ThemeProvider>
        </body>
    </html>
  );
}
