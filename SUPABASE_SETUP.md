# SUPABASE DATABASE SETUP - QUICK GUIDE

## 🚀 SETUP STEPS (5 minutes)

### Step 1: Create New Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Fill in:
   - **Name:** `great-delight-ordering`
   - **Database Password:** (generate a strong one - SAVE THIS!)
   - **Region:** Choose closest to you
   - **Plan:** Free tier is perfect
4. Click "Create new project"
5. Wait 2-3 minutes for provisioning

### Step 2: Get Connection String
1. In your project dashboard, click "Settings" (gear icon)
2. Click "Database" in the sidebar
3. Scroll to "Connection String" section
4. Select "URI" tab (not "Session")
5. Copy the connection string (it looks like this):
   ```
   postgresql://postgres.[REF]:[YOUR-PASSWORD]@[HOST]:5432/postgres
   ```
6. **IMPORTANT:** Replace `[YOUR-PASSWORD]` with the actual password you created

### Step 3: Update .env File
Open `.env` file and replace the DATABASE_URL line:

```env
# OLD (local PostgreSQL):
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/great_delight_db?schema=public"

# NEW (Supabase):
DATABASE_URL="postgresql://postgres.[YOUR-REF]:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres?pgbouncer=true&connection_limit=1"
```

**Example:**
```env
DATABASE_URL="postgresql://postgres.abcdefgh:MyStr0ngP@ss!@db.abcdefgh.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
```

### Step 4: Run Migrations
```bash
# This creates all the tables
npx prisma migrate dev --name init
```

Expected output:
```
✔ Your database is now in sync with your schema.
✔ Generated Prisma Client
```

### Step 5: Seed Database
```bash
# This adds all menu items, tables, and admin user
npx prisma db seed
```

Expected output:
```
🌱 Starting database seed...
✓ Restaurant created: GREAT DELIGHT
✓ Branch created: Main Branch
✓ Created 20 tables
✓ Admin user created: admin@greatdelight.com
✓ Created 5 categories
✓ Created soup items
✓ Created rice & combo items
✓ Created quick meal items
✓ Created pepper soup items
✓ Created protein items
✅ Database seed completed successfully!
```

### Step 6: Verify Data
```bash
# Open Prisma Studio to view data
npx prisma studio
```

Opens http://localhost:5555 - you should see:
- Restaurant (1 row)
- Branch (1 row)
- Table (20 rows)
- MenuCategory (5 rows)
- MenuItem (26 rows)
- MenuVariant (60+ rows)
- User (1 admin user)

### Step 7: Test the App
The dev server is already running at http://localhost:3000

1. **Test Customer Flow:**
   - Go to: http://localhost:3000/menu/great-delight/main/table-01
   - Click "Browse Menu"
   - You should see categories and menu items!

2. **Test Admin Login:**
   - Go to: http://localhost:3000/admin/login
   - Email: `admin@greatdelight.com`
   - Password: `admin123`
   - You should see the dashboard!

---

## ✅ SUCCESS CHECKLIST

- [ ] Supabase project created
- [ ] Connection string copied
- [ ] `.env` file updated
- [ ] Migrations run successfully
- [ ] Database seeded successfully
- [ ] Prisma Studio shows data
- [ ] Customer menu loads items
- [ ] Admin login works

---

## 🐛 TROUBLESHOOTING

### Migration Fails
```bash
# Error: Can't reach database server

# Check:
1. Is the connection string correct in .env?
2. Did you replace [YOUR-PASSWORD] with actual password?
3. Is there a space or typo in the connection string?

# Try:
npx prisma migrate dev --name init
```

### Seed Fails
```bash
# Error: Table doesn't exist

# This means migrations didn't run
# Solution:
npx prisma migrate dev --name init
npx prisma db seed
```

### Connection Pooling Issues
If you get "too many connections" error, use this connection string format:

```env
# Direct connection (for migrations):
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@[HOST]:5432/postgres"

# Pooled connection (for app):
DATABASE_URL="postgresql://postgres.[REF]:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
```

For this project, use **port 5432** (direct connection).

---

## 📝 AFTER SETUP

Once database is connected, you can:

1. **Browse Menu as Customer**
   - http://localhost:3000/menu/great-delight/main/table-01
   - See all 26 menu items
   - Add items to cart
   - Place orders

2. **Manage Orders as Admin**
   - http://localhost:3000/admin/login
   - View incoming orders
   - Update order status
   - Toggle menu availability
   - Update prices

3. **View Database**
   - Run `npx prisma studio`
   - See all data in browser GUI
   - Edit data manually if needed

---

## 🎯 QUICK REFERENCE

### Commands:
```bash
# View data
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Re-seed data
npx prisma db seed

# Generate Prisma Client (if needed)
npx prisma generate
```

### Credentials:
- **Admin Email:** admin@greatdelight.com
- **Admin Password:** admin123
- **Tables:** TABLE 01 through TABLE 20

### URLs:
- **Home:** http://localhost:3000
- **Customer Menu:** http://localhost:3000/menu/great-delight/main/table-[01-20]
- **Admin:** http://localhost:3000/admin/login
- **Prisma Studio:** http://localhost:5555

---

## ⏱️ ESTIMATED TIME

- Create Supabase project: 3 minutes
- Copy connection string: 1 minute
- Update .env: 1 minute
- Run migrations: 30 seconds
- Seed database: 30 seconds
- Verify & test: 2 minutes

**Total: ~5-7 minutes**

---

## 🎉 NEXT STEPS AFTER SETUP

Once database is connected and working:

1. ✅ **Complete Testing** (use TESTING_GUIDE.md)
   - Customer flow
   - Admin flow
   - Mobile testing

2. ✅ **Polish & Fixes** (if needed)
   - UI improvements
   - Bug fixes
   - Performance optimization

3. ✅ **Deploy to Production**
   - Choose hosting (Vercel, Railway, etc.)
   - Set environment variables
   - Deploy!

---

**Ready to start?** 
1. Create your Supabase project
2. Come back with the connection string
3. We'll update .env and run the setup commands

**Status:** Waiting for Supabase connection string 🚀
