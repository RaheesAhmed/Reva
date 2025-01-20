import { cn } from "@/lib/utils";
import Link from "next/link";

interface LogoProps {
  collapsed?: boolean;
  className?: string;
}

export function Logo({ collapsed = false, className }: LogoProps) {
  if (collapsed) {
    return (
      <Link
        href="/"
        className={cn("flex items-center justify-center", className)}
      >
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600">
          r
        </span>
      </Link>
    );
  }

  return (
    <Link href="/" className={cn("flex items-center group", className)}>
      <div className="flex items-baseline">
        <span className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600 tracking-tight">
          reva
        </span>
        <span className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/70">
          .
        </span>
        <span className="text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-reva-400 via-reva-500 to-reva-600">
          ai
        </span>
      </div>
      <div className="absolute -bottom-0.5 left-0 w-full h-[1.5px] bg-gradient-to-r from-reva-400 to-reva-600 opacity-0 group-hover:opacity-100 transform origin-left transition-all duration-300 scale-x-0 group-hover:scale-x-100"></div>
    </Link>
  );
}
