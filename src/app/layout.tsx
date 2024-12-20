import type { Metadata } from "next";
import localFont from "next/font/local";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { AppProvider } from "./context/AppContext";
import Navbar from "@/components/header/navbar";
import Footer from "@/components/footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SOUFAN GLOBAL",
  description: "Import cars from Canada to Oman",
  keywords: [
    "cars",
    "import",
    "Canada",
    "Oman",
    "SOUFAN GLOBAL",
    "car trading",
  ],
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
  robots: "index, follow",
  authors: [{ name: "SOUFAN GLOBAL" }],
  themeColor: "#ffffff",
  openGraph: {
    title: "SOUFAN GLOBAL",
    description: "Import cars from Canada to Oman",
    images: ["/path-to-your-og-image.jpg"], // يمكن أن تكون مصفوفة
    url: "https://www.soufanglobal.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOUFAN GLOBAL",
    description: "Import cars from Canada to Oman",
    images: ["/path-to-your-twitter-image.jpg"], // مصفوفة للصور
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </AppProvider>
  );
}
