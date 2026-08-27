# 🍽️ GREAT DELIGHT - Digital Ordering System

A modern, full-stack restaurant ordering system built with Next.js 14, TypeScript, Prisma, and PostgreSQL.

## 🚀 Live Demo

- **Production**: https://great-delight-fastfood.vercel.app/
- **Customer Menu**: https://great-delight-fastfood.vercel.app/menu/great-delight/main/table-01
- **Admin Portal**: https://great-delight-fastfood.vercel.app/admin

**Admin Credentials:**
- Email: `admin@greatdelight.com`
- Password: `admin123`

## ✨ Features

### Customer Experience
- 📱 QR code table ordering (no app required)
- 🎨 Beautiful accordion-style menu
- 🛒 Real-time cart management
- 📋 Order tracking
- 📱 Mobile-responsive design

### Admin Dashboard
- 📊 Real-time order management
- 🔔 Browser notifications with sound alerts
- 📈 Daily statistics and analytics
- 🍽️ Menu management
- 📍 Table management
- 👥 Multi-role access control

### Menu Highlights
- **58 menu items** across **10 categories**
- Soups, Rice & Combos, Quick Meals, Pepper Soup, Proteins
- Drinks (Beers & Wines), Grills, Cocktails, Mocktails, Teas
- All prices in Nigerian Naira (₦)

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (Neon)
- **ORM**: Prisma
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS
- **Deployment**: Vercel
- **Icons**: Lucide React

## 📦 Local Development

### Prerequisites
- Node.js 18+ and npm
- PostgreSQL database

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/kelvzzy/Great-delight-fast-food.git
   cd Great-delight-fast-food
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your database URL:
   ```env
   DATABASE_URL="your-postgresql-connection-string"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Setup database**
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

## 📚 Project Structure

```
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── seed.ts                # Database seed script
│   └── add-new-items.ts       # Script to add menu items
├── src/
│   ├── app/                   # Next.js app router pages
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── menu/              # Customer menu pages
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── admin/             # Admin components
│   │   └── Logo.tsx           # Centralized logo component
│   ├── lib/                   # Utilities and configurations
│   └── services/              # Business logic services
├── public/                    # Static assets
└── README.md                  # This file
```

## 🔧 Key Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx prisma studio    # Open Prisma Studio (database GUI)
npx tsx prisma/seed.ts    # Re-seed database
```

## 🎨 Adding Custom Logo

1. Add your logo image to `/public/logo.png` (512x512px recommended)
2. Edit `src/components/Logo.tsx`:
   ```typescript
   const HAS_CUSTOM_LOGO = true;  // Change from false to true
   ```
3. Deploy!

See `LOGO_INTEGRATION_GUIDE.md` for detailed instructions.

## 📖 Documentation

- **ALL_PHASES_COMPLETE.md** - Complete feature list and implementation summary
- **LOGO_INTEGRATION_GUIDE.md** - Step-by-step logo replacement guide
- **TESTING_GUIDE.md** - Comprehensive testing checklist

## 🚀 Deployment

The application is deployed on Vercel with automatic deployments from the `main` branch.

### Environment Variables (Vercel)
Required environment variables in Vercel dashboard:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `NEXTAUTH_URL` - Production URL
- `NEXT_PUBLIC_APP_URL` - Public app URL

## 🧪 Testing

See `TESTING_GUIDE.md` for detailed testing instructions covering:
- Customer order flow
- Admin notifications
- Real-time updates
- Logo integration
- Mobile responsiveness

## 📱 QR Code Generation

To generate QR codes for tables:
1. Navigate to Admin → Tables
2. Each table has a unique URL
3. Generate QR codes linking to: `/menu/great-delight/main/table-XX`

## 🔐 Security Features

- Server-side price validation
- Duplicate order prevention
- Protected admin routes
- Secure authentication with NextAuth
- Environment variable protection

## 🤝 Contributing

This is a production system. For modifications:
1. Test locally first
2. Create a feature branch
3. Test thoroughly
4. Deploy to staging (if available)
5. Deploy to production

## 📄 License

Private project for GREAT DELIGHT Restaurant.

## 🆘 Support

For issues or questions:
1. Check the documentation files
2. Review the testing guide
3. Check Vercel deployment logs
4. Verify database connectivity

---

**Built with ❤️ for GREAT DELIGHT Restaurant**  
**Status:** ✅ Production Ready  
**Version:** 2.0  
**Last Updated:** August 27, 2026
