"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ProfileAvatar } from "@/components/profile-avatar";
import { Heart, MessageCircle, X } from "lucide-react";
import { Profile } from "@/lib/types";

interface MatchModalProps {
  profile: Profile;
  userName: string;
  onClose: () => void;
}

export function MatchModal({ profile, userName, onClose }: MatchModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-6"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center relative overflow-hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-cmu-gray" />
        </button>

        {/* Background hearts */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: 300, x: Math.random() * 300, opacity: 0 }}
              animate={{ y: -100, opacity: [0, 0.3, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="absolute"
            >
              <Heart
                className="w-6 h-6 text-cmu-red fill-cmu-red/20"
                strokeWidth={1}
              />
            </motion.div>
          ))}
        </div>

        {/* Match text */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <h2 className="text-4xl font-black text-cmu-red mb-1 match-pulse">
            It&apos;s a Match!
          </h2>
          <p className="text-cmu-gray text-sm mb-6">
            You and {profile.name} liked each other
          </p>
        </motion.div>

        {/* Avatars */}
        <div className="flex items-center justify-center gap-4 mb-6 relative">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ProfileAvatar name={userName} size="lg" />
          </motion.div>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.5 }}
            className="w-10 h-10 bg-cmu-red rounded-full flex items-center justify-center shadow-lg shadow-cmu-red/30 z-10"
          >
            <Heart className="w-5 h-5 text-white fill-white" />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ProfileAvatar name={profile.name} size="lg" />
          </motion.div>
        </div>

        {/* Info */}
        <p className="text-sm text-cmu-dark mb-1 font-semibold">
          {profile.name}, {profile.age}
        </p>
        <p className="text-xs text-cmu-gray mb-6">
          {profile.year} &middot; {profile.major}
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white rounded-2xl h-12 font-bold shadow-lg shadow-cmu-red/25"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Send a Message
          </Button>
          <Button
            onClick={onClose}
            variant="ghost"
            className="w-full rounded-2xl h-12 text-cmu-gray"
          >
            Keep Swiping
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
