# Project Report: TRACE (Smart Campus Lost & Found Platform)

> **Document Classification:** Comprehensive System & Architecture Technical Specification  
> **Target Audience:** Mobile Engineers, Web Developers, Backend Architects, DevOps Engineers, Security Officers, and Autonomous AI Agents  
> **Status:** Fully Functional / Production Ready  

---

## 1. Executive Summary & Core Concept

**TRACE** is a next-generation, AI-driven, and Blockchain-verified Lost and Found ecosystem specifically designed for university campuses (specifically modeled around Bahria University). The system connects an advanced Cross-Platform Flutter Mobile Application, a Next.js 15 Web Portal & Admin CMS, an Express.js/Node.js Serverless Backend API, an interactive Discord Bot integration, and dynamic indoor GIS campus mapping services.

TRACE replaces manual university lost-and-found notice boards with automated AI Visual Vector Matching (computer vision image classification & embeddings), immutable Solana/EVM blockchain claim logging, QR-code physical handover validation, dynamic campus navigation (floor maps), and instant real-time chats.

```
+-----------------------------------------------------------------------------------+
|                              TRACE ECOSYSTEM CLIENTS                              |
|   [ Flutter Mobile App | Next.js 15 Web & Admin Portal | Discord Bot Client ]     |
+-----------------------------------------+-----------------------------------------+
                                          | REST / WebSockets / Push
                                          v
+-----------------------------------------------------------------------------------+
|                                TRACE BACKEND SERVER                               |
|   [ Express API | Supabase DB | Firebase Auth & Messaging | Node Middleware ]    |
+-------------------+-------------------------------------+-------------------------+
                    |                                     |
                    v                                     v
+-----------------------+                             +-----------------------+
|  AI Matchmaker Engine |                             |  Blockchain Verification|
|  - Vision Embeddings  |                             |  - Immutable Claim    |
|  - Similarity Scoring |                             |    Audit Logs         |
+-----------------------+                             +-----------------------+
```

---

## 2. Problems Solved

1. **Inaccessible & Dispersed Lost-and-Found Systems**: Physical lost property rooms in universities are inefficient. TRACE centralizes item reporting onto a mobile app with real-time push notifications.
2. **False Claims & Ownership Fraud**: Items of high value (laptops, wallets) attract fraudulent claim attempts. TRACE implements a multi-step ownership verification workflow:
   - AI-assisted verification questions.
   - Immutable claim record logging on Blockchain.
   - Dual-sided QR code scan during physical handover (`handover_qr_screen.dart` and `handover_scanner_screen.dart`).
3. **Imprecise Location Description**: Saying *"Lost near library"* is ambiguous. TRACE integrates interactive indoor GIS mapping (`maps/liaquat/floor_1.json`) allowing pinpoint coordinate drops on campus blueprints.
4. **Manual Administrative Overheads**: Automated Discord Bot alerts feed new lost/found listings directly into student channels, reducing administrative intervention.

---

## 3. Technology Stack & Technical Architecture

### 3.1 Mobile Native App (Flutter)
- **Framework**: Flutter 3.x (Dart 3)
- **Architecture**: Clean Architecture with Provider pattern & GoRouter navigation (`app_router.dart`)
- **Graphics & Motion**: Custom Canvas painters (`avatar_painter.dart`), Lottie animations, glassmorphic UI widgets (`glass_card.dart`, `mesh_glow_background.dart`)
- **Hardware Integration**: Camera API (for item scans & QR scanning), Geolocation, NFC/Biometrics (2FA authentication)

### 3.2 Web Portal & Admin Panel (Next.js 15)
- **Framework**: Next.js 15 App Router, TypeScript, React 19, TailwindCSS, Framer Motion
- **Features**: Administrative review queues, user suspension tools, analytics dashboards, post content moderation

### 3.3 Backend API & Services (Node.js / Express)
- **Runtime**: Node.js, Express.js serverless functions (hosted via Vercel / Cloud Engine)
- **Database**: Supabase PostgreSQL (PostGIS enabled for geospatial queries) + Firebase Realtime DB & Auth
- **AI Engine**: Computer vision image analysis & similarity matchmaker (`services/ai_service.js`, `matchmaker_service.js`)
- **Blockchain**: Immutable claim hash logger (`services/blockchain_service.js`)

---

## 4. Key Functional Subsystems

### 4.1 AI Image Matchmaker Engine (`matchmaker_service.js`)
- Extracts visual features and semantic tags when a "Lost" or "Found" post is submitted.
- Computes Cosine Similarity scores between new posts and existing database entries.
- Automatically notifies users if a high-confidence match (>85%) is detected.

### 4.2 Immutable Blockchain Handover Logging (`blockchain_service.js`)
- When an item claim is approved and handed over via QR verification, a crypto-hash receipt containing post ID, claimant ID, owner ID, timestamp, and verification proof is minted into an immutable ledger audit trail.

### 4.3 Interactive Campus GIS Map (`indoor_map_widget.dart`)
- Renders custom vector floor blueprints (`assets/maps/liaquat/floor_1.json`).
- Displays item markers, indoor navigation paths, and floor switcher triggers.

### 4.4 Animated Avatar Engine (`lib/presentation/avatar_engine/`)
- Personalized interactive Flutter avatar builder (`avatar_builder_screen.dart`) featuring real-time state changes, physics-based motion, and audio sync (`music_sync_engine.dart`).

---

## 5. File & Component Breakdown

```
trace/
├── .github/workflows/          # CI/CD pipeline (Flutter lint/build + Backend verification)
├── android/                    # Android Native Gradle & manifest configs
├── assets/                     # Lottie animations, GIS campus maps, vector icons
├── backend/
│   ├── middleware/             # Auth & rate limiters
│   ├── routes/                 # Express API routes (posts, claims, admin, notifications)
│   ├── services/               # AI Service, Blockchain Service, Matchmaker Engine
│   └── utils/                  # Supabase & Firebase connectors
├── discord_bot/                # Discord Interactions Bot script
├── docs/                       # Complete architectural specifications (Docs 1 to 12)
├── lib/                        # Flutter Mobile App core codebase
│   ├── core/                   # Router, themes, app constants
│   ├── data/                   # Data models, DB providers, API services
│   └── presentation/           # UI Screens, custom widgets, Avatar engine
└── website/                    # Next.js 15 Web Portal & Admin Panel
    ├── src/app/                # App router pages (admin/claims, profile, login)
    └── package.json
```

---

## 6. AI Agent & Developer Execution Guide

### 6.1 Running the Flutter Mobile App
```bash
# Get dependencies
flutter pub get

# Run code generator if needed
flutter pub run build_runner build --delete-conflicting-outputs

# Launch on connected device/emulator
flutter run
```

### 6.2 Running the Backend API
```bash
cd backend
npm install
npm start
```

### 6.3 Running the Next.js Web Admin Portal
```bash
cd website
npm install
npm run dev
```

### 6.4 Primary Configuration Variables (`.env`)
```env
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_key
FIREBASE_SERVICE_ACCOUNT=your_firebase_json
OPENAI_API_KEY=your_openai_key
BLOCKCHAIN_RPC_URL=your_solana_or_evm_rpc
DISCORD_BOT_TOKEN=your_discord_token
```
