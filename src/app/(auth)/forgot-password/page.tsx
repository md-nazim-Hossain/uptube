import Link from "next/link";
import React from "react";
import { Typography } from "@/components/ui/typography";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

function page() {
  return (
    <div className="space-y-5">
      <Typography variant={"h2"}> Forgot Password</Typography>
      <Typography>
        Please enter your registered email address. You will receive a link to
        create a new password via email.
      </Typography>
      <ForgotPasswordForm />
      <Typography>
        Returns to{" "}
        <Link href="/signin" className="text-red-500 hover:underline">
          Sign In
        </Link>
      </Typography>
    </div>
  );
}

export default page;
