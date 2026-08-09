export interface Project {
  slug: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  images: string[];
  logoUrl?: string;
  tags: string[];
  category: string;
  year: number;
  liveUrl?: string;
  repoUrl?: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "adhura",
    index: "01",
    title: "adhura",
    tagline: "Generative AI story completion & visual narrative platform",
    description: "An AI-powered creative storytelling platform that transforms incomplete story prompts into rich visual narratives and animated interactive sequences. Built with generative AI models to generate fluid story continuations.",
    coverImage: "/projects/adhura/ChatGPT Image Aug 9, 2026, 07_04_07 PM.png",
    images: ["/projects/all logos/adhura logo.png", "/projects/adhura/ChatGPT Image Aug 9, 2026, 07_04_07 PM.png"],
    logoUrl: "/projects/all logos/adhura logo.png",
    tags: ["Generative AI", "React", "Python", "Tailwind CSS"],
    category: "AI Narrative Engine",
    year: 2024,
  },
  {
    slug: "algorhythms",
    index: "02",
    title: "Algorhythms",
    tagline: "Interactive algorithm visualizer with step-by-step simulation and real-time controls",
    description: "A matrix-inspired interactive algorithm visualizer that step-simulates complex data structures, sorting algorithms, and graph traversals with real-time speed and step controls.",
    coverImage: "/projects/algorhyhtms/ChatGPT Image Aug 9, 2026, 07_04_18 PM.png",
    images: [
      "/projects/algorhyhtms/ChatGPT Image Aug 9, 2026, 07_04_18 PM.png",
      "/projects/all logos/algorhythms logo.png",
    ],
    logoUrl: "/projects/all logos/algorhythms logo.png",
    tags: ["JavaScript", "Canvas API", "Algorithms", "CSS3 Matrix"],
    category: "Interactive Tool",
    year: 2024,
  },
  {
    slug: "awwab",
    index: "03",
    title: "Awwab",
    tagline: "Location-aware Islamic companion and mosque locator",
    description: "A comprehensive mobile companion app featuring real-time GPS mosque tracking, precise walking and driving routes, prayer time calculations, and Qibla navigation built for mobile users.",
    coverImage: "/projects/Awwab/ChatGPT Image Aug 9, 2026, 07_12_59 PM.png",
    images: [
      "/projects/Awwab/ChatGPT Image Aug 9, 2026, 07_12_59 PM.png",
    ],
    logoUrl: "/projects/all logos/awwab logo.png",
    tags: ["Flutter", "Dart", "Google Maps API", "Geolocation"],
    category: "Mobile App",
    year: 2024,
  },
  {
    slug: "bahria-chronicles",
    index: "04",
    title: "Bahria University Chronicles",
    tagline: "Retro 2D pixel-art RPG set in campus environment",
    description: "A story-driven 2D pixel-art RPG game featuring campus exploration, character quests, custom retro start menus, and interactive student life mechanics built with custom C++ game engine systems.",
    coverImage: "/projects/Bahria University Chronicles/ChatGPT Image Aug 9, 2026, 07_02_55 PM.png",
    images: [
      "/projects/Bahria University Chronicles/ChatGPT Image Aug 9, 2026, 07_02_55 PM.png",
      "/projects/all logos/2D rpg game logo.png",
    ],
    logoUrl: "/projects/all logos/2D rpg game logo.png",
    tags: ["C++", "SFML", "Pixel Art", "Game Development"],
    category: "2D RPG Game",
    year: 2023,
  },
  {
    slug: "maira",
    index: "05",
    title: "MaiRA",
    tagline: "Conversational AI anime avatar companion interface",
    description: "An interactive anime-styled AI chatbot application featuring custom visual avatar graphics, real-time message dialogue, custom emotion prompts, and glowing cyber interface styling.",
    coverImage: "/projects/MaiRA/ChatGPT Image Aug 9, 2026, 07_02_17 PM.png",
    images: ["/projects/MaiRA/ChatGPT Image Aug 9, 2026, 07_02_17 PM.png"],
    tags: ["TypeScript", "React", "Node.js", "LLM APIs"],
    category: "AI Avatar Interface",
    year: 2024,
  },
  {
    slug: "querytalk",
    index: "06",
    title: "QueryTalk",
    tagline: "Natural language to SQL query converter & visualizer",
    description: "A localized database assistant app powered by Ollama and Qwen 2.5, translating English, Urdu, and Roman text into validated SQL scripts, dynamic tables, and visual database schema diagrams.",
    coverImage: "/projects/QueryTalk/ChatGPT Image Aug 9, 2026, 07_04_38 PM.png",
    images: ["/projects/QueryTalk/ChatGPT Image Aug 9, 2026, 07_04_38 PM.png"],
    tags: ["Next.js", "Ollama", "Qwen 2.5", "SQL", "Tailwind CSS"],
    category: "Database Tool",
    year: 2025,
  },
  {
    slug: "rahnumai",
    index: "07",
    title: "RahnumAI",
    tagline: "Intelligent AI learning platform built for educators",
    description: "An AI-enhanced educational platform designed to empower teachers and students with automated lesson planning, learning statistics dashboards, interactive video demos, and guided study tracks.",
    coverImage: "/projects/RahnumAI/cfc55aee-b081-49c4-827a-c8fea22b367a-0010.jpg",
    images: [
      "/projects/RahnumAI/cfc55aee-b081-49c4-827a-c8fea22b367a-0010.jpg",
      "/projects/RahnumAI/cfc55aee-b081-49c4-827a-c8fea22b367a-0011.jpg",
      "/projects/RahnumAI/cfc55aee-b081-49c4-827a-c8fea22b367a-0012.jpg",
    ],
    tags: ["React", "TypeScript", "Node.js", "OpenAI API"],
    category: "EdTech Platform",
    year: 2024,
  },
  {
    slug: "solemates",
    index: "08",
    title: "SoleMates",
    tagline: "Modern footwear e-commerce & retail storefront",
    description: "A full-featured footwear e-commerce web application with product category filtering, shopping cart state, promo banner discounts, and authenticated user accounts.",
    coverImage: "/projects/SoleMates/ChatGPT Image Aug 9, 2026, 07_03_46 PM.png",
    images: [
      "/projects/SoleMates/ChatGPT Image Aug 9, 2026, 07_03_46 PM.png",
      "/projects/all logos/solemates logo.jpeg",
    ],
    logoUrl: "/projects/all logos/solemates logo.jpeg",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    category: "E-Commerce",
    year: 2023,
  },
  {
    slug: "trace",
    index: "09",
    title: "Trace",
    tagline: "Campus lost & found app with live geolocation and Discord-based alerts",
    description: "A smart mobile application for reporting lost and found items on campus with live geolocation mapping, category filters, item status tracking, and automated Discord bot integration.",
    coverImage: "/projects/Trace/ChatGPT Image Aug 9, 2026, 07_03_22 PM.png",
    images: [
      "/projects/Trace/ChatGPT Image Aug 9, 2026, 07_03_22 PM.png",
    ],
    logoUrl: "/projects/all logos/trace logo.png",
    tags: ["React Native", "Expo", "Firebase", "Discord API", "Mapbox"],
    category: "Mobile App",
    year: 2024,
  },
  {
    slug: "ubook",
    index: "10",
    title: "UBook",
    tagline: "Multi-category marketplace & social community hub",
    description: "An all-in-one web marketplace allowing users to list and browse vehicles, electronics, jobs, and services alongside built-in social chatrooms, video shorts, and AI agents.",
    coverImage: "/projects/UBook/image7.png",
    images: ["/projects/UBook/image7.png", "/projects/UBook/image4.png"],
    tags: ["React", "Node.js", "Express", "MongoDB", "WebSockets"],
    category: "Web Marketplace",
    year: 2023,
  },
  {
    slug: "uummeed",
    index: "11",
    title: "UUMMEED",
    tagline: "Multithreaded Linux desktop download manager GUI",
    description: "A high-performance Linux desktop application for managing parallel multithreaded file downloads with status tracking, download history, speed optimization, and custom themes.",
    coverImage: "/projects/UUMMEED/ChatGPT Image Aug 9, 2026, 07_04_28 PM.png",
    images: [
      "/projects/UUMMEED/ChatGPT Image Aug 9, 2026, 07_04_28 PM.png",
      "/projects/all logos/uummeed logo.png",
    ],
    logoUrl: "/projects/all logos/uummeed logo.png",
    tags: ["Python", "PyQt", "GTK", "Multithreading", "Linux"],
    category: "Desktop Application",
    year: 2023,
  },
];
