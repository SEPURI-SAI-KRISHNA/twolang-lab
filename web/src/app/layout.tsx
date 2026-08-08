import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://twolang-lab.pages.dev";
const SITE_DESCRIPTION =
  "Every Python and Java topic actually executed — real recorded output, interview and industry notes, a concept map, and a Python↔Java compare view.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mastery — Python & Java, in depth",
    template: "%s — Mastery",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "Mastery — Python & Java, in depth",
    title: "Mastery — Python & Java, in depth",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Mastery — Python & Java, in depth",
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f6e64",
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
