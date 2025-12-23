import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";



// app/layout.tsx (Top-level)
export const metadata = {
  metadataBase: new URL("https://brainstorm-global-education.vercel.app"),
  title: "Brainstorm Global Education — Study Abroad & Student Consultancy",
  description:
    "Brainstorm Global Education — expert study abroad consultancy. We help students apply to universities, visas, and scholarship guidance for Canada, Australia, UK, USA and more.",
  authors: [{ name: "Brainstorm Global Education", email: "info@brainstorm-global-education.vercel.app" }],
  openGraph: {
    type: "website",
    title: "Brainstorm Global Education — Study Abroad Consultancy",
    description:
      "Expert guidance for university applications, visas, scholarships and pre-departure support.",
    url: "https://brainstorm-global-education.vercel.app/",
    siteName: "Brainstorm Global Education",
    images: [{ url: "https://brainstorm-global-education.vercel.app/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brainstorm Global Education",
    description: "Study abroad consultancy — applications, visas, scholarships.",
    images: ["https://brainstorm-global-education.vercel.app/twitter-og-image.jpg"],
    site: "@YourTwitterHandle", // optional
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://brainstorm-global-education.vercel.app/" },
};

export const viewport = {
  initialScale: 1.0,
  width: "device-width",
  height: "device-height",
  minimumScale: 1.0,
  maximumScale: 1.0,
  userScalable: "yes",
};


import QueryProvider from "@/components/providers/QueryProvider";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
      >
        <NextTopLoader color="oklch(0.5841 0.1030 181.9558)" height={3} showSpinner={false} />
        <QueryProvider>
          <Header/>
          {children}
          <Footer/>
          <Toaster position="top-center" richColors closeButton />
        </QueryProvider>
      </body>
    </html>
  );
}
