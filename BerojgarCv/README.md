# बेरोजगार CV — Nepal's #1 CV Builder

Build a professional CV in 10 minutes. 7 templates for Nepal, Gulf, and Japan. AI bullet improver. Free PDF download. ATS-optimized.

## Tech Stack

| Layer | Package | Notes |
|---|---|---|
| Framework | Next.js 14 | App Router, TypeScript strict |
| Styling | Tailwind CSS | + CSS custom properties |
| State | Zustand + immer | immer middleware |
| Auth | Clerk | Google OAuth + Email/Password |
| Database | Neon + Prisma | PostgreSQL serverless |
| PDF | @react-pdf/renderer | v3, text-based |
| Photos | Cloudinary | face-gravity crop |
| AI | Anthropic SDK | claude-sonnet-4-6 |
| Animation | Framer Motion | v11 |
| Icons | Lucide React | |

## Setup Instructions

### 1. Clone & Install
```bash
git clone <repo-url>
cd berojgar-cv
npm install
```

### 2. Environment Variables
```bash
cp .env.example .env.local
```
Fill in the following keys in `.env.local`:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` — from Clerk Dashboard
- `CLERK_SECRET_KEY` — from Clerk Dashboard
- `DATABASE_URL` — from Neon Dashboard
- `DATABASE_URL_UNPOOLED` — from Neon Dashboard
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` — from Cloudinary
- `CLOUDINARY_API_KEY` — from Cloudinary
- `CLOUDINARY_API_SECRET` — from Cloudinary
- `ANTHROPIC_API_KEY` — from Anthropic Console

### 3. Database Migration
```bash
npx prisma migrate dev --name init
```

### 4. Run Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

## Clerk JWT Template Setup (isAdmin)

To enable admin access:

1. Go to **Clerk Dashboard → JWT Templates**
2. Edit the default session token
3. Add to claims:
```json
{
  "metadata": "{{user.public_metadata}}"
}
```
4. To make a user admin, run:
```typescript
await clerkClient.users.updateUserMetadata(userId, {
  publicMetadata: { isAdmin: true }
})
```

## Phase Progress

- [x] **Phase 1** — Foundation & Landing Page
  - Next.js + TypeScript + Tailwind + Clerk + Zustand + Prisma
  - Complete CSS design system, all 5 fonts
  - All 6 Dhaka components (DhakaBorder, DhakaTexture, DhakaLogo, DiamondMark, DiamondStep, ThangkaMandala)
  - Complete Prisma schema (7 models)
  - Complete TypeScript types (CVData + all interfaces)
  - Zustand store with all actions + ATS recalculation
  - Three-tier middleware (public, auth, admin)
  - Landing page (Nav, Hero, Templates, Features, How It Works, CTA, Footer)
  - AuthGateModal, Toast system, custom auth pages
- [x] **Phase 2** — CV Templates & Builder UI
  - Seven premium templates implemented with thumbnails
  - Dynamic Builder Toolbar & Section Navigation
  - Client-side Template Switcher Modal
  - Template selection sync via URL query parameters
  - Responsive Edit/Preview split layout for mobile
- [ ] **Phase 3** — Builder Forms, PDF Export & AI Features
- [ ] **Phase 4** — Dashboard, Auth, Share Pages
- [ ] **Phase 5** — Admin Panel & Production
