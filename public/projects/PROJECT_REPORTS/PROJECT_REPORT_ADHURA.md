# Project Report: ADHURA (Unfinished Symphony of Productivity)

> **Document Classification:** Comprehensive System & Architecture Technical Specification  
> **Target Audience:** Software Engineers, System Architects, Product Managers, and Autonomous AI Agents  
> **Status:** Fully Functional / Production Ready  

---

## 1. Executive Summary & Core Concept

**ADHURA** (named after the poignant concept of unfinished tasks waiting to be harmoniously completed) is an aesthetically driven, ambient productivity and task-management web application. Unlike rigid, enterprise task trackers that feel like spreadsheets, ADHURA turns daily workflow management into a visual, auditory, and AI-assisted ritual.

The application blends real-time dynamic glassmorphic UI elements, context-aware weather/time atmospheric backdrops, audio ambient soundscapes, local-first indexed persistent database storage, and integrated AI task assistant capabilities via OpenRouter LLM endpoints.

```
+-----------------------------------------------------------------------+
|                              ADHURA UI                                |
|  [ Glassmorphic Dynamic Theme | Time & Weather Audio Soundscapes ]    |
+-----------------------------------+-----------------------------------+
                                    |
            +-----------------------+-----------------------+
            |                                               |
            v                                               v
+-----------------------+                       +-----------------------+
|  IndexedDB Local Storage |                     |  Netlify Serverless  |
|  (idb - Offline First)|                       |  AI Function Layer    |
+-----------------------+                       +-----------+-----------+
                                                            |
                                                            v
                                                +-----------------------+
                                                |  OpenRouter LLM API   |
                                                |  (Moonshot AI / Kimi) |
                                                +-----------------------+
```

---

## 2. Problems Solved

1. **Task Fatigue & Disengagement**: Standard task apps are sterile. ADHURA provides an emotionally engaging, beautiful environment using dynamic backgrounds that match the user's real local weather and time of day (Morning, Afternoon, Evening, Night).
2. **Context-Less AI Assistance**: Most AI chat widgets lack knowledge of what task you are working on. ADHURA embeds an AI agent directly into individual task views, automatically hydrating system prompts with task deadlines, completion percentage, priority levels, and submission records.
3. **Privacy & Offline Access**: Users lose access to cloud-bound apps during network dropouts. ADHURA uses IndexedDB (`idb`) as its core storage engine, providing instantaneous offline persistence with sync readiness.
4. **Lack of Ambient Focus Signals**: Work environments often lack audio-visual focus cues. ADHURA integrates interactive puzzle triggers, customizable quote generators, visualizer overlays, and ambient weather sounds.

---

## 3. Technology Stack & Technical Architecture

### Frontend Technology Stack
- **Framework**: React 18 (Vite build engine)
- **Styling**: Pure Vanilla CSS with advanced Glassmorphism, CSS Custom Properties, backdrop-filters, dynamic keyframe animations
- **State & Storage**: Custom React Hooks (`useTasks.js`), IndexedDB via `idb` wrapper library
- **Icons & UI Utilities**: `react-icons` (Feather/Lucide set), HTML5 Audio Context APIs
- **Deployment & Edge**: Netlify (Functions + Hosting) & Firebase Hosting ready

### Backend & Serverless API Architecture
- **Serverless Runtime**: Netlify Functions CommonJS (`netlify/functions/ask-ai.cjs`)
- **LLM Integration**: OpenRouter API (`moonshotai/kimi-k2:free`)
- **Third-Party Services**: Open-Meteo Weather API (Geolocated temperature and condition detection)

---

## 4. Key Functional Features & Subsystems

### 4.1 Atmospheric Engine (Time & Weather Awareness)
- **`WeatherService.js`**: Automatically fetches user location via Browser Geolocation API and queries Open-Meteo for live weather codes.
- **`MoodBackground.jsx`**: Dynamically transitions background wallpapers between morning, afternoon, evening, and night based on local system time and cloud/rain conditions.
- **`RainGlass.jsx`**: Renders canvas-based realistic glass raindrop overlays when rainy conditions are detected.

### 4.2 Local-First Task Engine (`useTasks.js` & `idBHelpers.js`)
- Operations supported in IndexedDB:
  - Task Creation, Updating, Deletion, Categorization into custom tabs/projects
  - Progress Tracking (0-100% completion sliders)
  - Work Submissions / Notes logging inside tasks
  - Weekly summary aggregation & analytics logic

### 4.3 Integrated Contextual AI Agent (`ask-ai.cjs` & `askAgent.js`)
- Users can open an AI assistant modal directly inside any task details view.
- The backend function automatically formats task metadata into structured AI context:
  ```json
  {
    "taskContext": {
      "title": "Build API Specs",
      "description": "Finalize OpenAPI schemas",
      "deadline": "2026-08-15T18:00:00.000Z",
      "priority": "high",
      "progress": 40,
      "submissions": 2
    }
  }
  ```

---

## 5. File Structure & Component Map

```
adhura/
├── netlify/
│   └── functions/
│       └── ask-ai.cjs             # Serverless OpenRouter LLM proxy
├── public/                         # Web assets & Vite branding
└── src/
    ├── assets/                     # Wallpapers & branded logos
    ├── components/
    │   ├── TaskManager/            # Modular Task System
    │   │   ├── AddTaskModal.jsx    # Modal for creating tasks with categories & priorities
    │   │   ├── TaskDetails.jsx     # Detailed view + AI Assistant integration
    │   │   ├── TaskItem.jsx       # Individual glass card task row
    │   │   ├── TaskList.jsx       # Container list view
    │   │   ├── TaskManager.jsx    # Core task management tab view
    │   │   ├── TaskTabs.jsx       # Custom workspace tabs
    │   │   └── WeeklySummary.jsx  # Weekly completed work analytics
    │   ├── askAgent.js             # Client-side API fetch wrapper for Netlify AI function
    │   ├── idBHelpers.js           # IndexedDB database initialization & transaction helpers
    │   ├── MoodBackground.jsx      # Time/Weather context dynamic backdrop
    │   ├── MusicPlayer.jsx         # Integrated ambient focus audio player
    │   ├── QuoteBox.jsx            # Dynamic motivational quote box
    │   ├── RainGlass.jsx           # Canvas rain animation renderer
    │   ├── TimeCards.jsx           # Glass clock display
    │   ├── WeatherDisplay.jsx      # Weather widget
    │   └── WeatherService.js       # Geolocation & weather fetcher
    ├── hooks/
    │   └── useTasks.js             # React hook managing IndexedDB state sync
    ├── App.jsx                     # Core UI composition & layout shell
    ├── firebase.jsx                # Optional Firebase client configuration
    ├── index.css                   # Global CSS tokens & glassmorphic base rules
    └── main.jsx                    # React app DOM mount point
```

---

## 6. Comprehensive AI & Human Developer Guide

### 6.1 Setup & Installation
```bash
# Clone repository and enter directory
cd adhura

# Install dependencies
npm install

# Start local dev server (Vite + Netlify CLI recommended for functions)
npx netlify dev
# OR for client only:
npm run dev
```

### 6.2 Required Environment Variables
Create a `.env` file in the root directory:
```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
URL=http://localhost:8888
```

### 6.3 Entry Points for Autonomous Agents
- **Main State Flow**: `src/hooks/useTasks.js` (Modifying data structure or offline logic).
- **AI Agent Prompts**: `netlify/functions/ask-ai.cjs` (Tuning system prompts or switching LLM models).
- **UI Customization**: `src/App.jsx` and `src/components/TaskManager/TaskManager.jsx`.
