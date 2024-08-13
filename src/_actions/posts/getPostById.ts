"use server";

import { IPOST } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

export async function getPostById(id: string) {
  try {
    const data = await axios
      .get(apiRoutes.posts.getPostById + id, {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      })
      .then((res) => res.data);
    return data?.data as IPOST;
  } catch (error) {
    return notFound();
  }
}
