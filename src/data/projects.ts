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
  role: string;
  problem: string;
  approach: string;
  keyDecisions: string[];
  metrics: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "adhura",
    index: "01",
    title: "adhura",
    tagline: "Ambient glassmorphic productivity app with geolocated weather audio & context-aware AI task agent",
    description: "An aesthetically driven, local-first ambient task management platform built with React and Netlify Functions. Integrates IndexedDB offline persistence, real-time Open-Meteo geolocation weather soundscapes, dynamic glassmorphic time/weather backdrops, and a contextual OpenRouter AI assistant.",
    coverImage: "/projects/adhura/adhura-preview.png",
    images: ["/projects/all logos/adhura-logo.png", "/projects/adhura/adhura-preview.png"],
    logoUrl: "/projects/all logos/adhura-logo.png",
    tags: ["React", "IndexedDB", "Netlify Functions", "OpenRouter AI", "Open-Meteo API", "Glassmorphic UI"],
    category: "Ambient AI Productivity Engine",
    year: 2024,
    role: "Sole Developer",
    problem: "Standard task managers feel sterile and spreadsheet-like, causing task fatigue and procrastination. Users need an ambient, emotionally engaging workspace that motivates task completion while keeping sensitive task data private and functional offline.",
    approach: "Built a local-first ambient productivity workspace. Combined Web Audio API beat visualizers, dynamic geolocated weather/time backdrops, IndexedDB offline storage, and an integrated contextual AI task assistant.",
    keyDecisions: [
      "Chose IndexedDB (idb) over cloud databases for 100% offline resilience and instant read latency.",
      "Built a custom Web Audio API AnalyserNode engine that frequency-syncs wallpaper animations to ambient music beats.",
      "Implemented Netlify serverless functions to securely proxy OpenRouter API keys while automatically hydrating task metadata into LLM prompts."
    ],
    metrics: [
      "0ms Offline Read Latency",
      "100% Offline Task Resilience",
      "<1.5s AI Assistant Response Time",
      "60 FPS Visualizer Frame Sync"
    ],
  },
  {
    slug: "algorhythms",
    index: "02",
    title: "Algorhythms",
    tagline: "WPF-based interactive algorithm simulator & data structure visualizer",
    description: "A Windows Presentation Foundation (WPF) interactive simulator for animating data structures and algorithms. Features step-by-step sorting animations (Bubble, Quick, Merge Sort), a Travelling Salesman Problem (TSP) shortest path graph solver, and a Binary Search Tree (BST) guessing game.",
    coverImage: "/projects/algorhythms/algorhythms-preview.png",
    images: [
      "/projects/algorhythms/algorhythms-preview.png",
      "/projects/all logos/algorhythms-logo.png",
    ],
    logoUrl: "/projects/all logos/algorhythms-logo.png",
    tags: ["C#", ".NET", "WPF", "Algorithms", "Data Structures", "Animation"],
    category: "Algorithm Visualizer & Simulator",
    year: 2024,
    role: "Sole Developer",
    problem: "Computer science students struggle to grasp dynamic Data Structures and Algorithms (DSA) concepts through static code snippets and textbook diagrams without visual step-by-step execution.",
    approach: "Designed an interactive WPF desktop application that visually simulates sorting algorithms, graph pathfinding, and tree traversals with real-time speed controls and step inspection.",
    keyDecisions: [
      "Architected WPF C# application with strict separation between algorithm execution state machines and XAML UI rendering.",
      "Built a dynamic step-by-step animation loop with real-time speed control and state inspection.",
      "Implemented gamified BST traversal rules and TSP shortest-path graph solvers."
    ],
    metrics: [
      "60 FPS Execution Animations",
      "10+ Algorithms & Data Structures",
      "Step-by-Step State Inspection"
    ],
  },
  {
    slug: "awwab",
    index: "03",
    title: "Awwab",
    tagline: "Location-aware Islamic companion with real-time prayer calculations & mosque GPS tracking",
    description: "An all-in-one mobile Islamic companion built with Flutter and Dart. Integrates real-time Aladhan API prayer time calculations, GPS mosque route tracking via Geolocator, Qibla compass navigation, digital Tasbeeh counter, daily Hadiths, and custom Azan notifications.",
    coverImage: "/projects/Awwab/awwab-preview.png",
    images: [
      "/projects/Awwab/awwab-preview.png",
    ],
    logoUrl: "/projects/all logos/awwab-logo.png",
    tags: ["Flutter", "Dart", "Provider", "REST API", "Geolocation", "CustomPainter"],
    category: "Mobile Application",
    year: 2024,
    role: "Sole Developer",
    problem: "Muslim travelers struggle to locate nearby mosques in unfamiliar areas, calculate exact local prayer times dynamically, and maintain consistent daily prayer routines across mobile platforms.",
    approach: "Engineered a location-aware Flutter mobile companion with real-time GPS mosque tracking, precise walking/driving routes, Aladhan API prayer calculations, Qibla compass, and local Azan notifications.",
    keyDecisions: [
      "Used Flutter and Dart with Provider state management for cross-platform performance across 6 target platforms.",
      "Integrated Geolocator API and Google Maps API for distance and route computation.",
      "Used CustomPainter for smooth hardware-accelerated Qibla compass rose rendering."
    ],
    metrics: [
      "<500ms Mosque Location Queries",
      "100% Offline Cached Prayer Times",
      "6 Target Platforms from Single Codebase"
    ],
  },
  {
    slug: "bahria-chronicles",
    index: "04",
    title: "Bahria University Chronicles",
    tagline: "Retro 2D pixel-art campus RPG game with custom tile map engine & OOP architecture",
    description: "A story-driven 2D pixel-art RPG set inside Bahria University. Players navigate campus maps built with a custom tile engine, complete quests for 40 NPC classmates, and defeat 'The Finals' boss to achieve a 4.0 GPA while demonstrating core OOP design principles.",
    coverImage: "/projects/Bahria University Chronicles/bahria-chronicles-preview.png",
    images: [
      "/projects/Bahria University Chronicles/bahria-chronicles-preview.png",
      "/projects/all logos/2d-rpg-game-logo.png",
    ],
    logoUrl: "/projects/all logos/2d-rpg-game-logo.png",
    tags: ["Java", "Java Swing", "Tile Engine", "OOP Architecture", "Game Design"],
    category: "2D Game Engine",
    year: 2023,
    role: "Sole Developer & Lead Programmer",
    problem: "Students find core Object-Oriented Programming (OOP) concepts abstract and difficult to internalize without practical, interactive applications.",
    approach: "Designed a story-driven 2D pixel-art RPG set inside Bahria University where players complete quests for 40 NPC classmates and battle 'The Finals' boss for a 4.0 GPA.",
    keyDecisions: [
      "Built a custom file-based tile map engine reading terrain grids from raw text files.",
      "Implemented core OOP patterns (Polymorphic Entities, Aggregation, Encapsulated stats).",
      "Integrated Java Swing and KeyListener APIs for 60 FPS input handling and rendering."
    ],
    metrics: [
      "60 FPS Pixel-Art Engine",
      "40 Custom Classmate NPCs",
      "5/9 Quest System Branching"
    ],
  },
  {
    slug: "maira",
    index: "05",
    title: "MaiRA",
    tagline: "Interactive Live2D WebGL avatar assistant with dynamic motion physics & LLM conversational engine",
    description: "A real-time WebGL virtual AI avatar assistant built with Live2D Cubism Native SDK and React. Features dynamic eye gaze tracking, lip-sync, motion physics, expression triggers (.exp3.json), slide-out tray navigation, and multi-avatar hot-swapping.",
    coverImage: "/projects/MaiRA/maira-preview.png",
    images: ["/projects/MaiRA/maira-preview.png"],
    tags: ["TypeScript", "React", "WebGL", "Live2D Cubism SDK", "Physics Engine", "LLM APIs"],
    category: "WebGL & AI Companion",
    year: 2024,
    role: "Sole Developer",
    problem: "Standard conversational AI chatbots feel sterile, cold, and static without emotional presence or visual feedback.",
    approach: "Developed an interactive WebGL virtual AI avatar assistant powered by Live2D Cubism SDK, dynamic eye gaze tracking, lip-syncing, emotion triggers, and streaming LLM responses.",
    keyDecisions: [
      "Built a TypeScript framework adapter layer for Live2D Cubism Core to manage WASM memory safely inside React 18.",
      "Engineered multi-avatar hot-swapping (8 models) without destroying WebGL rendering contexts.",
      "Synthesized expression triggers (.exp3.json) dynamically based on conversation sentiment."
    ],
    metrics: [
      "60 FPS WebGL Avatar Rendering",
      "8 Hot-Swappable Live2D Avatar Models",
      "Sub-200ms Expression Trigger Sync"
    ],
  },
  {
    slug: "querytalk",
    index: "06",
    title: "QueryTalk",
    tagline: "Natural language to SQL database studio with AST query security guardrails & ER schema visualizer",
    description: "An enterprise-grade conversational database studio built with FastAPI and React. Translates natural language into dialect-specific SQL, visualizes ER schemas, and strictly enforces read-only query safety using an AST SQL Validator (sqlglot) with multi-provider LLM support.",
    coverImage: "/projects/QueryTalk/querytalk-preview.png",
    images: ["/projects/QueryTalk/querytalk-preview.png"],
    tags: ["FastAPI", "Python", "React", "AST Security Guardrails", "SQLGlot", "Multi-LLM Engine", "Docker"],
    category: "Database Studio & AI Engine",
    year: 2025,
    role: "Solo Developer (Agentic AI & Full Stack)",
    problem: "Business analysts cannot write SQL, while naive LLM text-to-SQL tools hallucinate destructive commands (DROP, DELETE, UPDATE) and lack database schema awareness.",
    approach: "Built an enterprise-grade agentic database studio that translates English, Urdu, and Roman Urdu into validated SQL, visualizes ER schemas, and executes safe queries with dynamic charting.",
    keyDecisions: [
      "Implemented an AST SQL Security Validator using sqlglot to strictly enforce read-only SELECT execution.",
      "Designed a pluggable LLM Engine factory (OpenAI, Claude 3.5, Gemini, local Ollama) with dynamic Pydantic schema hydration.",
      "Built dynamic schema mapping extracting foreign key relationships and row count estimates for LLM prompt context."
    ],
    metrics: [
      "0 SQL Injection Regressions",
      "100% Destructive Query Interception",
      "<2s Query Generation & Execution Latency"
    ],
  },
  {
    slug: "rahnumai",
    index: "07",
    title: "RahnumAI",
    tagline: "AI-powered educational LMS with predictive grade analytics & student wellbeing sentiment tracking",
    description: "A smart Learning Management System built with Django REST and React. Employs Machine Learning models (KNN, Random Forest, Neural Networks) for personalized study path recommendations, grade forecasting, automated assignment plagiarism detection, and student stress sentiment analysis.",
    coverImage: "/projects/RahnumAI/rahnumai-preview-1.jpg",
    images: [
      "/projects/RahnumAI/rahnumai-preview-1.jpg",
      "/projects/RahnumAI/rahnumai-preview-2.jpg",
      "/projects/RahnumAI/rahnumai-preview-3.jpg",
    ],
    tags: ["Django REST", "Python", "Machine Learning", "React", "Predictive Analytics", "Plagiarism Detection"],
    category: "EdTech & ML Platform",
    year: 2024,
    role: "Full-Stack AI Lead",
    problem: "Traditional Learning Management Systems are non-personalized, reactive, and lack tools for detecting student burnout or academic failure risks.",
    approach: "Built an AI-powered LMS with predictive grade analytics, ML-driven personalized study paths, sentiment-based student stress monitoring, and automated plagiarism detection.",
    keyDecisions: [
      "Trained KNN, Random Forest, and Naive Bayes ML models for early grade prediction and risk intervention.",
      "Developed Django REST Framework backend APIs connected to a responsive React Vite frontend.",
      "Implemented automated assignment plagiarism detection and sentiment analysis algorithms."
    ],
    metrics: [
      "<2s ML Prediction Latency",
      "99% Academic Uptime Target",
      "Support for 1000+ Concurrent Users"
    ],
  },
  {
    slug: "solemates",
    index: "08",
    title: "SoleMates",
    tagline: "Database-driven e-commerce retail storefront with real-time stock triggers & audit logging",
    description: "A full-featured footwear e-commerce platform built with Django and MS SQL Server. Implements advanced relational database concepts including stored procedures, database triggers for real-time inventory validation, audit logs, order tracking, and paperless e-bill generation.",
    coverImage: "/projects/SoleMates/solemates-preview.png",
    images: [
      "/projects/SoleMates/solemates-preview.png",
      "/projects/all logos/solemates-logo.jpeg",
    ],
    logoUrl: "/projects/all logos/solemates-logo.jpeg",
    tags: ["Django", "Python", "MS SQL Server", "Database Triggers", "Stored Procedures", "E-Commerce"],
    category: "E-Commerce & DBMS",
    year: 2023,
    role: "Full-Stack & Database Developer",
    problem: "E-commerce prototypes often suffer from inventory overselling, lack of audit trails, and brittle data consistency.",
    approach: "Engineered a full-featured footwear e-commerce platform using Django and MS SQL Server with stored procedures, stock validation triggers, audit logs, and paperless e-bill generation.",
    keyDecisions: [
      "Wrote custom database triggers for real-time stock validation to prevent over-purchasing during checkout.",
      "Implemented audit trails in MS SQL Server for product, order, and stock level changes.",
      "Integrated Django ORM with raw SQL queries for optimized database execution."
    ],
    metrics: [
      "100% Inventory Over-Purchase Prevention",
      "Sub-second E-Bill Generation",
      "Real-Time Cart AJAX Validation"
    ],
  },
  {
    slug: "trace",
    index: "09",
    title: "Trace",
    tagline: "Smart campus lost & found app with AI vision matching, GIS indoor maps & blockchain verification",
    description: "A multi-platform campus lost-and-found ecosystem built with Flutter, Next.js 15, and Express. Features AI visual vector similarity matching, QR code handover scanning, indoor GIS floor blueprint mapping, automated Discord bot notifications, and immutable blockchain claim logs.",
    coverImage: "/projects/Trace/trace-preview.png",
    images: [
      "/projects/Trace/trace-preview.png",
    ],
    logoUrl: "/projects/all logos/trace-logo.png",
    tags: ["Flutter", "Dart", "Next.js", "Express.js", "Supabase", "AI Computer Vision", "Blockchain", "GIS"],
    category: "Smart Campus & AI Ecosystem",
    year: 2024,
    role: "Mobile & Full-Stack Lead (Solo Developer)",
    problem: "Physical campus lost-and-found notice boards cause delayed item recovery, fragmented reports, and fraudulent ownership claims.",
    approach: "Built a multi-platform lost-and-found ecosystem featuring AI visual vector similarity matching, indoor GIS campus blueprint navigation, timetable-based loss location prediction, and dual QR verification with blockchain claim logging.",
    keyDecisions: [
      "Scraped university CMS portal timetable data to predict item loss locations based on student schedules.",
      "Combined dual-sided QR code scans with immutable blockchain hashes for fraud-proof item handovers.",
      "Used Supabase PostGIS for vector indoor GIS floor map coordinate pinning."
    ],
    metrics: [
      ">85% AI Visual Match Confidence",
      "<1s QR Handover Verification",
      "0-Cost Vercel Serverless Architecture"
    ],
  },
  {
    slug: "ubook",
    index: "10",
    title: "UBook",
    tagline: "Scalable social network & marketplace with real-time WebSockets chat & media sharing",
    description: "A comprehensive client-server social media platform inspired by Facebook. Combines user feeds, post likes/comments, temporary 24-hour stories, video shorts, real-time WebSocket chatrooms, community marketplace listings, and an AI agent integration framework.",
    coverImage: "/projects/UBook/ubook-preview-1.png",
    images: ["/projects/UBook/ubook-preview-1.png", "/projects/UBook/ubook-preview-2.png"],
    tags: ["React", "Django", "MS SQL Server", "WebSockets", "REST APIs", "AI Framework"],
    category: "Social Media Platform",
    year: 2023,
    role: "Full-Stack Developer",
    problem: "Students require a unified platform combining social networking, real-time messaging, and campus marketplace trading.",
    approach: "Developed a client-server social media platform inspired by Facebook with feeds, likes/comments, 24-hour stories, short videos, real-time WebSocket chatrooms, and marketplace listings.",
    keyDecisions: [
      "Used WebSockets for instant multi-user chatroom messaging and real-time notification delivery.",
      "Architected Django backend with MS SQL Server using MVT design patterns.",
      "Integrated temporary media pipeline for 24-hour disappearing stories and video shorts."
    ],
    metrics: [
      "Sub-50ms Real-Time Messaging Latency",
      "Multi-Tiered Marketplace & Social Architecture"
    ],
  },
  {
    slug: "uummeed",
    index: "11",
    title: "UUMMEED",
    tagline: "High-performance Linux desktop multithreaded download manager with yt-dlp integration",
    description: "A multithreaded GTK 3 download manager for Linux desktop environments. Features configurable 1–16 parallel HTTP segment chunking, pause/resume capability, download history logging, real-time speed monitoring, and native YouTube video extraction via yt-dlp.",
    coverImage: "/projects/UUMMEED/uummeed-preview.png",
    images: [
      "/projects/UUMMEED/uummeed-preview.png",
      "/projects/all logos/uummeed-logo.png",
    ],
    logoUrl: "/projects/all logos/uummeed-logo.png",
    tags: ["Python 3", "PyGTK 3", "Glade CSS", "Multithreading", "yt-dlp", "Linux Systems"],
    category: "Desktop Systems App",
    year: 2023,
    role: "Lead Systems & GUI Developer",
    problem: "Linux desktop users lack fast, multithreaded download managers with pause/resume support and integrated YouTube video extraction.",
    approach: "Created a multithreaded GTK 3 desktop download manager for Ubuntu supporting 1–16 parallel HTTP segment chunking, persistent history logging, and native yt-dlp video downloads.",
    keyDecisions: [
      "Implemented parallel HTTP chunking using Python threading and file seek/write operations.",
      "Integrated yt-dlp via subprocess management with real-time output stream parsing.",
      "Used PyGTK 3, Glade, and custom CSS for a modern native Linux desktop interface."
    ],
    metrics: [
      "1–16 Parallel Download Threads",
      "100% Resumable Interrupted Downloads",
      "Native YouTube Extraction"
    ],
  },
];
