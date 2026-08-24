# QUICK FIXES FOR TESTING

## 🔧 FIX 1: Admin Password (Run in Supabase SQL Editor)

**Copy and run this SQL:**

```sql
UPDATE users 
SET password_hash = '$2a$12$JAc7RLe3dvrMBgulcQKBbOFPqUBsJHIE.Pu5zf8VuEQ/y3NA2wXj2'
WHERE email = 'admin@greatdelight.com';
```

**Then try logging in again:**
- Email: `admin@greatdelight.com`
- Password: `admin123`

---

## 🔧 FIX 2: 404 Error on Menu Page

The dev server has been restarted to pick up the database connection.

**Wait 10-15 seconds** for the server to fully start, then try again:
- http://localhost:3000/menu/great-delight/main/table-01

---

## ✅ VERIFICATION STEPS

### 1. Check Database Connection
Run this SQL in Supabase to verify data:

```sql
-- Check if data exists
SELECT 
    (SELECT COUNT(*) FROM restaurants) as restaurants,
    (SELECT COUNT(*) FROM branches) as branches,
    (SELECT COUNT(*) FROM tables) as tables,
    (SELECT COUNT(*) FROM users) as users,
    (SELECT COUNT(*) FROM menu_categories) as categories,
    (SELECT COUNT(*) FROM menu_items) as menu_items,
    (SELECT COUNT(*) FROM menu_variants) as variants;
```

Expected output:
- restaurants: 1
- branches: 1
- tables: 20
- users: 1
- categories: 5
- menu_items: 25-26
- variants: 60+

### 2. Check Admin User
```sql
SELECT email, first_name, last_name, role, active 
FROM users 
WHERE email = 'admin@greatdelight.com';
```

Should show:
- Email: admin@greatdelight.com
- First Name: Admin
- Role: RESTAURANT_ADMIN
- Active: true

### 3. Check Restaurant & Branch
```sql
SELECT r.name as restaurant, r.slug as restaurant_slug,
       b.name as branch, b.slug as branch_slug
FROM restaurants r
JOIN branches b ON b.restaurant_id = r.id;
```

Should show:
- restaurant: GREAT DELIGHT
- restaurant_slug: great-delight
- branch: Main Branch
- branch_slug: main

### 4. Check Tables
```sql
SELECT name, slug, active 
FROM tables 
WHERE branch_id IN (SELECT id FROM branches WHERE slug = 'main')
ORDER BY sort_order
LIMIT 5;
```

Should show: TABLE 01, TABLE 02, TABLE 03, TABLE 04, TABLE 05

---

## 🎯 TESTING CHECKLIST

Once fixes are applied:

### Test Home Page
- [ ] Go to: http://localhost:3000
- [ ] Should see "GREAT DELIGHT" homepage
- [ ] Click "View Demo Menu" button

### Test Customer Menu
- [ ] Go to: http://localhost:3000/menu/great-delight/main/table-01
- [ ] Should see categories (not 404)
- [ ] Click on a category (e.g., "Soups")
- [ ] Should see menu items load
- [ ] Click "Add to Cart" on an item
- [ ] Should see variants/options modal

### Test Admin Login
- [ ] Go to: http://localhost:3000/admin/login
- [ ] Email: admin@greatdelight.com
- [ ] Password: admin123
- [ ] Should login successfully
- [ ] Should see dashboard with stats

---

## 🐛 IF STILL NOT WORKING

### Issue: 404 on Menu Page

**Check in browser console (F12):**
- Are there any API errors?
- Check Network tab for failed requests

**Check server console:**
```bash
# Look at the terminal where dev server is running
# Look for any database connection errors
```

**Possible causes:**
1. Dev server not fully started (wait 15 seconds)
2. Database connection string wrong
3. Prisma Client not generated

**Try regenerating Prisma Client:**
```bash
npx prisma generate
```

Then restart dev server.

### Issue: Admin Password Still Wrong

**Option 1: Reset password directly in Supabase**
1. Go to Supabase Dashboard → Database → Tables
2. Click on `users` table
3. Find admin@greatdelight.com row
4. Click edit
5. Replace `password_hash` with:
   ```
   $2a$12$JAc7RLe3dvrMBgulcQKBbOFPqUBsJHIE.Pu5zf8VuEQ/y3NA2wXj2
   ```
6. Save

**Option 2: Create new admin user**
Run this SQL:
```sql
DELETE FROM users WHERE email = 'admin@greatdelight.com';

INSERT INTO users (id, email, password_hash, first_name, last_name, role, restaurant_id, branch_id, active, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    'admin@greatdelight.com',
    '$2a$12$JAc7RLe3dvrMBgulcQKBbOFPqUBsJHIE.Pu5zf8VuEQ/y3NA2wXj2',
    'Admin',
    'User',
    'RESTAURANT_ADMIN',
    id,
    (SELECT id FROM branches WHERE restaurant_id = restaurants.id LIMIT 1),
    true,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM restaurants
WHERE slug = 'great-delight';
```

---

## 🎉 SUCCESS INDICATORS

You'll know it's working when:
- ✅ Home page loads at http://localhost:3000
- ✅ Menu page loads (no 404) at http://localhost:3000/menu/great-delight/main/table-01
- ✅ Categories and items visible
- ✅ Admin login works with admin@greatdelight.com / admin123
- ✅ Dashboard shows stats

---

**Current Actions:**
1. Run `fix-admin-password.sql` in Supabase SQL Editor
2. Wait 10 seconds for dev server to fully start
3. Try menu page again: http://localhost:3000/menu/great-delight/main/table-01
4. Try admin login again: http://localhost:3000/admin/login

Let me know the results! 🚀
