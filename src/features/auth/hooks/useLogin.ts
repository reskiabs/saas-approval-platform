"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { loginRequest } from "../services/login.service";
import { toast } from "sonner";

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: loginRequest,

    onSuccess: () => {
      router.push("/dashboard");
    },

    onError: (error: Error) => {
      // alert(error.message);
      toast.error(error.message)
    },
  });
}