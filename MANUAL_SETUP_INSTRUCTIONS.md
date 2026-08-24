# MANUAL SUPABASE SETUP (Using SQL Editor)

## 🎯 QUICK SOLUTION - Run SQL Directly in Supabase

Since we're having connection issues from your machine, let's set up the database directly in Supabase SQL Editor!

---

## ✅ STEP 1: Run Database Setup SQL

1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/npdrepregviourpqugmz

2. Click **"SQL Editor"** in the left sidebar

3. Click **"New Query"**

4. **Copy and paste the entire `setup.sql` file** (it's in your project root folder)

5. Click **"Run"** (or press Ctrl+Enter)

6. You should see: **"Success. No rows returned"**

✅ This creates all 15 tables with proper relationships!

---

## ✅ STEP 2: Run Data Seed SQL

Now we need to add the menu data. I'll generate this for you.

**In the same SQL Editor, run this seed script:**

```sql
-- Will be generated in next step
```

---

## 🎯 ALTERNATIVE: Use Prisma Studio Through Supabase

If the SQL approach works but you want a GUI, you can:

1. Open **Supabase Dashboard → Database → Tables**
2. You'll see all the tables created
3. Click on any table to add/edit data manually

---

## 🚀 WHAT WE'LL DO

Since connection from your machine isn't working, let's:

1. ✅ Run `setup.sql` in Supabase SQL Editor (YOU DO THIS)
2. ✅ I'll generate the seed data SQL
3. ✅ You run that in SQL Editor too
4. ✅ Then test the app at http://localhost:3000

The app will connect fine - it's just Prisma CLI having issues!

---

**Ready?** 

Go to your Supabase SQL Editor and run the `setup.sql` file, then let me know when it's done! 🚀
