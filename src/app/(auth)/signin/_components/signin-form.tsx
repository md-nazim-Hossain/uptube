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
import Link from "next/link";
const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(255),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximum 32 characters")
    .regex(passwordRegex, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
    }),
});

type Props = {
  handleChangePage?: (page: string) => void;
};
function SignInForm({ handleChangePage }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Username or Email</FormLabel>
                <FormControl className="py-1 h-max">
                  <Input variant={"destructive"} {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div>
                <div className="flex justify-between items-center">
                  <FormLabel>Password</FormLabel>
                  {!handleChangePage ? (
                    <Link
                      href="/forgot-password"
                      className="text-xs hover:underline font-normal text-secondary"
                    >
                      Lost your password?
                    </Link>
                  ) : (
                    <span
                      onClick={() => handleChangePage("forgot-password")}
                      className="text-xs hover:underline font-normal text-secondary cursor-pointer"
                    >
                      Lost your password?
                    </span>
                  )}
                </div>
                <FormControl className="py-1 h-max">
                  <Input type="password" variant={"destructive"} {...field} />
                </FormControl>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          loadingText="Signing..."
          loading={form.formState.isSubmitting}
          variant={"outline"}
          className="sm:max-w-[15rem] w-full text-destructive"
        >
          Sign In
        </FormSubmitButton>
      </form>
    </Form>
  );
}

export default SignInForm;
