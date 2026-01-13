# Onest Architecture

## High-Level System Architecture

### System Overview
Onest is a Next.js 14 (App Router) application with a serverless backend powered by Supabase. Phase 1 focuses on read-only discovery with engagement tracking and host intake.

```text
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Next.js 14 App (App Router + React Server Components) │ │
│  │  - Server Components: Initial page renders             │ │
│  │  - Client Components: Interactive UI (TanStack Query)  │ │
│  │  - SPA-style navigation via client-side routing        │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      APPLICATION LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐  │
│  │ Discover UI  │  │  Host Intake │  │ Engagement API  │  │
│  │   (Read)     │  │    (Write)   │  │   (/api/exit)   │  │
│  └──────────────┘  └──────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                         DATA LAYER                           │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Supabase (PostgreSQL + Auth)              │ │
│  │  - Row Level Security (RLS) enabled                    │ │
│  │  - Anon key: Read-only public queries                  │ │
│  │  - Service role: Admin operations (host validation)    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      ANALYTICS LAYER                         │
│  ┌──────────────┐         ┌─────────────────────────────┐  │
│  │   Vercel     │         │  Supabase Engagement Logs   │  │
│  │  Analytics   │         │  (Activity click-throughs)  │  │
│  └──────────────┘         └─────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 14 (TypeScript) | App Router, RSC, SPA-style client navigation |
| **UI Framework** | Tailwind CSS + shadcn/ui | Consistent, accessible component library |
| **State Management** | TanStack Query | Server state caching, optimistic updates |
| **Backend** | Supabase (PostgreSQL) | Database, Auth (Phase 2), Storage |
| **API Routes** | Next.js Route Handlers | `/api/exit` for engagement tracking |
| **Analytics** | Vercel Analytics + Supabase Logs | Traffic + activity-level engagement |
| **Deployment** | Vercel | Serverless hosting, edge functions |

---

## Data Flow Diagrams

### Flow 1: Discovery & Engagement

```text
┌──────────┐
│  User    │
│ Visits / │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Server Component: page.tsx             │
│  - Fetches vetted activities from DB    │
│  - Renders category grid (static)       │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Client Component: CategoryGrid         │
│  - User selects category                │
│  - Client-side navigation (no reload)   │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  TanStack Query: useActivities(cat)     │
│  - Fetches activities for category      │
│  - Caches result for instant nav        │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Client Component: ActivityCard         │
│  - User clicks "View on Instagram"      │
│  - Navigates to /api/exit?id={actId}    │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Route Handler: /api/exit/route.ts      │
│  - Logs engagement event to Supabase    │
│  - Redirects to external link (302)     │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  External: Instagram / Community Site   │
└─────────────────────────────────────────┘
```

### Flow 2: Host Intake

```text
┌──────────┐
│  Host    │
│ Visits   │
│ /hosts   │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Client Component: HostForm             │
│  - Renders intake questionnaire         │
│  - Validation via React Hook Form       │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Form Submission (POST /api/hosts)      │
│  - Validates required fields            │
│  - Inserts record with status: pending  │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Supabase: host_submissions table       │
│  - Record created with RLS              │
│  - Admin reviews via Supabase UI        │
└────┬────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────┐
│  Manual Validation (Phase 1)            │
│  - Admin changes status: pending→vetted │
│  - Activity becomes visible in discover │
└─────────────────────────────────────────┘
```

---

## Major Component Architecture

### Core Components

```text
components/
├── ui/                          # shadcn/ui primitives
│   ├── button.tsx
│   ├── card.tsx
│   ├── form.tsx
│   └── ...
├── category-grid.tsx            # Fixed taxonomy (8 categories)
│   └── Props: None (static render)
│   └── State: None
│   └── Behavior: Client-side navigation on category click
├── activity-card.tsx            # Activity preview card
│   └── Props: { activity: Activity }
│   └── State: None
│   └── Behavior: Displays name, cadence, location; CTA to detail
├── activity-detail.tsx          # Full activity view
│   └── Props: { activity: Activity }
│   └── State: None
│   └── Behavior: Renders external link via /api/exit
└── host-form.tsx                # Host intake questionnaire
    └── Props: None
    └── State: Form state (React Hook Form)
    └── Behavior: Validates & submits to /api/hosts
```

### API Routes

```text
app/api/
├── exit/
│   └── route.ts                 # GET handler
│       └── Query: ?id={activityId}&dest={url}
│       └── Logic:
│           1. Log engagement event (Supabase)
│           2. Return 302 redirect to dest
│       └── Security: Validate activityId exists
└── hosts/
    └── route.ts                 # POST handler (future)
        └── Body: Host questionnaire data
        └── Logic:
            1. Validate required fields
            2. Insert into host_submissions (status: pending)
            3. Return success response
        └── Security: Rate limiting, spam prevention
```

### Data Layer

```text
lib/
├── supabase.ts                  # Supabase client setup
│   └── createClient()           # Browser client (anon key)
│   └── createServerClient()     # Server-side client (anon key)
│   └── createAdminClient()      # Admin client (service role)
├── tanstack-query.ts            # TanStack Query setup
│   └── queryClient config
│   └── Query keys & helpers
└── utils.ts                     # Shared utilities
    └── Category mapping
    └── Date formatting
    └── URL validation
```

---

## Database Schema (Phase 1)

### Core Tables

```sql
-- Fixed taxonomy (seeded on init)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  emoji TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL
);

-- Community/Host entity
CREATE TABLE communities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  instagram_url TEXT,
  website_url TEXT,
  status TEXT DEFAULT 'pending', -- pending | vetted
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Repeatable activities
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  community_id UUID REFERENCES communities(id),
  category_id UUID REFERENCES categories(id),
  name TEXT NOT NULL,
  description TEXT,
  cadence TEXT, -- "Weekly", "Monthly", etc.
  location TEXT, -- Neighborhood or city area
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Engagement tracking
CREATE TABLE engagement_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  activity_id UUID REFERENCES activities(id),
  destination_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Host intake (Phase 1)
CREATE TABLE host_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  host_name TEXT NOT NULL,
  email TEXT NOT NULL,
  community_name TEXT NOT NULL,
  role TEXT,
  instagram_url TEXT,
  category_slug TEXT,
  city TEXT,
  description TEXT,
  avg_attendance INT,
  brand_ready BOOLEAN,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Row Level Security (RLS)

```sql
-- Public read access for vetted content only
ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read vetted" ON activities
  FOR SELECT USING (status = 'vetted');

-- No public write access (admin-only via service role)
CREATE POLICY "Admin write" ON activities
  FOR ALL USING (auth.role() = 'service_role');

-- Host submissions: Insert-only for public
ALTER TABLE host_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public insert" ON host_submissions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read all" ON host_submissions
  FOR SELECT USING (auth.role() = 'service_role');
```

---

## Component Interaction Patterns

### Pattern 1: Server Component → Client Component

```tsx
// app/page.tsx (Server Component)
export default async function DiscoverPage() {
  const { data: categories } = await supabase
    .from('categories')
    .select('*');

  return <CategoryGrid categories={categories} />; // Client component
}

// components/category-grid.tsx (Client Component)
'use client';
export function CategoryGrid({ categories }: Props) {
  const [selected, setSelected] = useState(null);
  // Client-side interactivity
}
```

### Pattern 2: TanStack Query for Client-Side Data

```tsx
// hooks/use-activities.ts
export function useActivities(categoryId: string) {
  return useQuery({
    queryKey: ['activities', categoryId],
    queryFn: async () => {
      const { data } = await supabase
        .from('activities')
        .select('*, communities(*), categories(*)')
        .eq('category_id', categoryId)
        .eq('status', 'vetted');
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
```

### Pattern 3: Engagement Tracking via API Route

```tsx
// components/activity-detail.tsx
<a
  href={`/api/exit?id=${activity.id}&dest=${encodeURIComponent(activity.community.instagram_url)}`}
  className="btn-primary"
>
  View on Instagram
</a>

// app/api/exit/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const dest = searchParams.get('dest');

  // Log engagement
  await supabase.from('engagement_events').insert({
    activity_id: id,
    destination_url: dest,
  });

  // Redirect
  return NextResponse.redirect(dest, { status: 302 });
}
```

---

## Security Considerations

### Environment Separation

| Key | Exposure | Purpose |
|-----|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Client | Public database endpoint |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client | Read-only access (RLS enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Admin operations (bypass RLS) |

### Row Level Security (RLS)

- **Public access**: Only vetted activities visible
- **Host submissions**: Insert-only for public, admin-only read
- **Engagement events**: Insert-only, no public read

### Rate Limiting (Future)

- Host intake form: 5 submissions per IP per day
- Engagement API: 100 requests per IP per minute

---

## Deployment Architecture

```text
┌─────────────────────────────────────────────────────────┐
│                    Vercel Edge Network                   │
│  - Global CDN for static assets                          │
│  - Edge functions for /api routes (region: auto)        │
│  - Automatic HTTPS, preview deployments                  │
└────┬────────────────────────────────────────────────────┘
     │
     ▼
┌─────────────────────────────────────────────────────────┐
│              Supabase (us-east-1 region)                 │
│  - Managed PostgreSQL (automatic backups)                │
│  - Connection pooling via PgBouncer                      │
│  - RLS enforced at database level                        │
└─────────────────────────────────────────────────────────┘
```

### Build & Deploy Flow

```text
git push → GitHub
            ↓
      Vercel webhook
            ↓
    Build (npm run build)
            ↓
   Type check + Lint
            ↓
    Deploy to preview URL
            ↓
   Manual promote to prod
```

---

## Future Extensibility (Phase 2)

### Planned Additions

1. **Authentication Layer**
   - Supabase Auth (OAuth + Email)
   - User roles: host, brand, admin
   - Protected routes via middleware

2. **Marketplace Features**
   - Host profiles with availability calendar
   - Brand campaign creation workflow
   - Booking engine with Stripe Connect

3. **Messaging System**
   - Brand-to-host direct messages
   - Notification system (email via Resend)

4. **Advanced Analytics**
   - Cohort analysis (return visits)
   - Brand attribution tracking
   - Host performance dashboard

### Architecture Changes Required

- Add `users` table with role-based RLS
- Introduce `bookings` and `campaigns` tables
- Add Stripe webhook handlers
- Implement real-time subscriptions (Supabase Realtime)
- Multi-city support via geo-filtering

---

## Performance Optimization

### Phase 1 Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | > 90 |

### Strategies

- **Server Components**: Reduce client-side JS bundle
- **Image Optimization**: Next.js `<Image>` component
- **Database Indexes**: On `category_id`, `status`, `created_at`
- **Query Caching**: TanStack Query with 5-minute stale time
- **Static Generation**: Category grid pre-rendered at build

---

## Monitoring & Observability

### Metrics to Track

1. **Engagement**
   - Click-through rate per activity
   - Category popularity distribution
   - Average time between discovery and click

2. **Host Intake**
   - Submission volume per day
   - Validation time (pending → vetted)
   - Rejection reasons (Phase 2)

3. **Technical**
   - API response times (p50, p95, p99)
   - Error rates by route
   - Database query performance

### Tools

- **Vercel Analytics**: Traffic, Web Vitals
- **Supabase Logs**: Database queries, errors
- **Custom Dashboard**: Engagement metrics from `engagement_events` table
