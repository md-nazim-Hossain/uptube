"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDebounceCallback } from "usehooks-ts";

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
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import axios from "@/utils/axios";
import { IAPIResponse, IUser } from "@/types";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { apiRoutes } from "@/utils/routes";
const formSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .refine(
        (val) => !val.startsWith("@"),
        "The username cannot start with @ symbol.",
      ),
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
    fullName: z.string().min(1, { message: "This field has to be filled." }),
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

type Props = {
  handleChangeAuthModalState?: (state: string) => void;
};

function SignUpForm({ handleChangeAuthModalState }: Props) {
  const [isCheckingUsername, setIsCheckingUsername] = React.useState(false);
  const [usernameMessage, setUsernameMessage] = React.useState("");
  const [username, setUsername] = React.useState("");

  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
    mode: "all",
  });

  const debouncedValue = useDebounceCallback(setUsername, 500);

  useEffect(() => {
    (async () => {
      if (!username) return;
      setUsernameMessage("");
      setIsCheckingUsername(true);
      try {
        const res = (await axios
          .get(`/users/check-username-unique/${username}`)
          .then((res) => res.data)) as IAPIResponse<null>;
        setUsernameMessage(res.message);
        setUsername("");
      } catch (error: any) {
        setUsernameMessage(error?.message);
      } finally {
        setIsCheckingUsername(false);
      }
    })();
  }, [username]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data } = (await axios
        .post(apiRoutes.users.register, values)
        .then((res) => res.data)) as IAPIResponse<IUser>;
      toast({
        title: "Sign Up Successful",
        description: "You have successfully signed up. Please login.",
      });
      handleChangeAuthModalState
        ? handleChangeAuthModalState("verify")
        : router.push(`/verify/${data?.email}`);
    } catch (error: IAPIResponse<any> | any) {
      console.log(error);
      toast({
        title: "Sign Up Failed",
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Username</FormLabel>
                <FormControl className="py-1 h-max">
                  <Input
                    variant={"destructive"}
                    {...field}
                    onChange={(e) => {
                      field.onChange(e.target.value);
                      debouncedValue(e.target.value);
                    }}
                  />
                </FormControl>
              </div>
              {isCheckingUsername && (
                <div className="mt-2 gap-2 text-secondary flex items-center">
                  <Loader2 className="size-4 animate-spin" />
                  <span className="text-xs">Checking...</span>
                </div>
              )}
              {usernameMessage && !form.formState.errors.username && (
                <FormMessage
                  className={cn(
                    "",
                    usernameMessage === "username is available"
                      ? "text-green-500"
                      : "text-destructive",
                  )}
                >
                  {usernameMessage}
                </FormMessage>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <div>
                <FormLabel>Full Name</FormLabel>
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
