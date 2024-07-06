"use client";

import React, { Suspense } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

function ProgressBarProviders() {
  return (
    <Suspense>
      <ProgressBar
        height="3px"
        color="#7f1d1d"
        options={{ showSpinner: false, speed: 500 }}
      />
    </Suspense>
  );
}

export default ProgressBarProviders;
