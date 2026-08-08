import type { Metadata } from "next";
import { Geist, Geist_Mono, Source_Serif_4 } from "next/font/google";
import "highlight.js/styles/github.css";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { getManifest } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mastery — Python & Java, in depth",
  description: "Every language feature, with real executed code and real captured output.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const manifest = getManifest();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sourceSerif.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased" suppressHydrationWarning>
        <AppShell manifest={manifest}>{children}</AppShell>
      </body>
    </html>
  );
}
