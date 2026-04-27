"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginRequest } from "../services/login.service";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: () => {
      toast.success("Welcome back");
      router.push("/dashboard");
    },

    onError: (error: Error) => {
      // alert(error.message);
      toast.error(error.message);
    },
  });
}
