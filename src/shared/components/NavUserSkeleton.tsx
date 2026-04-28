import { SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-2 px-2 py-2">
          {/* avatar */}
          <Skeleton className="h-8 w-8 rounded-lg" />

          {/* name + email */}
          <div className="grid flex-1 gap-1">
            <Skeleton className="h-3 w-30" />
            <Skeleton className="h-3 w-40" />
          </div>

          {/* chevron */}
          <Skeleton className="size-4" />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
