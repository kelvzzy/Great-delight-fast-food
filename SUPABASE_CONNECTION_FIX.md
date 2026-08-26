# Supabase Connection Issue - SOLUTION

## 🔴 Problem Identified

Vercel **CANNOT** connect to your Supabase database at port 6543 (pgbouncer).

**Error from Vercel logs:**
```
Can't reach database server at `db.npdrepregviourpqugmz.supabase.co:6543`
```

## 💡 Root Cause

Supabase's connection pooler (port 6543) requires:
1. **IPv4 add-on** (paid feature)
2. OR use the **Transaction mode pooler** URL format
3. OR use **direct connection** (port 5432) with connection limit settings

## ✅ SOLUTION: Use Supabase Transaction Pooler

Supabase has a **FREE transaction pooler** that works with Vercel!

### Step 1: Get Your Connection Pooler URL

1. Go to: https://supabase.com/dashboard/project/npdrepregviourpqugmz/settings/database
2. Look for **"Connection string"** section
3. Select **"Connection pooling"** tab
4. Copy the **"Transaction"** mode connection string

It should look like:
```
postgresql://postgres.npdrepregviourpqugmz:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

Notice the difference:
- ❌ Old: `db.npdrepregviourpqugmz.supabase.co:6543`
- ✅ New: `aws-0-us-east-1.pooler.supabase.com:6543`

### Step 2: Update DATABASE_URL in Vercel

The connection pooler URL format is:
```
postgresql://postgres.npdrepregviourpqugmz:HhheKUYqVPv0GYGJ@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

---

## 🚀 Quick Fix Options

### Option A: Use Direct Connection (Simpler, Works Now)

Use port 5432 with proper connection limits:

**New DATABASE_URL:**
```
postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1
```

**To update:**
1. Go to Vercel: https://vercel.com/kelvzzys-projects/great-delight-fastfood/settings/environment-variables
2. Find `DATABASE_URL`
3. Click "Edit"
4. Replace value with the new URL above
5. Save
6. Redeploy

---

### Option B: Use Supabase Pooler (Better for Production)

1. Go to Supabase dashboard
2. Get the Transaction pooler URL
3. Update in Vercel with that URL
4. Redeploy

---

## 🎯 I'll Update It Now via CLI

Let me update the DATABASE_URL to use the direct connection with proper settings...
