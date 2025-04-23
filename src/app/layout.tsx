import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import { Toaster } from "sonner";
import { Montserrat, Poppins, Roboto } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
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
    images: ["/path-to-your-og-image.jpg"],
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
    <html
      lang="en"
      className={`${poppins.variable} ${roboto.variable}  ${montserrat.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body>
        <ClientWrapper>
          <Toaster richColors position="top-center" />
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
