"use client";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import {
  LayoutDashboard,
  FileText,
  Settings,
  BarChart,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "./logo";

const navigation = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Knowledge Base",
    href: "/dashboard/knowledge",
    icon: FileText,
  },
  {
    name: "Usage & Costs",
    href: "/dashboard/usage",
    icon: BarChart,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col border-r border-neutral-800 bg-neutral-900/95 transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Header */}
      <div className="flex h-[60px] items-center border-b border-neutral-800 px-4">
        <Logo collapsed={collapsed} />
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex flex-col gap-1 p-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2",
                    isActive
                      ? "bg-neutral-800 text-white hover:bg-neutral-800"
                      : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-neutral-800 p-2">
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-neutral-400 hover:text-white hover:bg-neutral-800"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
          {!collapsed && <span>Collapse</span>}
        </Button>
      </div>
    </div>
  );
}
