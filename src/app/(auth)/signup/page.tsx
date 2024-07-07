import Link from "next/link";
import React from "react";
import { Typography } from "@/components/ui/typography";
import SignUpForm from "@/components/auth/sign-up-form";

function page() {
  return (
    <>
      <Typography variant={"h2"}>Create an account</Typography>{" "}
      <Typography className="py-5 font-normal [&:not(:first-child)]:mt-0">
        Already have an account?{" "}
        <Link href="/signin" className="text-red-500 hover:underline">
          Sign In
        </Link>
      </Typography>
      <SignUpForm />
    </>
  );
}

export default page;
