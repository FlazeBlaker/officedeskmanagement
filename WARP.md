# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Stack: React (SPA) + Vite, JavaScript (no TypeScript), ESLint.
- Purpose: Frontend for an office/desk management app with trial booking, plans, auth, profile, and backend integration.
- Backend: Not included in this repo. The UI calls a separate API at http://localhost:3001 for auth, resources, bookings, contact, purchases, and profile data.

Commands
- Install dependencies
  - npm install
- Start dev server (HMR)
  - npm run dev
- Build production bundle
  - npm run build
- Preview production build locally
  - npm run preview
- Lint the codebase
  - npm run lint
- Tests
  - No test framework or scripts are configured in this repo.

High-level architecture
- App entry and providers
  - index.html mounts #root and loads src/main.jsx.
  - src/main.jsx wraps <App /> with BrowserRouter and AuthProvider (JWT-based auth via localStorage).
- Routing and layout
  - src/App.jsx defines routes with React Router.
    - A nested layout at path "/" renders <Layout />, which composes <Navbar />, <Outlet />, and <Footer />.
    - Routes under layout: "/" (HomePage), "/book-trial" (BookingPage), "/about", "/contact", "/profile", "/my-bookings".
    - Standalone routes: "/login", "/register", "/forgot-password", "/payment".
  - Global background components <DigitalAurora /> and <MathBackground /> render across all pages.
- Authentication context
  - src/context/AuthContext.jsx
    - Persists and reads authToken from localStorage, decodes via jwt-decode, provides { user, token, login, logout } through React context.
    - Consumers include Navbar (conditional menu), Hero (CTA behavior), Profile, MyBookings, Payment.
- Booking flow (multi-step)
  - src/pages/BookingPage.jsx orchestrates a 5-step flow with framer-motion animations:
    1) Step1_Date: choose date (react-calendar)
    2) Step2_ResourceType: select shared_desk/private_desk/conference_room
    3) Step3_Map: fetch available resources for date/type from GET /api/resources, select one
    4) Step4_Details: collect name/email and confirm
    5) Step5_Confirmation: show QR code (qrcode.react) + confetti, summarize details
  - On confirmation, posts booking to POST /api/bookings; errors are surfaced to the user.
- Pricing and payment
  - src/components/Pricing.jsx links plans to /payment; if unauthenticated, redirects to /login.
  - src/pages/PaymentPage.jsx simulates card entry UX, then records purchase via POST /api/purchases with Authorization: Bearer <token>.
- User profile and bookings
  - src/pages/ProfilePage.jsx fetches (in parallel) profile (/api/profile), user bookings (/api/my-bookings), and plan (/api/my-plan). Supports editing profile via PUT /api/profile.
  - src/pages/MyBookingsPage.jsx lists bookings via /api/my-bookings.
- UI composition
  - Common components: Navbar, Footer, Hero, Features, Pricing, backgrounds (DigitalAurora, MathBackground).
  - Styling via per-component CSS files imported directly; animations via framer-motion; effects via react-parallax-tilt, react-confetti, react-use.
- Backend expectations (external)
  - Endpoints used by the frontend (all at http://localhost:3001):
    - POST /api/login, POST /api/register
    - GET/PUT /api/profile
    - GET /api/my-bookings
    - GET /api/my-plan
    - GET /api/resources (query: date, type)
    - POST /api/bookings
    - POST /api/contact
    - POST /api/purchases
  - public/sql file.sql contains MySQL DDL and seed data aligned with the UI’s resource/booking model; it is for the backend database.

Tooling details
- Vite: Minimal config in vite.config.js using @vitejs/plugin-react.
- ESLint: eslint.config.js uses @eslint/js recommended config, react-refresh, and react-hooks rules; browser globals; rule override for no-unused-vars (ignores UPPER_CASE vars). Run via npm run lint.

Backend environment (secure.env)
- A secure.env file at the repository root configures the external backend (Node/Express + MySQL). It is already git-ignored in .gitignore.
- Expected keys (use your own secret values; do not commit them):
  - PORT=3001
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD={{DB_PASSWORD}}
  - DB_NAME=officedeskmanagement
  - DB_CONNECTION_LIMIT=10
  - BCRYPT_SALT_ROUNDS=10
  - JWT_SECRET={{JWT_SECRET}}
- Ensure the backend process reads this file (e.g., via dotenv) and is reachable at http://localhost:3001 as assumed by the frontend.

Notes from README
- The project was scaffolded from the React + Vite template with HMR and ESLint. No additional project-specific instructions are present in README.md.
