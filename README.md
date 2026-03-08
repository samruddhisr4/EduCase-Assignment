# PopX — EduCase Assignment

> A pixel-perfect, mobile-first authentication portal built with **React 19 + Vite + Tailwind CSS**, faithfully recreating the **PopX** UI design.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Routes](#-routes)
- [Authentication Flow](#-authentication-flow)
- [Design System](#-design-system)
- [Available Scripts](#-available-scripts)
- [Deployment](#️-deployment)
- [License](#-license)

---

## 🌟 Overview

**PopX** is a mobile-first authentication portal assignment that demonstrates:

- Clean **React 19** component architecture with Context API for global state
- **Route-level auth guards** using `ProtectedRoute` and `PublicRoute` wrappers
- **Persistent sessions** via `localStorage` — users stay logged in across page refreshes
- A polished **375×812px mobile viewport**, centered on all screen sizes to mimic a real device frame
- **Floating label inputs** with purple focus rings that match the PopX design spec

---

## 🔗 Live Demo

> 🚀 Deployed — *(add your Vercel or Render URL here after deployment)*

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🏠 **Landing Page** | Welcome screen with "Create Account" and "Login" call-to-action buttons |
| 📝 **Sign Up** | Registration form with full name, phone, email, password, company name, and agency (Yes/No) radio selection |
| 🔐 **Login** | Email & password authentication validated against users saved in `localStorage` |
| 👤 **Account Settings** | Protected profile page displaying the logged-in user's avatar, name, email, and bio |
| 🔒 **Auth Guards** | `ProtectedRoute` redirects unauthenticated users to `/login`; `PublicRoute` redirects logged-in users to `/account` |
| 🏷️ **Floating Label Inputs** | Custom animated input component with floating labels and purple focus ring |
| 💾 **Persistent Sessions** | Auth token and user data persisted via `localStorage` — survives page refresh |
| 📱 **Mobile Viewport** | Renders inside a fixed 375×812px frame centered on the viewport, like a real mobile device |

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| [React](https://react.dev/) | 19.x | UI library & component model |
| [Vite](https://vitejs.dev/) | 7.x | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com/) | 3.x | Utility-first CSS framework |
| [React Router DOM](https://reactrouter.com/) | 7.x | Client-side routing |
| [ESLint](https://eslint.org/) | 9.x | Code linting & style enforcement |
| [Rubik](https://fonts.google.com/specimen/Rubik) (Google Fonts) | — | Primary typeface |

---

## 📁 Project Structure

```
EduCase-Assignment/               # Git repo root (Vite project lives here)
├── public/
│   └── _redirects                # Render SPA redirect rule (/* → /index.html)
├── src/
│   ├── assets/                   # Images (e.g. profile.jpg)
│   ├── auth/
│   │   └── authUtils.js          # localStorage helpers: saveUser, saveToken, validateLogin, logout, getUser
│   ├── components/
│   │   ├── FloatingInput.jsx     # Reusable animated floating-label input field
│   │   ├── ProtectedRoute.jsx    # Redirects unauthenticated users → /login
│   │   └── PublicRoute.jsx       # Redirects authenticated users → /account
│   ├── context/
│   │   └── AuthContext.jsx       # Global auth state: isLoggedIn, currentUser, register, login, logout
│   ├── pages/
│   │   ├── Landing.jsx           # Welcome screen (public only)
│   │   ├── Signup.jsx            # Registration form (public only)
│   │   ├── Login.jsx             # Login form (public only)
│   │   └── AccountSettings.jsx   # Profile dashboard (protected)
│   ├── App.jsx                   # Router setup and mobile viewport wrapper
│   ├── main.jsx                  # React DOM entry point
│   └── index.css                 # Global base styles
├── index.html                    # HTML entry point (loads Rubik font)
├── render.yaml                   # Render Blueprint — declares this as a Static Site
├── vite.config.js                # Vite + React + Tailwind plugin config
├── tailwind.config.js            # Custom PopX color tokens & font family
├── postcss.config.js             # PostCSS config for Tailwind
├── eslint.config.js              # ESLint flat config
└── package.json                  # Dependencies & npm scripts
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x — [Download](https://nodejs.org/)
- **npm** ≥ 9.x (bundled with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/samruddhisr4/EduCase-Assignment.git

# 2. Navigate into the project
cd EduCase-Assignment

# 3. Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.  
The app renders in a **375×812px mobile frame** centered on the page.

---

## 🌐 Routes

| Path | Component | Access | Description |
|------|-----------|--------|-------------|
| `/` | `Landing` | Public only | Welcome screen — redirects logged-in users to `/account` |
| `/signup` | `Signup` | Public only | Account registration form |
| `/login` | `Login` | Public only | Email & password login |
| `/account` | `AccountSettings` | 🔒 Protected | User profile dashboard — redirects guests to `/login` |
| `*` | — | Any | Catch-all, redirects to `/` |

---

## 🔑 Authentication Flow

```
User visits /          →  PublicRoute checks localStorage token
  ├── Logged in?       →  Redirect → /account
  └── Not logged in?   →  Show Landing page

User signs up          →  saveUser() + saveToken() in localStorage
                       →  AuthContext updates (isLoggedIn = true)
                       →  Redirect → /account

User logs in           →  validateLogin() checks email+password in localStorage
  ├── Match found?     →  saveToken() → AuthContext updates → /account
  └── No match?        →  Show inline error message

User logs out          →  Clears localStorage token
                       →  AuthContext resets → Redirect → /
```

> **Note:** No backend or database required — all data lives in the browser's `localStorage`.

---

## 🎨 Design System

### Color Tokens (Tailwind custom colors)

| Token | Hex | Usage |
|-------|-----|-------|
| `popx-purple` | `#6C25FF` | Primary brand color, CTAs, focus rings, active labels |
| `popx-bg` | `#F7F8F9` | App & input background |
| `popx-dark` | `#1D2226` | Headings and primary text |
| `popx-gray` | `#919191` | Secondary text, hints, subtext |
| `popx-border` | `#CBCBCB` | Input borders (inactive state) |
| `popx-error` | `#DD4A3D` | Validation errors, required asterisks |
| `popx-white` | `#FFFFFF` | Card/header backgrounds |

### Typography

- **Font Family:** [Rubik](https://fonts.google.com/specimen/Rubik) (loaded from Google Fonts via `index.html`)
- **Weights used:** 400 (regular), 500 (medium)

### Viewport

The app renders inside a **375 × 812 px** container (iPhone SE / standard mobile), centered on the viewport with a subtle drop shadow — matching the PopX Figma design spec.

---

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite local development server (HMR enabled) |
| `npm run build` | Build optimised production bundle → `dist/` |
| `npm run preview` | Serve the production `dist/` build locally |
| `npm run lint` | Run ESLint across all source files |

---

## ☁️ Deployment

### Option A — Vercel *(Recommended)*

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import repo
3. **No configuration needed** — Vercel auto-detects Vite from the repo root
4. Click **Deploy** 🎉

> Every `git push` to `main` triggers an automatic redeploy.

---

## 📄 License

This project was built as part of an **EduCase** front-end assignment.  
All UI design credit goes to the **PopX** design specification.
