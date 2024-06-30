import { useToast } from "@/components/ui/use-toast";
import { IAPIResponse } from "@/types";
import axios from "@/utils/axios";
import { useUserStore } from "@/zustand/useUserStore";
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
      const res = (await axios
        .post("/users/logout")
        .then((res) => res.data)) as IAPIResponse<any>;
      if (!res.success) throw new Error(res.message);
      removeUser();
      toast({
        title: "Sign Out Successful",
        description: "You have successfully logged out.",
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
