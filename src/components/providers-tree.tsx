/* eslint-disable react/display-name */
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
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
    initialComponents
  );
};

export const ProvidersTree = buildProviders([
  [NextThemesProvider, { attribute: "class", defaultTheme: "system" }],
]);
