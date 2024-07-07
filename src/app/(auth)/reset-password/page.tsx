import ResetPasswordForm from "@/components/auth/reset-password-form";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const { token } = searchParams;
  if (!token) redirect("/");
  return (
    <>
      <Typography variant={"h2"}> Reset Password</Typography>
      <Typography className="py-5 font-normal [&:not(:first-child)]:mt-0">
        Please enter your new password.
        <Link href="/signin" className="text-red-500 ml-1 hover:underline">
          Sign In
        </Link>
      </Typography>
      <ResetPasswordForm token={token} />
    </>
  );
}

export default ResetPasswordPage;
