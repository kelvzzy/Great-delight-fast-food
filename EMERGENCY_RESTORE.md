# 🚨 EMERGENCY DATABASE RESTORE GUIDE

## CURRENT SITUATION
The database was accidentally cleared when reverting the gift order migration.

## SOLUTION: Run Seed Script

### Option 1: Via npm (Recommended)
```bash
npm run seed
```

### Option 2: Via npx tsx
```bash
npx tsx prisma/seed.ts
```

### Option 3: Via ts-node
```bash
npx ts-node prisma/seed.ts
```

## What Gets Restored
- ✅ Restaurant (GREAT DELIGHT)
- ✅ Branch (Main Branch)
- ✅ Tables (Table 01-20 with QR codes)
- ✅ Menu Categories (10 categories)
- ✅ Menu Items (58 items with variants)
- ✅ Admin User (admin@greatdelight.com)

## Verify Restoration
After seed completes:
1. Login to admin: https://great-delight-fastfood.vercel.app/admin/login
2. Check tables count
3. Check menu items count
4. Visit customer menu

## Seed Script Location
`prisma/seed.ts`

## If Seed Fails
Check:
1. Database connection in `.env`
2. Prisma client generated: `npx prisma generate`
3. Network connection to Neon database

## Current Status
**Seed is running in background** - should complete in 2-5 minutes

## After Restoration
Commit and push:
```bash
git add -A
git commit -m "chore: database restored via seed"
git push origin main
```

This will trigger Vercel rebuild with full data.

## IMPORTANT
DO NOT run migrations until we properly test schema changes in development first!
