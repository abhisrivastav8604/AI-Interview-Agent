# Deployment Guide

Follow these steps to deploy the AI Interview Agent to production.

## 1. Database (MongoDB Atlas)

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new cluster (the free tier works well).
3. Set up database access by creating a database user.
4. Set up network access by allowing connections from anywhere (`0.0.0.0/0`) or just your production IP.
5. Grab the cluster connection string and add it as the `MONGODB_URI` environment variable.

## 2. Backend Hosting (Render)

1. Ensure the `backend` folder has `start` and `dev` scripts in its `package.json`.
   ```json
   "scripts": {
     "start": "node server.js",
     "dev": "nodemon server.js"
   }
   ```
2. Commit your code to GitHub.
3. Sign in to [Render.com](https://render.com/).
4. Create a new "Web Service".
5. Connect your GitHub repository.
6. Configure the Render Web Service:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
7. Add Environment Variables in Render:
   - `PORT`: `5000`
   - `MONGODB_URI`: `<Your MongoDB Atlas Connection String>`
   - `JWT_SECRET`: `<A strong random secret key>`
   - `GEMINI_API_KEY`: `<Your Google Gemini API Key>`
8. Deploy the service. Once live, note the server URL (e.g., `https://ai-interview-server.onrender.com`).

## 3. Frontend Hosting (Vercel)

Before deploying the frontend, update all Axios API requests to point to your new Render Backend URL instead of `http://localhost:5000`. 
*(Tip: Set this up using Vite's `import.meta.env.VITE_API_URL`)*

1. Navigate to the `frontend` directory.
2. Ensure you have your standard Vite build script in `package.json`: `"build": "vite build"`.
3. Sign in to [Vercel](https://vercel.com).
4. Create a new Project and import your GitHub repository.
5. In the Vercel project configuration:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Deploy the project.

## 4. Final Verification
- Navigate to your live Vercel frontend URL.
- Test User Registration/Login.
- Test PDF Upload to verify Google Gemini integration works smoothly in reading content.
- Complete a mock interview and successfully view the AI generated report.
