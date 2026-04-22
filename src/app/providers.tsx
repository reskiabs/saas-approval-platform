"use client";

import { useEffect } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/queryClient";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    async function initMocks() {
      if (
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled" &&
        typeof window !== "undefined"
      ) {
        const { worker } = await import("@/mocks/browser");

        await worker.start({
          onUnhandledRequest: "bypass",
        });

        console.log("MSW Started...");
      }
    }

    initMocks();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}