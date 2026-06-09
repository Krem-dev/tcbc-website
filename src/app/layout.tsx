import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/localStorage-polyfill";
import NavBar from "@/components/NavBar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://tcbcottawa.org"),
  title: "TCBC OTTAWA",
  description:
    "Join us at TCBC as we grow together in Christ and serve our community. Experience worship, fellowship, and spiritual growth.",
  keywords: ["church", "TCBC", "worship", "community", "faith", "sermons", "events"],
  icons: {
    icon: "/TCBC_logo_vector.pdf2-01 (2).png",
  },
  openGraph: {
    title: "The Chosen Bible Church Ottawa",
    description:
      "Join us at TCBC as we grow together in Christ and serve our community.",
    url: "https://tcbcottawa.org",
    siteName: "The Chosen Bible Church",
    images: [{ url: "/bib-4.jpg", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Chosen Bible Church Ottawa",
    description:
      "Join us at TCBC as we grow together in Christ and serve our community.",
    images: ["/bib-4.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {mapsApiKey && (
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}`}
            async
            defer
          ></script>
        )}
      </head>
      <body className={`${inter.variable} font-aeonik antialiased`}>
        <NavBar />
        <Toaster position="top-center" richColors closeButton />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
