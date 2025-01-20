"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/ui/logo";
import { LayoutDashboard, MessageSquare, UserCircle, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const { data: session, status } = useSession();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

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
          {status === 'authenticated' && session.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors outline-none">
                <UserCircle className="h-5 w-5" />
                <span className="font-medium">{session.user.name || session.user.email}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-neutral-900 border border-neutral-800">
                <DropdownMenuItem className="text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer">
                  Profile Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-neutral-800" />
                <DropdownMenuItem 
                  className="text-red-400 hover:text-red-300 hover:bg-neutral-800 cursor-pointer"
                  onClick={handleSignOut}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link 
              href="/sign-in"
              className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
            >
              <UserCircle className="h-5 w-5" />
              <span className="font-medium">Sign in</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
} 