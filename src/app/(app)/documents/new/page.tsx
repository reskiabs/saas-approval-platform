"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, ShieldCheck, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().max(500).optional(),
  category: z.string().min(1),
  approver: z.string().min(1),
  priority: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export default function CreateDocumentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const refNo = useMemo(
    () => `DOC-${new Date().getFullYear()}-${String(108).padStart(4, "0")}`,
    [],
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      category: "policy",
      approver: "michelle",
      priority: "normal",
    },
  });

  const desc = form.watch("description") || "";

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setUploadProgress(25);
    await new Promise((r) => setTimeout(r, 500));
    setUploadProgress(70);
    await new Promise((r) => setTimeout(r, 700));
    setUploadProgress(100);
    await new Promise((r) => setTimeout(r, 400));
    console.log(values);
    setIsSubmitting(false);
  }

  return (
    <div>
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-semibold tracking-tight">
              Create New Document
            </h1>
            <Badge variant="secondary">Draft</Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Submit a file for review and approval.
          </p>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6 lg:grid-cols-12"
        >
          <div className="space-y-6 lg:col-span-8">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Core metadata for your document.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label>Reference Number</Label>
                  <Input value={refNo} readOnly />
                </div>

                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    {...form.register("title")}
                    placeholder="Quarterly Budget Proposal"
                  />
                  <p className="text-xs text-destructive">
                    {form.formState.errors.title?.message}
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select
                      defaultValue="policy"
                      onValueChange={(v) => form.setValue("category", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="policy">Policy</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="legal">Legal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select
                      defaultValue="normal"
                      onValueChange={(v) => form.setValue("priority", v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    rows={6}
                    {...form.register("description")}
                    placeholder="Provide context for reviewers..."
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Optional details for reviewers.</span>
                    <span>{desc.length}/500</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>File Upload</CardTitle>
                <CardDescription>PDF or DOCX up to 10 MB.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-dashed p-8 text-center">
                  <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">Drag & drop file here</p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse
                  </p>
                </div>
                {isSubmitting && <Progress value={uploadProgress} />}
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Approval Flow</CardTitle>
                <CardDescription>
                  Choose reviewer and routing settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Approver</Label>
                  <Select
                    defaultValue="michelle"
                    onValueChange={(v) => form.setValue("approver", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="michelle">Michelle Tan</SelectItem>
                      <SelectItem value="budi">Budi Santoso</SelectItem>
                      <SelectItem value="sarah">Sarah Putri</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <Card className="rounded-2xl">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Status</span>
                  <Badge>Draft</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Creator</span>
                  <span>Reski Abbas</span>
                </div>
                <div className="flex justify-between">
                  <span>Organization</span>
                  <span>Acme Corporation</span>
                </div>
                <Separator />
                <div className="flex justify-between">
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
                  <FileText className="h-4 w-4 mt-0.5" />
                  <p>Use clear and searchable titles.</p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="h-4 w-4 mt-0.5" />
                  <p>Only approved users can finalize this document.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-12 sticky bottom-0 z-10 border-t bg-background/95 backdrop-blur py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button type="button" variant="ghost">
                Cancel
              </Button>
              <Button type="button" variant="outline">
                Save Draft
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Document"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
