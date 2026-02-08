# Hindu Mythology Learning App (Kids 4-12)

A cross-platform React Native (Expo) starter app that implements the product requirements for a child-first Hindu mythology learning experience with a protected parent dashboard.

## What is included

- Age-based child profiles (4-6, 7-9, 10-12)
- Mythology world sections: Stories, Games, Quests
- Audio-first story experience model (`Read with me`, pronunciation taps)
- Gamification (points, stars, badges, streaks)
- Mandatory game modules represented in app flow:
  - Match Cards
  - Timeline Puzzle
  - Temple Quest Map
- Parent mode (PIN protected) with controls and learning insights
- Modular content layer for adding stories and challenges

## Tech

- React Native + Expo + TypeScript
- Local in-memory store (ready to swap with AsyncStorage/cloud sync)

## Run locally

```bash
npm install
npm run start
```

For web preview:

```bash
npm run web
```

## Next implementation steps

1. Persist profile/progress using AsyncStorage.
2. Add real narration playback and synchronized text highlighting.
3. Implement full mini-game mechanics with drag/drop and timer logic.
4. Add secure parent authentication backed by encrypted local storage.
5. Add analytics event pipeline (privacy-first, no third-party sharing).
