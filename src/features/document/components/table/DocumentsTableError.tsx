import { Button } from "@/shared/components/ui/button";

type DocumentsTableErrorProps = {
  onRetry: () => void;
};

export function DocumentsTableError({ onRetry }: DocumentsTableErrorProps) {
  return (
    <tbody>
      <tr>
        <td colSpan={5} className="px-4 py-10 text-center">
          <div className="space-y-3">
            <p className="text-sm text-destructive">
              Failed to load documents.
            </p>

            <Button type="button" variant="outline" size="sm" onClick={onRetry}>
              Retry
            </Button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}
