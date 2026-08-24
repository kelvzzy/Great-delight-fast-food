# ⚡ SUPABASE QUICK SETUP CHECKLIST

## 🎯 DO THIS (5 minutes):

### 1. Create Supabase Project (3 min)
- [ ] Go to https://supabase.com/dashboard
- [ ] Click "New Project"
- [ ] Name: `great-delight-ordering`
- [ ] Generate password (SAVE IT!)
- [ ] Wait for provisioning

### 2. Get Connection String (1 min)
- [ ] Click Settings → Database
- [ ] Find "Connection String" section
- [ ] Select "URI" tab
- [ ] Copy the string
- [ ] Replace `[YOUR-PASSWORD]` with your actual password

### 3. Update .env (30 sec)
```bash
# Open .env file and replace DATABASE_URL with:
DATABASE_URL="postgresql://postgres.[YOUR-SUPABASE-REF]:[YOUR-PASSWORD]@[YOUR-HOST]:5432/postgres"
```

### 4. Run Setup Commands (1 min)
```bash
# Run these one by one:
npx prisma migrate dev --name init
npx prisma db seed
npx prisma studio
```

### 5. Test It Works (30 sec)
- [ ] Prisma Studio opens (http://localhost:5555)
- [ ] See data in tables
- [ ] Go to http://localhost:3000/menu/great-delight/main/table-01
- [ ] Menu items load! 🎉

---

## ✅ WHEN READY

Just paste your Supabase connection string and I'll help you verify everything is set up correctly!

**Example connection string format:**
```
postgresql://postgres.abcdefgh:MyP@ssw0rd!@db.abcdefgh.supabase.co:5432/postgres
```

---

**Current Status:**
- ✅ Dev server running
- ✅ Code ready
- ⏳ Waiting for: Your Supabase connection string

**Next:** Test customer ordering and admin dashboard! 🚀
