"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, X, RotateCcw, Flame } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SwipeCard } from "@/components/swipe-card";
import { MatchModal } from "@/components/match-modal";
import { BottomNav } from "@/components/bottom-nav";
import { Profile } from "@/lib/types";

export default function SwipePage() {
  const router = useRouter();
  const {
    userProfile,
    availableProfiles,
    currentIndex,
    swipeRight,
    swipeLeft,
    matches,
  } = useAppStore();

  const [showMatch, setShowMatch] = useState<Profile | null>(null);
  const [lastAction, setLastAction] = useState<string>("");

  useEffect(() => {
    if (!userProfile) {
      router.push("/setup");
    }
  }, [userProfile, router]);

  const currentProfile = availableProfiles[currentIndex];
  const nextProfile = availableProfiles[currentIndex + 1];

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (!currentProfile) return;

      if (direction === "right") {
        const isMatch = swipeRight(currentProfile.id);
        setLastAction("liked");
        if (isMatch) {
          setTimeout(() => setShowMatch(currentProfile), 300);
        }
      } else {
        swipeLeft(currentProfile.id);
        setLastAction("passed");
      }
    },
    [currentProfile, swipeRight, swipeLeft]
  );

  if (!userProfile) return null;

  const outOfProfiles = currentIndex >= availableProfiles.length;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="tartan-bg h-1 w-full" />
      <div className="max-w-md mx-auto px-5 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-6 h-6 text-cmu-red fill-cmu-red/20" />
            <h1 className="text-xl font-black text-cmu-dark">Discover</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1 rounded-full bg-cmu-red/10 text-cmu-red text-xs font-bold">
              {matches.length} {matches.length === 1 ? "match" : "matches"}
            </div>
          </div>
        </div>
      </div>

      {/* Card Stack */}
      <div className="max-w-md mx-auto px-5">
        {outOfProfiles ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-cmu-gray/50" />
            </div>
            <h2 className="text-2xl font-bold text-cmu-dark mb-2">
              You&apos;ve seen everyone!
            </h2>
            <p className="text-cmu-gray mb-6 max-w-xs">
              Check back later for new Tartans. In the meantime, say hi to your
              matches!
            </p>
            <button
              onClick={() => router.push("/matches")}
              className="bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white rounded-2xl px-8 py-3 font-bold shadow-lg shadow-cmu-red/25"
            >
              View Matches ({matches.length})
            </button>
          </motion.div>
        ) : (
          <>
            {/* Card area */}
            <div className="relative h-[520px] w-full">
              {nextProfile && (
                <SwipeCard
                  key={nextProfile.id + "-bg"}
                  profile={nextProfile}
                  onSwipe={() => {}}
                  isTop={false}
                />
              )}
              {currentProfile && (
                <SwipeCard
                  key={currentProfile.id}
                  profile={currentProfile}
                  onSwipe={handleSwipe}
                  isTop={true}
                />
              )}
            </div>

            {/* Action hint */}
            <AnimatePresence>
              {lastAction && (
                <motion.p
                  key={lastAction + currentIndex}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-xs text-cmu-gray mt-2"
                >
                  {lastAction === "liked" ? "You liked them!" : "Maybe next time"}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Action buttons */}
            <div className="flex items-center justify-center gap-5 mt-4">
              <button
                onClick={() => handleSwipe("left")}
                className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-red-200 flex items-center justify-center hover:scale-110 hover:border-red-400 transition-all active:scale-95"
              >
                <X className="w-7 h-7 text-red-500" strokeWidth={3} />
              </button>

              <button
                onClick={() => handleSwipe("right")}
                className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 shadow-xl shadow-emerald-500/30 flex items-center justify-center hover:scale-110 transition-all active:scale-95"
              >
                <Heart
                  className="w-9 h-9 text-white"
                  strokeWidth={2.5}
                  fill="rgba(255,255,255,0.3)"
                />
              </button>

              <button
                onClick={() => handleSwipe("left")}
                className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-amber-200 flex items-center justify-center hover:scale-110 hover:border-amber-400 transition-all active:scale-95"
              >
                <RotateCcw className="w-6 h-6 text-amber-500" strokeWidth={2.5} />
              </button>
            </div>

            <p className="text-center text-xs text-cmu-gray/60 mt-3">
              Swipe right to like, left to pass
            </p>
          </>
        )}
      </div>

      {/* Match Modal */}
      <AnimatePresence>
        {showMatch && (
          <MatchModal
            profile={showMatch}
            userName={userProfile.name}
            onClose={() => setShowMatch(null)}
          />
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
