# 🚀 GREAT DELIGHT - Deployment Checklist

## Pre-Deployment Verification

### ✅ Code Quality
- [x] TypeScript compilation passes (`npm run type-check`)
- [x] ESLint passes (`npm run lint`)
- [x] Build succeeds (`npm run build`)
- [ ] All tests pass (`npm test`)
- [x] No console errors in development
- [x] No secrets committed to Git

### ✅ Database
- [x] Prisma schema is complete
- [x] Migrations are up to date
- [x] Seed script works
- [x] Database indexes are optimized
- [ ] Backup strategy is in place
- [ ] Connection pooling is configured

### ✅ Environment Variables
- [x] `.env.example` is complete
- [x] All required variables documented
- [ ] Production `.env` file created
- [ ] Strong `NEXTAUTH_SECRET` generated (32+ chars)
- [ ] Production `DATABASE_URL` configured
- [ ] `NEXTAUTH_URL` set to production domain

---

## Security Checklist

### Authentication & Authorization
- [x] Passwords are hashed with bcrypt
- [x] Session management is secure
- [x] Role-based access control implemented
- [ ] Default admin password changed
- [ ] Password reset mechanism (if needed)
- [x] JWT tokens are secure

### Data Protection
- [x] Input validation (Zod) on all endpoints
- [x] SQL injection protection (Prisma ORM)
- [x] XSS protection (React auto-escaping)
- [x] CSRF protection configured
- [x] Sensitive data not logged
- [ ] Rate limiting enabled
- [ ] API endpoints have proper auth checks

### Infrastructure
- [ ] HTTPS enabled
- [ ] SSL certificates installed
- [ ] Firewall configured
- [ ] Database not publicly accessible
- [ ] Environment secrets encrypted
- [ ] CORS configured for production domain only

---

## Database Setup (Production)

### 1. PostgreSQL Server
```bash
# Ensure PostgreSQL 15+ is installed and running
psql --version

# Create production database
createdb great_delight_production
```

### 2. Run Migrations
```bash
# Set DATABASE_URL to production database
export DATABASE_URL="postgresql://user:pass@host:5432/great_delight_production"

# Run migrations
npx prisma migrate deploy

# Generate Prisma Client
npx prisma generate
```

### 3. Seed Production Data
```bash
# Run seed script
npm run prisma:seed

# Verify data
npx prisma studio
```

### 4. Change Default Credentials
```sql
-- Connect to database
psql $DATABASE_URL

-- Update admin password (hash with bcrypt first)
UPDATE users 
SET password_hash = '$2a$12$YOUR_NEW_HASHED_PASSWORD'
WHERE email = 'admin@greatdelight.com';
```

---

## Application Deployment

### Option A: Docker Deployment (Recommended)

#### 1. Build Docker Image
```bash
docker build -t great-delight-app:latest .
```

#### 2. Test Locally
```bash
docker compose up -d
```

#### 3. Push to Registry (AWS ECR, Docker Hub, etc.)
```bash
# Tag image
docker tag great-delight-app:latest your-registry/great-delight-app:latest

# Push
docker push your-registry/great-delight-app:latest
```

#### 4. Deploy to Server
```bash
# On production server
docker pull your-registry/great-delight-app:latest

docker run -d \
  --name great-delight-app \
  -p 3000:3000 \
  -e DATABASE_URL="postgresql://..." \
  -e NEXTAUTH_SECRET="..." \
  -e NEXTAUTH_URL="https://your-domain.com" \
  -e NODE_ENV="production" \
  --restart unless-stopped \
  your-registry/great-delight-app:latest
```

### Option B: Traditional Deployment

#### 1. Server Setup
```bash
# Install Node.js 18+
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2
```

#### 2. Deploy Application
```bash
# Clone repository
git clone <repository-url>
cd great-delight-fastfood

# Install dependencies
npm ci --only=production

# Build application
npm run build

# Start with PM2
pm2 start npm --name "great-delight" -- start
pm2 save
pm2 startup
```

#### 3. Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### 4. Enable HTTPS with Let's Encrypt
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Post-Deployment Verification

### 1. Health Checks
- [ ] Application is accessible at production URL
- [ ] HTTPS is working
- [ ] Database connection is stable
- [ ] No errors in application logs

### 2. Functional Testing
- [ ] Can access homepage
- [ ] Can scan QR code and view menu
- [ ] Can add items to cart
- [ ] Can place order
- [ ] Admin can log in
- [ ] Admin can view orders
- [ ] Admin can update order status
- [ ] Admin can change prices
- [ ] Admin can toggle availability

### 3. Performance Testing
- [ ] Page load times < 3 seconds
- [ ] API response times < 500ms
- [ ] Mobile performance is acceptable
- [ ] No memory leaks
- [ ] Database queries are optimized

### 4. Security Testing
- [ ] HTTPS redirects working
- [ ] Admin routes require authentication
- [ ] Cannot access other users' data
- [ ] SQL injection attempts fail
- [ ] XSS attempts are sanitized
- [ ] Rate limiting works

---

## QR Code Generation

### Generate QR Codes for All Tables

#### Option 1: Admin UI (Recommended)
1. Log in to admin dashboard
2. Navigate to Tables
3. Click "Generate QR Codes"
4. Download individual QR codes or bulk ZIP

#### Option 2: API Script
```bash
# Create script to generate all QR codes
cat > generate-qr-codes.sh << 'EOF'
#!/bin/bash
API_URL="https://your-domain.com/api/admin"
TOKEN="your-auth-token"

# Get all tables
TABLES=$(curl -s -H "Authorization: Bearer $TOKEN" "$API_URL/tables")

# Generate QR for each table
echo "$TABLES" | jq -r '.[] | .id' | while read table_id; do
  curl -X POST -H "Authorization: Bearer $TOKEN" \
    "$API_URL/tables/$table_id/qr"
done
EOF

chmod +x generate-qr-codes.sh
./generate-qr-codes.sh
```

#### Option 3: Prisma Studio
```bash
# Open Prisma Studio
npx prisma studio

# Check tables table for QR codes
# If missing, run QR service manually
```

### Print QR Codes
1. Download QR codes as PNG files
2. Create table signs:
   - QR code at top
   - Table number below
   - "Scan to Order" instructions
   - GREAT DELIGHT branding
3. Laminate for durability
4. Place on each table

---

## Monitoring & Maintenance

### Application Monitoring

#### PM2 Monitoring
```bash
# View logs
pm2 logs great-delight

# Monitor resources
pm2 monit

# Restart application
pm2 restart great-delight
```

#### Log Management
```bash
# View application logs
tail -f /path/to/logs/app.log

# View database logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Database Backups

#### Daily Backup Script
```bash
#!/bin/bash
# backup-db.sh

BACKUP_DIR="/backups/great-delight"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="great_delight_production"

mkdir -p $BACKUP_DIR

pg_dump $DB_NAME | gzip > $BACKUP_DIR/backup_$DATE.sql.gz

# Keep only last 30 days
find $BACKUP_DIR -type f -mtime +30 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

#### Setup Cron Job
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup-db.sh >> /var/log/db-backup.log 2>&1
```

### Updates & Maintenance

#### Application Updates
```bash
# Pull latest code
git pull origin main

# Install dependencies
npm ci --only=production

# Run migrations
npx prisma migrate deploy

# Build
npm run build

# Restart
pm2 restart great-delight
```

#### Database Maintenance
```sql
-- Vacuum and analyze (monthly)
VACUUM ANALYZE;

-- Reindex (quarterly)
REINDEX DATABASE great_delight_production;

-- Check database size
SELECT pg_size_pretty(pg_database_size('great_delight_production'));
```

---

## Troubleshooting

### Common Issues

#### 1. Application Won't Start
```bash
# Check environment variables
printenv | grep DATABASE
printenv | grep NEXTAUTH

# Check database connection
psql $DATABASE_URL

# Check Node.js version
node --version  # Should be 18+

# Check build errors
npm run build
```

#### 2. Database Connection Errors
```bash
# Test database connectivity
pg_isready -h localhost -p 5432

# Check PostgreSQL status
sudo systemctl status postgresql

# Review database logs
sudo tail -f /var/log/postgresql/postgresql-15-main.log
```

#### 3. Performance Issues
```sql
-- Find slow queries
SELECT query, mean_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;

-- Check active connections
SELECT count(*) FROM pg_stat_activity;
```

#### 4. Memory Issues
```bash
# Check memory usage
free -m

# Check Node.js memory
pm2 info great-delight

# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=4096" pm2 restart great-delight
```

---

## Rollback Plan

### Quick Rollback Steps

#### 1. Revert Application
```bash
# If using Docker
docker stop great-delight-app
docker run -d <previous-image>

# If using PM2
git checkout <previous-commit>
npm run build
pm2 restart great-delight
```

#### 2. Revert Database Migration
```bash
# Restore from backup
gunzip < backup_YYYYMMDD_HHMMSS.sql.gz | psql $DATABASE_URL

# Or rollback migration
npx prisma migrate resolve --rolled-back <migration-name>
```

---

## Success Criteria

### Launch Day Checklist
- [ ] All QR codes printed and placed on tables
- [ ] Staff trained on order dashboard
- [ ] Admin trained on menu management
- [ ] Backup and monitoring in place
- [ ] Support contact information ready
- [ ] Emergency rollback plan documented

### Week 1 Monitoring
- [ ] Monitor order volume daily
- [ ] Check for errors in logs
- [ ] Verify database performance
- [ ] Gather customer feedback
- [ ] Address any issues immediately

### Week 2-4 Optimization
- [ ] Analyze usage patterns
- [ ] Optimize slow queries
- [ ] Fine-tune prices based on data
- [ ] Update menu items as needed
- [ ] Plan additional features

---

## Support Contacts

**Technology Provider:** Do'r Stack Software Solutions (DSSS)

**Emergency Contacts:**
- Technical Support: [contact@dsss.com]
- Database Issues: [db-support@dsss.com]
- Critical Bugs: [emergency@dsss.com]

**Response Times:**
- Critical (site down): 1 hour
- High (order issues): 4 hours
- Medium (UI bugs): 24 hours
- Low (enhancements): 1 week

---

## Documentation

### Handoff Documents
- [x] README.md - Complete project documentation
- [x] IMPLEMENTATION_STATUS.md - Current implementation status
- [x] QUICK_START_GUIDE.md - Development setup
- [x] PROJECT_SUMMARY.md - Technical overview
- [x] This checklist - Deployment guide

### Additional Resources
- Prisma Schema: `prisma/schema.prisma`
- API Documentation: See README.md
- Seed Data: `prisma/seed.ts`
- Environment Vars: `.env.example`

---

## Go-Live Approval

### Sign-Off
- [ ] DSSS Technical Lead
- [ ] GREAT DELIGHT Management
- [ ] Database Administrator
- [ ] System Administrator

### Date: ______________

### Notes:
_______________________________________________________________________
_______________________________________________________________________
_______________________________________________________________________

---

**Status:** Ready for Deployment (pending frontend completion)  
**Last Updated:** 2026-08-18  
**Version:** 1.0.0
