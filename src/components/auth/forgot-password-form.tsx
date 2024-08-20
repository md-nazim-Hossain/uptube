"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { useToast } from "../ui/use-toast";
import { IAPIResponse } from "@/types";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";
import { Typography } from "../ui/typography";
const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email({ message: "Invalid email address." })
    .max(255)
    .refine(
      (val) => {
        return val.includes("@") && val.includes(".");
      },
      {
        message: "Invalid email address.",
      },
    ),
});

type Props = {
  onSuccess?: () => void;
};
function ForgotPasswordForm({ onSuccess }: Props) {
  const [isSent, setIsSent] = React.useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post(apiRoutes.users.forgotPassword, values);
      setIsSent(true);
      toast({
        title: "Sent email Successfully",
        description:
          "We have sent a password reset link to your email. Check your email spam folder if you can't find it.",
      });
      onSuccess && onSuccess();
    } catch (error: IAPIResponse<any> | any) {
      toast({
        title: "Forgot Password Failed",
        description: error?.data?.message,
        variant: "destructive",
      });
    }
  }
  if (isSent)
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-1">
        <Typography variant={"h2"} className="text-start">
          Forgot Password
        </Typography>
        <Typography className="font-normal [&:not(:first-child)]:mt-0">
          We have sent a password reset link to your email. Check your email
          spam folder if you can&apos;t find it.
        </Typography>
      </div>
    );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Email</FormLabel>
                <FormControl className="py-1 h-max">
                  <Input type="email" variant={"destructive"} {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormSubmitButton
          loadingText="Getting..."
          loading={form.formState.isSubmitting}
          disabled={form.formState.isSubmitting}
          variant={"outline"}
          className="px-6 w-full sm:w-max text-destructive"
        >
          Get New Password
        </FormSubmitButton>
      </form>
    </Form>
  );
}

export default ForgotPasswordForm;
