"use client";

interface ProfileAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const COLORS = [
  "from-rose-500 to-pink-600",
  "from-violet-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-emerald-500 to-teal-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-blue-600",
  "from-fuchsia-500 to-pink-600",
  "from-lime-500 to-green-600",
];

function getColorFromName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return COLORS[Math.abs(hash) % COLORS.length];
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const sizeClasses = {
  sm: "w-10 h-10 text-sm",
  md: "w-14 h-14 text-lg",
  lg: "w-20 h-20 text-2xl",
  xl: "w-32 h-32 text-4xl",
};

export function ProfileAvatar({ name, size = "md", className = "" }: ProfileAvatarProps) {
  const color = getColorFromName(name);
  const initials = getInitials(name);

  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-full flex items-center justify-center text-white font-bold shadow-lg ${sizeClasses[size]} ${className}`}
    >
      {initials}
    </div>
  );
}
