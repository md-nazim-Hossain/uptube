import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import { ProvidersTree } from "@/components/providers/providers-tree";
import { inter, roboto } from "@/utils/font";
import ModaProvider from "@/components/modals/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import ProgressBarProviders from "@/components/providers/progress-providers";

export const metadata: Metadata = {
  title: "UPTube",
  description:
    "UPTube is a platform where you can upload and download videos. It's free and open source.",
  icons: {
    icon: "/assets/images/logo.png",
    shortcut: "/assets/images/logo.png",
  },
  keywords: ["UPTube", "videos", "youtube", "stream", "website", "streaming"],
  authors: [{ name: "UPTube", url: "https://up-tube.vercel.app" }],
  publisher: "UPTube",
  creator: "UPTube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${roboto.className}`}>
        <ProvidersTree>
          {children}
          <ModaProvider />
        </ProvidersTree>
        <Toaster />
        <Analytics />
        <ProgressBarProviders />
      </body>
    </html>
  );
}
