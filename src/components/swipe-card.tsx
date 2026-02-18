"use client";

import { useState, useRef } from "react";
import { Profile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { getInitials } from "@/lib/data";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  MapPin,
  MessageCircle,
  X,
  Heart,
} from "lucide-react";

interface SwipeCardProps {
  profile: Profile;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
}

export function SwipeCard({ profile, onSwipe, isTop }: SwipeCardProps) {
  const [exitDir, setExitDir] = useState<"left" | "right" | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-20, 0, 20]);
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 100;
    if (Math.abs(info.offset.x) > threshold) {
      const dir = info.offset.x > 0 ? "right" : "left";
      setExitDir(dir);
      setTimeout(() => onSwipe(dir), 200);
    }
  };

  const handleButtonSwipe = (dir: "left" | "right") => {
    setExitDir(dir);
    setTimeout(() => onSwipe(dir), 300);
  };

  if (!isTop) {
    return (
      <div className="absolute inset-x-4 top-0 bottom-24">
        <div className="w-full h-full rounded-3xl bg-card border border-border shadow-sm scale-[0.95] opacity-60" />
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      className="absolute inset-x-4 top-0 bottom-24 swipe-card cursor-grab active:cursor-grabbing"
      style={{ x, rotate }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={
        exitDir
          ? { x: exitDir === "right" ? 500 : -500, opacity: 0, rotate: exitDir === "right" ? 20 : -20 }
          : { x: 0 }
      }
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="w-full h-full rounded-3xl bg-card border border-border shadow-xl overflow-hidden flex flex-col relative">
        {/* LIKE / NOPE stamps */}
        <motion.div
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-6 z-30 border-4 border-green-500 text-green-500 rounded-lg px-4 py-1 text-3xl font-black -rotate-12 stamp-animation pointer-events-none"
        >
          LIKE
        </motion.div>
        <motion.div
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 right-6 z-30 border-4 border-red-500 text-red-500 rounded-lg px-4 py-1 text-3xl font-black rotate-12 stamp-animation pointer-events-none"
        >
          NOPE
        </motion.div>

        {/* Avatar / Photo area */}
        <div className="flex-shrink-0 h-[45%] relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${profile.avatarGradient[0]}, ${profile.avatarGradient[1]})`,
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-7xl font-bold text-white/90 select-none">
              {getInitials(profile.name)}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent" />
        </div>

        {/* Profile info */}
        <div className="flex-1 overflow-y-auto px-5 pb-4 -mt-6 relative z-10">
          <div className="flex items-baseline gap-2 mb-1">
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <span className="text-lg text-muted-foreground">{profile.age}</span>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {profile.year}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {profile.major}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              CMU
            </span>
          </div>

          <p className="text-sm leading-relaxed mb-3">{profile.bio}</p>

          {/* CMU Prompt */}
          <div className="bg-secondary/60 rounded-2xl p-3.5 mb-3">
            <div className="flex items-center gap-1.5 mb-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-primary" />
              <p className="text-xs font-semibold text-primary">{profile.prompt}</p>
            </div>
            <p className="text-sm italic">&ldquo;{profile.promptAnswer}&rdquo;</p>
          </div>

          {/* Interests */}
          <div className="flex flex-wrap gap-1.5">
            {profile.interests.map((interest) => (
              <Badge
                key={interest}
                variant="secondary"
                className="rounded-full text-xs px-2.5 py-0.5"
              >
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex-shrink-0 flex items-center justify-center gap-6 py-4 px-6 border-t border-border/50">
          <button
            onClick={() => handleButtonSwipe("left")}
            className="w-14 h-14 rounded-full border-2 border-red-400/50 flex items-center justify-center text-red-400 hover:bg-red-50 hover:border-red-400 transition-all active:scale-90"
          >
            <X className="w-7 h-7" />
          </button>
          <button
            onClick={() => handleButtonSwipe("right")}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cmu-red-dark flex items-center justify-center text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all active:scale-90"
          >
            <Heart className="w-8 h-8" fill="white" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
