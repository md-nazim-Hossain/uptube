import type { Metadata } from "next";

import "@/styles/globals.css";
import { ProvidersTree } from "@/components/providers-tree";
import Navbar from "@/components/layout/navbar";
import { inter, roboto } from "@/utils/font";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
          <Navbar />
          {children}
        </ProvidersTree>
      </body>
    </html>
  );
}
