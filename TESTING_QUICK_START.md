# TESTING QUICK START GUIDE

## 🚀 OPTION 1: Testing WITHOUT Database (UI Only)

If you don't have PostgreSQL installed, you can still test the UI:

### Step 1: Start Development Server
```bash
npm run dev
```

### Step 2: View Pages (will show UI, data won't load)
- Customer Menu: http://localhost:3000/menu/great-delight/main/table-01
- Admin Login: http://localhost:3000/admin/login

**Note:** Pages will load but data won't display without database.

---

## 🗄️ OPTION 2: Full Testing WITH Database

### Prerequisites:
You need PostgreSQL installed. Choose one:

**Option A: Install PostgreSQL Locally**
1. Download from: https://www.postgresql.org/download/windows/
2. Install with default settings
3. Remember the password you set for postgres user

**Option B: Use Docker (Recommended)**
1. Install Docker Desktop: https://www.docker.com/products/docker-desktop
2. Start Docker Desktop
3. Run: `docker-compose up -d postgres`

### Setup Steps:

#### 1. Start Database
If using Docker:
```bash
docker-compose up -d postgres
```

If using local PostgreSQL, ensure it's running and update `.env` with your password.

#### 2. Run Migrations
```bash
npx prisma migrate dev
```

#### 3. Seed Database
```bash
npx prisma db seed
```

#### 4. Verify Data
```bash
npx prisma studio
```
Opens a GUI at http://localhost:5555 to view database

#### 5. Start Application
```bash
npm run dev
```

---

## 📱 TESTING CHECKLIST

### Customer Flow (30 min):
- [ ] Navigate to: http://localhost:3000/menu/great-delight/main/table-01
- [ ] Click "Browse Menu"
- [ ] Select a category (e.g., "Soups")
- [ ] Add an item with variants to cart
- [ ] Add an item with options to cart
- [ ] View cart (should show 2 items)
- [ ] Proceed to checkout
- [ ] Fill in customer name (optional)
- [ ] Add special note
- [ ] Place order
- [ ] Note order number on confirmation page
- [ ] Wait 10 seconds, status should auto-refresh

**Expected Result:** Order created successfully

### Admin Flow (30 min):
- [ ] Navigate to: http://localhost:3000/admin/login
- [ ] Login with:
  - Email: admin@greatdelight.com
  - Password: admin123
- [ ] View dashboard (should show today's stats)
- [ ] Click "Orders"
- [ ] Find your test order
- [ ] Change status: New → Accepted → Preparing → Ready → Completed
- [ ] Click "Menu"
- [ ] Toggle availability of an item (OFF)
- [ ] Verify item doesn't show in customer view
- [ ] Toggle availability back (ON)
- [ ] Update price of an item
- [ ] Click "Tables"
- [ ] View all tables
- [ ] Toggle a table inactive
- [ ] Try to access that table as customer (should fail)

**Expected Result:** All admin functions work

### Mobile Testing (15 min):
- [ ] Open on iPhone/Android
- [ ] Test customer flow on mobile
- [ ] Check if buttons are tappable
- [ ] Check if text is readable
- [ ] Test both portrait and landscape
- [ ] Test admin on mobile (optional)

**Expected Result:** Usable on mobile devices

---

## 🐛 TROUBLESHOOTING

### Database Won't Connect
```bash
# Check if PostgreSQL is running
# Windows: Check Services for "postgresql"
# Or check Docker: docker ps

# If using Docker, start it:
docker-compose up -d postgres

# Wait 5 seconds, then try migration again
npx prisma migrate dev
```

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
# Windows:
netstat -ano | findstr :3000
# Note the PID, then:
taskkill /PID <PID> /F

# Then start again:
npm run dev
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Migration Errors
```bash
# Reset database (WARNING: Deletes all data)
npx prisma migrate reset

# Then re-seed
npx prisma db seed
```

---

## 🎯 QUICK COMMANDS

```bash
# Start everything
npm run dev              # Start app

# Database commands
npx prisma studio        # View database GUI
npx prisma db seed       # Seed menu data
npx prisma migrate reset # Reset database

# Build commands
npm run build            # Production build
npm run start            # Run production
npm test                # Run tests

# Check status
npx tsc --noEmit        # Check TypeScript
npm run lint            # Check code style
```

---

## 📊 TESTING STATUS TRACKER

Mark as you complete:

### Setup:
- [ ] Database running
- [ ] Migrations complete
- [ ] Data seeded
- [ ] Dev server started

### Customer Tests:
- [ ] Browse menu
- [ ] Add items to cart
- [ ] Checkout flow
- [ ] Order confirmation
- [ ] Order tracking

### Admin Tests:
- [ ] Login
- [ ] View orders
- [ ] Update order status
- [ ] Menu management
- [ ] Table management

### Mobile Tests:
- [ ] iPhone/Safari
- [ ] Android/Chrome
- [ ] Responsive layout

### Security Tests:
- [ ] Protected routes work
- [ ] Price manipulation blocked
- [ ] Duplicate orders blocked

---

## ✅ COMPLETION CRITERIA

Testing is complete when:
- ✅ Customer can place order end-to-end
- ✅ Admin can manage orders
- ✅ Mobile UX is acceptable
- ✅ No critical bugs found
- ✅ All security checks pass

**Time Required:** 2-3 hours total

**Next Step After Testing:** Deploy to staging
