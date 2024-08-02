"use server";

import { IAPIResponse, IUser } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUser() {
  console.log("cookies---", cookies().get("accessToken")?.value);
  try {
    const user = (await axios
      .get(apiRoutes.users.getUser, {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      })
      .then((res) => res.data)) as IAPIResponse<IUser>;
    return user?.data as IUser;
  } catch (error: IAPIResponse<any> | any) {
    return null;
  }
}
