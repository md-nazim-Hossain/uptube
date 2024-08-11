"use client";

import React, { Suspense } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function ProgressBarProviders() {
  return (
    <Suspense>
      <ProgressBar
        height="3px"
        color="#ef4444"
        options={{ showSpinner: false, speed: 500 }}
      />
    </Suspense>
  );
}

export default ProgressBarProviders;
