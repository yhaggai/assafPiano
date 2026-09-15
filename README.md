# Assaf Piano 🎹

A Hebrew piano and note-recognition game for children.

- Play 25 piano keys with a mouse, touch, or computer keyboard.
- Slide across keys to play successive notes; use multiple fingers for chords.
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

## Microphone octave

Select the octave of the lowest C you play using the microphone octave selector. The default is C3, matching the supplied piano recording; choose C4 for middle C. Microphone notes are transposed into the lesson octave while keeping low C and high C distinct. On-screen keys keep their original pitches.

Run the microphone regression checks with `node --test tests/microphone.test.cjs`. To also check the supplied recording, decode it with `ffmpeg -i /path/to/piano.opus -ar 48000 -ac 1 -f f32le /tmp/piano-sample.f32`, then run `PIANO_SAMPLE=/tmp/piano-sample.f32 node --test tests/microphone.test.cjs`. The personal recording is not included in the repository.
