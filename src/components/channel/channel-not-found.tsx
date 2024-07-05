"use client";

import { Typography } from "@/components/ui/typography";
import React from "react";

function ChannelNotFound() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Typography variant={"h5"} className="font-normal">
        404 - Channel not found
      </Typography>
    </div>
  );
}

export default ChannelNotFound;
