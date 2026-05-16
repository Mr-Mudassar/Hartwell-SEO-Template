import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/components/layout/TransitionContext";
import { Nav } from "@/components/layout/Nav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Loader } from "@/components/layout/Loader";
import { IntroOverlay } from "@/components/layout/IntroOverlay";
import { PageTransition } from "@/components/layout/PageTransition";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hartwell SEO — Search performance, engineered.",
  description:
    "Hartwell SEO is a senior SEO consultancy for companies that treat organic search as a measurable revenue channel.",
  openGraph: {
    title: "Hartwell SEO — Search performance, engineered.",
    description:
      "A senior SEO consultancy. Technical, content, and authority programs built on evidence.",
    url: "https://hartwellseo.com",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Hartwell SEO",
              url: "https://hartwellseo.com",
              logo: "https://hartwellseo.com/logo.svg",
              description: "A senior SEO consultancy.",
              email: "hello@hartwellseo.com",
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <TransitionProvider>
          <Loader />
          <CustomCursor />
          <IntroOverlay />
          <Nav />
          <ScrollProgress />
          <PageTransition />
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
