# Setup Environment Variables for New Vercel Deployment

## 🎯 Quick Setup Guide

Your new deployment needs environment variables configured!

---

## 📋 Step 1: Go to Vercel Dashboard

Visit: **https://vercel.com/kelvzzys-projects/great-delight-fastfood/settings/environment-variables**

Or:
1. Go to https://vercel.com/kelvzzys-projects/great-delight-fastfood
2. Click "Settings" tab
3. Click "Environment Variables" in left sidebar

---

## 📝 Step 2: Add These Environment Variables

Copy and paste each variable (one at a time):

### 1. DATABASE_URL (Production - using pgbouncer port 6543)
```
DATABASE_URL
```
**Value:**
```
postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:6543/postgres?pgbouncer=true
```
**Environment:** Production ✅

---

### 2. NEXTAUTH_SECRET
```
NEXTAUTH_SECRET
```
**Value:**
```
your-secret-key-min-32-characters-long-change-in-production
```
**Environment:** Production ✅

---

### 3. NEXTAUTH_URL
```
NEXTAUTH_URL
```
**Value:**
```
https://great-delight-fastfood.vercel.app
```
**Environment:** Production ✅

---

### 4. NEXT_PUBLIC_APP_URL
```
NEXT_PUBLIC_APP_URL
```
**Value:**
```
https://great-delight-fastfood.vercel.app
```
**Environment:** Production ✅

---

### 5. NEXT_PUBLIC_APP_NAME
```
NEXT_PUBLIC_APP_NAME
```
**Value:**
```
GREAT DELIGHT
```
**Environment:** Production ✅

---

### 6. NEXT_PUBLIC_RESTAURANT_SLUG
```
NEXT_PUBLIC_RESTAURANT_SLUG
```
**Value:**
```
great-delight
```
**Environment:** Production ✅

---

### 7. NEXT_PUBLIC_MAIN_BRANCH_SLUG
```
NEXT_PUBLIC_MAIN_BRANCH_SLUG
```
**Value:**
```
main
```
**Environment:** Production ✅

---

### 8. NODE_ENV
```
NODE_ENV
```
**Value:**
```
production
```
**Environment:** Production ✅

---

## 🚀 Step 3: Redeploy After Adding Variables

After adding all environment variables, redeploy:

**Option A: Via Dashboard**
1. Go to: https://vercel.com/kelvzzys-projects/great-delight-fastfood
2. Click "Deployments" tab
3. Click the three dots (⋮) on the latest deployment
4. Click "Redeploy"

**Option B: Via CLI (Recommended)**
Run this command:
```bash
npx vercel --prod
```

---

## ✅ Step 4: Test the Deployment

After redeployment completes (~2-3 minutes), test:

### Test URLs:

**Customer Menu:**
```
https://great-delight-fastfood.vercel.app/menu/great-delight/main/table-01
```

**Admin Login:**
```
https://great-delight-fastfood.vercel.app/admin/login
```
- Email: `admin@greatdelight.com`
- Password: `admin123`

**Menu API:**
```
https://great-delight-fastfood.vercel.app/api/menu?restaurant=great-delight&branch=main
```

---

## 🔍 Important Notes

### Port Configuration:
- **Local Development:** Uses port 5432 (direct Postgres connection)
- **Production (Vercel):** Uses port 6543 (pgbouncer for connection pooling)

### Why pgbouncer?
Serverless functions (like Vercel) create many database connections. Pgbouncer pools these connections to prevent exhausting database connection limits.

### Environment Variable Format:
All environment variables should be set for **Production** environment only (free tier doesn't need Preview or Development).

---

## 📊 Summary

Total environment variables to add: **8**

1. ✅ DATABASE_URL (with pgbouncer)
2. ✅ NEXTAUTH_SECRET
3. ✅ NEXTAUTH_URL
4. ✅ NEXT_PUBLIC_APP_URL
5. ✅ NEXT_PUBLIC_APP_NAME
6. ✅ NEXT_PUBLIC_RESTAURANT_SLUG
7. ✅ NEXT_PUBLIC_MAIN_BRANCH_SLUG
8. ✅ NODE_ENV

After adding these and redeploying, everything should work! 🎉

---

**Need help?** Let me know which step you're on!
