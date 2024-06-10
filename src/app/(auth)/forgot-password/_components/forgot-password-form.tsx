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
function ForgotPasswordForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
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
