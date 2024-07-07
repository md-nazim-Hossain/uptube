import Link from "next/link";
import React, { Suspense } from "react";
import { Typography } from "@/components/ui/typography";
import SignInForm from "@/components/auth/signin-form";

function page() {
  return (
    <div>
      <Typography variant={"h2"}> Sign In</Typography>
      <Typography className="py-5 font-normal [&:not(:first-child)]:mt-0">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-red-500 hover:underline">
          Sign Up
        </Link>
      </Typography>
      <Suspense>
        <SignInForm />
      </Suspense>
    </div>
  );
}

export default page;
