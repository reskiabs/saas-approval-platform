import { Input } from "@/shared/components/ui/input";
import { Search } from "lucide-react";

type DocumentsToolbarProps = {
  keyword: string;
  onKeywordChange: (value: string) => void;
};

export function DocumentsToolbar({
  keyword,
  onKeywordChange,
}: DocumentsToolbarProps) {
  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        value={keyword}
        onChange={(e) => onKeywordChange(e.target.value)}
        placeholder="Search documents..."
        className="pl-9"
        aria-label="Search documents"
      />
    </div>
  );
}
