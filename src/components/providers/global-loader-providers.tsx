"use client";

import Image from "next/image";
import React, { useState } from "react";

function GlobalLoaderProviders({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <section className="w-screen flex justify-center items-center h-screen bg-background fixed inset-0 z-50">
        <Image
          src="/assets/images/logo.png"
          alt="loader"
          width={120}
          height={120}
          className="object-cover"
        />
      </section>
    );
  }
  return <>{children}</>;
}

export default GlobalLoaderProviders;
