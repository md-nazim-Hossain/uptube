import Link from "next/link";
import React from "react";
import ForgotPasswordForm from "./_components/forgot-password-form";

function page() {
  return (
    <div className="space-y-5">
      <h3> Forgot Password</h3>
      <h6>
        Please enter your username or email address. You will receive a link to
        create a new password via email.
      </h6>
      <ForgotPasswordForm />
      <h6>
        Returns to{" "}
        <Link href="/signin" className="text-red-500">
          Sign In
        </Link>
      </h6>
    </div>
  );
}

export default page;
