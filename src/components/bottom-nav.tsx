"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Flame, Heart, User } from "lucide-react";

const navItems = [
  { href: "/swipe", icon: Flame, label: "Discover" },
  { href: "/matches", icon: Heart, label: "Matches" },
  { href: "/profile", icon: User, label: "Profile" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-xl transition-all ${
                isActive
                  ? "text-cmu-red"
                  : "text-cmu-gray hover:text-cmu-red/70"
              }`}
            >
              <item.icon
                className={`w-6 h-6 transition-all ${
                  isActive ? "fill-cmu-red/20 stroke-cmu-red" : ""
                }`}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span className="text-[10px] font-semibold tracking-wide uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
