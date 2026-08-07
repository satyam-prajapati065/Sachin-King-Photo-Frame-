# Sachin King Photo Frame - Backend

This is the Express & Node.js backend server with MongoDB integration.

## How to run locally:

1. Open terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```
   Add your MongoDB Atlas URI if you want database persistence. Otherwise, it will automatically fallback to in-memory store.

4. Start the server:
   ```bash
   npm start
   # or for auto-reload during development:
   npm run dev
   ```

The backend server will start on `http://localhost:5000`.
