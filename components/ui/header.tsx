"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { LayoutDashboard, MessageSquare, UserCircle } from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Chat",
    href: "/chat",
    icon: MessageSquare,
  },
];

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <item.icon className="h-4 w-4" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
          <div className="w-[1px] h-4 bg-neutral-800" />
          <button className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors">
            <UserCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
