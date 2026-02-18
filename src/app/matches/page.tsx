"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Heart, MessageCircle, MapPin, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { BottomNav } from "@/components/bottom-nav";
import { ProfileAvatar } from "@/components/profile-avatar";
import { Badge } from "@/components/ui/badge";
import { MOCK_PROFILES } from "@/lib/mock-profiles";
import { CMU_DATE_SPOTS } from "@/lib/types";

export default function MatchesPage() {
  const router = useRouter();
  const { userProfile, matches } = useAppStore();

  useEffect(() => {
    if (!userProfile) {
      router.push("/setup");
    }
  }, [userProfile, router]);

  if (!userProfile) return null;

  const matchedProfiles = matches
    .map((m) => {
      const profile = MOCK_PROFILES.find((p) => p.id === m.profileId);
      return profile ? { ...m, profile } : null;
    })
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="tartan-bg h-1 w-full" />

      <div className="max-w-md mx-auto px-5 pt-4">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Heart className="w-6 h-6 text-cmu-red fill-cmu-red/20" />
          <h1 className="text-xl font-black text-cmu-dark">Your Matches</h1>
          {matches.length > 0 && (
            <div className="px-2.5 py-0.5 rounded-full bg-cmu-red text-white text-xs font-bold">
              {matches.length}
            </div>
          )}
        </div>

        {matchedProfiles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center py-16"
          >
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-cmu-gray/40" />
            </div>
            <h2 className="text-xl font-bold text-cmu-dark mb-2">
              No matches yet
            </h2>
            <p className="text-cmu-gray text-sm mb-6 max-w-xs">
              Keep swiping to find your perfect Tartan match. The more you swipe,
              the better your chances!
            </p>
            <button
              onClick={() => router.push("/swipe")}
              className="bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white rounded-2xl px-8 py-3 font-bold shadow-lg shadow-cmu-red/25"
            >
              Start Swiping
            </button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {matchedProfiles.map((match, i) => {
              if (!match) return null;
              const { profile } = match;
              const suggestedSpot =
                CMU_DATE_SPOTS[
                  Math.floor(
                    profile.name.charCodeAt(0) % CMU_DATE_SPOTS.length
                  )
                ];

              return (
                <motion.div
                  key={match.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-4 border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <ProfileAvatar name={profile.name} size="md" />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-cmu-dark">
                            {profile.name}, {profile.age}
                          </h3>
                          <p className="text-xs text-cmu-gray">
                            {profile.year} &middot; {profile.major}
                          </p>
                        </div>
                        <button className="w-10 h-10 rounded-full bg-cmu-red/10 flex items-center justify-center hover:bg-cmu-red/20 transition-colors">
                          <MessageCircle className="w-5 h-5 text-cmu-red" />
                        </button>
                      </div>

                      <p className="text-sm text-cmu-dark/70 mt-2 line-clamp-2">
                        {profile.bio}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {profile.interests.slice(0, 3).map((interest) => (
                          <Badge
                            key={interest}
                            variant="secondary"
                            className="text-[10px]"
                          >
                            {interest}
                          </Badge>
                        ))}
                      </div>

                      {/* Date suggestion */}
                      <div className="flex items-center gap-1.5 mt-2 text-[11px] text-cmu-gold font-medium">
                        <MapPin className="w-3 h-3" />
                        <span>
                          Date idea: {suggestedSpot}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
