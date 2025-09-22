import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import ClientLoader from "./ClientLoader";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/Components/Navigation";
import InteractiveNavbarWrapper from "@/Components/Navigation/InteractiveNavbarWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pacifico",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Space Cafe Bar",
  description: "Welcome to the Space!",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", type: "image/x-icon", url: "/favicon.ico" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${pacifico.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        <ClientLoader>
          <InteractiveNavbarWrapper />
          {children}
        </ClientLoader>
      </body>
    </html>
  );
}
