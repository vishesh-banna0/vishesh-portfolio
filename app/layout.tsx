import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishesh Shekhawat | AI/ML Engineer Portfolio",
  description:
    "Portfolio of Vishesh Shekhawat - AI/ML Enthusiast, M.Tech AI at NIT Jalandhar. Exploring the frontiers of artificial intelligence and machine learning.",
  keywords: ["AI", "ML", "Machine Learning", "Deep Learning", "NIT Jalandhar", "Portfolio", "Developer"],
  authors: [{ name: "Vishesh Shekhawat" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Vishesh Shekhawat | AI/ML Engineer",
    description:
      "AI/ML Enthusiast building intelligent systems and exploring the frontiers of artificial intelligence.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
