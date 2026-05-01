# Advanced Features Implementation Plan

This document tracks the progress of adding advanced functionalities to the Prepvox AI Interview Agent.

## Phase 1: 🎙️ AI Voice & Text-to-Speech (TTS) - **[COMPLETED]**
- [x] Integrate Web Speech API (`SpeechSynthesis`) on the frontend.
- [x] Sync the AI voice to read the generated questions out loud automatically when they appear on the screen.

## Phase 2: 💻 Live Code Execution Sandbox (LeetCode Style) - **[COMPLETED]**
- [x] Install and configure `@monaco-editor/react`.
- [x] Add a visual toggle to switch between "Speaking" and "Coding" modes.
- [x] Integrate Piston API or similar code execution engine to compile and run the candidate's code.

## Phase 3: 👀 Body Language & Confidence Analysis (Webcam API) - **[COMPLETED]**
- [x] Load `face-api.js` models in the browser (via CDN).
- [x] Start tracking webcam video on the interview page.
- [x] Add real-time analysis on facial expressions in the sidebar.

## Phase 4: 📈 Analytics Dashboard & Growth Tracking - **[COMPLETED]**
- [x] Create a new `/dashboard` route.
- [x] Add `recharts` for visual graphs (progress over time).
- [x] Aggregate historical interview data from the backend.

## Phase 5: 🧠 Adaptive Difficulty & Real-time "Panic" Detection - **[COMPLETED]**
- [x] Detect "Um", long pauses, or "I don't know" in transcribed text.
- [x] Add logic in `gemini.js` to lower difficulty dynamically or auto-trigger hints.
- [x] Implement a real-time hint system triggered by candidate distress.
