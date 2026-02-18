"use client";

import { getState, clearAllData } from "@/lib/store";
import { getInitials } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  BookOpen,
  MapPin,
  LogOut,
  Heart,
  Users,
} from "lucide-react";

interface Props {
  onLogout: () => void;
}

export function ProfileView({ onLogout }: Props) {
  const state = getState();
  const user = state.user;

  if (!user) return null;

  const stats = [
    { label: "Likes Sent", value: user.likedIds.length, icon: Heart },
    { label: "Matches", value: state.matches.length, icon: Users },
    { label: "Passed", value: user.passedIds.length, icon: Users },
  ];

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-6 py-6">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div
            className="w-28 h-28 rounded-full flex items-center justify-center shadow-xl mb-4"
            style={{
              background: `linear-gradient(135deg, ${user.avatarGradient[0]}, ${user.avatarGradient[1]})`,
            }}
          >
            <span className="text-4xl font-bold text-white">
              {getInitials(user.name)}
            </span>
          </div>
          <h2 className="text-xl font-bold">
            {user.name}, {user.age}
          </h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {user.year}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {user.major}
            </span>
          </div>
          <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="w-3 h-3" />
            {user.college}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-secondary rounded-2xl p-3 text-center"
            >
              <stat.icon className="w-4 h-4 mx-auto mb-1 text-primary" />
              <p className="text-xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {user.bio}
          </p>
        </div>

        {/* Interests */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-1.5">
            {user.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="rounded-full text-xs px-2.5 py-1"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Logout */}
        <Button
          variant="outline"
          onClick={() => {
            clearAllData();
            onLogout();
          }}
          className="w-full h-11 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/20"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out & Reset
        </Button>
      </div>
    </div>
  );
}
