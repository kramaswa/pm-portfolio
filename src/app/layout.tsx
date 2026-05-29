import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kishore Ramaswamy — Product Manager",
  description:
    "Product Manager and 0–1 builder. Explore my work, projects, and get in touch.",
  openGraph: {
    title: "Kishore Ramaswamy — Product Manager",
    description:
      "Product Manager and 0–1 builder. Explore my work, projects, and get in touch.",
    type: "website",
    url: "https://kramaswa.vercel.app",
    siteName: "Kishore Ramaswamy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kishore Ramaswamy — Product Manager",
    description: "Product Manager and 0–1 builder. Explore my work, projects, and get in touch.",
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
