"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createClient } from "@/shared/lib/supabase/client";

import { useActiveOrganization } from "@/features/auth/hooks/useActiveOrganization";
import { useCurrentUser } from "@/features/auth/hooks/useCurrentUser";
import { useOrganizationMembers } from "@/features/auth/hooks/useOrganizationMembers";
import { useCreateDocument } from "@/features/document/hooks/useCreateDocument";

import { toast } from "sonner";
import {
  CreateDocumentFormValues,
  createDocumentSchema,
} from "../schemas/create-document.schema";
import { generateFileName } from "../utils/generate-filename";

export function useCreateDocumentForm() {
  const router = useRouter();

  const { mutateAsync, isPending } = useCreateDocument();
  const { data: user } = useCurrentUser();
  const { data: members } = useOrganizationMembers();
  const { activeOrganization } = useActiveOrganization();

  const form = useForm<CreateDocumentFormValues>({
    resolver: zodResolver(createDocumentSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const supabase = createClient();

    const file = values.file?.[0];
    if (!file) return;

    const fileName = generateFileName(file.name);

    const filePath = `${activeOrganization?.organizationId}/${fileName}`;

    const { error } = await supabase.storage
      .from("documents")
      .upload(filePath, file);

    if (error) {
      toast.error("Failed to upload document");
      console.error(error);
      return;
    }

    const { data } = supabase.storage.from("documents").getPublicUrl(filePath);

    await mutateAsync({
      organization_id: activeOrganization?.organizationId ?? "",
      created_by: user?.id ?? "",
      assigned_to: values.assignedTo,
      title: values.title,
      description: values.description,
      file_url: data.publicUrl,
      file_name: file.name,
      file_size: file.size,
      mime_type: file.type,
      total_steps: 3,
    });

    router.push("/documents");
  });

  return {
    form,
    onSubmit,
    members,
    user,
    activeOrganization,
    isSubmitting: form.formState.isSubmitting || isPending,
  };
}
