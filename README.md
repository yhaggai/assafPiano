# Assaf Piano 🎹

A Hebrew piano and note-recognition game for children.

- Play 25 piano keys with a mouse, touch, or computer keyboard.
- Match a note shown with its Hebrew name, symbol, color, and staff notation.
- Hear the requested note without revealing the correct key.
- Celebrate correct answers and advance automatically after two seconds.
- Optionally use a microphone to recognize individual sung or played notes.

Microphone audio is processed locally in the browser, without recording or uploading. Microphone input requires user permission and HTTPS (or localhost). Hebrew spoken note names depend on an installed Hebrew browser voice. Pitch recognition works best with one sustained note at a time in a quiet room.

## Run locally

```sh
python3 -m http.server 8765 --directory dist
```

Open http://localhost:8765. The app has no dependencies or build step. Its source is `dist/index.html`.

## Publish

Pushes to `main` deploy `dist/` to GitHub Pages through `.github/workflows/pages.yml`.
