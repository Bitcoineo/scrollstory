import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Handsteel X",
  description: "Elevate your game. Precision-engineered gaming mouse.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/frames/ezgif-frame-001.jpg" as="image" />
      </head>
      <body
        className={`${inter.variable} font-sans bg-[#080808] text-white antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
