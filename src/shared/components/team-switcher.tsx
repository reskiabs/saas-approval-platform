"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/components/ui/sidebar";
import { toTitleCase } from "../utils/to-title-case";

type Team = {
  id: string;
  name: string;
  logo: React.ElementType;
  role: string;
};

type TeamSwitcherProps = {
  teams: Team[];
  activeTeamId?: string;
  onSelectTeam: (teamId: string) => void;
};

export function TeamSwitcher({
  teams,
  activeTeamId,
  onSelectTeam,
}: TeamSwitcherProps) {
  const { isMobile } = useSidebar();

  const activeTeam = teams.find((t) => t.id === activeTeamId) ?? teams[0];

  if (!activeTeam) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <activeTeam.logo className="size-4" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{activeTeam.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {toTitleCase(activeTeam.role)}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
            className="min-w-56 rounded-lg"
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>

            {teams.map((team, index) => {
              const isActive = team.id === activeTeam.id;

              return (
                <DropdownMenuItem
                  key={team.id}
                  onClick={() => onSelectTeam(team.id)}
                  className={`gap-2 p-2 ${
                    isActive ? "bg-muted font-medium" : ""
                  }`}
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <team.logo className="size-3.5" />
                  </div>

                  {team.name}

                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
