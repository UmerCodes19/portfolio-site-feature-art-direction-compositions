# Project Report: MAIRA (Interactive Live2D AI Desktop & Web Companion)

> **Document Classification:** Comprehensive System & Architecture Technical Specification  
> **Target Audience:** Software Engineers, Computer Vision & Graphics Developers, AI Integration Engineers, and Autonomous AI Agents  
> **Status:** Fully Functional / Production Ready  

---

## 1. Executive Summary & Core Concept

**MAIRA** is an interactive, real-time Virtual AI Avatar Assistant and Desktop/Web Companion powered by Live2D Cubism Web SDK physics engines, WebGL animation pipelines, multi-model Live2D character sets (Haru, Hiyori, Hoshino Ai, Mao, Mark, Natori, Rice, Wanko), and expressive conversational AI capabilities.

Instead of a plain text box or floating chatbot, MAIRA brings AI interaction to life with real-time motion physics, lip-sync synchronizations, eye-tracking dynamic gaze, tap/touch gesture reactivities, dynamic expressions (`exp3.json`), and motion triggers (`motion3.json`).

```
+-----------------------------------------------------------------------------------+
|                                   MAIRA UI SHELL                                  |
|   [ Live2D Canvas | WebGL Rendering Context | Edge Triggers | Slide-Tray Toolset ]|
+-----------------------------------------+-----------------------------------------+
                                          |
                +-------------------------+-------------------------+
                |                                                   |
                v                                                   v
+-------------------------------+                       +-------------------------------+
|  Live2D Cubism Core & SDK     |                       |  Chat & AI Engine Interface   |
|  (Moc3, Motions, Physics, Pose)|                      |  (LLM Streaming + Audio TTS)  |
+-------------------------------+                       +-------------------------------+
```

---

## 2. Problems Solved

1. **Cold, Lifeless AI Interfaces**: Standard conversational AI lacks emotional resonance. MAIRA bridges human-computer interaction gaps by using fully animated Live2D physics models that react visually and emotionally to conversation sentiment.
2. **Complex WebGL Live2D Rigging Setup**: Integrating Live2D into modern web applications (Vite + React) is notoriously complex due to memory leaks, WASM/Cubism Core loading issues, and aspect ratio constraints. MAIRA embeds a TypeScript framework adapter layer for Cubism Core with React lifecycle hooks.
3. **Multi-Avatar Hot-Swapping**: Users can seamlessly switch between different visual personalities (Haru, Hiyori, Hoshino Ai, etc.) without re-instantiating WebGL contexts or breaking active AI chat histories.
4. **Unobtrusive Screen Presence**: Features edge triggers, slide trays, transparent backgrounds, and configurable widget modes to function as a lightweight screen overlay.

---

## 3. Technology Stack & Technical Architecture

### Core Graphics & Animation Engine
- **Live2D SDK**: Live2D Cubism Native SDK for Web / TypeScript Framework (`public/live2d/live2dcubismcore.min.js`, `public/live2d/live2dcubismframework.ts`)
- **Rendering Context**: HTML5 Canvas with WebGL / WebGL2 context managers
- **Physics & Motion Parsers**: Cubism Physics (`.physics3.json`), Cubism Expression (`.exp3.json`), Cubism Motion (`.motion3.json`), CDI parameters (`.cdi3.json`), binary model files (`.moc3`)

### Frontend Architecture
- **Framework**: React 18, Vite build configuration
- **Styling**: Pure CSS with keyframe animations, glassmorphism slide trays (`SlideTray.css`), and chat bubbles (`ChatBubble.css`)
- **State Management**: React Context / Hooks for model selection, expression triggers, and chat thread history
- **Interactive UI Components**: `ChatContainer`, `InputBox`, `SettingsTray`, `ToolsTray`, `EdgeTrigger`, `AnimatedBackground`

---

## 4. Key Functional Subsystems

### 4.1 Live2D Model Renderer & Framework (`src/live2d/Framework`)
- **Cubism Model Manager**: Loads `.moc3` data into memory, initializes vertex attributes, mesh textures (`texture_00.png`), and sets up matrix transformations.
- **Physics Engine**: Calculates hair, ribbon, and clothes movement dynamically based on model motion and mouse pointer interactions.
- **Motion & Expression Queues**: Controls lip-sync (`ParamMouthOpenY`), eye blinking (`ParamEyeLOpen`, `ParamEyeROpen`), and motion execution sequences.

### 4.2 Interactive Slide Tray & Edge Triggers
- **`EdgeTrigger.jsx`**: Unobtrusive side trigger that allows users to toggle the assistant tray without cluttering the screen.
- **`SlideTray.jsx`**: Slide-out panel hosting avatar configuration options, tool switching, model selector, and settings adjustments.

### 4.3 Chat & Sentiment Engine
- **`ChatBubble.jsx` & `ChatContainer.jsx`**: Animated conversation interface supporting user messages and streaming AI responses.
- Synthesizes expression triggers (e.g., triggering `Sad.exp3.json` or `Smile.exp3.json`) based on conversation context or sentiment analysis.

---

## 5. File & Directory Structure

```
maira/
├── public/
│   ├── live2d/                      # Live2D Cubism Core runtime library
│   └── models/                      # 3D/2D Avatar Asset Packages
│       ├── Haru/                    # Model files, textures, expressions, motions, sound FX
│       ├── Hiyori/
│       ├── HoshinoAi/
│       ├── Mao/
│       ├── Mark/
│       ├── Natori/
│       ├── Rice/
│       └── Wanko/
└── src/
    ├── components/
    │   ├── ChatWindow/              # Chat bubbles, input box, container view
    │   │   ├── ChatBubble.jsx
    │   │   ├── ChatContainer.jsx
    │   │   └── InputBox.jsx
    │   └── SlideTray/               # Settings tray, tools tray, side drawer
    │       ├── SettingsTray.jsx
    │       ├── SlideTray.jsx
    │       └── ToolsTray.jsx
    ├── live2d/                      # TypeScript Live2D Framework engine code
    │   ├── Core/                    # Core definitions & bindings
    │   └── Framework/               # Motion, Pose, Physics, Expression managers
    ├── App.jsx                      # Main app layout shell & WebGL canvas host
    └── main.jsx                     # Application entry point
```

---

## 6. AI Agent & Developer Instructions

### 6.1 Running the Project locally
```bash
# Navigate to project folder
cd maira

# Install package dependencies
npm install

# Run dev server
npm run dev
```

### 6.2 Adding a New Live2D Avatar Model
1. Export model from Live2D Cubism Editor into `public/models/<ModelName>/`.
2. Include `.moc3`, `.model3.json`, `.physics3.json`, textures folder, and optional motions/expressions folders.
3. Update the avatar selection registry in `src/components/SlideTray/SettingsTray.jsx`.

### 6.3 Controlling Model Expressions via Code
To programmatically trigger a Live2D motion or expression from AI output:
```javascript
// Example helper call in framework state
live2dManager.startExpression(modelId, "Smile");
live2dManager.startMotion(modelId, "TapBody", priority);
```
