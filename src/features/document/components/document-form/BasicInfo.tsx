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
import { Textarea } from "@/shared/components/ui/textarea";
import { CreateDocumentFormValues } from "../../schemas/create-document.schema";

type Props = {
  form: UseFormReturn<CreateDocumentFormValues>;
};

export function BasicInfo({ form }: Props) {
  const {
    register,
    watch,
    formState: { errors },
  } = form;

  const title = watch("title") ?? "";
  const description = watch("description") ?? "";

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>
          Enter the core details of this document.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* TITLE */}
        <div className="space-y-2">
          <Label htmlFor="title">
            Title <span className="text-destructive">*</span>
          </Label>

          <Input
            id="title"
            placeholder="Quarterly Budget Proposal"
            {...register("title")}
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Use a clear and searchable document title.</span>
            <span>{title.length}/120</span>
          </div>

          {errors.title && (
            <p className="text-xs text-destructive">{errors.title.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>

          <Textarea id="description" rows={6} {...register("description")} />

          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Optional notes to help approvers review.</span>
            <span>{description.length}/500</span>
          </div>

          {errors.description && (
            <p className="text-xs text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
