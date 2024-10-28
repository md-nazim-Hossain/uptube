"use client";
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
import { useToast } from "@/components/ui/use-toast";
import { IAPIResponse } from "@/types";
import axios from "@/utils/axios";
import { passwordRegex } from "@/utils/common";
import { apiRoutes } from "@/utils/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const securitySchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters.")
      .max(32, "The password must be a maximum 32 characters")
      .regex(passwordRegex, {
        message:
          "Current Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
      }),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(32, "The password must be a maximum 32 characters")
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
function Security() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof securitySchema>>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const onSubmit = async (values: z.infer<typeof securitySchema>) => {
    try {
      await axios
        .patch(apiRoutes.users.changeCurrentPassword, {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        })
        .then((res) => res.data);
      toast({
        title: "Update Successful",
        description: "You have successfully updated your password.",
      });
    } catch (error: IAPIResponse<any> | any) {
      console.log(error);
      toast({
        title: "Password Update Failed",
        description: error?.data?.message,
        variant: "destructive",
      });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-base">
                Current Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="**** **** ****"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-base">
                New Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="**** **** ****"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-primary text-base">
                Confirm New Password
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="**** **** ****"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <FormSubmitButton
            loadingText="Saving..."
            loading={form.formState.isSubmitting}
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
            variant={"outline"}
            className="w-[150px] text-destructive"
          >
            Save
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

export default Security;
