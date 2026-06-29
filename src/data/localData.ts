export interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  duration: string;
  views: number;
  likes: number;
  isShort: boolean;
  categories: string[];
  tags: string[];
  thumbnailUrl: string;
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoIds: string[];
}

export interface ChannelStats {
  subscriberCount: number;
  viewCount: number;
  videoCount: number;
}

export const CHANNEL_ID = "UC1bL9CUkfbuDsW_pyLCFmqQ";
export const CHANNEL_HANDLE = "@QuantumFrame142";
export const CHANNEL_NAME = "Quantum Frame";

export const localStats: ChannelStats = {
  subscriberCount: 248000,
  viewCount: 15400000,
  videoCount: 84,
};

export const localVideos: Video[] = [
  {
    id: "i9iU4BRrXJU",
    title: "🔱 What if Mount Kailash revealed its greatest secret... for just one minute? 👁️✨",
    description: "🔱 What If Mount Kailash Opened for One Minute? Imagine a world where the sacred mountain revealed a hidden celestial realm for just one minute. Beyond the gates lies a breathtaking mystery, ending with a majestic vision of Lord Shiva in eternal meditation. This is a fictional cinematic story inspired by mythology, created to explore imagination through epic visual storytelling.",
    publishedAt: "2026-06-29T02:51:22Z",
    duration: "0:58",
    views: 450000,
    likes: 32000,
    isShort: true,
    categories: ["Mythology", "Celestial Blaze", "Animation"],
    tags: ["Shorts", "QuantumFrame", "LordShiva", "MountKailash", "Mythology", "Fantasy", "Epic", "Adventure", "Cinematic"],
    thumbnailUrl: "https://i.ytimg.com/vi/i9iU4BRrXJU/hqdefault.jpg"
  },
  {
    id: "rnhsVWTS14s",
    title: "⚔️ The Temple has awakened... Can Ren survive the First Guardian? 👁️🔥",
    description: "Episode 3 of The Celestial Blade is here! Ren enters the long-forgotten Celestial Temple to face his first trials. But the temple guards its secrets fiercely, and its ancient protector awakens. Can Ren survive the clash and claim his heritage, or will the shadows consume him?",
    publishedAt: "2026-06-28T03:12:00Z",
    duration: "0:57",
    views: 280000,
    likes: 19000,
    isShort: true,
    categories: ["Action", "Adventure", "Animation", "Celestial Blaze"],
    tags: ["QuantumFrame", "TheCelestialBlade", "Anime", "AIAnimation", "Fantasy", "EpicStory", "Shorts"],
    thumbnailUrl: "https://i.ytimg.com/vi/rnhsVWTS14s/hqdefault.jpg"
  },
  {
    id: "Eefhdmr50l8",
    title: "10,000 warriors. One legend. The battle was over before it truly began. ⚔️🔥",
    description: "A legendary warrior stands alone against a massive invading force. With a single strike of celestial fury, the earth splits and the heavens shatter. Witness the story of the one who defended the celestial border from the dark hordes. Fictional cinematic visuals inspired by ancient mythology and cosmic legends.",
    publishedAt: "2026-06-28T01:05:00Z",
    duration: "0:59",
    views: 890000,
    likes: 74000,
    isShort: true,
    categories: ["Action", "Animation", "Mythology"],
    tags: ["Shorts", "Legend", "Warriors", "Mythology", "EpicBattle", "Celestial", "AIArt", "Cinematic"],
    thumbnailUrl: "https://i.ytimg.com/vi/Eefhdmr50l8/hqdefault.jpg"
  },
  {
    id: "5kqMdMWqSBY",
    title: "🌧️ A single raindrop hid an entire universe... Would you dare dive inside? 🌌👁️",
    description: "🌧️ What if a single raindrop held an entire universe? Follow an impossible camera journey through galaxies, distant worlds, and a reality beyond imagination. Every second reveals a new mystery, leading to a mind-bending twist that changes everything. Welcome to Quantum Frame — Beyond Imagination.",
    publishedAt: "2026-06-28T04:05:29Z",
    duration: "0:59",
    views: 1200000,
    likes: 98000,
    isShort: true,
    categories: ["Sci-Fi", "Celestial Blaze", "Animation"],
    tags: ["Shorts", "QuantumFrame", "SciFi", "Universe", "Space", "Cinematic", "ImpossibleCameraTravel", "Epic", "Mystery"],
    thumbnailUrl: "https://i.ytimg.com/vi/5kqMdMWqSBY/hqdefault.jpg"
  },
  {
    id: "vuVPlBO0wOg",
    title: "The Day Gravity Stopped for 60 Seconds... 😱🌍 | What Would Happen?",
    description: "What if gravity suddenly disappeared? At exactly 3:17 PM, the impossible happens. Cars float into the sky, oceans rise, buildings collapse, and humanity faces its greatest nightmare. But the shocking truth is even more terrifying... Watch till the end to discover why gravity stopped.",
    publishedAt: "2026-06-27T11:51:25Z",
    duration: "0:59",
    views: 1500000,
    likes: 125000,
    isShort: true,
    categories: ["Sci-Fi", "Action", "Horror"],
    tags: ["Shorts", "SciFi", "Gravity", "WhatIf", "AI", "Cinematic", "UnrealEngine5", "Space", "Mystery", "Apocalypse"],
    thumbnailUrl: "https://i.ytimg.com/vi/vuVPlBO0wOg/hqdefault.jpg"
  },
  {
    id: "mMWM82F56-M",
    title: "⚔️ The Frozen Beast awakens! Can Ren unlock the Celestial Blade's true power? ❄️🔥 #Shorts",
    description: "Episode 2 of The Celestial Blade is here! ❄️ A terrifying Frozen Beast attacks the peaceful village, forcing Ren into his first battle. Outmatched and on the brink of defeat, he must awaken the hidden power of the Celestial Blade before it's too late.",
    publishedAt: "2026-06-27T02:40:31Z",
    duration: "0:59",
    views: 310000,
    likes: 22000,
    isShort: true,
    categories: ["Action", "Adventure", "Animation", "Celestial Blaze"],
    tags: ["QuantumFrame", "TheCelestialBlade", "Anime", "AIAnimation", "Fantasy", "EpicStory", "Shorts"],
    thumbnailUrl: "https://i.ytimg.com/vi/mMWM82F56-M/hqdefault.jpg"
  },
  {
    id: "lMQV3kM4uS8",
    title: "⚔️ The Sword That Fell From Heaven | Episode 1 🌌 The Celestial Blade | Will Ren survive?",
    description: "A peaceful mountain village is shattered when a mysterious celestial sword crashes from the sky. Hidden within the glowing crater lies an ancient power that chooses an ordinary orphan named Ren as the last Celestial Guardian. But every chosen hero has a price to pay... Will Ren save the world—or awaken something far more dangerous?",
    publishedAt: "2026-06-26T02:54:28Z",
    duration: "0:58",
    views: 420000,
    likes: 35000,
    isShort: true,
    categories: ["Action", "Adventure", "Animation", "Celestial Blaze"],
    tags: ["QuantumFrame", "TheCelestialBlade", "AnimeStory", "AIShorts", "FantasyWorld", "EpicAnimation", "Cinematic"],
    thumbnailUrl: "https://i.ytimg.com/vi/lMQV3kM4uS8/hqdefault.jpg"
  },
  {
    id: "Xhtb9RUiAWo",
    title: "\"What if another version of you already exists?\"",
    description: "He crossed countless universes only to find someone impossible waiting for him. A mysterious door leads to breathtaking parallel worlds. But in the final universe, he comes face to face with the creator of his timeline... himself.",
    publishedAt: "2026-06-25T12:15:30Z",
    duration: "0:59",
    views: 650000,
    likes: 48000,
    isShort: true,
    categories: ["Sci-Fi", "Horror", "Mystery"],
    tags: ["Shorts", "ParallelUniverse", "Multiverse", "SciFi", "Cinematic", "TimeTravel", "AIStory"],
    thumbnailUrl: "https://i.ytimg.com/vi/Xhtb9RUiAWo/hqdefault.jpg"
  },
  {
    id: "vsJVNqgydts",
    title: "A journey through all of time ends with a shocking discovery at the end of the universe. ⏳ ?",
    description: "What lies at the absolute end of time? The camera travels billions of years into the future, past the death of stars and the evaporation of black holes, only to find a single glowing artifact waiting. A cosmic clock resetting the universe.",
    publishedAt: "2026-06-24T14:22:00Z",
    duration: "0:59",
    views: 790000,
    likes: 54000,
    isShort: true,
    categories: ["Sci-Fi", "Celestial Blaze", "Adventure"],
    tags: ["Shorts", "TimeTravel", "Cosmos", "EndOfTheUniverse", "SciFi", "Cinematic", "AIVisuals", "Space"],
    thumbnailUrl: "https://i.ytimg.com/vi/vsJVNqgydts/hqdefault.jpg"
  },
  {
    id: "fiCMIzHB7jM",
    title: "Every Atom Might Be a Universe 🌌👁️",
    description: "What if scaling down into an atom reveals another solar system, and another galaxy? An infinite recursion of universes nested inside one another. Explore the quantum realm with cinematic macro visuals.",
    publishedAt: "2026-06-23T11:10:00Z",
    duration: "0:59",
    views: 1100000,
    likes: 91000,
    isShort: true,
    categories: ["Sci-Fi", "Celestial Blaze"],
    tags: ["Quantum", "Microcosm", "Universe", "Atom", "SciFi", "Cinematic", "Shorts", "VisualEffects"],
    thumbnailUrl: "https://i.ytimg.com/vi/fiCMIzHB7jM/hqdefault.jpg"
  },
  {
    id: "a8hlxLncjAc",
    title: "Earth was never the center of everything... 🌎✨",
    description: "A cosmic journey backing away from Earth, passing the outer planets, crossing our galaxy, and showing our tiny place in the galactic web. A humbling cinematic visual story about the grandeur of space.",
    publishedAt: "2026-06-22T03:15:00Z",
    duration: "0:58",
    views: 950000,
    likes: 67000,
    isShort: true,
    categories: ["Sci-Fi", "Celestial Blaze"],
    tags: ["Space", "Astronomy", "Earth", "Galaxies", "Shorts", "QuantumFrame", "Cinematic", "Cosmos"],
    thumbnailUrl: "https://i.ytimg.com/vi/a8hlxLncjAc/hqdefault.jpg"
  },
  {
    id: "ij78L13_gA0",
    title: "What if black holes are not the end... but gateways to the creators of entire universes? 🌌🤯",
    description: "Inside a black hole lies a singularity, but what if crossing the event horizon is actually entering the motherboard of our simulation? A breathtaking conceptual sci-fi trip into a black hole.",
    publishedAt: "2026-06-20T05:40:00Z",
    duration: "0:59",
    views: 1400000,
    likes: 112000,
    isShort: true,
    categories: ["Sci-Fi", "Celestial Blaze"],
    tags: ["BlackHole", "Singularity", "SimulationTheory", "SciFi", "Space", "Cinematic", "Universe", "Shorts"],
    thumbnailUrl: "https://i.ytimg.com/vi/ij78L13_gA0/hqdefault.jpg"
  },
  {
    id: "18dZo2AMIvs",
    title: "Beyond imagination. Enter the world of Quantum Frame and witness extraordinary stories.",
    description: "Quantum Frame channel official introduction. Explore the deep mysteries of the universe, ancient myths, horror tales, action sills, and cinematic sci-fi. Using advanced AI animation tools, we bring the impossible to life. Subscribe for daily high-fidelity stories.",
    publishedAt: "2026-06-18T12:00:00Z",
    duration: "2:45",
    views: 520000,
    likes: 41000,
    isShort: false,
    categories: ["Sci-Fi", "Celestial Blaze", "Animation"],
    tags: ["Trailer", "QuantumFrame", "Cinematic", "AIAnimation", "SciFi", "Mythology", "Horror", "Intro"],
    thumbnailUrl: "https://i.ytimg.com/vi/18dZo2AMIvs/maxresdefault.jpg"
  },
  {
    id: "hywWYl-uUP8",
    title: "🌊 From the cosmic ocean She arose & shook the universe. Bow down. 🔱 #MaaDurga #JaiMataDi",
    description: "Maa Durga emerges from the celestial ocean, wielding weapons of cosmic energy to restore balance. An epic depiction of mythology, featuring dark, cinematic atmospheres and celestial power scaling.",
    publishedAt: "2026-06-15T04:22:00Z",
    duration: "0:59",
    views: 820000,
    likes: 69000,
    isShort: true,
    categories: ["Mythology", "Horror", "Fantasy"],
    tags: ["MaaDurga", "Mythology", "Hinduism", "Cosmic", "Epic", "Shorts", "Animation", "Divine"],
    thumbnailUrl: "https://i.ytimg.com/vi/hywWYl-uUP8/hqdefault.jpg"
  },
  {
    id: "UwZB1bFMchc",
    title: "The Demon Who Multiplied With Every Drop of Blood | Maa Durga vs Raktabija ⚔️ #Shorts #MaaDurga",
    description: "The terrifying battle of Maa Durga against Raktabija, the demon whose drops of blood create clones of himself. The skies turn dark, the battlefield trembles, and Kali emerges to drink the blood before it touches the ground. A cinematic mythological epic.",
    publishedAt: "2026-06-12T04:10:00Z",
    duration: "0:59",
    views: 1300000,
    likes: 99000,
    isShort: true,
    categories: ["Mythology", "Horror", "Fantasy", "Action"],
    tags: ["MaaDurga", "Raktabija", "Kali", "Mythology", "EpicBattle", "Shorts", "FantasyWorld", "Horror"],
    thumbnailUrl: "https://i.ytimg.com/vi/UwZB1bFMchc/hqdefault.jpg"
  }
];

export const localPlaylists: Playlist[] = [
  {
    id: "PL_celestial_blade",
    title: "Celestial Blade Saga",
    description: "An ordinary orphan named Ren discovers a sword that crashed from heaven, selecting him as the last Celestial Guardian. Ren must fight terrifying beasts and uncover ancient secrets.",
    thumbnailUrl: "https://i.ytimg.com/vi/lMQV3kM4uS8/hqdefault.jpg",
    videoIds: ["lMQV3kM4uS8", "mMWM82F56-M", "rnhsVWTS14s"]
  },
  {
    id: "PL_cosmic_mysteries",
    title: "Cosmic Mysteries & What-Ifs",
    description: "Mind-bending visual journeys exploring the secrets of scale, space, gravity, and the outer edges of the universe. What if gravity stopped? What if atoms were universes?",
    thumbnailUrl: "https://i.ytimg.com/vi/5kqMdMWqSBY/hqdefault.jpg",
    videoIds: ["5kqMdMWqSBY", "vuVPlBO0wOg", "Xhtb9RUiAWo", "vsJVNqgydts", "fiCMIzHB7jM", "a8hlxLncjAc", "ij78L13_gA0"]
  },
  {
    id: "PL_mythological_legends",
    title: "Mythological Legends & Gods",
    description: "Epic tales from ancient legends brought to life with dark cinematic visuals. Witness the cosmic battles of Durga, Kailash's secrets, and mythological wonders.",
    thumbnailUrl: "https://i.ytimg.com/vi/i9iU4BRrXJU/hqdefault.jpg",
    videoIds: ["i9iU4BRrXJU", "Eefhdmr50l8", "hywWYl-uUP8", "UwZB1bFMchc"]
  }
];
