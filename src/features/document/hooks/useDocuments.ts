import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { documentKeys } from "../api/document.keys";

export const useDocuments = () => {
  return useQuery({
    queryKey: documentKeys.lists(),
    queryFn: documentApi.getAll,
  });
};
