# FINAL FIX - Database URL Issue

## 🔴 THE PROBLEM

The DATABASE_URL in Vercel is **STILL using port 6543** (the broken one).

You have THREE database URL variables:
1. `DATABASE_URL` ← Using port 6543 (WRONG!)
2. `DATABASE_URL_NEW` ← Not being used by Prisma
3. `DATABASE_URL_DIRECT` ← Not being used by Prisma

Prisma only reads `DATABASE_URL` by default!

---

## ✅ THE FIX (Do This NOW)

### Step 1: Delete ALL Database URL Variables

1. Go to: https://vercel.com/kelvzzys-projects/great-delight-fastfood/settings/environment-variables

2. Find these 3 variables and **DELETE all of them**:
   - `DATABASE_URL` ← Delete (⋮ menu → Delete)
   - `DATABASE_URL_NEW` ← Delete
   - `DATABASE_URL_DIRECT` ← Delete

### Step 2: Add ONE Correct DATABASE_URL

Click "Add New" and enter:

**Key:**
```
DATABASE_URL
```

**Value:**
```
postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:5432/postgres?connection_limit=1
```

**Environment:** ✅ Production only

**Click Save**

### Step 3: Redeploy

After saving, run:
```bash
npx vercel --prod
```

---

## 🎯 Why This Will Work

**Current (Broken):**
- Prisma reads DATABASE_URL
- DATABASE_URL = port 6543
- Port 6543 doesn't work (requires paid add-on)
- ❌ Connection fails

**After Fix:**
- Prisma reads DATABASE_URL
- DATABASE_URL = port 5432
- Port 5432 works (direct connection)
- ✅ Connection succeeds!

---

## ⚡ Quick Alternative (If you prefer CLI)

I can do it via CLI, but you need to confirm:

```bash
# Remove old variables
npx vercel env rm DATABASE_URL production
npx vercel env rm DATABASE_URL_NEW production  
npx vercel env rm DATABASE_URL_DIRECT production

# Add correct one
echo "postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:5432/postgres?connection_limit=1" | npx vercel env add DATABASE_URL production

# Redeploy
npx vercel --prod
```

---

**This is the LAST issue!** Once DATABASE_URL uses port 5432, everything will work! 🚀

**Do you want me to do it via CLI, or will you do it in the dashboard?**
