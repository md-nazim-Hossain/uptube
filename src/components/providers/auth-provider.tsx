"use client";
import { IAPIResponse, IUser } from "@/types";
import { useFetch } from "@/utils/reactQuery";
import { useUserStore } from "@/zustand/useUserStore";
import React, { useLayoutEffect } from "react";
import { deleteCookie } from "cookies-next";
import HomePageSkeleton from "../skeletons/home-page-skeleton";
function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, removeUser } = useUserStore((state) => state);
  const { data, isLoading, error } =
    useFetch<IAPIResponse<IUser>>("/users/user");
  useLayoutEffect(() => {
    if (data && !isLoading) setUser(data.data as IUser);
    if (!isLoading && (error?.status === 401 || error?.status === 403)) {
      removeUser();
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
    }
  }, [data, error?.status, isLoading, removeUser, setUser]);

  if (isLoading) return <HomePageSkeleton />;
  return <>{children}</>;
}

export default AuthProvider;
