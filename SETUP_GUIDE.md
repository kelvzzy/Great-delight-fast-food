# GREAT DELIGHT - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Git (optional)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Environment
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your settings
```

Required environment variables:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/greatdelight"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Step 3: Setup Database
```bash
# Start Docker database (if using Docker)
npm run docker:up

# Run migrations
npm run prisma:migrate

# Seed sample data
npm run prisma:seed
```

### Step 4: Start Development Server
```bash
npm run dev
```

Visit: http://localhost:3000

---

## 📊 Sample Data

After seeding, you'll have:

**Admin Account:**
- Email: admin@greatdelight.com
- Password: admin123

**Restaurant:** GREAT DELIGHT  
**Branch:** Main Branch (Surulere)  
**Tables:** TABLE 01 through TABLE 20

**Menu:** Full Nigerian menu with:
- Main Dishes (Jollof Rice, Fried Rice, etc.)
- Soups & Swallows
- Grills & BBQ
- Sides
- Drinks

---

## 🔐 First Time Setup

### 1. Access Admin Portal
```
http://localhost:3000/admin/login
```

Login with demo credentials above.

### 2. Generate QR Codes
1. Navigate to **Tables** in admin dashboard
2. Click **Generate QR Code** for each table
3. Download QR codes
4. Print and place on tables

### 3. Test Customer Flow
1. Scan a QR code or visit:
   ```
   http://localhost:3000/menu/great-delight/main/table-01
   ```
2. Browse menu
3. Add items to cart
4. Place test order

### 4. Manage Orders
1. Go to **Orders** in admin dashboard
2. Update order status
3. Track order lifecycle

---

## 🏗️ Project Structure

```
great-delight-fastfood/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts                # Sample data
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── menu/              # Customer menu pages
│   │   └── order/             # Order confirmation
│   ├── components/
│   │   ├── customer/          # Customer UI components
│   │   ├── admin/             # Admin UI components
│   │   ├── ui/                # Shared UI components
│   │   └── providers/         # Context providers
│   ├── services/              # Business logic
│   ├── lib/                   # Utilities
│   ├── stores/                # State management (Zustand)
│   └── hooks/                 # Custom React hooks
├── public/                    # Static assets
└── tests/                     # Test files
```

---

## 🎨 Customization

### Update Restaurant Information

Edit `prisma/seed.ts`:
```typescript
const restaurant = await prisma.restaurant.create({
  data: {
    name: 'YOUR RESTAURANT NAME',
    slug: 'your-restaurant-slug',
    // ... other fields
  },
});
```

Then re-seed:
```bash
npm run prisma:reset
```

### Update Menu Items

Option 1: Via Admin Dashboard
- Login to admin panel
- Navigate to Menu
- Edit prices and availability

Option 2: Via Database Seed
- Edit `prisma/seed.ts`
- Run `npm run prisma:seed`

### Change Branding Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    // Your brand colors here
  },
}
```

---

## 📱 Testing

### Run Tests
```bash
# All tests
npm test

# Watch mode
npm run test:watch

# With coverage
npm test -- --coverage
```

### Manual Testing Checklist

**Customer Flow:**
- [ ] Scan QR code
- [ ] Browse menu by category
- [ ] Select item variants
- [ ] Add options/modifiers
- [ ] Add multiple items to cart
- [ ] Adjust quantities
- [ ] Remove items
- [ ] Enter customer info
- [ ] Submit order
- [ ] View confirmation
- [ ] Track status

**Admin Flow:**
- [ ] Login
- [ ] View dashboard stats
- [ ] See new orders
- [ ] Update order status
- [ ] Filter orders
- [ ] Edit menu prices
- [ ] Toggle item availability
- [ ] Generate QR codes
- [ ] Download QR codes

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Configure environment variables in Vercel dashboard.

### Option 2: Docker

```bash
# Build image
docker build -t great-delight .

# Run container
docker run -p 3000:3000 --env-file .env great-delight
```

### Option 3: Traditional Hosting

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="strong-production-secret"
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
```

---

## 🔒 Security Checklist

Before going live:

- [ ] Change admin password
- [ ] Use strong NEXTAUTH_SECRET
- [ ] Enable HTTPS
- [ ] Setup database backups
- [ ] Configure CORS if needed
- [ ] Review API rate limiting
- [ ] Test authentication flows
- [ ] Audit user permissions

---

## 🐛 Troubleshooting

### Database Connection Issues

**Error:** "Can't reach database server"

**Solution:**
1. Check DATABASE_URL in .env
2. Ensure PostgreSQL is running
3. Test connection: `npm run prisma:studio`

### Build Errors

**Error:** "Module not found"

**Solution:**
```bash
rm -rf node_modules
rm package-lock.json
npm install
```

### QR Codes Not Generating

**Error:** QR generation fails

**Solution:**
1. Check NEXT_PUBLIC_APP_URL is set
2. Verify table exists in database
3. Check browser console for errors

### Session/Auth Issues

**Error:** "Invalid session"

**Solution:**
1. Clear browser cookies
2. Verify NEXTAUTH_SECRET is set
3. Restart dev server

---

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [NextAuth.js Docs](https://next-auth.js.org)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

### Project Documentation
- `README.md` - Project overview
- `IMPLEMENTATION_STATUS.md` - Feature status
- `TESTING_GUIDE.md` - Testing instructions
- `API_DOCUMENTATION.md` - API reference
- `DEPLOYMENT_CHECKLIST.md` - Deployment steps

---

## 🆘 Support

**Technical Issues:**
- Check existing documentation
- Review error logs
- Test in isolation

**Feature Requests:**
- Document the requirement
- Consider impact
- Plan implementation

**Technology Provider:**  
Do'r Stack Software Solutions (DSSS)

---

## 🎯 Next Steps

1. **Customize** - Update branding and menu
2. **Test** - Thorough testing on multiple devices
3. **Deploy** - Choose hosting platform
4. **Launch** - Go live with customers
5. **Monitor** - Track usage and issues
6. **Iterate** - Gather feedback and improve

---

**You're all set! 🎉**

The system is ready for production use. Follow this guide to get your restaurant online in minutes.
