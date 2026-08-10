# Wireframe — SNUC Orientation

---

## Screen 1: Voice Selection (shown once on first visit)

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│                                                         │
│                    ┌───────────────────┐                │
│                    │                   │                │
│                    │   Welcome to      │                │
│                    │  SNUC Orientation │                │
│                    │                   │                │
│                    │ Select your       │                │
│                    │ preferred voice:  │                │
│                    │                   │                │
│                    │  ┌──────────┐ ┌──────────┐         │
│                    │  │ Male     │ │ Female   │         │
│                    │  │ Voice    │ │ Voice    │         │
│                    │  └──────────┘ └──────────┘         │ 
│                    │                   │                │
│                    └───────────────────┘                │
│                                                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

- Full-screen light gray background
- White card centered vertically & horizontally
- Bootstrap `bg-light`, `card shadow-lg`, `btn btn-primary`

---

## Screen 2: Main App (after voice selection)

```
┌───────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌────────────────────────────────────┐ │
│  │ Modules      │  │  Module 1 - Visionary Leaders       │ │
│  │              │  │  [Male]  [Switch to Female]         │ │
│  │ ┌──────────┐ │  │                                    │ │
│  │ │ Module 1 │ │  │  ┌──────────────────────────────┐  │ │
│  │ │ (active) │ │  │  │                              │  │ │
│  │ └──────────┘ │  │  │         VIDEO PLAYER         │  │ │
│  │ ┌──────────┐ │  │  │                              │  │ │
│  │ │ Module 2 │ │  │  │                              │  │ │
│  │ └──────────┘ │  │  └──────────────────────────────┘  │ │
│  │ ┌──────────┐ │  │                                    │ │
│  │ │ 🔒 Mod 3 │ │  │  ┌──────────────────────────────┐  │ │
│  │ └──────────┘ │  │  │  Questionnaire                │  │ │
│  │ ─────────────│  │  │  1. Question text?            │  │ │
│  │ [Reset Prog] │  │  │  ○ Option A                   │  │ │
│  └──────────────┘  │  │  ○ Option B                   │  │ │
│                    │  │  ○ Option C                   │  │ │
│                    │  │  ○ Option D                   │  │ │
│                    │  │  2. Question text?            │  │ │
│                    │  │  ○ Option A                   │  │ │
│                    │  │  ...                          │  │ │
│                    │  │  [Submit]   (or Retry/Pass)   │  │ │
│                    │  └──────────────────────────────┘  │ │
│                    │                                    │ │
│                    └────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────┘
```

### Left sidebar
- "Modules" heading
- List-group with module items
- Active module highlighted with `active` class
- Locked modules have lock icon + `opacity-50`
- Divider + "Reset Progress" button at bottom

### Right content area

#### Header
- Module title
- Voice badge (`badge bg-info`)
- Toggle button (`btn btn-outline-primary btn-sm`)

#### Video
- Centered (`d-block mx-auto`)
- Shadow + rounded corners (`rounded shadow-sm`)
- Max-width 700px
- Gap above/below (`my-4`)

#### Questionnaire (shown after video ends)
- Title "Questionnaire" in primary color
- 5 question cards with `border-primary`
- Each card: question text + 4 radio options
- Selected option highlighted `bg-primary-subtle`
- After submit:
  - Correct → card border turns green + `bg-success-subtle`
  - Wrong → card border turns red + `bg-danger-subtle`
- Submit button at bottom (disabled until all answered)
- If not 100%: alert-danger + Retry button
- If 100%: alert-success banner

#### Pre-quiz state (before video finishes)
- Message: "Watch the full video to unlock the questionnaire"
- Centered, muted text

---

## Theme colors
- Primary: `#006DB4` (Bootstrap `primary` = `#0d6efd`)
- Accent: `#86B7FE` (Bootstrap `info` used for voice badge)
- Text: `#101214` (Bootstrap default dark)
- Bootstrap CDN handles all styling via utility classes
