import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Typography } from "@/components/ui/typography";
import { useToast } from "@/components/ui/use-toast";
import { IAPIResponse } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { useUserStore } from "@/zustand/useUserStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const detailsSchema = z.object({
  fullName: z.string(),
  description: z.string(),
  email: z.string().email({ message: "Invalid email address." }),
});
function Details() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const user = useUserStore((state) => state.user);
  const form = useForm<z.infer<typeof detailsSchema>>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      fullName: user?.fullName,
      description: user?.description,
      email: user?.email,
    },
  });
  async function onSubmit(values: z.infer<typeof detailsSchema>) {
    try {
      await axios
        .patch(apiRoutes.users.updateUserDetails, values)
        .then((res) => res.data);
      toast({
        title: "Update Successful",
        description: "You have successfully updated your details.",
      });
      queryClient.invalidateQueries({ queryKey: [apiRoutes.users.getUser] });
    } catch (error: IAPIResponse<any> | any) {
      console.log(error);
      toast({
        title: "Update Failed",
        description: error?.data?.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="text-base text-primary">Name</FormLabel>
                <Typography variant={"muted"} className="text-xs">
                  Choose a channel name that represents you and your content.
                  Changes made to your name and picture are only visible on
                  UPTube and not on other Google services
                </Typography>
              </div>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base text-primary">Name</FormLabel>
              <FormControl>
                <Textarea rows={8} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel className="text-base text-primary">Email</FormLabel>
                <Typography variant={"muted"} className="text-xs">
                  Let people know how to contact you with business enquiries.
                  The email address that you enter may appear in the About
                  section of your channel and be visible to viewers.
                </Typography>
              </div>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <FormSubmitButton
            loadingText="Publishing..."
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            variant={"outline"}
            className="w-[150px] text-destructive"
          >
            Publish
          </FormSubmitButton>
          <Button
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            variant={"ghost"}
            className="w-[150px]"
            onClick={() => form.reset()}
            type="reset"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Details;
