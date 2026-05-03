import { useActiveOrganization } from "@/features/auth/hooks/useActiveOrganization";
import { useQuery } from "@tanstack/react-query";
import { documentApi } from "../api/document.api";
import { documentKeys } from "../api/document.keys";
import { GetDocumentsParams } from "../types/documents";

export const useDocuments = (params?: GetDocumentsParams) => {
  const { activeOrganization } = useActiveOrganization();

  const organizationId = activeOrganization?.organizationId;

  return useQuery({
    queryKey: documentKeys.list({
      ...params,
      organizationId,
    }),
    enabled: !!organizationId,

    queryFn: () =>
      documentApi.getAll({
        ...params,
        organizationId: organizationId!,
      }),
  });
};
