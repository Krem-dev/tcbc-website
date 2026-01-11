import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/localStorage-polyfill";
import NavBar from "@/components/NavBar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TCBC OTTAWA",
  description:
    "Join us at TCBC as we grow together in Christ and serve our community. Experience worship, fellowship, and spiritual growth.",
  keywords: ["church", "TCBC", "worship", "community", "faith", "sermons", "events"],
  icons: {
    icon: "/TCBC_logo_vector.pdf2-01 (2).png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-aeonik antialiased`}>
        <NavBar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
