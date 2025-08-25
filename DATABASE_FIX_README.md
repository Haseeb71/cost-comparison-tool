# Database Fix Guide

The admin CRUD operations are failing due to Row Level Security (RLS) policies that are too restrictive. Follow these steps to fix the issue:

## 🚨 Problem
- **Error**: "405 Method Not Allowed" when trying to add categories
- **Cause**: RLS policies are blocking admin users from performing CRUD operations
- **Solution**: Update the RLS policies to allow admin users full access

## 🔧 Fix Steps

### 1. Run the Database Fix Scripts

Connect to your Supabase database and run these scripts in order:

```bash
# Option 1: Using psql command line
psql -h your-supabase-host -U postgres -d postgres -f scripts/006_fix_admin_policies.sql

# Option 2: Using Supabase Dashboard SQL Editor
# Copy and paste the contents of scripts/006_fix_admin_policies.sql
```

### 2. Alternative Quick Fix (if the above doesn't work)

If you want a quick temporary fix, you can temporarily disable RLS on the categories table:

```sql
-- WARNING: This disables security temporarily
ALTER TABLE categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE vendors DISABLE ROW LEVEL SECURITY;
ALTER TABLE tools DISABLE ROW LEVEL SECURITY;
```

**Note**: Only use this for testing. Re-enable RLS after fixing the policies.

### 3. Test the Fix

After running the fix scripts:

1. **Restart your Next.js development server**
2. **Try to add a category again** in the admin panel
3. **Check the browser console** for any remaining errors

## 🧪 Testing Endpoints

Test these endpoints to verify the fix:

1. **Basic API test**: `/api/admin/test`
2. **Database connection test**: `/api/admin/test-db`
3. **Environment check**: `/api/admin/env-check`

## 🔍 Debugging

If you still have issues, check:

1. **Browser Console**: Look for detailed error messages
2. **Network Tab**: Check the actual HTTP response
3. **Server Logs**: Look for the console.log messages we added
4. **Database Logs**: Check Supabase logs for RLS policy violations

## 📋 What the Fix Does

The fix script:

1. **Removes overly broad policies** that were causing conflicts
2. **Creates a proper admin check function** that verifies user admin status
3. **Applies proper RLS policies** that allow admin users full CRUD access
4. **Maintains security** by only allowing verified admin users

## 🚀 After the Fix

Once the RLS policies are fixed, you should be able to:

- ✅ Create new categories
- ✅ Edit existing categories  
- ✅ Delete categories (with safety checks)
- ✅ Create new tools
- ✅ Edit existing tools
- ✅ Delete tools (with safety checks)
- ✅ Manage vendors

## 🆘 Still Having Issues?

If the problem persists:

1. **Check if you're logged in** as an admin user
2. **Verify your admin profile exists** in the `admin_profiles` table
3. **Ensure your user has `is_active = true`** in the admin profile
4. **Check Supabase logs** for detailed error messages

The fix should resolve the "405 Method Not Allowed" error and allow you to use the admin CRUD functionality!
