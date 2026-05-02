# ElectraGuide Deployment Guide

This guide covers the deployment process for both the Next.js frontend and the Node.js Express backend.

## Architecture 
- **Frontend**: Deployed on Vercel
- **Backend**: Deployed on a platform that supports persistent Node.js servers, like Render, Railway, or Heroku.
- **Database**: Firebase Firestore

## 1. Backend Deployment (Render / Railway)

1. Ensure the `backend/.env` is ignored by Git, but have `.env.example` ready.
2. Push the codebase to a GitHub repository.
3. Sign into Render or Railway and create a new **Web Service**.
4. Point the repository to the `backend` folder via the Root Directory setting.
5. Set the Build Command to `npm install`.
6. Set the Start Command to `npm start`.
7. Add the Environmental Variables:
   - `PORT=5000`
   - `GEMINI_API_KEY=<Your Google Gemini API Key>`
   - `FIREBASE_SERVICE_ACCOUNT=<Your Firebase credentials string>`

Upon successful deployment, note the public URL (e.g. `https://electraguide-api.onrender.com`).

## 2. Frontend Deployment (Vercel)

1. Sign into Vercel and create a **New Project**.
2. Select your GitHub repository.
3. In the project settings, set the **Root Directory** to `frontend`.
4. Ensure the Framework Preset is detected as Next.js.
5. Ensure the Build Command is `npm run build`.
6. Navigate to `frontend/src/components/chat/ChatBox.tsx` and `frontend/src/components/timeline/ElectionTimeline.tsx`. Change the `fetch` endpoints from `http://localhost:5000` to your newly deployed backend URL (`https://electraguide-api.onrender.com`).
   *Note: In a true production app, this URL should be loaded via an environmental variable (`NEXT_PUBLIC_API_URL`).*
7. Click **Deploy**.

## 3. Firebase Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Create a new Project (e.g. "ElectraGuide").
3. Enable **Firestore Database** in Test Mode (and later lock it down with security rules).
4. Go to Project Settings -> Service Accounts -> "Generate new private key".
5. Save the JSON file downloaded. Inject its contents securely into your Backend hosting via the `FIREBASE_SERVICE_ACCOUNT` environment variable.

## Production Checklist 
- [ ] Switched out mock API calls to Live API.
- [ ] Secured Firebase routes with proper rules.
- [ ] Obtained an SSL certificate (handled automatically by Vercel/Render).
