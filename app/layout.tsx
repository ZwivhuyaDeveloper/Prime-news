import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Playfair_Display, Inter } from "next/font/google";

const display = Playfair_Display({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700", "800"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Flux Gazette — Modern Digital Magazine",
  description: "Premium single-page digital magazine: breaking news, politics, technology, sports, business, health, opinion and more.",
  applicationName: "Flux Gazette",
  openGraph: {
    title: "Flux Gazette — Modern Digital Magazine",
    description: "Premium single-page digital magazine covering world, politics, tech and culture.",
    type: "website",
    images: [
      { url: "/images/hero.jpg", width: 1200, height: 630, alt: "Flux Gazette hero image" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flux Gazette — Modern Digital Magazine",
    description: "Premium single-page digital magazine covering world, politics, tech and culture.",
    images: ["/images/hero.jpg"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#833AB4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
