"use client";

import React from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import { useAuthStore } from "../zustand/useAuthStore";
import SignInForm from "@/app/(auth)/signin/_components/signin-form";
import SignUpForm from "@/app/(auth)/signup/_components/sign-up-form";
import ForgotPasswordForm from "@/app/(auth)/forgot-password/_components/forgot-password-form";

function AuthModal() {
  const { open, setOpen } = useAuthStore((state) => state);
  const [currentAuthPage, setCurrentAuthPage] = React.useState("signin");
  const handlePageChange = (page: string) => {
    setCurrentAuthPage(page);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent showClose={false}>
        {(currentAuthPage === "signup" || currentAuthPage === "signin") && (
          <>
            <h3>{currentAuthPage === "signup" ? "Sign Up" : "Sign In"}</h3>
            <h6 className="py-5">
              {currentAuthPage === "signup"
                ? "Already have an account?"
                : "Don't have an account"}
              ?{" "}
              <span
                onClick={() =>
                  handlePageChange(
                    currentAuthPage === "signup" ? "signin" : "signup",
                  )
                }
                className="text-red-500 cursor-pointer"
              >
                {currentAuthPage === "signup" ? "Sign In" : "Sign Up"}
              </span>
            </h6>
          </>
        )}
        {currentAuthPage === "forgot-password" && (
          <>
            <h3> Forgot Password</h3>
            <h6>
              Please enter your username or email address. You will receive a
              link to create a new password via email.
            </h6>
          </>
        )}
        {currentAuthPage === "signin" && (
          <SignInForm handleChangePage={handlePageChange} />
        )}
        {currentAuthPage === "signup" && <SignUpForm />}
        {currentAuthPage === "forgot-password" && (
          <>
            <ForgotPasswordForm />
            <h6>
              Returns to{" "}
              <span
                onClick={() => handlePageChange("signin")}
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
