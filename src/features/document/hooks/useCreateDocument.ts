import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { documentKeys } from "../api/document.keys";

export const useCreateDocument = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: documentApi.create,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: documentKeys.lists(),
      });
    },
  });
};
