# Technical Contract — SNUC Orientation (2-Member Team)

---

## 1. Overview

### Project

Orientation web app with video playback, voice preference, quiz-based module unlocking, and server-side result collection for admin/HR.

### Team Size

**2 members** — Frontend Lead (UI) & Logic Lead (State + Backend)

### Tech Stack

| Layer    | Technology                                              |
| -------- | ------------------------------------------------------- |
| Frontend | React 19 + Vite 8 + Bootstrap 5 (CDN) + Bootstrap Icons |
| State    | React`useState` + `localStorage`                    |
| Backend  | Node.js + Express                                       |
| Data     | Flat JSON file (`results.json`)                       |
| Video    | Native HTML5`<video>` element                         |

---

## 2. Repository Structure

```
snuc_orientation/
│
├── frontend/
│   ├── public/
│   │   └── videos/               # MP4 files (gitignored)
│   └── src/
│       ├── components/
│       │   ├── VoiceSelector.jsx  # Email + voice selection
│       │   ├── VideoPlayer.jsx    # Sidebar + video + quiz area
│       │   └── Questionnaire.jsx  # Quiz + retry counter + submit fetch
│       ├── constants/
│       │   └── VideoContent.js    # 3 modules × 10 questions
│       ├── App.jsx                # State hub + routing logic
│       ├── App.css
│       ├── index.css
│       └── main.jsx
│   ├── index.html                 # Bootstrap CDN
│   └── package.json
│
├── server/
│   ├── server.js                  # Express: serve frontend + APIs
│   ├── results.json               # Stored quiz results
│   └── admin.html                 # Admin results table
│
├── WIREFRAME.md
├── TECHNICAL_CONTRACT.md
└── README.md
```

---

## 3. Work Modularization

### Ownership

| Member            | Role          | Responsibility                                                                              |
| ----------------- | ------------- | ------------------------------------------------------------------------------------------- |
| **You**     | Frontend Lead | All React components, Bootstrap styling, email integration, retry counter, fetch to backend |
| **Partner** | Logic Lead    | Express server, API endpoints, admin page, results.json, deployment on campus server        |

### Module Boundaries

#### Module A — VoiceSelector + Email (Frontend Lead)

- Check URL param `?email=user@inst.edu` on mount
- If present → auto-fill, proceed to voice choice
- If absent → show email input field (required, basic validation: `@`)
- After email + voice selected → save both to `App.jsx` state
- Bootstrap card centered on screen

#### Module B — VideoPlayer (Frontend Lead)

- Sidebar with module list (active / locked states)
- Video element (centered, shadow, max-width 700px)
- Header: title, voice badge, "Switch to" button
- "Watch full video..." message before completion
- Reset Progress button at sidebar bottom
- All UI via Bootstrap utility classes

#### Module C — Questionnaire (Frontend Lead)

- Randomly picks 5 of 10 questions
- Radio options per question with highlight (selected/correct/wrong)
- **Retry counter** (`useState(0)`, increments on each retry)
- Submit → if 100% → `fetch("POST /api/submit", { email, moduleId, score: 100, retries, date })`
- Pass banner / Fail + Retry UI
- Calls `onPass` for local state + triggers `fetch` to persist

#### Module D — App State & Routing (Logic Lead)

- State: `currentVideoId`, `completedVideos`, `quizScores`, `voicePreference`, `email`
- `localStorage` sync for all state
- `isUnlocked(videoId)` — module 1 always, rest based on `quizScores[prev] === true`
- Callbacks: `markCompleted`, `markQuizPassed`, `handleReset`, `setEmail`, `setVoice`
- Conditional render: VoiceSelector (no email/voice) vs VideoPlayer (everything ready)

#### Module E — Data Constants (Shared)

- `VideoContent.js`: 3 modules × 10 questions each with `correctAnswer: 0`
- File paths: `{ male, female }` per module
- Agree on shape before building

#### Module F — Backend Server (Logic Lead)

- `server/server.js` — Express that:
  - Serves built frontend static files at `/`
  - `POST /api/submit` — receives `{ email, moduleId, score, retries, date }`, upserts into `results.json` (keyed by `email + moduleId`)
  - `GET /api/results` — for admin, returns all results
  - `GET /admin` — serves a password-gated HTML page with results table
- `server/results.json` — flat JSON array
- `server/admin.html` — table: Email, Module, Score, Retries, Date

---

## 4. Data Flow Contract

### Props & Callbacks

```
App (Logic Lead)
│
├── VoiceSelector (Frontend Lead)
│   ├── onSelectVoice(voice)
│   └── onSetEmail(email)
│
└── VideoPlayer (Frontend Lead)
    ├── videos
    ├── currentVideoId
    ├── onSelectVideo(id) — only if isUnlocked
    ├── isUnlocked(id) → boolean
    ├── completedVideos (Set)
    ├── onVideoEnded(id)
    ├── email
    ├── onQuizPassed(moduleId, retries) → calls fetch + updates quizScores
    ├── voicePreference
    ├── onVoiceChange(voice)
    └── onReset()
        │
        └── Questionnaire (Frontend Lead)
            ├── questions (10)
            ├── email
            ├── moduleId
            └── onPass(retries) → triggers fetch
```

### API Contract

| Endpoint             | Method | Body / Query                                  | Response                                        | Owner      |
| -------------------- | ------ | --------------------------------------------- | ----------------------------------------------- | ---------- |
| `POST /api/submit` | POST   | `{ email, moduleId, score, retries, date }` | `{ success: true }`                           | Logic Lead |
| `GET /api/results` | GET    | —                                            | `[{ email, moduleId, score, retries, date }]` | Logic Lead |
| `GET /admin`       | GET    | `?password=xxx`                             | Admin HTML page                                 | Logic Lead |

### localStorage Keys

| Key                      | Type                       | Purpose                         |
| ------------------------ | -------------------------- | ------------------------------- |
| `snuc_voicePreference` | `"male"` \| `"female"` | Voice choice                    |
| `snuc_email`           | string                     | User's institution email        |
| `snuc_completedVideos` | `number[]`               | Video IDs watched to completion |
| `snuc_quizScores`      | `{ [id]: true }`         | Modules passed with 100%        |

### results.json Structure

```json
[
  {
    "email": "user@inst.edu",
    "moduleId": 1,
    "score": 100,
    "retries": 3,
    "date": "2026-07-27"
  }
]
```

Upsert key: `email + moduleId` — only the final attempt per module is stored.

---

## 5. Implementation Order

### Sprint 1 — Foundation (Day 1)

| Step | Task                                                             | Owner                   |
| ---- | ---------------------------------------------------------------- | ----------------------- |
| 1.1  | Scaffold Vite + React project                                    | **Shared**        |
| 1.2  | Add Bootstrap + Icons CDN to`index.html`                       | **Frontend Lead** |
| 1.3  | Create`VideoContent.js` with all 30 questions                  | **Shared**        |
| 1.4  | Create`server/` folder, `npm init`, install `express`      | **Logic Lead**    |
| 1.5  | Initialize results.json as empty array`[]`                     | **Logic Lead**    |
| 1.6  | Set up`.gitignore` (add `public/videos/`, `node_modules/`) | **Logic Lead**    |

### Sprint 2 — Voice + Email (Day 1-2)

| Step | Task                                                                     | Owner                   |
| ---- | ------------------------------------------------------------------------ | ----------------------- |
| 2.1  | Build`VoiceSelector.jsx` — email input + voice buttons UI             | **Frontend Lead** |
| 2.2  | Extract email from`URLSearchParams`, fallback to email input           | **Frontend Lead** |
| 2.3  | Build`email` + `voicePreference` state in `App.jsx` + localStorage | **Logic Lead**    |
| 2.4  | Wire VoiceSelector → App with conditional render                        | **Logic Lead**    |

### Sprint 3 — Video Player (Day 2-3)

| Step | Task                                                         | Owner                   |
| ---- | ------------------------------------------------------------ | ----------------------- |
| 3.1  | Build`VideoPlayer.jsx` layout (sidebar + video + header)   | **Frontend Lead** |
| 3.2  | Module list with active/locked states                        | **Frontend Lead** |
| 3.3  | Voice badge + Switch toggle                                  | **Frontend Lead** |
| 3.4  | Build`completedVideos` + `isUnlocked` + `onVideoEnded` | **Logic Lead**    |
| 3.5  | Wire VideoPlayer into App                                    | **Logic Lead**    |

### Sprint 4 — Questionnaire + Retry (Day 3-4)

| Step | Task                                                       | Owner                   |
| ---- | ---------------------------------------------------------- | ----------------------- |
| 4.1  | Build`Questionnaire.jsx` — 5 cards, radio, highlights   | **Frontend Lead** |
| 4.2  | Add retry counter (`useState`, increment in handleRetry) | **Frontend Lead** |
| 4.3  | Add`fetch("POST /api/submit")` on pass                   | **Frontend Lead** |
| 4.4  | Build`quizScores` state + `onQuizPassed`               | **Logic Lead**    |
| 4.5  | Wire Questionnaire into VideoPlayer                        | **Logic Lead**    |

### Sprint 5 — Backend Server (Day 4-5)

| Step | Task                                                              | Owner                |
| ---- | ----------------------------------------------------------------- | -------------------- |
| 5.1  | Build`POST /api/submit` — parse body, upsert into results.json | **Logic Lead** |
| 5.2  | Build`GET /api/results` — return all results                   | **Logic Lead** |
| 5.3  | Build`admin.html` — password gate + results table              | **Logic Lead** |
| 5.4  | Serve static React build from Express                             | **Logic Lead** |
| 5.5  | Test end-to-end: frontend → submit → results.json → admin      | **Shared**     |
| 5.6  | Build & lint passes                                               | **Shared**     |

### Sprint 6 — Polish + Deploy (Day 5-6)

| Step | Task                                                             | Owner                   |
| ---- | ---------------------------------------------------------------- | ----------------------- |
| 6.1  | Reset Progress button + handler (clears state + localStorage)    | **Logic Lead**    |
| 6.2  | Final styling pass (spacing, alignment, edge cases)              | **Frontend Lead** |
| 6.3  | Deploy to campus server (install Node, clone repo, run with pm2) | **Logic Lead**    |
| 6.4  | Final build + acceptance testing                                 | **Shared**        |

---

## 6. Communication & Handoff Rules

1. **Props/API interfaces agreed before coding** — both members sign off on prop names, API shapes, and response formats before building their half
2. **Frontend Lead builds with mock data** — UI can be developed independently before backend is ready (mock `onQuizPassed` locally, hardcoded email)
3. **Logic Lead provides stub server early** — a bare-bones Express app that returns `200` for `/api/submit` so Frontend Lead can test the fetch call
4. **Commit messages** — format: `[Module] Description` (e.g., `[Questionnaire] Add retry counter`, `[Server] Add submit endpoint`)
5. **Daily standup** — 10 minutes at start of day to align progress, flag blockers
6. **Contract revisions** — any scope change should update this document and both members re-sign

---

## 7. Edge Cases & Acceptance Criteria

| Criteria                                                      | Status |
| ------------------------------------------------------------- | ------ |
| Email extracted from`?email=` URL param if present          | ✅     |
| Email input shown if URL param missing                        | ✅     |
| Basic email validation (contains`@`)                        | ✅     |
| VoiceSelector shown only until email + voice set              | ✅     |
| All state persists across page reload (localStorage)          | ✅     |
| Module 1 always unlocked                                      | ✅     |
| Module 2 unlocks only after Module 1 quiz 100%                | ✅     |
| Module 3 unlocks only after Module 2 quiz 100%                | ✅     |
| Questionnaire appears only after video`onEnded`             | ✅     |
| 5 random questions selected from 10 each retry                | ✅     |
| Retry counter increments on each retry, 0 on first try        | ✅     |
| `fetch("POST /api/submit")` called on pass with retry count | ✅     |
| Server upserts results.json by email + moduleId               | ✅     |
| `/admin` page password-gated, shows all results table       | ✅     |
| Reset clears progress & localStorage, preserves voice + email | ✅     |
| Locked modules show 🔒 + grayed out + not clickable           | ✅     |
| Switching voice mid-session remounts video                    | ✅     |
| Female voice falls back to male if file missing               | ✅     |
| Build passes with no errors                                   | ✅     |

---

## 8. File Ownership Matrix

| File                                          | Primary Owner           | Secondary                 |
| --------------------------------------------- | ----------------------- | ------------------------- |
| `frontend/index.html`                       | Frontend Lead           | —                        |
| `frontend/src/main.jsx`                     | Shared                  | —                        |
| `frontend/src/index.css`                    | Frontend Lead           | —                        |
| `frontend/src/App.css`                      | Frontend Lead           | —                        |
| `frontend/src/App.jsx`                      | **Logic Lead**    | Frontend Lead (review)    |
| `frontend/src/constants/VideoContent.js`    | **Shared**        | —                        |
| `frontend/src/components/VoiceSelector.jsx` | **Frontend Lead** | Logic Lead (props)        |
| `frontend/src/components/VideoPlayer.jsx`   | **Frontend Lead** | Logic Lead (props)        |
| `frontend/src/components/Questionnaire.jsx` | **Frontend Lead** | Logic Lead (review fetch) |
| `server/server.js`                          | **Logic Lead**    | —                        |
| `server/results.json`                       | **Logic Lead**    | —                        |
| `server/admin.html`                         | **Logic Lead**    | Frontend Lead (styling)   |
| `WIREFRAME.md`                              | Frontend Lead           | —                        |
| `TECHNICAL_CONTRACT.md`                     | Shared                  | —                        |
| `.gitignore`                                | Logic Lead              | —                        |

---

## 9. Deployment Checklist (Campus Server)

- [ ] Server has Node.js 18+ installed
- [ ] Clone repo to server
- [ ] `npm install` in `frontend/` and `server/`
- [ ] `npm run build` in `frontend/`
- [ ] Place MP4 videos in `frontend/public/videos/`
- [ ] Set admin password via env variable or config
- [ ] Run server with `pm2` for persistence: `pm2 start server/server.js`
- [ ] Open port (e.g., 8080) via firewall
- [ ] Test flow: email param → voice → video → quiz → submit → admin page

---

*Contract agreed: both members commit to the above scope, timeline, and modular boundaries.*
