"use client";
import { IAPIResponse } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import React from "react";

type Props = {
  videoId: string;
};
function AddWatchHistory({ videoId }: Props) {
  useFetch<IAPIResponse<null>>(
    apiRoutes.users.addedWatchHistory + `?id=${videoId}`,
    undefined,
    {
      queryKey: [
        apiRoutes.users.addedWatchHistory + `?id=${videoId}`,
        undefined,
      ],
      enabled: !!videoId,
    },
  );

  return <></>;
}

export default AddWatchHistory;
