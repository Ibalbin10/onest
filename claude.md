# CLAUDE.md

## Project Goals

**Current milestone:** Curated discovery layer for high-quality IRL communities.

Treat IRL community leads ("hosts") as the "new influencers" for brand activations.

---
## Architecture Overview
Next.js app with SPA-style discovery flow (client-side navigation for categories/activities) and engagement tracking. Phase 1 focuses on a read-only discovery layer with host intake and activity discovery.

```text
onest/
├── app/
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Discovery landing (SPA-style navigation)
│   ├── hosts/
│   │   └── page.tsx           # Host intake questionnaire form
│   └── api/
│       └── exit/
│           └── route.ts       # Engagement tracking & redirect service
├── components/
│   ├── ui/                    # Shadcn/ui components
│   ├── category-grid.tsx      # Fixed taxonomy navigation
│   ├── activity-card.tsx      # Activity preview cards
│   └── host-form.tsx          # Host intake form component
├── lib/
│   ├── supabase.ts            # Supabase client & DB connection
│   ├── tanstack-query.ts      # TanStack Query setup for state management
│   └── utils.ts               # Shared utilities
└── docs/
    └── project_spec.md        # Placeholder; full PRD is at root `Onest (PRD).md`
```

Database schema reference: `schema.sql` will be added once Phase 1 is validated.

---

## Design Style Guide

Visual Style: Calm, editorial, human. Avoid corporate aesthetics and visual clutter.

Layout: Content-first, responsive, mobile-optimized, with emphasis on high-quality photography.

Component Library: Use `shadcn/ui` for consistent interactive elements.

Typography: Clean, legible fonts that prioritize clarity over decoration.

Taxonomy: Fixed 8-category emotional taxonomy with icons/emojis for visual cues.

---

## Product & UX Guidelines

Discovery Flow: Calm, low-stimulus exploration. No infinite feeds or high-frequency notifications.

Activity-First: Highlight activity details (What, When, Where) over host profile.

Identity-Based: Optimize for repeatable communities that foster long-term social circles.

Frictionless Exit: Ensure external redirection (Instagram/Web) is fast while reliably logging engagement via `/api/exit`.

Copy Tone: Casual, friendly, human. Avoid marketing jargon.

---

## Constraints & Policies

Scope: Phase 1 enforcement only. No public user accounts, messaging, or payments until validation.

Data Privacy: Never expose Supabase service roles to the client. Use Row Level Security (RLS).

Code Quality: TypeScript strict mode enabled. Keep nullable types for Phase 2 marketplace fields (pricing, booking status).

Dependencies: Prefer `shadcn/ui` components over adding new UI libraries.

---

## Repository Etiquette

Branching: Use `feature/` or `fix/` prefixes for all branches. `main` is protected.

Commits: Atomic commits with clear, descriptive messages in present tense. Example: "Add host intake form validation".

PRs: Require brief description and check against MVP roadmap.

---

## Commands

### Development

```bash
npm run dev          # Start local development server
npm run build        # Production build
npm run start        # Run production build locally
npm run lint         # Run ESLint check
```

### UI & Database

```bash
npx shadcn-ui@latest add [component]                                # Add shadcn component
npx supabase gen types typescript --project-id hmfeepvdiwkuraquvmws > types/supabase.ts  # Sync DB types from remote project
```

---

## Testing

Manual Testing: Focus on discovery-to-exit flow and intake form accuracy.

Engagement Verification: Ensure `/api/exit` correctly increments Supabase logs.

Form Validation: All required host questionnaire fields are captured correctly.

Visual QA: Layout responsiveness across mobile and desktop viewports.

---

## Documentation

PRD: Full context is in `Onest (PRD).md` in the root directory.

Schema: `schema.sql` reference will be maintained once database design is finalized.

Updates: Keep this `CLAUDE.md` current with any architecture, UX, dependency, or workflow changes to ensure all team members have up-to-date guidance.
