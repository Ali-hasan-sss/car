import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import { Toaster } from "sonner";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
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
  robots: "index, follow",
  authors: [{ name: "SOUFAN GLOBAL" }],
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
export const generateViewport = () => ({
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}  `}>
        <ClientWrapper>
          <Toaster richColors position="top-center" />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
