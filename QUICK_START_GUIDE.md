# 🚀 QUICK START GUIDE

## Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env and set:
# - DATABASE_URL (PostgreSQL connection)
# - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
```

### Step 3: Start Database
```bash
# Option A: Use Docker
npm run docker:up

# Option B: Use your local PostgreSQL
# Just ensure DATABASE_URL in .env points to it
```

### Step 4: Setup Database
```bash
# Run migrations
npx prisma migrate dev --name init

# Seed database with GREAT DELIGHT menu
npm run prisma:seed
```

### Step 5: Start Development Server
```bash
npm run dev
```

Visit **http://localhost:3000**

---

## ✅ What's Working Right Now

### Backend (100% Complete)
- ✅ Database with complete menu
- ✅ All API endpoints functional
- ✅ Authentication ready
- ✅ Business logic services
- ✅ Order processing
- ✅ Price calculations
- ✅ QR code generation (backend)

### Test the APIs

**Get Menu:**
```bash
curl "http://localhost:3000/api/menu?restaurant=great-delight&branch=main"
```

**Get Table:**
```bash
curl "http://localhost:3000/api/table?restaurant=great-delight&branch=main&table=table-01"
```

**Create Order:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "branchId": "<BRANCH_ID>",
    "tableId": "<TABLE_ID>",
    "customerName": "John Doe",
    "items": [
      {
        "menuItemId": "<ITEM_ID>",
        "quantity": 2
      }
    ]
  }'
```

---

## 🛠️ What Needs Building

### Priority 1: Customer Menu Page

**File:** `src/app/menu/[restaurant]/[branch]/[table]/page.tsx`

**What it needs:**
1. Fetch menu from API
2. Display categories
3. Show menu items with prices
4. Variant selection (if applicable)
5. Option selection (if applicable)
6. Add to cart button
7. Cart summary (fixed bottom bar)
8. Checkout flow

**Example starter code:**
```typescript
// src/app/menu/[restaurant]/[branch]/[table]/page.tsx
export default async function MenuPage({ params }: { 
  params: { restaurant: string; branch: string; table: string } 
}) {
  // Fetch menu
  const menuRes = await fetch(
    `http://localhost:3000/api/menu?restaurant=${params.restaurant}&branch=${params.branch}`,
    { cache: 'no-store' }
  );
  const menu = await menuRes.json();

  // Fetch table
  const tableRes = await fetch(
    `http://localhost:3000/api/table?restaurant=${params.restaurant}&branch=${params.branch}&table=${params.table}`,
    { cache: 'no-store' }
  );
  const table = await tableRes.json();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="px-4 py-4">
          <h1 className="text-2xl font-bold">{menu.restaurant.name}</h1>
          <p className="text-sm text-gray-600">{table.name}</p>
        </div>
      </header>

      <main className="pb-24">
        {menu.menuCategories.map((category) => (
          <section key={category.id} className="p-4">
            <h2 className="text-xl font-bold mb-4">{category.name}</h2>
            <div className="space-y-4">
              {category.menuItems.map((item) => (
                <div key={item.id} className="bg-white rounded-lg p-4 shadow">
                  <h3 className="font-semibold">{item.name}</h3>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                  {/* Add price display, variants, options, add to cart button */}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Fixed bottom cart summary */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold">
          View Cart (0 items)
        </button>
      </div>
    </div>
  );
}
```

### Priority 2: Admin Dashboard

**File:** `src/app/admin/dashboard/page.tsx`

**What it needs:**
1. Require authentication
2. Fetch today's stats from `/api/admin/stats`
3. Fetch orders from `/api/admin/orders`
4. Display order cards
5. Status update buttons
6. Real-time updates (polling or SSE)

---

## 📦 Database Content

After seeding, you'll have:

### Restaurant
- **Name:** GREAT DELIGHT
- **Slug:** great-delight

### Branch
- **Name:** Main Branch
- **Slug:** main

### Tables
- TABLE 01 - TABLE 20 (20 tables)

### Menu Categories
1. **Soups** (8 items)
   - White Soup, Chicken Breast White Soup, Ogbono, Okra, Afang, Oha/Butter Leaf, Vegetable, Ewedu with Gbegiri

2. **Rice & Combos** (7 items)
   - Jollof Rice, Fried Rice, Fried Rice Full Combo, White Rice & Stew, White Rice Full Combo, White Rice Mini Combo, Red Oil Rice

3. **Quick Meals** (6 items)
   - Yam & Egg Sauce, Yam Porridge, Porridge Beans, Spaghetti, Noodles, Moi Moi

4. **Pepper Soup** (3 items)
   - Assorted Pepper Soup, Goat Meat Pepper Soup, Catfish Pepper Soup (with variants: Full, Middle, Head, Tail)

5. **Proteins** (1 item)
   - Peppered Meat (Beef/Goat variants)

### Admin User
- **Email:** admin@greatdelight.com
- **Password:** admin123

---

## 🔍 Debug & Testing

### Check Database Content
```bash
# Open Prisma Studio
npm run prisma:studio
```

### Check TypeScript Errors
```bash
npm run type-check
```

### Check Linting
```bash
npm run lint
```

### View Logs
```bash
# Docker logs
npm run docker:logs
```

---

## 🎨 UI Development Tips

### Use Tailwind Classes for GREAT DELIGHT Brand

**Colors:**
- Primary (warm brown): `bg-primary-600`, `text-primary-700`
- Accent (orange): `bg-accent-500`, `text-accent-600`
- Text: `text-gray-900` (headings), `text-gray-600` (body)

**Components to Build:**
1. **MenuItemCard** - Display food items
2. **CartButton** - Fixed bottom cart summary
3. **OrderCard** - For admin dashboard
4. **StatusBadge** - Order status indicators
5. **PriceTag** - Formatted Naira display (use `formatNaira()`)

### Key Utilities Available

```typescript
import { formatNaira, toKobo, toNaira } from '@/lib/utils';

// Format price
formatNaira(700000); // "₦7,000"

// Convert prices
const kobo = toKobo(7000); // 700000
const naira = toNaira(700000); // 7000
```

---

## 🐛 Common Issues & Solutions

### Issue: Database connection error
**Solution:** Ensure PostgreSQL is running and DATABASE_URL is correct

### Issue: NextAuth error
**Solution:** Ensure NEXTAUTH_SECRET is set (min 32 characters)

### Issue: Prisma Client not found
**Solution:** Run `npx prisma generate`

### Issue: Seed fails
**Solution:** Reset database with `npm run prisma:reset` and try again

---

## 📚 Resources

### Project Files
- **Prisma Schema:** `prisma/schema.prisma`
- **Seed Data:** `prisma/seed.ts`
- **Services:** `src/services/`
- **API Routes:** `src/app/api/`
- **Validation:** `src/lib/validations/`

### External Docs
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [NextAuth.js](https://next-auth.js.org)

---

## 🎯 Focus Areas

**If you have 2 hours:**
1. Build basic menu page
2. Add to cart (use React state)
3. Simple order submission

**If you have 4 hours:**
1. Complete menu page with variants/options
2. Full cart implementation
3. Order confirmation page
4. Basic admin login and order dashboard

**If you have 8 hours:**
1. Full customer flow
2. Complete admin dashboard
3. Real-time order updates
4. Menu management UI

---

## 🚢 Production Checklist

Before deploying:
- [ ] Change admin password
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Configure production DATABASE_URL
- [ ] Set NEXTAUTH_URL to production domain
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure CORS
- [ ] Add rate limiting
- [ ] Set up monitoring

---

## 💬 Need Help?

**Technology Provider:** Do'r Stack Software Solutions (DSSS)

**Status:** Backend 100% complete, Frontend implementation in progress

The foundation is solid. Focus on building the UI that connects to the existing APIs.
