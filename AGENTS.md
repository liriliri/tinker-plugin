# AGENTS.md

Guidelines for developing Tinker plugins in this repo.

## Core Rules

- Do not install new npm dependencies without asking first.
- Prefer existing utilities and native APIs; keep the template minimal.
- Keep changes self‑contained in this repo (no external references).

## Project Layout

Basic plugin:
```
src/
  renderer/
    App.tsx
    main.tsx
    index.scss
  preload/
    index.ts
index.html
package.json
icon.png
```

## Coding Style

- React + TypeScript.
- Use Tailwind for UI styling.
- Keep components small and focused.

## Preload

- Only expose explicit APIs via `contextBridge.exposeInMainWorld`.
- Avoid Node APIs unless needed.
