"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormSubmitButton,
} from "../ui/form";
import { useParams, useRouter } from "next/navigation";
import { IAPIResponse } from "@/types";
import { useToast } from "../ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import axios from "@/utils/axios";
import { apiRoutes } from "@/utils/routes";

const verifyAccountSchema = z.object({
  verifyCode: z.string().min(6, {
    message: "Your verify code must be 6 characters.",
  }),
  email: z.string(),
});

type Props = {
  handleChangeAuthModalState?: (state: string) => void;
};
function VerifyAccount({ handleChangeAuthModalState }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const email = useParams()?.email as string;
  const form = useForm<z.infer<typeof verifyAccountSchema>>({
    resolver: zodResolver(verifyAccountSchema),
    defaultValues: {
      verifyCode: "",
      email: decodeURIComponent(email),
    },
    mode: "all",
  });

  async function onSubmit(values: z.infer<typeof verifyAccountSchema>) {
    try {
      await axios
        .post(apiRoutes.users.verifyAccount, values)
        .then((res) => res.data);
      toast({
        title: "Verification Successful",
        description: "You have successfully verified your account.",
      });
      handleChangeAuthModalState
        ? handleChangeAuthModalState("signin")
        : router.push("/signin");
    } catch (error: IAPIResponse<any> | any) {
      console.log(error);
      toast({
        title: "Verification Failed",
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
          name="verifyCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verify Code</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmitButton
          loadingText="Verifying..."
          loading={form.formState.isSubmitting}
          variant={"outline"}
          className="sm:max-w-[15rem] w-full text-destructive"
        >
          Verify
        </FormSubmitButton>
      </form>
    </Form>
  );
}

export default VerifyAccount;
