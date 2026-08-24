# SUPABASE CONNECTION TROUBLESHOOTING

## 🔍 Current Issue

**Error:** "Can't reach database server"

This usually means one of these:

### 1. Project Still Provisioning (Most Common) ⏱️
Supabase takes 2-3 minutes to fully set up a new project.

**Solution:**
- Wait 2-3 minutes
- Check Supabase dashboard - look for "Project is ready" message
- Green checkmark should appear next to project name

### 2. Wrong Connection String Format 🔧

**Check in Supabase Dashboard:**
1. Go to your project: https://supabase.com/dashboard/project/npdrepregviourpqugmz
2. Click **Settings** (gear icon)
3. Click **Database** 
4. Scroll to **Connection String**
5. Make sure you're using the **Transaction** or **Session** mode (not Pgbouncer for migrations)

**Two types of connection strings:**

**A) Direct Connection (for migrations)** - Use this one:
```
postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:5432/postgres
```

**B) Pooled Connection (for app)** - Don't use for migrations:
```
postgresql://postgres.[REF]:[PASSWORD]@db.[REF].supabase.co:6543/postgres?pgbouncer=true
```

### 3. Firewall/Network Issue 🔒

**Check:**
- Are you behind a corporate firewall?
- Is your antivirus blocking connections?
- Try disabling VPN temporarily

### 4. Password Has Special Characters 🔑

If your password has special characters, they need URL encoding:

```
@ = %40
! = %21
# = %23
$ = %24
% = %25
^ = %5E
& = %26
* = %2A
```

**Example:**
```
Password: MyP@ss!
Encoded: MyP%40ss%21
```

---

## ✅ WHAT TO DO NOW

### Step 1: Verify Supabase Project Status
1. Go to https://supabase.com/dashboard
2. Open your `great-delight-ordering` project
3. Check if it shows **"Project is ready"**
4. Look for green checkmark

### Step 2: Get the Correct Connection String
1. In project dashboard: **Settings → Database**
2. Find "Connection String" section
3. Select **"URI"** tab (not "Postgres" or "JDBC")
4. **Mode:** Select "Transaction" or "Session" (NOT "Pgbouncer")
5. Copy the string
6. Replace `[YOUR-PASSWORD]` with: `3rtVSGgKOlQ0VvqA`

### Step 3: Let Me Know
Once you have the correct connection string, paste it here and I'll update the .env and try again.

---

## 🔍 HOW TO FIND YOUR CONNECTION STRING

**Navigate to:**
```
Supabase Dashboard → Your Project → Settings (⚙️) → Database
```

**Look for:**
- Section titled "Connection String"
- Tab options: URI / Postgres / JDBC
- Mode dropdown: Transaction / Session / Pgbouncer

**Copy the URI format, Transaction mode**

**It should look like:**
```
postgresql://postgres.[REF]:[YOUR-PASSWORD]@db.[REF].supabase.co:5432/postgres
```

**Replace `[YOUR-PASSWORD]` with actual password**

---

## 🎯 ALTERNATIVE: Use Supabase Direct Link

In your Supabase dashboard, you can also:

1. Click **"Database"** in left sidebar
2. You'll see connection details directly
3. Use the **Connection String** shown there

---

## 📞 QUICK CHECK

Can you confirm:
- [ ] Supabase project is fully provisioned (shows "ready")?
- [ ] Using correct connection string format?
- [ ] Password is correctly entered (with URL encoding if needed)?
- [ ] Not behind corporate firewall?

---

## 🚀 ONCE CONNECTED

After we get connected, we'll run:

```bash
# 1. Create tables
npx prisma migrate dev --name init

# 2. Seed data
npx prisma db seed

# 3. View data
npx prisma studio

# 4. Test app
# Visit http://localhost:3000
```

---

**Current Status:** Waiting for Supabase project to be ready

**What to check:**
1. Is project fully provisioned? (check dashboard)
2. Using correct connection string format?
3. Password correct?

Let me know when the project shows "ready" and we'll try again! 🚀
