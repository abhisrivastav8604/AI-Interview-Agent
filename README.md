# AI Interview Agent

An AI-powered Mock Interview Platform built with the MERN stack and Google Gemini AI.
Upload your resume, trigger an interview session with tailored technical questions, and get precise AI feedback.

## Features
- User Authentication (JWT + Bcrypt)
- Resume Upload & Parsing (Multer + pdf-parse)
- Resume Skills Extraction (Gemini AI)
- AI-Generated Interview Questions based on resume
- Simulated Interview Environment with Timer & Voice-to-Text Support
- Real-time Answer Evaluation & Scoring
- Comprehensive Interview Reports with Strengths & Weaknesses

## Tech Stack
**Frontend:** React (Vite), TailwindCSS, Framer Motion, Axios  
**Backend:** Node.js, Express, MongoDB, Google Gemini API, Multer

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB instance (local or Atlas cluster)
- Google Gemini API Key
- npm or yarn

### Setup

1. **Clone & Install Backend**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   Set up your `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-interview
   JWT_SECRET=supersecretjwtkey
   GEMINI_API_KEY=your_gemini_api_key
   ```

3. **Clone & Install Frontend**
   ```bash
   cd frontend
   npm install
   ```

### Running Locally

To run the application locally, you need two terminal instances:

**Window 1 - Backend Server**
```bash
cd backend
npm run dev # or node server.js
```

**Window 2 - Frontend Application**
```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173` to interact with the application.

## Developer Note
This application utilizes Chrome Speech Web API for Voice-to-Text during the mock interview session. It functions optimally on Google Chrome or Microsoft Edge desktop browsers.
