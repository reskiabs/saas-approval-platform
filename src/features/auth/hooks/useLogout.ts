"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../services/logout.service";

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,

    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out");

      router.replace("/");

      router.refresh();
    },

    onError: () => {
      toast.error("Failed to logout");
    },
  });
}
