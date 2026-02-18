"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, MapPin, GraduationCap, ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";

const TAGLINES = [
  "Find your study partner for life",
  "Swipe right on your future",
  "Where Tartans find love",
  "More matches than Autolab",
];

export default function LandingPage() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const userProfile = useAppStore((s) => s.userProfile);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % TAGLINES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Tartan Header Strip */}
      <div className="tartan-bg h-2 w-full" />

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-cmu-red/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cmu-gold/10 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-10 w-40 h-40 bg-cmu-red/5 rounded-full blur-2xl" />
        </div>

        {/* Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="relative mb-8"
        >
          <div className="w-28 h-28 bg-gradient-to-br from-cmu-red to-cmu-red-dark rounded-3xl rotate-12 flex items-center justify-center shadow-2xl shadow-cmu-red/30">
            <Heart className="w-14 h-14 text-white fill-white/30 -rotate-12" strokeWidth={2.5} />
          </div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-cmu-gold rounded-full flex items-center justify-center shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-white" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl font-black tracking-tight text-cmu-dark mb-2"
        >
          Tartan
          <span className="text-cmu-red"> Match</span>
        </motion.h1>

        {/* Animated tagline */}
        <div className="h-8 mb-8 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="text-cmu-gray text-lg font-medium text-center"
            >
              {TAGLINES[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-10 max-w-sm"
        >
          {[
            { icon: GraduationCap, text: "CMU students only" },
            { icon: MapPin, text: "Campus date spots" },
            { icon: Heart, text: "Major-based matching" },
          ].map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-sm border border-border"
            >
              <feature.icon className="w-4 h-4 text-cmu-red" />
              <span className="text-sm font-medium text-cmu-dark">{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col gap-3 w-full max-w-xs"
        >
          {userProfile ? (
            <Link href="/swipe">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-cmu-red to-cmu-red-dark hover:from-cmu-red-dark hover:to-cmu-red text-white rounded-2xl h-14 text-lg font-bold shadow-xl shadow-cmu-red/25 transition-all hover:shadow-2xl hover:shadow-cmu-red/30"
              >
                Start Swiping
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <Link href="/setup">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-cmu-red to-cmu-red-dark hover:from-cmu-red-dark hover:to-cmu-red text-white rounded-2xl h-14 text-lg font-bold shadow-xl shadow-cmu-red/25 transition-all hover:shadow-2xl hover:shadow-cmu-red/30"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
          <p className="text-center text-xs text-cmu-gray">
            Exclusively for Carnegie Mellon undergrads
          </p>
        </motion.div>
      </div>

      {/* Bottom decoration */}
      <div className="tartan-bg h-2 w-full" />

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex items-center justify-center gap-8 py-6 bg-white/50"
      >
        {[
          { value: "500+", label: "Tartans" },
          { value: "1.2K", label: "Matches" },
          { value: "89%", label: "Match Rate" },
        ].map((stat, i) => (
          <div key={i} className="text-center">
            <div className="text-2xl font-black text-cmu-red">{stat.value}</div>
            <div className="text-xs text-cmu-gray font-medium">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
