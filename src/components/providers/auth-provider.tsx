"use client";
import { IAPIResponse, IUser } from "@/types";
import axios from "@/utils/axios";
import { useUserStore } from "@/zustand/useUserStore";
import React, { useLayoutEffect } from "react";

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = React.useState(true);
  const { setUser, removeUser } = useUserStore((state) => state);

  useLayoutEffect(() => {
    (async () => {
      try {
        const res = (await axios.get("/users/user")) as IAPIResponse<IUser>;
        if (!res.success) throw new Error(res.message);
        setUser(res.data as IUser);
      } catch (error) {
        console.log(error);
        removeUser();
      } finally {
        setLoading(false);
      }
    })();
  }, [removeUser, setUser]);
  if (loading) return <div>loading</div>;
  return <>{children}</>;
}

export default AuthProvider;
