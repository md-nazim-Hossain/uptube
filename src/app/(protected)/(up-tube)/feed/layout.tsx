import React from "react";

function FeedLayout({ children }: { children: React.ReactNode }) {
  return <div className="container">{children}</div>;
}

export default FeedLayout;
