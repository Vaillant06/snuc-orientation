# Branch Strategy — SNUC Orientation

## Branches

| Branch               | Owner                    | Purpose                                                                    |
| -------------------- | ------------------------ | -------------------------------------------------------------------------- |
| `main`             | Shared                   | Production-ready, stable. Merged via PR only after review                  |
| `feature/frontend` | Frontend Lead (Sreenath) | All React components, Bootstrap styling, email integration, retry tracking |
| `feature/backend`  | Logic Lead (Subhiksha)   | Express server, API endpoints, admin page, results.json, deployment        |

## Workflow

```
feature/frontend ──┐
                   ├──→ main (after review)
feature/backend  ──┘
```

1. Both members create their feature branch from `main`
2. Work independently:
   - **Frontend Lead** — builds components with mock data, mocks `POST /api/submit`
   - **Logic Lead** — builds server, serves the built frontend, tests API
3. First merge `feature/frontend` → `main` via PR
4. Then merge `feature/backend` → `main` via PR
5. Integration test on `main`, fix mismatches together

## Commit message format

```
[Module] Description

Examples:
[Questionnaire] Add retry counter and fetch on pass
[Server] Add POST /api/submit endpoint with upsert
```

## Rules

- Never commit directly to `main`
- Open a PR, other member reviews, then merge
- If a contract (API shape, prop name) changes mid-sprint, update `TECHNICAL_CONTRACT.md` and notify in group chat
