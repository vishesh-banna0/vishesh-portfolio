import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { FaviconSync } from "@/components/FaviconSync";
import { getTheme } from "@/lib/queries";

const firaCode = localFont({
  src: [
    { path: "../public/fonts/FiraCode-Regular.ttf", weight: "400" },
    { path: "../public/fonts/FiraCode-Medium.ttf", weight: "500" },
    { path: "../public/fonts/FiraCode-Bold.ttf", weight: "700" },
  ],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "https://visheshshekhawat.com"),
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
      className={`${firaCode.variable}${theme.hueCycle ? " hue-cycle" : ""}`}
      suppressHydrationWarning
    >
      <body>
        <style dangerouslySetInnerHTML={{ __html: themeVars }} />
        <FaviconSync />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
