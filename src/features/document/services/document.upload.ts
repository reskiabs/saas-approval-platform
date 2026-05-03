import { createClient } from "@/shared/lib/supabase/client";

export async function uploadDocumentFile(file: File) {
  const supabase = createClient();

  const fileExt = file.name.split(".").pop();
  const fileName = `${crypto.randomUUID()}.${fileExt}`;
  const filePath = `documents/${fileName}`;

  const { error } = await supabase.storage
    .from("documents")
    .upload(filePath, file);

  if (error) {
    throw new Error(error.message);
  }

  return {
    filePath,
    fileName: file.name,
    fileSize: file.size,
    mimeType: file.type,
  };
}
