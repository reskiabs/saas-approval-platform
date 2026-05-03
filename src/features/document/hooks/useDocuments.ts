import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { documentKeys } from "../api/document.keys";
import { GetDocumentsParams } from "../types/documents";

export const useDocuments = (params?: GetDocumentsParams) => {
  return useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () => documentApi.getAll(params),
  });
};
