import { Inter, Roboto } from "next/font/google";
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Helvetica", "Arial", "sans-serif"],
  weight: [
    "400",
    "700",
    "300",
    "100",
    "500",
    "900",
    "200",
    "600",
    "800",
    "900",
  ],
});
export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "300", "100", "500", "900"],
  variable: "--font-roboto",
  display: "swap",
  adjustFontFallback: true,
  fallback: ["Helvetica", "Arial", "sans-serif"],
});
