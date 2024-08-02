import { IAPIResponse, IUser } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const response = (await axios
      .post(apiRoutes.users.logout)
      .then((res) => res.data)) as IAPIResponse<{
      user: IUser;
      accessToken: string;
      refreshToken: string;
    }>;

    const data = response.data;
    if (!data) return NextResponse.json(response, { status: 400 });
    cookies().delete("accessToken");
    cookies().delete("refreshToken");
    return NextResponse.json(response, { status: 200 });
  } catch (error: IAPIResponse<any> | any) {
    return NextResponse.json(error, {
      status: error.status,
      statusText: error?.statusText,
    });
  }
};
