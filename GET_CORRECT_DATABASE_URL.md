# Get Correct Supabase Connection String

## 🎯 We Need the RIGHT Connection String

Your Supabase database exists, but we're using the wrong connection URL format.

---

## 📋 Step-by-Step: Get the Correct URL

### 1. Go to Your Supabase Project
Visit: https://supabase.com/dashboard/project/npdrepregviourpqugmz

### 2. Navigate to Database Settings
- Click **"Project Settings"** (gear icon) in left sidebar
- Click **"Database"** 

### 3. Find "Connection String" Section
Scroll down to find **"Connection string"** or **"Connection pooling"**

### 4. Look for These Tabs/Options:

You should see tabs like:
- **URI** (direct connection)
- **Transaction** (pooling mode) ← **USE THIS ONE**
- **Session** (pooling mode)

### 5. Copy the TRANSACTION Mode URL

It should look like ONE of these formats:

**Format 1 (Pooler):**
```
postgresql://postgres.npdrepregviourpqugmz:[YOUR-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Format 2 (Direct with SSL):**
```
postgresql://postgres:[YOUR-PASSWORD]@db.npdrepregviourpqugmz.supabase.co:5432/postgres
```

### 6. Replace `[YOUR-PASSWORD]` with:
```
HhheKUYqVPv0GYGJ
```

---

## 🔍 What to Look For

**Copy EXACTLY what you see in the Supabase dashboard.**

**Tell me which format you see:**

**Option A - Pooler URL (contains "pooler.supabase.com"):**
```
postgresql://postgres.npdrepregviourpqugmz:HhheKUYqVPv0GYGJ@aws-0-us-east-1.pooler.supabase.com:6543/postgres
```

**Option B - Direct URL (contains "db.npdrepregviourpqugmz.supabase.co"):**
```
postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:5432/postgres
```

---

## 🚀 Alternative: I'll Try Both

Let me try updating with both formats and see which works...

Actually, **can you do this quick check:**

1. Go to your Supabase dashboard
2. Look at the top of the page - is your project showing as **"Active"** or **"Healthy"**?
3. In Database settings, do you see **"Connection pooling"** section?
4. If yes, what URLs are shown there?

**Copy and paste the EXACT connection string you see in Supabase!**

---

## 🆘 Quick Alternative Fix

If you're unsure, we can try the **direct connection** which usually works:

```
postgresql://postgres:HhheKUYqVPv0GYGJ@db.npdrepregviourpqugmz.supabase.co:5432/postgres?connection_limit=1
```

This bypasses the pooler and connects directly (with a connection limit to prevent exhaustion).

**Tell me what you see in Supabase and I'll update it correctly!**
