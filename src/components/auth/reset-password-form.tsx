"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { passwordRegex } from "@/utils/common";
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
import axios from "@/utils/axios";
import { IAPIResponse } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { apiRoutes } from "@/utils/routes";
const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "The password must be at least 8 characters long")
      .max(32, "The password must be a maximum 32 characters")
      .regex(passwordRegex, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "This field has to be filled." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

type Props = {
  token: string;
};
function ResetPasswordForm({ token }: Props) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
    },
    mode: "all",
  });
  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      await axios
        .post(apiRoutes.users.resetPassword, {
          password: values.password,
          token,
        })
        .then((res) => res.data);
      toast({
        title: "Reset password Successful",
        description: "You have successfully reset your password.Please login.",
      });

      router.push("/signin");
    } catch (error: IAPIResponse<any> | any) {
      console.log(error);
      toast({
        title: "Reset password Failed",
        description: error?.data.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>New Password</FormLabel>
                <FormControl className="py-1 h-max">
                  <Input type="password" variant={"destructive"} {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl className="py-1 h-max">
                  <Input type="password" variant={"destructive"} {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          loadingText="Resetting..."
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          variant={"outline"}
          className="sm:max-w-[15rem] w-full text-destructive"
        >
          Reset
        </FormSubmitButton>
      </form>
    </Form>
  );
}

export default ResetPasswordForm;
