import Link from "next/link";
import React from "react";
import SignInForm from "./_components/signin-form";
import { Typography } from "@/components/ui/typography";

function page() {
  return (
    <div>
      <Typography variant={"h3"}> Sign In</Typography>
      <Typography variant={"h5"} className="py-5 font-normal">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-red-500">
          Sign Up
        </Link>
      </Typography>
      <SignInForm />
    </div>
  );
}

export default page;
