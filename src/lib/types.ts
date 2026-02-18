export interface Profile {
  id: string;
  name: string;
  age: number;
  year: "Freshman" | "Sophomore" | "Junior" | "Senior";
  college: string;
  major: string;
  bio: string;
  interests: string[];
  prompt: string;
  promptAnswer: string;
  photos: string[];
  avatarGradient: [string, string];
}

export interface Match {
  id: string;
  profile: Profile;
  timestamp: number;
  messages: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
}

export interface UserProfile extends Profile {
  likedIds: string[];
  passedIds: string[];
}
