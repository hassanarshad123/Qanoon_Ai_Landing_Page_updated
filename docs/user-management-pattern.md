# User Management Pattern — Replication Guide

This document describes the pattern used for role-based user profile management in QanoonAI. It was implemented for **judges** and **lawyers** and can be replicated for `law_student` and `common_person` roles.

## Pattern Overview

```
1. Database table     →  {role}_profiles
2. Server actions     →  lib/actions/{role}-profile.ts   (CRUD + getOrCreate)
3. Dashboard action   →  lib/actions/{role}-dashboard.ts (aggregation)
4. Onboarding hook    →  lib/onboarding/submit.ts        (auto-create on signup)
5. Dashboard page     →  app/{role-plural}/page.tsx       (personalized greeting)
6. Profile page       →  app/{role-plural}/profile/page.tsx (editable form)
7. UserMenu routing   →  components/shared/UserMenu.tsx   (dynamic profile link)
8. Breadcrumbs        →  components/{role-plural}/Breadcrumbs.tsx (add "profile" label)
```

## Step-by-Step Checklist

### 1. Database Migration

Create `migrations/0XX_{role}_profiles.sql`:

```sql
CREATE TABLE IF NOT EXISTS {role}_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  -- Add role-specific columns here
  tour_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_{role}_profiles_user_id ON {role}_profiles(user_id);
```

Run: `psql $DATABASE_URL -f migrations/0XX_{role}_profiles.sql`

### 2. Server Actions — `lib/actions/{role}-profile.ts`

Required exports:

| Function | Purpose |
|----------|---------|
| `get{Role}Profile(userId)` | SELECT by user_id |
| `update{Role}Profile(userId, data)` | UPDATE with COALESCE |
| `getOrCreateProfile(userId)` | 3-tier fallback: profile table → onboarding_submissions → users |
| `isTourCompleted(userId)` | Check tour_completed flag |
| `markTourComplete(userId)` | Set tour_completed = true |

Key implementation notes:
- Use `"use server"` directive
- `mapRow()` converts snake_case DB columns to camelCase TypeScript
- For array columns (e.g. `practice_areas TEXT[]`), handle Neon returning `{a,b}` strings
- `getOrCreateProfile` tries 3 sources before inserting with `ON CONFLICT DO UPDATE`

### 3. Dashboard Action — `lib/actions/{role}-dashboard.ts`

```typescript
export async function get{Role}DashboardData() {
  const userId = await getUserId();
  const [profile, recentActivity] = await Promise.all([
    getOrCreateProfile(userId),
    getRecentActivity(userId, 10),
  ]);
  return { profile, recentActivity };
}
```

### 4. Onboarding Integration — `lib/onboarding/submit.ts`

Add an `if (role === "{role}")` block after the existing judge/lawyer blocks inside the `if (userId)` section. Extract role-specific fields from the `data` JSONB object and INSERT into the profile table with `ON CONFLICT DO UPDATE`.

### 5. Dashboard Page Update

In the role's dashboard page (`app/{role-plural}/page.tsx`):
- Import `get{Role}DashboardData`
- Add state for dashboard data + loading flag
- Replace hardcoded greeting with dynamic name from profile
- Use real activity data when available, mock as fallback

### 6. Profile Page — `app/{role-plural}/profile/page.tsx`

- Use the role's accent color (see `ROLE_COLORS` in `lib/onboarding/constants.ts`)
- Import `getOrCreateProfile` and `update{Role}Profile` from the role's actions
- Import constants from `lib/onboarding/constants.ts` for select/checkbox options
- Group fields into logical cards (Personal, Role-specific, Location)
- Use `PageHeader` from `@/components/judges/shared/page-header`

### 7. UserMenu — `components/shared/UserMenu.tsx`

The profile link already supports dynamic routing based on `session.user.role`. When adding a new role, add a condition:

```typescript
: role === "{role}" ? "/{role-plural}/profile"
```

### 8. Breadcrumbs

Add `profile: "Profile"` to the `labelMap` in the role's Breadcrumbs component.

## Existing Implementations

| Role | Migration | Server Actions | Profile Page |
|------|-----------|---------------|--------------|
| Judge | `migrations/003_judge_profiles.sql` | `lib/actions/judge-profile.ts` | `app/judges/profile/page.tsx` |
| Lawyer | `migrations/010_lawyer_profiles.sql` | `lib/actions/lawyer-profile.ts` | `app/lawyers/profile/page.tsx` |
| Law Student | — | — | — |
| Common Person | — | — | — |

## Role-Specific Field Reference

### Judge
`court_level`, `designation`, `province`, `city`, `court_name`

### Lawyer
`bar_council_number`, `years_of_experience`, `practice_areas` (TEXT[]), `province`, `city`, `primary_court`, `firm_type`, `firm_name`

### Law Student (suggested)
`university`, `program`, `year_of_study`, `career_goals` (TEXT[]), `province`, `city`

### Common Person (suggested)
`legal_concern_area`, `province`, `city`, `preferred_language`
