"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Heart,
  MapPin,
  LogOut,
  Settings,
  Sparkles,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { BottomNav } from "@/components/bottom-nav";
import { ProfileAvatar } from "@/components/profile-avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function ProfilePage() {
  const router = useRouter();
  const { userProfile, matches, swipedRight, swipedLeft, reset } =
    useAppStore();

  useEffect(() => {
    if (!userProfile) {
      router.push("/setup");
    }
  }, [userProfile, router]);

  if (!userProfile) return null;

  const stats = [
    { label: "Matches", value: matches.length, icon: Heart, color: "text-cmu-red" },
    { label: "Likes", value: swipedRight.length, icon: Sparkles, color: "text-green-500" },
    { label: "Passed", value: swipedLeft.length, icon: Settings, color: "text-cmu-gray" },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="tartan-bg h-1 w-full" />

      {/* Profile header */}
      <div className="max-w-md mx-auto px-5">
        <div className="flex flex-col items-center pt-8 pb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <ProfileAvatar name={userProfile.name} size="xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mt-4"
          >
            <h1 className="text-2xl font-black text-cmu-dark">
              {userProfile.name}, {userProfile.age}
            </h1>
            <div className="flex items-center justify-center gap-2 text-cmu-gray text-sm mt-1">
              <GraduationCap className="w-4 h-4" />
              <span>{userProfile.year}</span>
              <span className="text-border">|</span>
              <BookOpen className="w-4 h-4" />
              <span>{userProfile.major}</span>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-2xl p-4 text-center border border-border"
            >
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <div className="text-2xl font-black text-cmu-dark">{stat.value}</div>
              <div className="text-[10px] text-cmu-gray font-semibold uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        <Separator className="my-4" />

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-sm font-bold text-cmu-dark mb-2">About Me</h2>
          <p className="text-sm text-cmu-dark/70 leading-relaxed bg-white rounded-xl p-4 border border-border">
            {userProfile.bio}
          </p>
        </motion.div>

        {/* Interests */}
        {userProfile.interests.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4"
          >
            <h2 className="text-sm font-bold text-cmu-dark mb-2">Interests</h2>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <Badge
                  key={interest}
                  className="bg-cmu-red/10 text-cmu-red border-0 font-medium"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Looking for */}
        {userProfile.lookingFor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-4"
          >
            <h2 className="text-sm font-bold text-cmu-dark mb-2">Looking For</h2>
            <div className="bg-cmu-gold/10 rounded-xl p-4 flex items-start gap-3">
              <MapPin className="w-4 h-4 text-cmu-gold mt-0.5" />
              <p className="text-sm text-cmu-dark/70">{userProfile.lookingFor}</p>
            </div>
          </motion.div>
        )}

        {/* College */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-4"
        >
          <h2 className="text-sm font-bold text-cmu-dark mb-2">College</h2>
          <div className="bg-white rounded-xl p-4 border border-border">
            <p className="text-sm font-medium text-cmu-dark">{userProfile.college}</p>
          </div>
        </motion.div>

        {/* Reset / Sign out */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 pb-4"
        >
          <Button
            variant="ghost"
            onClick={() => {
              reset();
              router.push("/");
            }}
            className="w-full text-destructive hover:text-destructive hover:bg-destructive/5 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out & Reset
          </Button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
