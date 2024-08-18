/* eslint-disable react/display-name */
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import ReactQueryProvider from "./react-query-provider";
import GlobalLoaderProviders from "./global-loader-providers";

const buildProviders = (componentWithProps: any[]) => {
  const initialComponents = ({ children }: { children: ReactNode }) => (
    <>{children}</>
  );
  return componentWithProps.reduce(
    (AccumulateComponents, [Providers, props = {}]) => {
      return ({ children }: { children: ReactNode }) => (
        <AccumulateComponents>
          <Providers {...props}>{children}</Providers>
        </AccumulateComponents>
      );
    },
    initialComponents,
  );
};

export const ProvidersTree = buildProviders([
  [NextThemesProvider, { attribute: "class", defaultTheme: "system" }],
  [GlobalLoaderProviders],
  [ReactQueryProvider],
]);
