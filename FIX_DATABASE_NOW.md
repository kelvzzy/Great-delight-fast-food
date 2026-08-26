# Fix Database Connection NOW - Simple Steps

## 🎯 The Problem
The DATABASE_URL in Vercel is wrong. It's trying to connect to port 6543 which doesn't work.

## ✅ The Solution
Update DATABASE_URL to use the **direct connection** on port 5432.

---

## 📋 STEPS TO FIX (5 minutes)

### Step 1: Go to Vercel Environment Variables
Click this link:
```
https://vercel.com/kelvzzys-projects/great-delight-fastfood/settings/environment-variables
```

### Step 2: Find DATABASE_URL
Scroll down and find the row that says **`DATABASE_URL`**

### Step 3: Click "Edit" (pencil icon)

### Step 4: Replace the Value
**Delete the current value** and paste this NEW value:

```
postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:5432/postgres?connection_limit=1
```

**Key Changes:**
- Port changed from `:6543` to `:5432` ← This is the key fix!
- Added `?connection_limit=1` ← Prevents connection exhaustion

### Step 5: Click "Save"

### Step 6: Redeploy
After saving, run this command to redeploy:

```bash
npx vercel --prod
```

Or use the Vercel dashboard:
1. Go to: https://vercel.com/kelvzzys-projects/great-delight-fastfood
2. Click "Deployments" tab
3. Click ⋮ (three dots) on latest deployment
4. Click "Redeploy"

---

## 🧪 After Redeployment (wait 2-3 minutes)

Test these URLs:

**1. Menu API:**
```
https://great-delight-fastfood.vercel.app/api/menu?restaurant=great-delight&branch=main
```
Should return JSON with menu items!

**2. Customer Menu:**
```
https://great-delight-fastfood.vercel.app/menu/great-delight/main/table-01
```
Should show the menu page!

---

## 🔍 Why This Works

**Port 6543 (pgbouncer):**
- Requires IPv4 add-on (paid feature on Supabase)
- OR specific pooler URL format
- **Your current setup doesn't support it**

**Port 5432 (direct connection):**
- Works on all Supabase plans (including free)
- Direct PostgreSQL connection
- With `connection_limit=1`, prevents serverless connection exhaustion
- **This is the standard approach for serverless**

---

## 🚀 DO THIS NOW:

1. Open Vercel environment variables page
2. Edit DATABASE_URL
3. Change port from 6543 to 5432
4. Add `?connection_limit=1` at the end
5. Save
6. Redeploy

**New DATABASE_URL (copy this exactly):**
```
postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:5432/postgres?connection_limit=1
```

**Let me know when you've updated it and redeployed!** 🎯
