import Link from "next/link";
import React from "react";
import SignUpForm from "./_components/sign-up-form";
import { Typography } from "@/components/ui/typography";

function page() {
  return (
    <>
      <Typography variant={"h3"}> Sign Up</Typography>{" "}
      <Typography variant={"h5"} className="py-5 font-normal">
        Already have an account?{" "}
        <Link href="/signin" className="text-red-500">
          Sign In
        </Link>
      </Typography>
      <SignUpForm />
    </>
  );
}

export default page;
