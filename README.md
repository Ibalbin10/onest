# Onest

A curated discovery layer for high-quality IRL communities, evolving into a brand-to-host sponsorship marketplace.

## Current Phase

**Phase 1: Discovery MVP**
Validating curated, calm discovery of repeatable IRL communities in Madrid.

## Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account

### Setup

1. **Clone and install**
   ```bash
   cd C:\Users\balbi\Documents\Onest
   npm install
   ```

2. **Configure environment**
   - Copy `.env.example` to `.env.local`
   - Add your Supabase credentials

3. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
onest/
├── app/                 # Next.js App Router pages
├── components/          # React components
├── lib/                 # Utilities & clients
├── docs/               # Documentation
└── types/              # TypeScript types
```

## Documentation

- **[PRD](./# Onest (PRD).md)** - Product requirements
- **[CLAUDE.md](./CLAUDE.md)** - Project guidelines
- **[architecture.md](./architecture.md)** - System architecture
- **[project_status.md](./project_status.md)** - Current status
- **[CHANGELOG.md](./CHANGELOG.md)** - Version history

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State:** TanStack Query
- **Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Key Features (Phase 1)

- 🎯 Fixed 8-category emotional taxonomy
- 📍 City-limited discovery (Madrid)
- 📊 Engagement tracking via `/api/exit`
- 📝 Host intake questionnaire
- 🔒 Row Level Security (RLS)

## Commands

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Run production build
npm run lint         # Lint check
```

## Success Metrics

- **Primary:** ≥15% CTR from Activity Detail pages
- **Secondary:** Host submissions per week, category distribution

## Contributing

This is a private project. See [CLAUDE.md](./CLAUDE.md) for development guidelines.

## License

Proprietary - All rights reserved
