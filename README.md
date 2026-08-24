# GREAT DELIGHT Digital Menu & Ordering System

**Production-ready restaurant digital menu and table-ordering platform**  
Built by **Do'r Stack Software Solutions (DSSS)**

---

## Overview

GREAT DELIGHT Digital Ordering System is a mobile-first restaurant platform that enables customers to browse menus via QR codes and place orders directly from their tables. The system provides complete restaurant operations management including menu control, order tracking, and real-time order updates.

### Key Features

- **QR Code Table Ordering** - Customers scan codes to access digital menus
- **Mobile-First Menu** - Responsive design optimized for phones
- **Order Management Dashboard** - Real-time order tracking and status updates
- **Menu Management** - Full CRUD operations for categories, items, variants, and options
- **Price Management** - Update prices without affecting historical orders
- **Availability Control** - Mark items as sold out dynamically
- **Multi-Tenant Architecture** - Supports multiple restaurants and branches
- **Order History** - Complete price snapshots for historical accuracy
- **Real-Time Updates** - Live order notifications for staff
- **Analytics Dashboard** - Today's orders, revenue, and performance metrics

---

## Technology Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (State Management)

### Backend
- **Node.js**
- **Next.js API Routes**
- **TypeScript**

### Database
- **PostgreSQL**
- **Prisma ORM**

### Authentication
- **NextAuth.js**
- **bcryptjs**

### Additional Libraries
- **Zod** - Runtime validation
- **qrcode** - QR code generation
- **date-fns** - Date formatting

---

## Architecture

### Multi-Tenant Domain Model

```
Restaurant
└── Branch
    ├── Tables (with QR codes)
    ├── Menu Categories
    │   └── Menu Items
    │       ├── Variants (e.g., Full, Middle, Head for Catfish)
    │       └── Options (e.g., Swallow selection)
    ├── Orders
    └── Staff
```

### Price Snapshot Architecture

Orders store complete price snapshots to preserve historical accuracy. When prices change, past orders retain their original pricing.

### Modular Monolith

The system uses a clean layered architecture:
- **API Routes** - HTTP endpoints
- **Services** - Business logic
- **Repositories** - Data access (Prisma)
- **Validation** - Zod schemas

---

## Getting Started

### Prerequisites

- **Node.js** 18.17+ and npm 9+
- **PostgreSQL** 15+
- **Docker** (optional, for containerized development)

### Installation

1. **Clone the repository**

```bash
cd great-delight-fastfood
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

```bash
cp .env.example .env
```

Edit `.env` and configure:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`
- `NEXTAUTH_URL` - Application URL (http://localhost:3000 for development)

4. **Start PostgreSQL**

Option A: Using Docker Compose
```bash
npm run docker:up
```

Option B: Use your local PostgreSQL instance and update `DATABASE_URL`

5. **Run database migrations**

```bash
npm run prisma:migrate
```

6. **Seed the database**

```bash
npm run prisma:seed
```

This creates:
- GREAT DELIGHT restaurant
- Main branch
- 20 tables (TABLE 01 - TABLE 20)
- Complete menu with all categories and items
- Admin user account

7. **Start development server**

```bash
npm run dev
```

Visit http://localhost:3000

---

## Default Credentials

```
Email: admin@greatdelight.com
Password: admin123
```

**⚠️ Change these credentials in production!**

---

## Database Management

### Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio

# Reset database (⚠️ destructive)
npm run prisma:reset

# Seed database
npm run prisma:seed
```

---

## Project Structure

```
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Database seed script
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── menu/           # Customer menu pages
│   │   ├── admin/          # Admin dashboard
│   │   └── order/          # Order confirmation
│   ├── components/         # React components
│   │   ├── customer/       # Customer-facing components
│   │   ├── admin/          # Admin components
│   │   └── shared/         # Shared components
│   ├── lib/                # Core utilities
│   │   ├── prisma.ts       # Prisma client
│   │   ├── auth.ts         # Authentication config
│   │   ├── utils.ts        # Helper functions
│   │   ├── logger.ts       # Application logger
│   │   └── validations/    # Zod schemas
│   ├── services/           # Business logic
│   │   ├── order.service.ts
│   │   ├── menu.service.ts
│   │   └── qr.service.ts
│   └── types/              # TypeScript types
├── docker-compose.yml      # Docker configuration
├── Dockerfile              # Production container
└── README.md
```

---

## API Endpoints

### Public Endpoints

#### Menu
- `GET /api/menu?restaurant={slug}&branch={slug}` - Get complete menu
- `GET /api/menu/:itemId` - Get menu item details

#### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:orderId` - Get order details

#### Tables
- `GET /api/table?restaurant={slug}&branch={slug}&table={slug}` - Get table details

### Admin Endpoints (Authenticated)

#### Orders
- `GET /api/admin/orders?status={status}&limit={limit}` - Get orders list
- `PATCH /api/admin/orders/:orderId/status` - Update order status

#### Menu Management
- `PATCH /api/admin/menu/items/:itemId/availability` - Toggle availability
- `PATCH /api/admin/menu/items/:itemId/price` - Update price

#### QR Codes
- `POST /api/admin/tables/:tableId/qr` - Generate table QR code

#### Analytics
- `GET /api/admin/stats` - Get today's statistics

---

## Customer Journey

1. **Scan QR Code** - Customer scans table QR code with phone
2. **Browse Menu** - Mobile-optimized menu loads instantly
3. **Select Items** - Choose food with variants and options
4. **Add to Cart** - Cart preserves selections
5. **Place Order** - Submit order with optional customer details
6. **Confirmation** - Receive order number and confirmation

QR Code URL Pattern:
```
https://your-domain.com/menu/great-delight/main/table-01
```

---

## Restaurant Operations

### Order Dashboard

Staff see incoming orders in real-time with:
- Order number
- Table number
- Items with selections
- Total amount
- Status buttons: **Accept** → **Preparing** → **Ready** → **Completed**

### Menu Management

- Create/edit/delete categories
- Create/edit/delete menu items
- Add variants (e.g., Catfish: Full, Middle, Head, Tail)
- Add options (e.g., Swallow: Garri, Fufu, Semo, Pounded Yam)
- Change prices (historical orders unaffected)
- Toggle availability (mark items sold out)

---

## Money Handling

All monetary values are stored in **kobo** (Nigerian Naira minor units) to avoid floating-point errors.

```typescript
// Convert Naira to kobo
const kobo = naira * 100;  // ₦7,000 → 700000

// Convert kobo to Naira
const naira = kobo / 100;  // 700000 → ₦7,000

// Format for display
formatNaira(700000);  // "₦7,000"
```

**Never use floating-point arithmetic for money calculations.**

---

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests in CI mode
npm run test:ci
```

### Test Coverage

- Unit tests for price calculations
- Unit tests for cart logic
- Integration tests for API endpoints
- E2E tests for critical flows

---

## Production Build

### Build Application

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## Docker Deployment

### Development

```bash
docker compose up -d
```

### Production

1. **Build image**

```bash
docker build -t great-delight-app .
```

2. **Run container**

```bash
docker run -d \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="https://your-domain.com" \
  great-delight-app
```

---

## Environment Variables

### Required

```env
DATABASE_URL=postgresql://user:password@host:5432/database
NEXTAUTH_SECRET=your-secret-min-32-characters
NEXTAUTH_URL=https://your-domain.com
```

### Optional

```env
LOG_LEVEL=info
NODE_ENV=production
NEXT_PUBLIC_APP_NAME=GREAT DELIGHT
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

### Future (Image Storage)

```env
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
```

---

## Security

### Implemented

- ✅ Password hashing (bcryptjs)
- ✅ Secure session management (NextAuth.js)
- ✅ Role-based authorization
- ✅ Input validation (Zod)
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS-safe rendering (React)
- ✅ Secure HTTP headers
- ✅ CORS policy
- ✅ Environment secrets management
- ✅ Audit logging with sanitization

### Production Checklist

- [ ] Change default admin password
- [ ] Use strong `NEXTAUTH_SECRET`
- [ ] Enable HTTPS
- [ ] Configure CORS for production domain
- [ ] Set up database backups
- [ ] Enable rate limiting
- [ ] Configure firewall rules
- [ ] Set up monitoring and alerts

---

## Logging

The application uses structured logging that automatically sanitizes sensitive data.

```typescript
import { logger } from '@/lib/logger';

logger.info('Order created', { orderId, total });
logger.warn('Invalid login attempt', { email });
logger.error('Database error', { error });
```

**Passwords, tokens, and secrets are never logged.**

---

## Menu Data

The seed script includes the complete GREAT DELIGHT menu:

- **Soups** - 8 items (White Soup, Ogbono, Okra, Afang, etc.)
- **Rice & Combos** - 7 items (Jollof, Fried Rice, White Rice variations)
- **Quick Meals** - 6 items (Yam, Porridge, Spaghetti, Noodles)
- **Pepper Soup** - 3 items (Assorted, Goat Meat, Catfish)
- **Proteins** - Peppered Meat (Beef/Goat)

All prices match the source specification exactly.

---

## Future Enhancements

The architecture supports these future modules:

- Online ordering (delivery/pickup)
- Kitchen Display System (KDS)
- Point of Sale (POS) integration
- Inventory management
- Staff management
- Customer management & loyalty
- Payment processing
- Sales analytics
- Marketing automation
- Multi-branch management

---

## Support

**Technology Provider:** Do'r Stack Software Solutions (DSSS)

For technical issues or questions, contact the development team.

---

## License

Proprietary - All rights reserved to Do'r Stack Software Solutions

---

## Credits

**Developed by:** Do'r Stack Software Solutions (DSSS)  
**Client:** GREAT DELIGHT  
**Version:** 1.0.0  
**Year:** 2026
