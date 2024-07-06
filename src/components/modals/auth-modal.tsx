"use client";

import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import ForgotPasswordForm from "../auth/forgot-password-form";
import { useAuthStore } from "@/zustand/useAuthStore";
import SignInForm from "../auth/signin-form";
import SignUpForm from "../auth/sign-up-form";
import VerifyAccount from "../auth/verify-account";
import { Typography } from "../ui/typography";

function AuthModal() {
  const { open, setOpen } = useAuthStore((state) => state);
  const [currentAuthState, setCurrentAuthState] = React.useState("signin");
  const handleChangeAuthModalState = (val: string) => {
    setCurrentAuthState(val);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showClose={false}>
        {(currentAuthState === "signup" || currentAuthState === "signin") && (
          <>
            <Typography variant={"h3"}>
              {currentAuthState === "signup" ? "Sign Up" : "Sign In"}
            </Typography>
            <Typography
              variant={"p"}
              className="py-5 font-normal [&:not(:first-child)]:mt-0"
            >
              {currentAuthState === "signup"
                ? "Already have an account?"
                : "Don't have an account"}

              <span
                onClick={() =>
                  handleChangeAuthModalState(
                    currentAuthState === "signup" ? "signin" : "signup",
                  )
                }
                className="text-red-500 cursor-pointer"
              >
                {currentAuthState === "signup" ? " Sign In" : " Sign Up"}
              </span>
            </Typography>
          </>
        )}
        {currentAuthState === "forgot-password" && (
          <>
            <Typography variant={"h3"}> Forgot Password</Typography>
            <Typography variant={"muted"}>
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </Typography>
          </>
        )}
        {currentAuthState === "verify" && (
          <>
            <Typography variant={"h3"}> Verify Account</Typography>
            <Typography className="py-5 font-normal [&:not(:first-child)]:mt-0">
              Already Verified{" "}
              <span
                onClick={() => handleChangeAuthModalState("signin")}
                className="text-red-500"
              >
                Sign In
              </span>
            </Typography>
          </>
        )}
        {currentAuthState === "signin" && (
          <SignInForm handleChangeAuthModalState={handleChangeAuthModalState} />
        )}
        {currentAuthState === "signup" && (
          <SignUpForm handleChangeAuthModalState={handleChangeAuthModalState} />
        )}
        {currentAuthState === "verify" && (
          <VerifyAccount
            handleChangeAuthModalState={handleChangeAuthModalState}
          />
        )}
        {currentAuthState === "forgot-password" && (
          <>
            <ForgotPasswordForm />
            <h6>
              Returns to{" "}
              <span
                onClick={() => handleChangeAuthModalState("signin")}
                className="text-red-500 cursor-pointer"
              >
                Sign In
              </span>
            </h6>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default AuthModal;
