"use client"; // Error boundaries must be Client Components

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen relative z-50 w-screen">
      <Typography variant={"h2"}>Something went wrong!</Typography>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
