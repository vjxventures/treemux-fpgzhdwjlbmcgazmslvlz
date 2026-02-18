"use client";

import { useEffect } from "react";
import { Match } from "@/lib/types";
import { getInitials } from "@/lib/data";
import { getState } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { MessageCircle, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface Props {
  match: Match;
  onClose: () => void;
  onChat: (matchId: string) => void;
}

export function MatchOverlay({ match, onClose, onChat }: Props) {
  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ["#c41230", "#ffd100", "#ffffff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ["#c41230", "#ffd100", "#ffffff"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const user = getState().user;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-6"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4 relative"
          >
            <Heart className="w-8 h-8 text-white" fill="white" />
            <div className="absolute inset-0 rounded-full bg-primary/40 match-pulse" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-white mb-1"
          >
            It&apos;s a Match!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-white/70"
          >
            You and {match.profile.name} liked each other
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {/* User avatar */}
          <div className="w-24 h-24 rounded-full border-3 border-white shadow-2xl overflow-hidden">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: user
                  ? `linear-gradient(135deg, ${user.avatarGradient[0]}, ${user.avatarGradient[1]})`
                  : "linear-gradient(135deg, #e74c3c, #c0392b)",
              }}
            >
              <span className="text-2xl font-bold text-white">
                {user ? getInitials(user.name) : "?"}
              </span>
            </div>
          </div>

          <Heart className="w-8 h-8 text-primary" fill="currentColor" />

          {/* Match avatar */}
          <div className="w-24 h-24 rounded-full border-3 border-white shadow-2xl overflow-hidden">
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${match.profile.avatarGradient[0]}, ${match.profile.avatarGradient[1]})`,
              }}
            >
              <span className="text-2xl font-bold text-white">
                {getInitials(match.profile.name)}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="space-y-3"
        >
          <Button
            onClick={() => onChat(match.id)}
            className="w-full h-12 rounded-xl bg-primary hover:bg-cmu-red-dark font-semibold text-base"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Send a Message
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            className="w-full h-12 rounded-xl text-white/70 hover:text-white hover:bg-white/10"
          >
            Keep Swiping
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
