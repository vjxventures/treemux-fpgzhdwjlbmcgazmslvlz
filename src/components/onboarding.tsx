"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { setUser } from "@/lib/store";
import { UserProfile } from "@/lib/types";
import { Heart, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const COLLEGES = [
  "School of Computer Science",
  "College of Engineering",
  "Dietrich College",
  "Tepper School of Business",
  "College of Fine Arts",
  "Mellon College of Science",
  "School of Information Systems",
];

const INTERESTS = [
  "Hiking", "Photography", "Gaming", "Cooking", "Reading",
  "Rock Climbing", "Board Games", "Coffee", "Anime", "Running",
  "Music", "Painting", "Dancing", "Yoga", "Tennis",
  "Film", "Poetry", "Volunteering", "Thrifting", "Baking",
  "Travel", "Soccer", "Basketball", "Robotics", "Piano",
];

const YEARS = ["Freshman", "Sophomore", "Junior", "Senior"] as const;

interface Props {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [year, setYear] = useState<(typeof YEARS)[number] | "">("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [bio, setBio] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 6
          ? [...prev, interest]
          : prev
    );
  };

  const canProceed = () => {
    switch (step) {
      case 0: return true;
      case 1: return name.trim().length >= 2 && age.trim().length > 0;
      case 2: return year !== "" && college !== "";
      case 3: return selectedInterests.length >= 3;
      case 4: return bio.trim().length >= 10;
      default: return false;
    }
  };

  const handleFinish = () => {
    const gradientPairs: [string, string][] = [
      ["#e74c3c", "#c0392b"],
      ["#3498db", "#2980b9"],
      ["#9b59b6", "#8e44ad"],
      ["#e91e63", "#c2185b"],
    ];

    const user: UserProfile = {
      id: "user",
      name: name.trim(),
      age: parseInt(age) || 19,
      year: year as UserProfile["year"],
      college,
      major: major || "Undeclared",
      bio: bio.trim(),
      interests: selectedInterests,
      prompt: "The hill I will die on about CMU is...",
      promptAnswer: "Our squirrels are more iconic than any mascot",
      photos: [],
      avatarGradient: gradientPairs[Math.floor(Math.random() * gradientPairs.length)],
      likedIds: [],
      passedIds: [],
    };

    setUser(user);
    onComplete();
  };

  const nextStep = () => {
    if (step === 4) {
      handleFinish();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="h-dvh flex flex-col bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col items-center justify-center px-6 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-cmu-red-dark flex items-center justify-center mb-8 shadow-lg shadow-primary/25"
            >
              <Heart className="w-12 h-12 text-white" fill="white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl font-bold tracking-tight mb-3"
            >
              TartanMatch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-muted-foreground text-lg mb-2"
            >
              Dating for Carnegie Mellon
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground mb-12"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Pittsburgh, PA</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Button
                size="lg"
                onClick={nextStep}
                className="rounded-full px-8 h-12 text-base font-semibold shadow-lg shadow-primary/25 bg-primary hover:bg-cmu-red-dark"
              >
                Get Started
                <Sparkles className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col px-6 pt-16"
          >
            <p className="text-sm font-medium text-primary mb-2">Step 1 of 4</p>
            <h2 className="text-2xl font-bold mb-1">What&apos;s your name?</h2>
            <p className="text-muted-foreground mb-8">This is how you&apos;ll appear to other Tartans</p>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">First name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your first name"
                  className="h-12 text-base rounded-xl"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Age</label>
                <Input
                  value={age}
                  onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
                  placeholder="18"
                  type="text"
                  inputMode="numeric"
                  className="h-12 text-base rounded-xl"
                  maxLength={2}
                />
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="college"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col px-6 pt-16 overflow-y-auto"
          >
            <p className="text-sm font-medium text-primary mb-2">Step 2 of 4</p>
            <h2 className="text-2xl font-bold mb-1">Your academic home</h2>
            <p className="text-muted-foreground mb-6">Select your college and year</p>

            <div className="mb-6">
              <label className="text-sm font-medium mb-2 block">Year</label>
              <div className="grid grid-cols-2 gap-2">
                {YEARS.map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`h-11 rounded-xl text-sm font-medium transition-all ${
                      year === y
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium mb-2 block">College</label>
              <div className="space-y-2">
                {COLLEGES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCollege(c)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all ${
                      college === c
                        ? "bg-primary text-primary-foreground shadow-md"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="text-sm font-medium mb-1.5 block">Major (optional)</label>
              <Input
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                placeholder="e.g. Computer Science"
                className="h-12 text-base rounded-xl"
              />
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="interests"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col px-6 pt-16 overflow-y-auto"
          >
            <p className="text-sm font-medium text-primary mb-2">Step 3 of 4</p>
            <h2 className="text-2xl font-bold mb-1">Your interests</h2>
            <p className="text-muted-foreground mb-6">
              Pick at least 3 (up to 6) &mdash; {selectedInterests.length} selected
            </p>
            <div className="flex flex-wrap gap-2 pb-6">
              {INTERESTS.map((interest) => (
                <Badge
                  key={interest}
                  variant={selectedInterests.includes(interest) ? "default" : "secondary"}
                  className={`px-3.5 py-2 text-sm cursor-pointer transition-all rounded-full ${
                    selectedInterests.includes(interest)
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "hover:bg-secondary/80"
                  }`}
                  onClick={() => toggleInterest(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="bio"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="flex-1 flex flex-col px-6 pt-16"
          >
            <p className="text-sm font-medium text-primary mb-2">Step 4 of 4</p>
            <h2 className="text-2xl font-bold mb-1">About you</h2>
            <p className="text-muted-foreground mb-6">Write a short bio that shows your personality</p>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other Tartans about yourself... What do you love? What are you looking for?"
              className="w-full h-36 px-4 py-3 rounded-xl bg-secondary text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              maxLength={200}
            />
            <p className="text-xs text-muted-foreground mt-2 text-right">
              {bio.length}/200
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {step > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pb-8 pt-4"
        >
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setStep(step - 1)}
              className="h-12 rounded-xl flex-1"
            >
              Back
            </Button>
            <Button
              onClick={nextStep}
              disabled={!canProceed()}
              className="h-12 rounded-xl flex-[2] bg-primary hover:bg-cmu-red-dark font-semibold"
            >
              {step === 4 ? "Start Matching" : "Continue"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="flex justify-center gap-1.5 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1 rounded-full transition-all ${
                  s === step ? "w-8 bg-primary" : s < step ? "w-4 bg-primary/40" : "w-4 bg-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
