"use client";

import { useState, useCallback, useEffect } from "react";
import { Match, Profile } from "@/lib/types";
import {
  getNextProfiles,
  swipeRight,
  swipeLeft,
  getMatches,
} from "@/lib/store";
import { SwipeCard } from "@/components/swipe-card";
import { MatchOverlay } from "@/components/match-overlay";
import { MatchesView } from "@/components/matches-view";
import { ChatView } from "@/components/chat-view";
import { ProfileView } from "@/components/profile-view";
import { Heart, MessageCircle, User, Flame } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type Tab = "swipe" | "matches" | "profile";

export function MainApp() {
  const [tab, setTab] = useState<Tab>("swipe");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [chatMatchId, setChatMatchId] = useState<string | null>(null);

  useEffect(() => {
    setProfiles(getNextProfiles());
    setMatches(getMatches());
  }, []);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const topProfile = profiles[0];
      if (!topProfile) return;

      if (direction === "right") {
        const match = swipeRight(topProfile.id);
        if (match) {
          setCurrentMatch(match);
          setMatches((prev) => [...prev, match]);
        }
      } else {
        swipeLeft(topProfile.id);
      }

      setProfiles((prev) => prev.slice(1));
    },
    [profiles]
  );

  const handleLogout = () => {
    window.location.reload();
  };

  // Chat view
  if (chatMatchId) {
    return (
      <div className="h-dvh flex flex-col bg-background">
        <ChatView
          matchId={chatMatchId}
          onBack={() => {
            setChatMatchId(null);
            setMatches(getMatches());
          }}
        />
      </div>
    );
  }

  return (
    <div className="h-dvh flex flex-col bg-background max-w-lg mx-auto">
      {/* Header */}
      <header className="flex-shrink-0 flex items-center justify-between px-5 py-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cmu-red-dark flex items-center justify-center">
            <Flame className="w-4.5 h-4.5 text-white" />
          </div>
          <h1 className="text-lg font-bold tracking-tight">TartanMatch</h1>
        </div>
        {tab === "swipe" && profiles.length > 0 && (
          <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full">
            {profiles.length} nearby
          </span>
        )}
      </header>

      {/* Content */}
      <div className="flex-1 relative overflow-hidden">
        {tab === "swipe" && (
          <div className="absolute inset-0 flex items-center justify-center">
            {profiles.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center px-8"
              >
                <div className="w-20 h-20 rounded-full bg-secondary mx-auto flex items-center justify-center mb-4">
                  <Heart className="w-10 h-10 text-muted-foreground/50" />
                </div>
                <h3 className="text-lg font-semibold mb-1">
                  You&apos;ve seen everyone!
                </h3>
                <p className="text-sm text-muted-foreground">
                  Check back later for new Tartans, or browse your matches.
                </p>
              </motion.div>
            ) : (
              <>
                {profiles.slice(0, 3).map((profile, i) => (
                  <SwipeCard
                    key={profile.id}
                    profile={profile}
                    onSwipe={handleSwipe}
                    isTop={i === 0}
                  />
                ))}
              </>
            )}
          </div>
        )}

        {tab === "matches" && (
          <MatchesView
            matches={matches}
            onSelectMatch={(id) => setChatMatchId(id)}
          />
        )}

        {tab === "profile" && <ProfileView onLogout={handleLogout} />}
      </div>

      {/* Bottom tabs */}
      <nav className="flex-shrink-0 border-t border-border/50 bg-background">
        <div className="flex items-center justify-around py-2 pb-6">
          {[
            { id: "swipe" as Tab, icon: Flame, label: "Discover" },
            {
              id: "matches" as Tab,
              icon: MessageCircle,
              label: "Matches",
              badge: matches.length,
            },
            { id: "profile" as Tab, icon: User, label: "Profile" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`flex flex-col items-center gap-0.5 px-4 py-1 rounded-xl transition-colors relative ${
                tab === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className="relative">
                <item.icon
                  className="w-5.5 h-5.5"
                  fill={tab === item.id ? "currentColor" : "none"}
                />
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Match overlay */}
      <AnimatePresence>
        {currentMatch && (
          <MatchOverlay
            match={currentMatch}
            onClose={() => setCurrentMatch(null)}
            onChat={(id) => {
              setCurrentMatch(null);
              setChatMatchId(id);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
