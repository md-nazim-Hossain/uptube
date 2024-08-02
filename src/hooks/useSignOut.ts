import { useToast } from "@/components/ui/use-toast";
import { IAPIResponse } from "@/types";
import { usePost } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { useUserStore } from "@/zustand/useUserStore";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const removeUser = useUserStore((state) => state.removeUser);
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync, isPending } = usePost(apiRoutes.users.logout);
  const signOut = async () => {
    try {
      await mutateAsync({});
      removeUser();
      toast({
        title: "Sign Out Successful",
        description: "You have successfully signed out.",
      });
      router.replace("/signin");
    } catch (error: IAPIResponse<any> | any) {
      console.log(error);
      toast({
        title: "Sign Out Failed",
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  return { signOut, isLoading: isPending };
};
