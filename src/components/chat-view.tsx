"use client";

import { useState, useRef, useEffect } from "react";
import { Match } from "@/lib/types";
import { getInitials } from "@/lib/data";
import { getState, sendMessage, getMatches } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  matchId: string;
  onBack: () => void;
}

export function ChatView({ matchId, onBack }: Props) {
  const [input, setInput] = useState("");
  const [match, setMatch] = useState<Match | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const user = getState().user;

  useEffect(() => {
    const matches = getMatches();
    const found = matches.find((m) => m.id === matchId);
    setMatch(found || null);
  }, [matchId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [match?.messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(matchId, input.trim());
    setInput("");
    // Refresh match data
    const matches = getMatches();
    const found = matches.find((m) => m.id === matchId);
    setMatch(found ? { ...found } : null);
  };

  if (!match) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div
          className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${match.profile.avatarGradient[0]}, ${match.profile.avatarGradient[1]})`,
          }}
        >
          <span className="text-sm font-bold text-white">
            {getInitials(match.profile.name)}
          </span>
        </div>
        <div>
          <h3 className="font-semibold text-sm">{match.profile.name}</h3>
          <p className="text-xs text-muted-foreground">
            {match.profile.major} &middot; {match.profile.year}
          </p>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-4">
        <div className="py-4 space-y-3">
          {/* Match intro */}
          <div className="text-center py-4">
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${match.profile.avatarGradient[0]}, ${match.profile.avatarGradient[1]})`,
              }}
            >
              <span className="text-xl font-bold text-white">
                {getInitials(match.profile.name)}
              </span>
            </div>
            <p className="text-sm font-semibold">
              You matched with {match.profile.name}!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {match.profile.bio}
            </p>
          </div>

          {match.messages.map((msg, i) => {
            const isUser = msg.senderId === user?.id;
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                    isUser
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-secondary text-foreground rounded-bl-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="px-4 pb-6 pt-2 border-t border-border">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex gap-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 h-11 px-4 rounded-full bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            autoFocus
          />
          <Button
            type="submit"
            size="icon"
            disabled={!input.trim()}
            className="w-11 h-11 rounded-full bg-primary hover:bg-cmu-red-dark"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
