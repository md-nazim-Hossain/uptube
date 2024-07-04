import AuthProvider from "@/components/providers/auth-provider";
import React from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default ProtectedRoute;
