import { Controller, UseFormReturn } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import { CreateDocumentFormValues } from "../../schemas/create-document.schema";

type Member = {
  id: string;
  name: string;
};

type Props = {
  form: UseFormReturn<CreateDocumentFormValues>;
  members: Member[] | undefined;
};

export function ApprovalSelect({ form, members }: Props) {
  return (
    <Controller
      name="assignedTo"
      control={form.control}
      render={({ field }) => (
        <Select value={field.value} onValueChange={field.onChange}>
          <SelectTrigger className="w-full max-w-48">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Assign To</SelectLabel>

              {members?.map((member) => (
                <SelectItem key={member.id} value={member.id}>
                  {member.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}
    />
  );
}
