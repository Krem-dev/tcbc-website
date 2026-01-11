# TCBC Frontend Setup Guide

## Project Overview
This is an exact replica of the HplusWebsite health website, adapted for TCBC church with identical design, animations, and layout.

## Technologies Used (Exact Same as Health Website)
- **Framework:** Next.js 15.3.2 (React 19)
- **Language:** TypeScript
- **Styling:** TailwindCSS 4.1.6
- **UI Components:** shadcn/ui (Radix UI)
- **Animations:** Framer Motion 12.23.12
- **Icons:** Lucide React, FontAwesome
- **Fonts:** Inter (Google Fonts)

## Color Scheme (Exact Same)
- Primary Blue: `#11336e`
- Secondary Blue: `#1a4b9c`
- Dark Blue: `#0f2a54`
- Light Blue: `#b9d1f3`
- Background: `#eff1f4`

## Setup Instructions

### 1. Install Dependencies
```bash
cd C:\github\TCBC\tcbc-frontend
npm install
```

### 2. Copy Images/Videos from Health Website
You need to copy these folders from HplusWebsite to tcbc-frontend:
- `C:\github\TCBC\HplusWebsite\public\images` → `C:\github\TCBC\tcbc-frontend\public\images`
- `C:\github\TCBC\HplusWebsite\public\newimages` → `C:\github\TCBC\tcbc-frontend\public\newimages`
- `C:\github\TCBC\HplusWebsite\public\videos` → `C:\github\TCBC\tcbc-frontend\public\videos`

### 3. Create Placeholder Logo
Create a placeholder logo at: `C:\github\TCBC\tcbc-frontend\public\images\tcbc-logo.png`

### 4. Run Development Server
```bash
npm run dev
```

The site will be available at: http://localhost:3000

## Current Status - Homepage Only

### ✅ Completed
- Project configuration (package.json, tsconfig, next.config)
- Global CSS with exact animations from health website
- NavBar component (adapted for church navigation)
- Footer component (adapted for church links)
- Hero section with sliding content (exact animation)
- Events section with expanding cards (exact layout as "Who We Serve")
- Experience TCBC section with 3 feature cards

### Navigation Structure
- **Home** - Main landing page
- **About** - About TCBC (replaces "About HeartLINK+")
- **Sermons** - Recent sermons and series (replaces "How It Works")
- **Events** - Upcoming events and calendar (replaces "Who We Serve")
- **Ministry** - Ministry information (replaces "Partners")
- **Contact** - Contact form
- **Give** - Donation page (CTA button)

### Exact Replications
1. **Hero Section**: Same sliding animation with tags, headline, subtext, and CTA button
2. **Events Cards**: Same expanding card design with hover/tap interactions
3. **Animations**: All entry/exit animations copied from health website
4. **Colors**: Exact same color scheme
5. **Layout**: Same spacing, padding, and responsive breakpoints
6. **Fonts**: Same font families and sizes

## Next Steps (After Homepage Approval)
1. About page
2. Sermons page
3. Events page
4. Ministry page
5. Contact page
6. Give page

## Important Notes
- All lint errors will resolve after running `npm install`
- Images are placeholders - replace with actual church images
- Content is church-themed but layout is identical to health website
- All animations and transitions are exact copies
