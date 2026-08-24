# CONNECTION DEBUG STEPS

## 🔍 The Issue

Your Supabase project shows **healthy** but we can't connect from Prisma.

This suggests the connection string might need a small adjustment.

---

## ✅ PLEASE CHECK IN SUPABASE:

### Step 1: Get the Correct Connection String

1. Go to your project: https://supabase.com/dashboard/project/npdrepregviourpqugmz

2. Click **"Settings"** (gear icon on left sidebar)

3. Click **"Database"**

4. Scroll down to **"Connection String"** section

5. You'll see tabs like: **URI** | **Postgres** | **JDBC**

6. Click **"URI"**

7. **IMPORTANT:** Look for a dropdown that says **"Mode"**
   - Options might be: Transaction, Session, Pgbouncer
   - **Select "Transaction"** (this is important!)

8. You should see a connection string like:
   ```
   postgresql://postgres.[REF]:[YOUR-PASSWORD]@db.[REF].supabase.co:5432/postgres
   ```

9. **Copy that entire string**

10. **Replace `[YOUR-PASSWORD]`** with: `3rtVSGgKOlQ0VvqA`

---

## 🎯 WHAT TO LOOK FOR

The connection string should have:
- Username: `postgres`
- Host: `db.npdrepregviourpqugmz.supabase.co`
- Port: `5432` (for direct) or `6543` (for pooled)
- Database: `postgres`

**Format should be:**
```
postgresql://postgres:3rtVSGgKOlQ0VvqA@db.npdrepregviourpqugmz.supabase.co:5432/postgres
```

---

## 🔧 ALTERNATIVE SOLUTION

If the connection string format is definitely correct, it might be:

### 1. IPv6 vs IPv4 Issue
Sometimes Windows has issues with IPv6. Try adding this to the connection string:
```
?sslmode=require&sslaccept=accept_invalid_certs
```

### 2. Firewall/Antivirus
- Try temporarily disabling Windows Firewall
- Try temporarily disabling antivirus
- Try from a different network (mobile hotspot)

### 3. Use Supabase's Connection Pooler
Instead of direct connection (port 5432), use pooler (port 6543):
```
postgresql://postgres:3rtVSGgKOlQ0VvqA@db.npdrepregviourpqugmz.supabase.co:6543/postgres?pgbouncer=true
```

**Note:** `prisma db push` should work with pooler for initial setup.

---

## 📋 QUICK TEST

Can you try this in Supabase dashboard:

1. Go to **SQL Editor** (in left sidebar)
2. Run this query:
   ```sql
   SELECT version();
   ```
3. If it works, your database is definitely ready
4. The issue is just the connection string format

---

## 🚀 ONCE WE GET CONNECTED

We'll run:
```bash
npx prisma db push       # Creates tables
npx prisma db seed       # Adds menu data
npx prisma studio        # View data
```

Then test at http://localhost:3000

---

**Please paste the exact connection string you see in Supabase Dashboard → Settings → Database → Connection String (URI format)**

I'll verify it and make any needed adjustments!
