"use client";

import Link from "next/link";
import React from "react";
import { Typography } from "@/components/ui/typography";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

function ForgotPasswordPage() {
  const [isSent, setIsSent] = React.useState(false);
  return (
    <div className="space-y-5">
      {!isSent && (
        <>
          <Typography variant={"h2"}> Forgot Password</Typography>
          <Typography>
            Please enter your registered email address. You will receive a link
            to create a new password via email.
          </Typography>
        </>
      )}
      <ForgotPasswordForm onSuccess={() => setIsSent(true)} />
      <Typography>
        Returns to{" "}
        <Link href="/signin" className="text-red-500 hover:underline">
          Sign In
        </Link>
      </Typography>
    </div>
  );
}

export default ForgotPasswordPage;
