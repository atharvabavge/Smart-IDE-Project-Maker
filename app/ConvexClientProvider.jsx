"use client";
import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";

function ConvexClientProvider({ children }) {
  // Log to ensure the environment variable is being read
  console.log("Convex URL:", process.env.NEXT_PUBLIC_CONVEX_URL);

  // Initialize the Convex client with the URL
  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL);

  return (
    <ConvexProvider client={convex}>
      {children}
    </ConvexProvider>
  );
}

export default ConvexClientProvider;
