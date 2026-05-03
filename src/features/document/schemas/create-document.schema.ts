import { z } from "zod";

export const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const createDocumentSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(120, "Title must be at most 120 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters")
    .optional(),

  assignedTo: z.string().min(1, "Approver is required"),

  file: z
    .custom<FileList>()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: "Document file is required",
    })
    .refine(
      (file) =>
        file.length === 0 ||
        ACCEPTED_TYPES.includes(
          file[0].type as (typeof ACCEPTED_TYPES)[number],
        ),
      {
        message: "Only PDF, DOC, or DOCX files are allowed",
      },
    )
    .refine((file) => file.length === 0 || file[0].size <= MAX_FILE_SIZE, {
      message: "Maximum file size is 10 MB",
    }),
});

export type CreateDocumentFormValues = z.infer<typeof createDocumentSchema>;
