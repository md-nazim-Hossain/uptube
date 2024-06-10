import Link from "next/link";
import React from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";
import { Typography } from "@/components/ui/typography";

function page() {
  return (
    <div className="space-y-5">
      <Typography variant={"h3"}> Forgot Password</Typography>
      <Typography>
        Please enter your username or email address. You will receive a link to
        create a new password via email.
      </Typography>
      <ForgotPasswordForm />
      <Typography>
        Returns to{" "}
        <Link href="/signin" className="text-red-500">
          Sign In
        </Link>
      </Typography>
    </div>
  );
}

export default page;
