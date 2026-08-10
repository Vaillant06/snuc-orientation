# SNUC Orientation

Interactive orientation web app for new employees. Users watch module videos (male/female voice), pass a short quiz to unlock the next module, and track their progress.

## Tech Stack

- **Frontend:** React 19 + Vite (Bootstrap 5)
- **Backend:** Node.js + Express
- **Storage:** SQLite (better-sqlite3)

## Project Structure

```
frontend/          React app (Vite)
  src/             components, constants, styles
  public/          static assets (images, videos)
server/            Express API server
  server.js        API routes + static file serving
  db.js            SQLite connection & schema
  admin.html       Admin results dashboard
```

## Setup

```bash
# Frontend
cd frontend
npm install
npm run build

# Backend
cd ../server
npm install
```

Set the required environment variable in `server/.env`:

```
ADMIN_PASSWORD=your-secret-password
```

## Running

```bash
cd server
npm start
```

The server serves both the built frontend and the API at `http://localhost:3000`.

For development with hot reload:

```bash
cd frontend
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:3000`.

## API

| Method | Endpoint               | Description                              |
| ------ | ---------------------- | ---------------------------------------- |
| POST   | `/api/submit`          | Save a quiz result `{ email, moduleId, retries, date }` |
| GET    | `/api/results`         | List all results (used by admin dashboard) |
| GET    | `/api/progress/:email` | Get a user's completed modules and current module |
| GET    | `/admin?password=...`  | Admin results dashboard (password protected) |

## Environment Variables

| Variable         | Default          | Description                        |
| ---------------- | ---------------- | ---------------------------------- |
| `PORT`           | `3000`           | Port the server listens on         |
| `ADMIN_PASSWORD` | *(required)*     | Password for the admin dashboard   |
| `CLOUDINARY_CLOUD_NAME` | *(required)* | Cloudinary cloud name (served to the frontend via `/api/config`) |
| `DB_FILE`        | `server/app.db`  | Path to the SQLite database file   |

## Deployment

The app runs as a single Node process that serves the frontend build and API. Two options: **Render (free)** or a **VPS**.

### Important: the videos

Videos are hosted on **Cloudinary**. The cloud name is stored as `CLOUDINARY_CLOUD_NAME` in `server/.env` (gitignored) and served to the frontend via `GET /api/config`. The frontend builds the video URLs as `https://res.cloudinary.com/<cloud_name>/video/upload/<public_id>` (public IDs are in `VIDEO_PATHS` in `frontend/src/constants/VideoContent.js`). No video files need to be deployed or stored in git.

### Option A — Render (free)

A `render.yaml` is included. Push this repo to GitHub, then in the [Render dashboard](https://dashboard.render.com):

1. **New → Blueprint** → connect the GitHub repo. Render reads `render.yaml` and creates the web service automatically.
2. Set the secret env vars (Blueprint marks them for you to fill):
   - `ADMIN_PASSWORD` — admin dashboard password
   - `CLOUDINARY_CLOUD_NAME` — your Cloudinary cloud name
3. Deploy. The app builds the frontend and starts `node server.js`.

> ⚠️ **Free-tier caveats:** the service sleeps after ~15 min idle (first load after sleep takes ~30–60s), and the filesystem is **ephemeral** — SQLite results are wiped on each redeploy. **Export results from the admin page (Export as CSV) regularly.** On paid Render you can add a persistent disk.

### Option B — VPS

The `deploy.sh` script builds locally, syncs the code (no videos — they're on Cloudinary), installs deps, rebuilds, and writes `server/.env` on the server:

```bash
SERVER_HOST=user@your-server-ip ADMIN_PASSWORD=secret ./deploy.sh
```

Optional env vars: `SERVER_DIR` (default `/opt/snuc-orientation`), `PORT` (default `3000`). Keep it running with pm2:

```bash
npm install -g pm2
pm2 start server.js --name snuc-orientation
pm2 save && pm2 startup
```

### Notes

- **Env vars:** `ADMIN_PASSWORD` (required), `CLOUDINARY_CLOUD_NAME` (required), `PORT` (default `3000`).
- `better-sqlite3` requires native build tools (`python3`, `make`, `g++`) during `npm install`.
- Results persist in the SQLite database at `server/app.db` — export regularly and keep backups.
