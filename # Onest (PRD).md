# Product Requirements Document (PRD): Onest

## 1. Overview

**Product Name:** Onest  
**One-liner:** A curated discovery layer for high-quality IRL communities, evolving into a brand-to-host sponsorship marketplace.  
**Initial Market:** Madrid, Barcelona
**Reference Product:** Offline Talent (discovery UX inspiration) - https://app.offlinetalent.com/

### Objective
Validate that **curated, calm discovery of repeatable IRL communities** drives meaningful engagement and demand from both participants and future brand partners.

---

## 2. Problem Statement

### For Individuals
- Existing tools (Meetup, Instagram) are noisy, feed-driven, and optimized for one-off events.
- Discovery prioritizes volume over **repeatable, identity-based communities**.
- Users struggle to find *ongoing* groups that feel curated and trustworthy.

### For Community Hosts
- Discovery depends heavily on Instagram algorithms.
- Brand sponsorships are ad-hoc, manual, and time-consuming.
- No simple way to signal “brand readiness” without becoming overly commercial.

### For Brands
- Identifying authentic local communities is manual and unscalable.
- Vetting quality, consistency, and audience fit requires offline effort.
- No standardized interface to test and repeat community-led activations.

---

## 3. Target Users & Personas

### 3.1 The Curious Adult (Primary – Phase 1)
- Age: 25–45
- Urban, often new to the city
- Values consistency, identity, and real connection
- Wants calm discovery, not social feeds

### 3.2 The Community Host (Secondary – Phase 1, Primary – Phase 2)
- Runs a repeatable IRL group (weekly / monthly)
- Already has traction (10–100+ attendees)
- Interested in sustainability, not influencer-style monetization

### 3.3 The Brand Marketer (Phase 2)
- CPG, Wellness, Lifestyle, Tech
- Seeks authentic distribution via trusted communities
- Needs attribution, repeatability, and brand safety

---

## 4. Product Scope & Phasing

### Phase 1: Curated Discovery MVP (Read-Only)

**Goal:** Validate demand for curated IRL community discovery.

**Included**
- City-limited discovery (Madrid only)
- Fixed emotional taxonomy
- Category browsing
- Activity detail pages
- External redirection (Instagram / Website)
- Engagement tracking via redirect logging
- Manual curation via admin tooling

**Excluded**
- User accounts or profiles
- RSVPs or ticketing
- Messaging
- Payments
- Brand interactions

---

### Phase 2: Sponsorship Marketplace

**Goal:** Enable repeatable, trusted brand-to-host activations.

**Planned Capabilities**
- Authentication (Hosts & Brands)
- Host profiles and directories
- Brand campaign creation
- Booking & sponsorship workflows
- Stripe Connect payouts
- Reviews & trust signals
- Internal messaging

---

## 5. Core Taxonomy System

Onest uses a **fixed emotional taxonomy**.  
Each community must belong to **exactly one primary category**.

1. Healthy Hangouts 🏃  
2. Culinary Circles 🍽️  
3. Game-Based Gatherings ♟️  
4. Book & Arts Circles 📚  
5. Creative Classes 🎨  
6. Fandom Festivities 🎬  
7. Cultural Exploration 🏛️  
8. Other (temporary, discouraged)

**Rationale**
- Reduces cognitive load
- Prevents tag sprawl
- Enables clean discovery and future brand matching

---

## 6. Functional Requirements (Phase 1)

### 6.1 Discover Page (`/discover`)

**Purpose**
Editorial-style entry point into offline life.

**Requirements**
- Clear value proposition above the fold
- Category grid using the fixed taxonomy
- Calm visual hierarchy (no infinite feeds)
- Mobile-first layout

---

### 6.2 Category Pages

**Purpose**
Allow users to browse communities by emotional intent.

**Requirements**
- List of vetted activities
- Lightweight preview cards showing:
  - Activity name
  - Community name
  - Cadence (weekly / monthly)
  - Neighborhood or city area

---

### 6.3 Activity Detail Page

**Purpose**
Provide enough context to confidently exit the platform.

**Requirements**
- Practical Information
  - Description
  - Frequency
  - Location
- Community Snapshot
  - Who runs it
  - What it feels like
- External Links
  - Instagram or Website
- Primary CTA
  - “View on Instagram” (or equivalent)

---

## 7. Data Model (Phase 1)

**Core Entities**
- Community
- Activity
- Category
- External Link
- Engagement Event (click-through)

**Key Principles**
- Activity-first, not host-first
- Marketplace fields included but nullable
- Designed for Phase 2 extensibility

---

## 8. Data Sourcing & Curation

### 8.1 Initial Seed
- 20–50 high-quality Madrid communities
- Manually sourced via Instagram and local aggregators
- Focus on repeatable, identity-driven groups

### 8.2 Host Self-Submission
- `/hosts` intake form
- Captures:
  - Community identity
  - Frequency
  - Brand readiness signals

### 8.3 Validation Workflow
- Status states: `pending` → `vetted`
- Manual review required before publishing
- Phase 1 admin via Supabase Table Editor

---

## 9. Engagement Tracking & Analytics

### Click-Through Tracking
- All outbound links routed through `/api/exit?id=XYZ`
- Logs:
  - Activity ID
  - Timestamp
  - Destination

### Analytics Stack
- Vercel Analytics (traffic-level)
- Supabase logs (community-level intent)

### Success Metrics
- Primary: ≥15% CTR from Activity Detail pages
- Secondary:
  - Number of host submissions
  - Return visits per user

---

## 10. Engineering Stack

- Frontend: Next.js 14 (TypeScript)
- UI: Tailwind CSS, shadcn/ui
- State: TanStack Query
- Backend: Supabase (Postgres, Auth, Storage)
- Infra:
  - Stripe Connect (Phase 2)
  - Resend (Email)

---

## 11. Non-Goals (Phase 1)

- Becoming an event ticketing platform
- Social feeds, likes, or comments
- User-generated reviews
- Open-ended tagging systems

---

## 12. Risks & Mitigations

| Risk | Mitigation |
|-----|-----------|
| Low engagement | Strong editorial curation |
| Stale data | Weekly content refresh process |
| Host spam | Manual validation |
| Overbuilding | Strict Phase 1 scope enforcement |

---

## 13. Open Questions

- How often should communities be re-validated?
- When does “Other” become deprecated?
- Should cadence changes trigger review?
- What minimum engagement justifies Phase 2 rollout?

---

## Appendix A: Host Intake Questionnaire (Phase 1)

**Required Fields**
- Host name
- Email
- Community name
- Role within community
- Instagram URL
- Primary category
- City coverage (single vs multi-city)
- 1–2 sentence community description

**Future-Oriented Fields**
- Average attendance
- Online reach
- Previous brand partnerships
- Willingness to collaborate with brands
