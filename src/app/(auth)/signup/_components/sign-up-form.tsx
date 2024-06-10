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
import { passwordRegex } from "@/utils/common";
const formSchema = z
  .object({
    username: z.string().min(1, { message: "This field has to be filled." }),
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

    password: z
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
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function SignUpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
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
                <FormLabel>Username</FormLabel>
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Email Address</FormLabel>
                <FormControl className="py-1 h-max">
                  <Input type="email" variant={"destructive"} {...field} />
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
                <FormLabel>Password</FormLabel>
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
          loadingText="Creating..."
          loading={form.formState.isSubmitting}
          variant={"outline"}
          className="sm:max-w-[15rem] w-full text-destructive"
        >
          Create an account
        </FormSubmitButton>
      </form>
    </Form>
  );
}

export default SignUpForm;
