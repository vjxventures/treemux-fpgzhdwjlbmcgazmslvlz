"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  User,
  Heart,
  Sparkles,
  Check,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { CMU_COLLEGES, CMU_MAJORS, INTERESTS, Profile } from "@/lib/types";

const STEPS = ["basics", "academics", "interests", "bio"] as const;
type Step = (typeof STEPS)[number];

export default function SetupPage() {
  const router = useRouter();
  const setUserProfile = useAppStore((s) => s.setUserProfile);
  const [stepIndex, setStepIndex] = useState(0);
  const step = STEPS[stepIndex];

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [year, setYear] = useState<Profile["year"] | "">("");
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [bio, setBio] = useState("");
  const [lookingFor, setLookingFor] = useState("");

  const canNext = () => {
    switch (step) {
      case "basics":
        return name.trim() && age && year;
      case "academics":
        return college && major;
      case "interests":
        return selectedInterests.length >= 2;
      case "bio":
        return bio.trim().length >= 10;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (stepIndex < STEPS.length - 1) {
      setStepIndex(stepIndex + 1);
    } else {
      const profile: Profile = {
        id: "user",
        name: name.trim(),
        age: parseInt(age),
        year: year as Profile["year"],
        college,
        major,
        bio: bio.trim(),
        interests: selectedInterests,
        photos: [],
        lookingFor: lookingFor.trim(),
        favoriteSpot: "",
      };
      setUserProfile(profile);
      router.push("/swipe");
    }
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : prev.length < 6
          ? [...prev, interest]
          : prev
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="tartan-bg h-1.5 w-full" />

      <div className="max-w-md mx-auto px-5 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {stepIndex > 0 && (
            <button
              onClick={() => setStepIndex(stepIndex - 1)}
              className="p-2 rounded-xl hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div className="flex-1">
            <h1 className="text-xl font-bold text-cmu-dark">Create your profile</h1>
            <p className="text-sm text-cmu-gray">
              Step {stepIndex + 1} of {STEPS.length}
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= stepIndex ? "bg-cmu-red" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {step === "basics" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cmu-red/10 flex items-center justify-center">
                    <User className="w-5 h-5 text-cmu-red" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">The Basics</h2>
                    <p className="text-sm text-cmu-gray">Let&apos;s start with who you are</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-cmu-dark mb-2 block">
                    Your name
                  </label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="What should people call you?"
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-cmu-dark mb-2 block">
                    Age
                  </label>
                  <Input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="18"
                    min={17}
                    max={25}
                    className="h-12 rounded-xl"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-cmu-dark mb-3 block">
                    Year
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(["Freshman", "Sophomore", "Junior", "Senior"] as const).map(
                      (y) => (
                        <button
                          key={y}
                          onClick={() => setYear(y)}
                          className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                            year === y
                              ? "border-cmu-red bg-cmu-red/5 text-cmu-red"
                              : "border-border hover:border-cmu-red/30 text-cmu-dark"
                          }`}
                        >
                          {y}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            )}

            {step === "academics" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-cmu-gold/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-cmu-gold" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Academics</h2>
                    <p className="text-sm text-cmu-gray">Your CMU life</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-cmu-dark mb-3 block">
                    College
                  </label>
                  <div className="space-y-2">
                    {CMU_COLLEGES.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCollege(c);
                          setMajor("");
                        }}
                        className={`w-full p-3 rounded-xl border-2 text-sm font-medium text-left transition-all ${
                          college === c
                            ? "border-cmu-red bg-cmu-red/5 text-cmu-red"
                            : "border-border hover:border-cmu-red/30 text-cmu-dark"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {college && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <label className="text-sm font-semibold text-cmu-dark mb-3 block">
                      Major
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CMU_MAJORS[college]?.map((m) => (
                        <button
                          key={m}
                          onClick={() => setMajor(m)}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                            major === m
                              ? "bg-cmu-red text-white"
                              : "bg-muted hover:bg-cmu-red/10 text-cmu-dark"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {step === "interests" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">Interests</h2>
                    <p className="text-sm text-cmu-gray">
                      Pick 2-6 things you love
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => {
                    const selected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                          selected
                            ? "bg-cmu-red text-white shadow-md shadow-cmu-red/20"
                            : "bg-white border border-border hover:border-cmu-red/30 text-cmu-dark"
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 inline mr-1" />}
                        {interest}
                      </button>
                    );
                  })}
                </div>

                <p className="text-xs text-cmu-gray text-center">
                  {selectedInterests.length}/6 selected
                </p>
              </div>
            )}

            {step === "bio" && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-violet-500" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">About You</h2>
                    <p className="text-sm text-cmu-gray">Make them swipe right</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-cmu-dark mb-2 block">
                    Bio
                  </label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="What makes you unique? What's your vibe?"
                    maxLength={200}
                    rows={4}
                    className="w-full p-3 rounded-xl border border-border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cmu-red/50"
                  />
                  <p className="text-xs text-cmu-gray text-right">
                    {bio.length}/200
                  </p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-cmu-dark mb-2 block">
                    Looking for... (optional)
                  </label>
                  <Input
                    value={lookingFor}
                    onChange={(e) => setLookingFor(e.target.value)}
                    placeholder="What's your ideal connection?"
                    className="h-12 rounded-xl"
                  />
                </div>

                {/* Preview card */}
                <Card className="p-4 bg-gradient-to-br from-cmu-red/5 to-transparent">
                  <p className="text-xs font-semibold text-cmu-red mb-2">
                    PROFILE PREVIEW
                  </p>
                  <p className="font-bold text-lg">
                    {name || "Your Name"}, {age || "??"}
                  </p>
                  <p className="text-sm text-cmu-gray">
                    {year || "Year"} &middot; {major || "Major"}
                  </p>
                  <p className="text-sm mt-2">{bio || "Your bio will appear here..."}</p>
                  {selectedInterests.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {selectedInterests.slice(0, 3).map((i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {i}
                        </Badge>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-8 pb-6">
          <Button
            onClick={handleNext}
            disabled={!canNext()}
            className="w-full bg-gradient-to-r from-cmu-red to-cmu-red-dark hover:from-cmu-red-dark hover:to-cmu-red text-white rounded-2xl h-14 text-lg font-bold shadow-xl shadow-cmu-red/25 disabled:opacity-40 disabled:shadow-none transition-all"
          >
            {stepIndex === STEPS.length - 1 ? (
              <>
                Start Matching
                <Sparkles className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
