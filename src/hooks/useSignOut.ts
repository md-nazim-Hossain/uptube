import { useToast } from "@/components/ui/use-toast";
import { IAPIResponse } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { useUserStore } from "@/zustand/useUserStore";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useSignOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const removeUser = useUserStore((state) => state.removeUser);
  const { toast } = useToast();
  const router = useRouter();
  const signOut = async () => {
    try {
      setIsLoading(true);
      await axios.post(apiRoutes.users.logout, {
        headers: {
          Authorization: `Bearer ${getCookie("accessToken")}`,
        },
      });
      removeUser();
      toast({
        title: "Sign Out Successful",
        description: "You have successfully signed out.",
      });
      router.replace("/signin");
    } catch (error: IAPIResponse<any> | any) {
      toast({
        title: "Sign Out Failed",
        description: error?.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { signOut, isLoading };
};
