import { Skeleton } from "@/shared/components/ui/skeleton";

export function DocumentsTableSkeleton() {
  return (
    <tbody>
      {Array.from({ length: 8 }).map((_, index) => (
        <tr key={index} className="border-b last:border-0">
          <td className="px-4 py-3">
            <Skeleton className="h-4 w-64" />
          </td>

          <td className="px-4 py-3">
            <Skeleton className="h-4 w-24" />
          </td>

          <td className="px-4 py-3">
            <Skeleton className="h-4 w-36" />
          </td>

          <td className="px-4 py-3">
            <Skeleton className="h-4 w-40" />
          </td>

          <td className="px-4 py-3">
            <Skeleton className="h-4 w-32" />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
