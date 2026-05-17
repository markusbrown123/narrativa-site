import type { Metadata } from "next";
import { Cormorant_Garamond, Lato } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const lato = Lato({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://narrativaconsulting.com"),
  title: {
    default: "Narrativa Consulting — Nicole Stephenson",
    template: "%s · Narrativa Consulting",
  },
  description:
    "Narrativa Consulting helps individuals and organizations unlock human potential through storytelling, communication, authenticity, and leadership. Founded by author and Wharton lecturer Nicole Stephenson.",
  openGraph: {
    title: "Narrativa Consulting — Nicole Stephenson",
    description:
      "Storytelling, communication, and leadership consulting with Nicole Stephenson, author of Unapologetic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-surface text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
