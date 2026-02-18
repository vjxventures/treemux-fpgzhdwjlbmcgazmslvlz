"use client";

import { useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ProfileAvatar } from "@/components/profile-avatar";
import { MapPin, GraduationCap, BookOpen, Quote } from "lucide-react";
import { Profile, CMU_DATE_SPOTS } from "@/lib/types";

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
}

export function SwipeCard({ profile, onSwipe, isTop }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 0, 200], [-15, 0, 15]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);
  const scale = useTransform(x, [-200, 0, 200], [0.95, 1, 0.95]);
  const [exitX, setExitX] = useState(0);

  const suggestedSpot =
    profile.favoriteSpot ||
    CMU_DATE_SPOTS[Math.floor(Math.random() * CMU_DATE_SPOTS.length)];

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    if (info.offset.x > threshold) {
      setExitX(500);
      onSwipe("right");
    } else if (info.offset.x < -threshold) {
      setExitX(-500);
      onSwipe("left");
    }
  };

  if (!isTop) {
    return (
      <div className="absolute inset-0">
        <div className="w-full h-full rounded-3xl bg-white shadow-lg border border-border overflow-hidden transform scale-[0.96] translate-y-2">
          <div className="h-[45%] bg-gradient-to-br from-cmu-red/10 to-cmu-gold/10 flex items-center justify-center">
            <ProfileAvatar name={profile.name} size="xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing swipe-card"
      style={{ x, rotate, scale }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={{ x: exitX }}
      transition={exitX !== 0 ? { duration: 0.3 } : undefined}
    >
      <div className="w-full h-full rounded-3xl bg-white shadow-2xl border border-border overflow-hidden relative">
        {/* Like/Nope stamps */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-6 z-30 border-4 border-green-500 rounded-xl px-4 py-1 rotate-[-15deg]"
        >
          <span className="text-green-500 font-black text-3xl tracking-wide">
            LIKE
          </span>
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 right-6 z-30 border-4 border-red-500 rounded-xl px-4 py-1 rotate-[15deg]"
        >
          <span className="text-red-500 font-black text-3xl tracking-wide">
            NOPE
          </span>
        </motion.div>

        {/* Top section with avatar */}
        <div className="h-[42%] bg-gradient-to-br from-cmu-red/8 to-cmu-gold/8 flex items-center justify-center relative">
          <div className="absolute inset-0 tartan-bg opacity-[0.03]" />
          <ProfileAvatar name={profile.name} size="xl" />
        </div>

        {/* Info section */}
        <div className="p-5 flex-1 overflow-y-auto no-scrollbar">
          {/* Name and basics */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <h2 className="text-2xl font-black text-cmu-dark">
                {profile.name}
              </h2>
              <span className="text-xl text-cmu-gray font-medium">
                {profile.age}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-cmu-gray text-sm mt-0.5">
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="font-medium">{profile.year}</span>
              <span className="text-border">|</span>
              <BookOpen className="w-3.5 h-3.5" />
              <span className="font-medium">{profile.major}</span>
            </div>
          </div>

          {/* Bio */}
          <div className="mb-3 relative">
            <Quote className="w-4 h-4 text-cmu-red/30 absolute -top-1 -left-1" />
            <p className="text-sm text-cmu-dark/80 leading-relaxed pl-4">
              {profile.bio}
            </p>
          </div>

          {/* Looking for */}
          {profile.lookingFor && (
            <div className="mb-3 bg-cmu-red/5 rounded-xl p-3">
              <p className="text-xs font-semibold text-cmu-red mb-0.5">
                LOOKING FOR
              </p>
              <p className="text-sm text-cmu-dark/80">{profile.lookingFor}</p>
            </div>
          )}

          {/* Interests */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {profile.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="text-xs font-medium bg-muted/80"
              >
                {interest}
              </Badge>
            ))}
          </div>

          {/* Date suggestion */}
          <div className="flex items-center gap-2 text-xs text-cmu-gray bg-cmu-gold/10 rounded-xl px-3 py-2">
            <MapPin className="w-3.5 h-3.5 text-cmu-gold" />
            <span>
              Suggested date spot:{" "}
              <span className="font-semibold text-cmu-dark">{suggestedSpot}</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
