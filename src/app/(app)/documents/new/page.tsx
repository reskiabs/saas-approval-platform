"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { useCreateDocument } from "@/features/document/hooks/useCreateDocument";

import { Badge } from "@/shared/components/ui/badge/badge";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Progress } from "@/shared/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";
import { Textarea } from "@/shared/components/ui/textarea";

import { FileText, ShieldCheck, Upload } from "lucide-react";

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const schema = z.object({
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
    .any()
    .refine((file) => file instanceof FileList && file.length > 0, {
      message: "Document file is required",
    })
    .refine(
      (file) =>
        !(file instanceof FileList) ||
        file.length === 0 ||
        ACCEPTED_TYPES.includes(file[0].type),
      {
        message: "Only PDF, DOC, or DOCX files are allowed",
      },
    )
    .refine(
      (file) =>
        !(file instanceof FileList) ||
        file.length === 0 ||
        file[0].size <= MAX_FILE_SIZE,
      {
        message: "Maximum file size is 10 MB",
      },
    ),
});

type FormValues = z.infer<typeof schema>;

export default function CreateDocumentPage() {
  const router = useRouter();

  const { mutateAsync, isPending } = useCreateDocument();

  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "a78acf39-bbcd-40aa-ab50-83027f92b32b",
    },
  });

  const title = watch("title") ?? "";
  const description = watch("description") ?? "";
  const selectedFile = watch("file");

  const currentFile =
    selectedFile instanceof FileList && selectedFile.length > 0
      ? selectedFile[0]
      : null;

  async function onSubmit(values: FormValues) {
    const file = values.file instanceof FileList ? values.file[0] : undefined;

    await mutateAsync({
      organization_id: "22b24f8b-899a-4a70-865f-d846f8c5fea4",
      created_by: "ec315426-6df5-4113-b7ac-e0e5ec0e0ead",

      assigned_to: values.assignedTo,

      title: values.title,
      description: values.description,

      file_url: `/uploads/${file?.name ?? "document.pdf"}`,
      file_name: file?.name,
      file_size: file?.size,
      mime_type: file?.type,

      total_steps: 3,
    });

    router.push("/documents");
  }

  const busy = isSubmitting || isPending;

  return (
    <main>
      {/* Skip link */}
      <a
        href="#main-form"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-3 focus:py-2 focus:shadow"
      >
        Skip to form
      </a>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            Create New Document
          </h1>

          <Badge variant="secondary">Draft</Badge>
        </div>

        <p className="text-sm text-muted-foreground">
          Submit a document for internal review and approval.
        </p>
      </header>

      <form
        id="main-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        aria-describedby="form-status"
        className="grid gap-6 lg:grid-cols-12"
      >
        {/* MAIN CONTENT */}
        <section
          aria-labelledby="document-details-heading"
          className="space-y-6 lg:col-span-8"
        >
          <h2 id="document-details-heading" className="sr-only">
            Document details
          </h2>

          {/* BASIC INFO */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the core details of this document.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="referenceNumber">Reference Number</Label>

                <Input
                  id="referenceNumber"
                  value="Reference number will be generated automatically after save."
                  readOnly
                  aria-readonly="true"
                />

                <p className="text-xs text-muted-foreground">
                  Automatically generated identifier.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-destructive">*</span>
                </Label>

                <Input
                  id="title"
                  placeholder="Quarterly Budget Proposal"
                  aria-required="true"
                  aria-invalid={!!errors.title}
                  aria-describedby={
                    errors.title ? "title-error title-help" : "title-help"
                  }
                  {...register("title")}
                />

                <div
                  id="title-help"
                  className="flex justify-between text-xs text-muted-foreground"
                >
                  <span>Use a clear and searchable document title.</span>
                  <span>{title.length}/120</span>
                </div>

                {errors.title && (
                  <p
                    id="title-error"
                    role="alert"
                    className="text-xs text-destructive"
                  >
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>

                <Textarea
                  id="description"
                  rows={6}
                  placeholder="Provide context for reviewers..."
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description
                      ? "description-error description-help"
                      : "description-help"
                  }
                  {...register("description")}
                />

                <div
                  id="description-help"
                  className="flex justify-between text-xs text-muted-foreground"
                >
                  <span>Optional notes to help approvers review.</span>
                  <span>{description.length}/500</span>
                </div>

                {errors.description && (
                  <p
                    id="description-error"
                    role="alert"
                    className="text-xs text-destructive"
                  >
                    {errors.description.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* FILE */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Document File</CardTitle>
              <CardDescription>
                Upload PDF, DOC, or DOCX up to 10 MB.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-dashed p-8">
                <div className="text-center">
                  <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

                  <Label htmlFor="file" className="cursor-pointer font-medium">
                    Choose file to upload
                  </Label>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Keyboard accessible file picker.
                  </p>
                </div>

                <Input
                  id="file"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="mt-4"
                  aria-required="true"
                  aria-invalid={!!errors.file}
                  aria-describedby={
                    errors.file ? "file-error file-help" : "file-help"
                  }
                  {...register("file")}
                />

                <p
                  id="file-help"
                  className="mt-2 text-xs text-muted-foreground"
                >
                  Accepted formats: PDF, DOC, DOCX.
                </p>

                {currentFile && (
                  <p className="mt-2 text-sm font-medium">
                    Selected: {currentFile.name}
                  </p>
                )}

                {errors.file && (
                  <p
                    id="file-error"
                    role="alert"
                    className="mt-2 text-xs text-destructive"
                  >
                    {errors.file.message as string}
                  </p>
                )}
              </div>

              {busy && <Progress value={70} aria-label="Upload progress" />}
            </CardContent>
          </Card>

          {/* APPROVAL */}
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Approval Flow</CardTitle>
              <CardDescription>Choose the next approver.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              <Label htmlFor="assignedTo">
                Approver <span className="text-destructive">*</span>
              </Label>

              <Controller
                name="assignedTo"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="assignedTo"
                      aria-invalid={!!errors.assignedTo}
                    >
                      <SelectValue />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="a78acf39-bbcd-40aa-ab50-83027f92b32b">
                        Michelle Tan
                      </SelectItem>

                      <SelectItem value="891f262e-213a-465e-a172-27292fc32eb4">
                        Budi Santoso
                      </SelectItem>

                      <SelectItem value="4b206aec-2f7d-4a09-b290-5040ea46649f">
                        Sarah Putri
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.assignedTo && (
                <p role="alert" className="text-xs text-destructive">
                  {errors.assignedTo.message}
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        {/* SIDEBAR */}
        <aside
          aria-label="Document summary"
          className="space-y-6 lg:col-span-4"
        >
          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between gap-4">
                <span>Status</span>
                <Badge>Draft</Badge>
              </div>

              <div className="flex justify-between gap-4">
                <span>Creator</span>
                <span>Daniel Prasetyo</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Organization</span>
                <span>Acme Corporation</span>
              </div>

              <Separator />

              <div className="flex justify-between gap-4">
                <span>Title Preview</span>
                <span className="max-w-45 truncate">{title || "-"}</span>
              </div>

              <div className="flex justify-between gap-4">
                <span>Approval Steps</span>
                <span>3</span>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>

            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex gap-3">
                <FileText className="mt-0.5 h-4 w-4 shrink-0" />
                <p>
                  Use descriptive titles so documents are easy to search later.
                </p>
              </div>

              <div className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
                <p>Only authorized approvers can finalize this document.</p>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* ACTIONS */}
        <section className="sticky bottom-0 z-10 border-t bg-background/95 py-4 backdrop-blur lg:col-span-12">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/documents")}
            >
              Cancel
            </Button>

            <Button type="button" variant="outline">
              Save Draft
            </Button>

            <Button type="submit" disabled={busy} aria-busy={busy}>
              {busy ? "Submitting..." : "Submit Document"}
            </Button>
          </div>

          <p id="form-status" className="sr-only" aria-live="polite">
            {busy ? "Submitting document, please wait." : "Form ready."}
          </p>
        </section>
      </form>
    </main>
  );
}
