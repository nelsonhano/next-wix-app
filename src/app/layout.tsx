import type { Metadata } from "next";
import {Lora} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const lora = Lora({subsets: ['latin']});

export const metadata: Metadata = {
  title: {
    template: '%s | Flow shop',
    absolute: 'Flow shop'
  },
  description: "A full stack e-commerce application built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lora.className}>
      <NavBar />
        {children}
      <Footer />
      </body>
    </html>
  );
}
