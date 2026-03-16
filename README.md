# KidsScore Frontend (prototype)

This folder contains a minimal Vue + Vite scaffold that ports the app shell and counting-game mockups.

Quick start (inside container per AGENTS.md):

```bash
# build/run inside the project's container
docker build -t kids-score-dev .
docker run --rm -p 5173:5173 -v "$PWD":/workspace -w /workspace kids-score-dev
```

Or locally (if you prefer):

```bash
npm install
npm run dev
```
