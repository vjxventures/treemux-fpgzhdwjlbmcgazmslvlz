export interface Profile {
  id: string;
  name: string;
  age: number;
  year: "Freshman" | "Sophomore" | "Junior" | "Senior";
  college: string;
  major: string;
  bio: string;
  interests: string[];
  photos: string[];
  lookingFor: string;
  favoriteSpot: string;
}

export interface Match {
  id: string;
  profileId: string;
  matchedAt: string;
  lastMessage?: string;
}

export type SwipeDirection = "left" | "right";

export const CMU_COLLEGES = [
  "School of Computer Science",
  "College of Engineering",
  "College of Fine Arts",
  "Dietrich College of Humanities & Social Sciences",
  "Tepper School of Business",
  "Mellon College of Science",
  "School of Information Systems & Management",
] as const;

export const CMU_MAJORS: Record<string, string[]> = {
  "School of Computer Science": [
    "Computer Science",
    "Artificial Intelligence",
    "Human-Computer Interaction",
    "Computational Biology",
    "Robotics",
    "Machine Learning",
    "Software Engineering",
  ],
  "College of Engineering": [
    "Electrical & Computer Engineering",
    "Mechanical Engineering",
    "Chemical Engineering",
    "Civil & Environmental Engineering",
    "Biomedical Engineering",
    "Materials Science & Engineering",
  ],
  "College of Fine Arts": [
    "Architecture",
    "Art",
    "Design",
    "Drama",
    "Music",
  ],
  "Dietrich College of Humanities & Social Sciences": [
    "Psychology",
    "Economics",
    "English",
    "History",
    "Philosophy",
    "Statistics & Data Science",
    "International Relations & Politics",
  ],
  "Tepper School of Business": [
    "Business Administration",
  ],
  "Mellon College of Science": [
    "Physics",
    "Chemistry",
    "Mathematics",
    "Biological Sciences",
  ],
  "School of Information Systems & Management": [
    "Information Systems",
  ],
};

export const INTERESTS = [
  "Late night coding",
  "Coffee addict",
  "Gym rat",
  "Board games",
  "Hiking",
  "Photography",
  "Cooking",
  "Reading",
  "Music",
  "Dancing",
  "Film",
  "Art",
  "Gaming",
  "Volunteering",
  "Entrepreneurship",
  "Research",
  "Hackathons",
  "Study groups",
  "Exploring Pittsburgh",
  "Food adventures",
  "Thrift shopping",
  "Yoga",
  "Running",
  "Anime",
  "K-pop",
  "Rock climbing",
  "Tennis",
  "Basketball",
] as const;

export const CMU_DATE_SPOTS = [
  "The Fence",
  "Phipps Conservatory",
  "Craig St Coffee",
  "Schenley Park",
  "Carnegie Museum",
  "The Cut",
  "Entropy+",
  "Conflict Kitchen",
  "Frick Park",
  "Point State Park",
  "Strip District",
  "Randyland",
  "Mattress Factory",
  "Pamela's Diner",
] as const;
