import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { documentKeys } from "../api/document.keys";

type UseDocumentsParams = {
  page?: number;
  search?: string;
  status?: string;
};

export const useDocuments = (params?: UseDocumentsParams) => {
  return useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () => documentApi.getAll(params),
  });
};
