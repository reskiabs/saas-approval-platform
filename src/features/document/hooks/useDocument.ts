import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { documentKeys } from "../api/document.keys";

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => documentApi.getDocumentById(id),
    enabled: !!id,
  });
};
