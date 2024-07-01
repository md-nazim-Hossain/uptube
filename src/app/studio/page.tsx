import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { getCookie } from "cookies-next";
import React from "react";
import { cookies } from "next/headers";

async function DashboardPage() {
  const data = await axios
    .get(apiRoutes.users.likeVideos, {
      headers: {
        Authorization: `Bearer ${getCookie("accessToken", { cookies })}`,
      },
    })
    .then((res) => res.data);
  return <div>DashboardPage</div>;
}

export default DashboardPage;
