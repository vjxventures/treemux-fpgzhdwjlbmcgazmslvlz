import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Profile, Match } from "./types";
import { MOCK_PROFILES } from "./mock-profiles";

interface AppState {
  // User profile
  userProfile: Profile | null;
  setUserProfile: (profile: Profile) => void;

  // Swipe state
  currentIndex: number;
  availableProfiles: Profile[];
  swipedRight: string[];
  swipedLeft: string[];
  swipeRight: (profileId: string) => boolean;
  swipeLeft: (profileId: string) => void;

  // Matches
  matches: Match[];

  // Reset
  reset: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      userProfile: null,
      setUserProfile: (profile) => set({ userProfile: profile }),

      currentIndex: 0,
      availableProfiles: MOCK_PROFILES,
      swipedRight: [],
      swipedLeft: [],

      swipeRight: (profileId) => {
        const state = get();
        const newSwipedRight = [...state.swipedRight, profileId];

        // Simulate ~60% match rate for demo
        const isMatch = Math.random() < 0.6;
        const newMatches = isMatch
          ? [
              ...state.matches,
              {
                id: `match-${Date.now()}`,
                profileId,
                matchedAt: new Date().toISOString(),
              },
            ]
          : state.matches;

        set({
          swipedRight: newSwipedRight,
          currentIndex: state.currentIndex + 1,
          matches: newMatches,
        });

        return isMatch;
      },

      swipeLeft: (profileId) => {
        const state = get();
        set({
          swipedLeft: [...state.swipedLeft, profileId],
          currentIndex: state.currentIndex + 1,
        });
      },

      matches: [],

      reset: () =>
        set({
          userProfile: null,
          currentIndex: 0,
          swipedRight: [],
          swipedLeft: [],
          matches: [],
        }),
    }),
    {
      name: "tartan-match-storage",
    }
  )
);
