import React from "react";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default ProtectedRoute;
