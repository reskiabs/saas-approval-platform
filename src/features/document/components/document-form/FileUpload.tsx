import { UseFormReturn } from "react-hook-form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Upload } from "lucide-react";
import { CreateDocumentFormValues } from "../../schemas/create-document.schema";

type Props = {
  form: UseFormReturn<CreateDocumentFormValues>;
  currentFile: File | null;
};

export function FileUpload({ form, currentFile }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Document File</CardTitle>
        <CardDescription>Upload PDF, DOC, or DOCX up to 10 MB.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="relative rounded-2xl border border-dashed p-8">
          <div className="text-center">
            <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

            <Label htmlFor="file" className="cursor-pointer">
              Choose file to upload
            </Label>
          </div>

          <Input
            id="file"
            type="file"
            className="sr-only"
            {...register("file")}
          />

          {currentFile && <div className="mt-4">{currentFile.name}</div>}

          {errors.file && (
            <p className="text-xs text-destructive">
              {errors.file.message as string}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
