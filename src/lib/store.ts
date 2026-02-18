"use client";

import { Match, Message, Profile, UserProfile } from "./types";
import { getProfiles } from "./data";

const STORAGE_KEY = "tartanmatch";

interface AppState {
  user: UserProfile | null;
  matches: Match[];
  currentIndex: number;
  profiles: Profile[];
}

function loadState(): AppState {
  if (typeof window === "undefined") {
    return { user: null, matches: [], currentIndex: 0, profiles: [] };
  }
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {}
  return { user: null, matches: [], currentIndex: 0, profiles: getProfiles() };
}

function saveState(state: AppState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export function getState(): AppState {
  return loadState();
}

export function setUser(user: UserProfile) {
  const state = loadState();
  state.user = user;
  if (state.profiles.length === 0) {
    state.profiles = getProfiles();
  }
  saveState(state);
}

export function getNextProfiles(): Profile[] {
  const state = loadState();
  if (!state.user) return [];
  const seen = new Set([...state.user.likedIds, ...state.user.passedIds]);
  return state.profiles.filter((p) => !seen.has(p.id));
}

export function swipeRight(profileId: string): Match | null {
  const state = loadState();
  if (!state.user) return null;
  state.user.likedIds.push(profileId);

  // 40% match rate for demo purposes
  const isMatch = Math.random() < 0.4;
  let newMatch: Match | null = null;

  if (isMatch) {
    const profile = state.profiles.find((p) => p.id === profileId);
    if (profile) {
      newMatch = {
        id: `match-${Date.now()}`,
        profile,
        timestamp: Date.now(),
        messages: [],
      };
      state.matches.push(newMatch);
    }
  }

  saveState(state);
  return newMatch;
}

export function swipeLeft(profileId: string) {
  const state = loadState();
  if (!state.user) return;
  state.user.passedIds.push(profileId);
  saveState(state);
}

export function getMatches(): Match[] {
  const state = loadState();
  return state.matches;
}

export function sendMessage(matchId: string, text: string) {
  const state = loadState();
  const match = state.matches.find((m) => m.id === matchId);
  if (!match || !state.user) return;

  const userMessage: Message = {
    id: `msg-${Date.now()}`,
    senderId: state.user.id,
    text,
    timestamp: Date.now(),
  };
  match.messages.push(userMessage);

  // Auto-reply after a brief moment (simulated)
  const replies = [
    "Haha that's so funny! 😄",
    "I totally agree!",
    "We should totally hang out sometime!",
    "Have you been to that new place in Oakland?",
    "That's really cool! Tell me more",
    "Omg same!! We have so much in common",
    "I was just thinking the same thing!",
    "You seem really interesting 😊",
    "Let's grab coffee at La Prima soon!",
    "That's such a CMU thing to say lol",
  ];

  const autoReply: Message = {
    id: `msg-${Date.now() + 1}`,
    senderId: match.profile.id,
    text: replies[Math.floor(Math.random() * replies.length)],
    timestamp: Date.now() + 1000,
  };
  match.messages.push(autoReply);

  saveState(state);
}

export function clearAllData() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
