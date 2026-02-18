"use client";

import { useState, useEffect } from "react";
import { OnboardingScreen } from "@/components/onboarding";
import { MainApp } from "@/components/main-app";
import { getState } from "@/lib/store";

export default function Home() {
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  useEffect(() => {
    const state = getState();
    setHasProfile(!!state.user);
  }, []);

  if (hasProfile === null) {
    return (
      <div className="h-dvh flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!hasProfile) {
    return <OnboardingScreen onComplete={() => setHasProfile(true)} />;
  }

  return <MainApp />;
}
