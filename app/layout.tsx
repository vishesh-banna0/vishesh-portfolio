import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { getTheme } from "@/lib/queries";

// Display voice — geometric, technical, distinct from the Inter/Geist default.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Body — engineering-grade humanist sans (the working text).
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

// Mono — instrument readouts: labels, indices, data, tech tags.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://visheshshekhawat.com"),
  title: "Vishesh Shekhawat | ML / AI Systems Engineer",
  description:
    "Vishesh Shekhawat — ML/AI systems engineer (M.Tech AI, NIT Jalandhar). Building agentic systems, diffusion models, and LLM infrastructure from paper to production.",
  keywords: ["AI", "ML", "Machine Learning", "Deep Learning", "Diffusion Models", "LLM", "Agents", "NIT Jalandhar", "Vishesh Shekhawat"],
  authors: [{ name: "Vishesh Shekhawat" }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: "Vishesh Shekhawat | ML / AI Systems Engineer",
    description:
      "Building agentic systems, diffusion models, and LLM infrastructure — from paper to production.",
    type: "website",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = await getTheme();
  // Admin-controlled accent + radius, applied site-wide with no redeploy. Unlayered
  // :root here overrides the layered defaults in globals.css.
  const themeVars = `:root{--brand-h-base:${theme.brandH};--brand-s:${theme.brandS}%;--brand-l:${theme.brandL}%;--radius:${theme.radius}rem;}`;

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${plexSans.variable} ${plexMono.variable}${theme.hueCycle ? " hue-cycle" : ""}`}
      suppressHydrationWarning
    >
      <body>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
