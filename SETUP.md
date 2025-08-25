# Setup Guide for AI Tools Comparison

## Issues Fixed

1. **Next.js 15 searchParams compatibility** - Updated components to properly await searchParams
2. **Missing database tables** - Created comprehensive database setup script

## Quick Fix Steps

### 1. Database Setup

Run the updated database setup script in your Supabase SQL Editor:

```sql
-- Copy and paste the contents of scripts/setup_database.sql
-- This will create all necessary tables including the 'tools' table
```

### 2. Environment Variables

Create a `.env.local` file in your project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Restart Development Server

After setting up the database and environment variables:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## What Was Fixed

### SearchParams Issue
- Updated `components/tools-grid.tsx` to properly await searchParams
- Updated `app/page.tsx` to handle searchParams as a Promise
- This resolves the Next.js 15 compatibility warning

### Database Issue
- The `public.tools` table was missing
- Updated `scripts/setup_database.sql` to include all core tables
- Tables now include: categories, vendors, tools, pricing_plans, reviews, comparisons, affiliate_clicks, admin_profiles, affiliate_conversions

## Database Schema

The setup script creates:
- **Core tables**: categories, vendors, tools, pricing_plans, reviews, comparisons
- **Admin tables**: admin_profiles
- **Affiliate tables**: affiliate_clicks, affiliate_conversions
- **Proper indexes** for performance
- **Row Level Security (RLS)** policies for public access

## Next Steps

1. Run the database setup script in Supabase
2. Set up environment variables
3. Restart your development server
4. The application should now work without errors

## Troubleshooting

If you still see errors:
1. Check that all tables were created in Supabase
2. Verify environment variables are set correctly
3. Check the browser console for any remaining errors
4. Ensure your Supabase project has the correct permissions set up
