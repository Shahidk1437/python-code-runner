AI Python Runner - Full project (frontend + backend)
==================================================

How to use
----------
1. Backend (FastAPI)
   - Go to /backend
   - Install dependencies: `pip install -r requirements.txt`
   - Run: `uvicorn main:app --host 0.0.0.0 --port 8000`
   - The server exposes POST /run that accepts JSON {"code": "...", "timeout": 6}

2. Frontend (Vite + React)
   - Go to /frontend
   - Run: `npm install` then `npm run dev`
   - By default the frontend expects the backend at VITE_API_URL (in .env) or http://localhost:8000

Deployment suggestions
----------------------
- Frontend: Deploy to Netlify (connect repo or upload build output)
- Backend: Deploy to Render / Replit / Railway (free tiers) and set CORS allowed origins if needed.
- IMPORTANT: Do NOT run the backend on a public server without sandboxing untrusted code.
