# HealthCare · Clinical Suite

Next.js (App Router), React 19, TypeScript, Tailwind CSS v4, Context API, Firebase Auth, and a service worker to show local notifications.

## Features

- Sign in / sign up with Firebase Email/Password (and optional Google sign-in)
- Protected routes via `AuthGate`
- Dashboard + analytics + patient pages backed by React contexts
- Browser notifications using a registered service worker (`public/sw.js`)

## Requirements

- Node.js 18+ (for Next.js 15)
- npm

## Setup

```bash
npm install
```

1. Create a `.env.local` file at the repo root.
2. Add your Firebase Web app env vars:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
```

3. In Firebase Console: enable **Authentication -> Sign-in method -> Email/Password**, create at least one test user, and (optional) enable **Google** if you want “Continue with Google”.

Note: if Firebase env vars are missing, Firebase Auth is not configured and sign-in/sign-up will fail (the UI will instruct you to configure Firebase).

## Run (dev)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/` redirects to `/login` or `/dashboard` depending on auth state
- Use the **Test care alert** button on `/dashboard` after allowing notification permission in your browser. The app registers the service worker at `/sw.js`, then triggers a local notification.

## Build & start

```bash
npm run build
npm start
```

## Routes

- `/login` — email/password sign in and sign up
- `/dashboard` — dashboard overview + `Test care alert`
- `/analytics` — analytics page
- `/patients` — patient details panel

## Code structure

- `src/app` — routes (`/login`, `/dashboard`, `/analytics`, `/patients`) and app root layout
- `src/context` — `AuthContext`, `PatientsContext`
- `src/components/auth` — login UI (`LoginForm`) and route protection (`AuthGate`)
- `src/components/notify` — notification UI + service worker registration
- `src/lib/firebase.ts` — Firebase initialization using `NEXT_PUBLIC_FIREBASE_*`
- `public/sw.js` — service worker (`install`, `activate`, `push`)
