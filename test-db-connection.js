// Quick database connection test
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  }
});

async function testConnection() {
  try {
    console.log('🔍 Testing database connection...\n');
    
    // Test 1: Can we connect?
    console.log('Test 1: Connection test...');
    await prisma.$connect();
    console.log('✅ Connected to database!\n');
    
    // Test 2: Count restaurants
    console.log('Test 2: Checking restaurants...');
    const restaurants = await prisma.restaurant.findMany();
    console.log(`✅ Found ${restaurants.length} restaurant(s)`);
    restaurants.forEach(r => console.log(`   - ${r.name} (${r.slug})`));
    console.log('');
    
    // Test 3: Count branches
    console.log('Test 3: Checking branches...');
    const branches = await prisma.branch.findMany({
      include: { restaurant: true }
    });
    console.log(`✅ Found ${branches.length} branch(es)`);
    branches.forEach(b => console.log(`   - ${b.name} (${b.restaurant.name})`));
    console.log('');
    
    // Test 4: Count menu items
    console.log('Test 4: Checking menu items...');
    const menuItems = await prisma.menuItem.count();
    console.log(`✅ Found ${menuItems} menu items\n`);
    
    // Test 5: Count tables
    console.log('Test 5: Checking tables...');
    const tables = await prisma.table.count();
    console.log(`✅ Found ${tables} tables\n`);
    
    // Test 6: Check admin user
    console.log('Test 6: Checking admin user...');
    const admin = await prisma.user.findUnique({
      where: { email: 'admin@greatdelight.com' }
    });
    if (admin) {
      console.log(`✅ Admin user exists: ${admin.email}`);
      console.log(`   Role: ${admin.role}`);
      console.log(`   Name: ${admin.name}\n`);
    } else {
      console.log('❌ Admin user NOT found!\n');
    }
    
    // Test 7: Sample menu item
    console.log('Test 7: Checking sample menu data...');
    const sampleItem = await prisma.menuItem.findFirst({
      include: {
        variants: true,
        category: true
      }
    });
    if (sampleItem) {
      console.log(`✅ Sample item: ${sampleItem.name}`);
      console.log(`   Category: ${sampleItem.category.name}`);
      console.log(`   Variants: ${sampleItem.variants.length}`);
      console.log(`   Available: ${sampleItem.available}\n`);
    }
    
    console.log('✅ ALL DATABASE TESTS PASSED!\n');
    console.log('📊 Database Summary:');
    console.log(`   - ${restaurants.length} restaurant(s)`);
    console.log(`   - ${branches.length} branch(es)`);
    console.log(`   - ${menuItems} menu items`);
    console.log(`   - ${tables} tables`);
    console.log(`   - Admin user: ${admin ? '✅' : '❌'}\n`);
    
  } catch (error) {
    console.error('❌ DATABASE ERROR:');
    console.error(error.message);
    console.error('\nFull error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
