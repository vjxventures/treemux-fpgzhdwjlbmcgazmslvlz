import { Profile } from "./types";

const CMU_PROMPTS = [
  "My ideal study date spot on campus is...",
  "The class that changed my life was...",
  "You can find me on a Friday night at...",
  "My hot take about campus food is...",
  "The hill I will die on about CMU is...",
  "If I could only eat at one campus spot forever, it'd be...",
  "My go-to late night coding fuel is...",
  "The weirdest tradition I've participated in is...",
  "My unpopular opinion about Pittsburgh is...",
  "The thing I'm most passionate about outside of class is...",
];

const COLLEGES = [
  "School of Computer Science",
  "College of Engineering",
  "Dietrich College",
  "Tepper School of Business",
  "College of Fine Arts",
  "Mellon College of Science",
  "School of Information Systems",
];

const MAJORS: Record<string, string[]> = {
  "School of Computer Science": ["Computer Science", "Artificial Intelligence", "Human-Computer Interaction", "Computational Biology", "Machine Learning"],
  "College of Engineering": ["Electrical & Computer Engineering", "Mechanical Engineering", "Chemical Engineering", "Biomedical Engineering", "Civil Engineering"],
  "Dietrich College": ["Psychology", "Statistics", "English", "History", "Philosophy", "Economics", "International Relations"],
  "Tepper School of Business": ["Business Administration", "Economics & Statistics"],
  "College of Fine Arts": ["Architecture", "Art", "Design", "Drama", "Music"],
  "Mellon College of Science": ["Physics", "Chemistry", "Mathematics", "Biological Sciences"],
  "School of Information Systems": ["Information Systems", "Data Science"],
};

const INTERESTS = [
  "Hiking", "Photography", "Gaming", "Cooking", "Reading",
  "Rock Climbing", "Board Games", "Coffee", "Anime", "Running",
  "Music Production", "Painting", "Dancing", "Yoga", "Tennis",
  "Film", "Poetry", "Volunteering", "Thrifting", "Baking",
  "Travel", "Soccer", "Basketball", "Robotics", "Piano",
  "Guitar", "Singing", "Skiing", "Swimming", "Martial Arts",
];

const GRADIENT_PAIRS: [string, string][] = [
  ["#e74c3c", "#c0392b"],
  ["#3498db", "#2980b9"],
  ["#2ecc71", "#27ae60"],
  ["#9b59b6", "#8e44ad"],
  ["#f39c12", "#e67e22"],
  ["#1abc9c", "#16a085"],
  ["#e91e63", "#c2185b"],
  ["#00bcd4", "#0097a7"],
  ["#ff5722", "#e64a19"],
  ["#607d8b", "#455a64"],
  ["#8bc34a", "#689f38"],
  ["#ff9800", "#f57c00"],
  ["#673ab7", "#512da8"],
  ["#795548", "#5d4037"],
  ["#009688", "#00796b"],
];

const FIRST_NAMES_F = [
  "Emma", "Sophia", "Olivia", "Ava", "Isabella", "Mia", "Luna", "Harper",
  "Aria", "Ella", "Chloe", "Lily", "Zoe", "Nora", "Riley", "Layla",
  "Scarlett", "Grace", "Violet", "Maya", "Priya", "Mei", "Yuna", "Ananya",
  "Fatima", "Leila", "Rosa", "Nina", "Suki", "Aisha",
];

const FIRST_NAMES_M = [
  "Liam", "Noah", "Oliver", "James", "Ethan", "Lucas", "Mason", "Logan",
  "Alex", "Aiden", "Jack", "Owen", "Daniel", "Henry", "Sam", "Leo",
  "Ben", "Caleb", "Ryan", "Nathan", "Raj", "Wei", "Kenji", "Arjun",
  "Omar", "Diego", "Kai", "Ravi", "Jin", "Andre",
];

const BIOS = [
  "Always down for a late-night walk through Schenley Park. Looking for someone to share my extra meal swipe with.",
  "Will trade debugging help for coffee. Serious inquiries only.",
  "Probably in the UC studying right now. Or napping. 50/50 chance.",
  "Pittsburgh converted me into a bridges enthusiast. Let me show you my favorites.",
  "My love language is sharing Spotify playlists and solving puzzles together.",
  "Looking for someone who won't judge me for eating Entropy+ at 2am.",
  "I've explored every hidden spot on campus. Want a tour?",
  "Firm believer that the best dates involve trying new food trucks.",
  "If you can beat me at ping pong in the UC, you have my heart.",
  "Sunset views from the Cut are underrated. Change my mind over dinner?",
  "I make a mean pour-over coffee. First one's free, rest cost a date.",
  "Searching for a study buddy who becomes something more.",
  "I know all the best spots in Squirrel Hill. Let's explore together.",
  "My friends say I give the best recommendations. Let me prove it.",
  "Dog person, coffee addict, and eternal optimist. In that order.",
  "Looking for someone to split a Pamela's crepe with on weekends.",
  "I promise I'm more interesting than my major suggests.",
  "Will serenade you on the Fence if you ask nicely.",
  "Competitive about everything except relationships. Those I take seriously.",
  "Let's grab boba in Oakland and talk about our wildest dreams.",
];

const PROMPT_ANSWERS: Record<string, string[]> = {
  "My ideal study date spot on campus is...": [
    "Hunt Library, top floor with the city view",
    "Sorrells Library - cozy and quiet",
    "The Tepper quad when it's sunny",
    "A blanket on the Cut with laptops",
    "Gates cafe with two coffees and a shared table",
  ],
  "The class that changed my life was...": [
    "15-112 - it literally rewired my brain",
    "Great Theoretical Ideas in CS... pain but growth",
    "Intro to Philosophy - made me question everything",
    "Design fundamentals - I see the world differently now",
    "Behavioral Economics - explains why we do dumb things",
  ],
  "You can find me on a Friday night at...": [
    "Movie night in my apartment with friends",
    "The O, pretending I can dance",
    "Exploring a new restaurant in Shadyside",
    "Game night at AB - I take Catan very seriously",
    "A rooftop somewhere watching the city lights",
  ],
  "My hot take about campus food is...": [
    "The Exchange has the best hidden gems",
    "Schatz is overhyped, fight me",
    "Late night Resnik hits different after a deadline",
    "La Prima coffee is worth the walk to Wean",
    "The food trucks on Forbes are CMU's best kept secret",
  ],
  "The hill I will die on about CMU is...": [
    "We have the most beautiful campus in any city",
    "Buggy is the coolest tradition at any university",
    "We work too hard but we wouldn't have it any other way",
    "Our squirrels are more iconic than any mascot",
    "CMU's interdisciplinary culture is genuinely unmatched",
  ],
  "If I could only eat at one campus spot forever, it'd be...": [
    "Taste of India in the UC, no question",
    "Rothberg's Roasters - I live on that coffee",
    "El Gallo de Oro - those tacos are life",
    "The Tartan Express for consistent comfort food",
    "Nourish - healthy and actually tastes good",
  ],
  "My go-to late night coding fuel is...": [
    "Red Bull and regret",
    "Trader Joe's snacks I bulk-bought on a good day",
    "Bubble tea from Oakland, always taro",
    "A dangerous amount of espresso",
    "Whatever vending machine snack still has stock",
  ],
  "The weirdest tradition I've participated in is...": [
    "Painting the Fence at 4am in freezing weather",
    "Mobot races - yes they're exactly what they sound like",
    "Buggy - running behind a human-powered racecar at dawn",
    "Spring Carnival booth building on zero sleep",
    "Kiltie Band halftime shows in full Scottish regalia",
  ],
  "My unpopular opinion about Pittsburgh is...": [
    "The weather is actually not that bad",
    "Primanti's is mid, I said what I said",
    "Pittsburgh left turns make total sense actually",
    "The incline is worth doing more than once",
    "Oakland is the best neighborhood, not Shadyside",
  ],
  "The thing I'm most passionate about outside of class is...": [
    "Building things that make people's lives better",
    "Making music - it keeps me sane during midterms",
    "Teaching kids to code on weekends",
    "Urban sketching around Pittsburgh neighborhoods",
    "Training for my first half marathon",
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

function generateProfile(id: number): Profile {
  const isFemale = Math.random() > 0.5;
  const name = isFemale ? pick(FIRST_NAMES_F) : pick(FIRST_NAMES_M);
  const college = pick(COLLEGES);
  const major = pick(MAJORS[college]);
  const prompt = pick(CMU_PROMPTS);
  const answers = PROMPT_ANSWERS[prompt] || ["Something fun!"];
  const year = pick(["Freshman", "Sophomore", "Junior", "Senior"] as const);
  const ageMap = { Freshman: 18, Sophomore: 19, Junior: 20, Senior: 21 };
  const age = ageMap[year] + (Math.random() > 0.7 ? 1 : 0);

  return {
    id: `profile-${id}`,
    name,
    age,
    year,
    college,
    major,
    bio: pick(BIOS),
    interests: pickN(INTERESTS, 3 + Math.floor(Math.random() * 4)),
    prompt,
    promptAnswer: pick(answers),
    photos: [],
    avatarGradient: pick(GRADIENT_PAIRS),
  };
}

let cachedProfiles: Profile[] | null = null;

export function getProfiles(): Profile[] {
  if (cachedProfiles) return cachedProfiles;
  cachedProfiles = Array.from({ length: 50 }, (_, i) => generateProfile(i));
  return cachedProfiles;
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}
