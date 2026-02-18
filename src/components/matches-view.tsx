"use client";

import { Match } from "@/lib/types";
import { getInitials } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  matches: Match[];
  onSelectMatch: (matchId: string) => void;
}

export function MatchesView({ matches, onSelectMatch }: Props) {
  if (matches.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-20 h-20 rounded-full bg-secondary flex items-center justify-center mb-4">
          <Heart className="w-10 h-10 text-muted-foreground/50" />
        </div>
        <h3 className="text-lg font-semibold mb-1">No matches yet</h3>
        <p className="text-sm text-muted-foreground">
          Keep swiping to find your perfect Tartan match!
        </p>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1">
      <div className="px-4 py-2">
        <p className="text-sm text-muted-foreground mb-4">
          {matches.length} {matches.length === 1 ? "match" : "matches"}
        </p>
        <div className="space-y-2">
          {matches.map((match, i) => {
            const lastMessage = match.messages[match.messages.length - 1];
            return (
              <motion.button
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelectMatch(match.id)}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-secondary/80 transition-colors text-left"
              >
                <div
                  className="w-14 h-14 rounded-full flex-shrink-0 flex items-center justify-center shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${match.profile.avatarGradient[0]}, ${match.profile.avatarGradient[1]})`,
                  }}
                >
                  <span className="text-lg font-bold text-white">
                    {getInitials(match.profile.name)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h4 className="font-semibold text-sm">
                      {match.profile.name}, {match.profile.age}
                    </h4>
                    <span className="text-xs text-muted-foreground">
                      {formatTime(match.timestamp)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {match.profile.major} &middot; {match.profile.year}
                  </p>
                  {lastMessage ? (
                    <p className="text-xs text-muted-foreground truncate mt-0.5">
                      {lastMessage.text}
                    </p>
                  ) : (
                    <p className="text-xs text-primary flex items-center gap-1 mt-0.5">
                      <MessageCircle className="w-3 h-3" />
                      Send the first message!
                    </p>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </ScrollArea>
  );
}

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  if (diff < 60000) return "now";
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return `${Math.floor(diff / 86400000)}d`;
}
