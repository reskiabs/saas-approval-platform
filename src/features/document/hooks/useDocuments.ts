import { useActiveOrganization } from "@/features/auth/hooks/useActiveOrganization";
import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { documentKeys } from "../api/document.keys";
import { GetDocumentsParams } from "../types/documents";

export const useDocuments = (params?: GetDocumentsParams) => {
  const { activeOrganization } = useActiveOrganization();
  return useQuery({
    queryKey: documentKeys.list(params),
    queryFn: () =>
      documentApi.getAll({
        ...params,
        organizationId: activeOrganization?.organizationId ?? "",
      }),
  });
};
