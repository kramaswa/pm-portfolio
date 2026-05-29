import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "Product Manager and 0–1 builder specializing in AI products and consumer apps. See my projects, case studies, and get in touch.";

export const metadata: Metadata = {
  title: "Kishore Ramaswamy — Product Manager",
  description,
  openGraph: {
    title: "Kishore Ramaswamy — Product Manager",
    description,
    type: "website",
    url: "https://kramaswa.vercel.app",
    siteName: "Kishore Ramaswamy",
    images: [
      {
        url: "https://kramaswa.vercel.app/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kishore Ramaswamy — Product Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishore Ramaswamy — Product Manager",
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
