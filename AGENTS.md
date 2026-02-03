# AGENTS.md

Guidelines for developing a TINKER plugin.

## Project layout

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

## Coding style

- React + TypeScript.
- Tailwind for UI.
- Small, focused components.

## TINKER configuration

Declare `tinker` in `package.json` (see `tinker-template`):

```
"tinker": {
  "name": "Template",
  "main": "dist/renderer/index.html",
  "icon": "icon.png",
  "preload": "dist/preload/index.js",
  "locales": { "zh-CN": { "name": "模板" } }
}
```

Notes: `name` is the display name; `main` is entry page; `icon` is plugin icon;
`preload` only when Node API is needed; `locales` adds localized names.
Prefer plugin package `name` as `tinker-xxx`.

## Tinker API

Global `tinker` is available in renderer and preload (see `tinker.d.ts`):
- Theme/locale: `getTheme()` / `getLanguage()`
- Dialogs: `showOpenDialog()` / `showSaveDialog()`
- System: `showItemInPath()` / `showContextMenu()` / `setTitle()`
- Clipboard: `getClipboardFilePaths()`
- File IO: `readFile()` / `writeFile()`
- Events: `on('changeTheme' | 'changeLanguage', ...)`

## Preload

- Use Node APIs only in `preload/index.ts`.
- Expose minimal APIs via `contextBridge.exposeInMainWorld()`.

```ts
contextBridge.exposeInMainWorld('api', {
  readText: (path: string) => tinker.readFile(path, 'utf-8'),
})
```
