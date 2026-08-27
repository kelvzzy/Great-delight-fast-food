import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Helper: Convert Naira to kobo (minor units)
const toKobo = (naira: number): number => naira * 100;

async function main() {
  console.log('🌱 Starting database seed...\n');

  // ============================================
  // 1. CREATE RESTAURANT
  // ============================================
  console.log('Creating restaurant...');
  const restaurant = await prisma.restaurant.upsert({
    where: { slug: 'great-delight' },
    update: {},
    create: {
      name: 'GREAT DELIGHT',
      slug: 'great-delight',
      description: 'Premium Nigerian Restaurant - Great Food, Great Experience',
      active: true,
    },
  });
  console.log(`✓ Restaurant created: ${restaurant.name}`);

  // ============================================
  // 2. CREATE MAIN BRANCH
  // ============================================
  console.log('\nCreating main branch...');
  const mainBranch = await prisma.branch.upsert({
    where: {
      restaurantId_slug: {
        restaurantId: restaurant.id,
        slug: 'main',
      },
    },
    update: {},
    create: {
      restaurantId: restaurant.id,
      name: 'Main Branch',
      slug: 'main',
      address: 'Lagos, Nigeria',
      phone: '+234-XXX-XXX-XXXX',
      active: true,
    },
  });
  console.log(`✓ Branch created: ${mainBranch.name}`);

  // ============================================
  // 3. CREATE TABLES
  // ============================================
  console.log('\nCreating tables...');
  const tableCount = 20;
  const tables = [];
  
  for (let i = 1; i <= tableCount; i++) {
    const tableNumber = String(i).padStart(2, '0');
    const table = await prisma.table.upsert({
      where: {
        branchId_slug: {
          branchId: mainBranch.id,
          slug: `table-${tableNumber}`,
        },
      },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: `TABLE ${tableNumber}`,
        slug: `table-${tableNumber}`,
        active: true,
        sortOrder: i,
      },
    });
    tables.push(table);
  }
  console.log(`✓ Created ${tables.length} tables`);

  // ============================================
  // 4. CREATE ADMIN USER
  // ============================================
  console.log('\nCreating admin user...');
  const passwordHash = await bcrypt.hash('admin123', 12);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@greatdelight.com' },
    update: {},
    create: {
      email: 'admin@greatdelight.com',
      passwordHash,
      firstName: 'Admin',
      lastName: 'User',
      role: Role.RESTAURANT_ADMIN,
      restaurantId: restaurant.id,
      branchId: mainBranch.id,
      active: true,
    },
  });
  console.log(`✓ Admin user created: ${adminUser.email}`);

  // ============================================
  // 5. CREATE MENU CATEGORIES
  // ============================================
  console.log('\nCreating menu categories...');
  
  const categories = await Promise.all([
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'soups' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Soups',
        slug: 'soups',
        description: 'Traditional Nigerian soups with your choice of swallow',
        active: true,
        sortOrder: 1,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'rice-and-combos' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Rice & Combos',
        slug: 'rice-and-combos',
        description: 'Delicious rice dishes with protein',
        active: true,
        sortOrder: 2,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'quick-meals' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Quick Meals',
        slug: 'quick-meals',
        description: 'Fast and satisfying meals',
        active: true,
        sortOrder: 3,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'pepper-soup' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Pepper Soup',
        slug: 'pepper-soup',
        description: 'Hot and spicy Nigerian pepper soup',
        active: true,
        sortOrder: 4,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'proteins' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Proteins',
        slug: 'proteins',
        description: 'Extra protein sides',
        active: true,
        sortOrder: 5,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'drinks' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Drinks',
        slug: 'drinks',
        description: 'Beers, wines, and beverages',
        active: true,
        sortOrder: 6,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'grills' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Grills',
        slug: 'grills',
        description: 'Grilled meats and BBQ specialties',
        active: true,
        sortOrder: 7,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'cocktails' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Cocktails',
        slug: 'cocktails',
        description: 'Signature alcoholic cocktails',
        active: true,
        sortOrder: 8,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'mocktails' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Mocktails',
        slug: 'mocktails',
        description: 'Non-alcoholic refreshing drinks',
        active: true,
        sortOrder: 9,
      },
    }),
    prisma.menuCategory.upsert({
      where: { branchId_slug: { branchId: mainBranch.id, slug: 'teas' } },
      update: {},
      create: {
        branchId: mainBranch.id,
        name: 'Teas',
        slug: 'teas',
        description: 'Hot and cold tea selections',
        active: true,
        sortOrder: 10,
      },
    }),
  ]);
  
  console.log(`✓ Created ${categories.length} categories`);

  // Get category references
  const [
    soupsCategory,
    riceCategory,
    quickMealsCategory,
    pepperSoupCategory,
    proteinsCategory,
    drinksCategory,
    grillsCategory,
    cocktailsCategory,
    mocktailsCategory,
    teasCategory,
  ] = categories;

  // ============================================
  // 6. CREATE MENU ITEMS - SOUPS
  // ============================================
  console.log('\nCreating soup menu items...');

  // WHITE SOUP
  const whiteSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'White Soup',
      slug: 'white-soup',
      description: 'Traditional white soup with your choice of swallow',
      active: true,
      available: true,
      sortOrder: 1,
      variants: {
        create: [
          { name: '2 wraps Semo', price: toKobo(7000), sortOrder: 1, available: true },
          { name: '2 wraps Garri', price: toKobo(7000), sortOrder: 2, available: true },
          { name: '2 wraps Fufu', price: toKobo(7000), sortOrder: 3, available: true },
          { name: '2 wraps Pounded Yam', price: toKobo(8000), sortOrder: 4, available: true },
        ],
      },
    },
  });

  // CHICKEN BREAST WHITE SOUP
  const chickenWhiteSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'Chicken Breast White Soup',
      slug: 'chicken-breast-white-soup',
      description: 'White soup with chicken breast and your choice of swallow',
      basePrice: toKobo(10000),
      active: true,
      available: true,
      sortOrder: 2,
      options: {
        create: {
          name: 'Swallow',
          required: true,
          sortOrder: 1,
          values: {
            create: [
              { name: 'Garri', priceModifier: 0, sortOrder: 1, available: true },
              { name: 'Fufu', priceModifier: 0, sortOrder: 2, available: true },
              { name: 'Semo', priceModifier: 0, sortOrder: 3, available: true },
              { name: 'Pounded Yam', priceModifier: 0, sortOrder: 4, available: true },
            ],
          },
        },
      },
    },
  });

  // OGBONO SOUP
  const ogbonoSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'Ogbono Soup',
      slug: 'ogbono-soup',
      description: 'Draw soup with protein and swallow options',
      active: true,
      available: true,
      sortOrder: 3,
      variants: {
        create: [
          { name: 'Beef + Standard Swallow (Fufu/Semo/Garri)', price: toKobo(4000), sortOrder: 1, available: true },
          { name: 'Goat Meat + Standard Swallow (Fufu/Semo/Garri)', price: toKobo(4500), sortOrder: 2, available: true },
          { name: 'Beef + 2 wraps Pounded Yam', price: toKobo(5000), sortOrder: 3, available: true },
          { name: 'Goat Meat + 2 wraps Pounded Yam', price: toKobo(5500), sortOrder: 4, available: true },
        ],
      },
    },
  });

  // OKRA SOUP
  const okraSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'Okra Soup',
      slug: 'okra-soup',
      description: 'Fresh okra soup with protein and swallow options',
      active: true,
      available: true,
      sortOrder: 4,
      variants: {
        create: [
          { name: 'Beef + Standard Swallow (Fufu/Garri/Semo)', price: toKobo(4000), sortOrder: 1, available: true },
          { name: 'Goat Meat + Standard Swallow (Fufu/Garri/Semo)', price: toKobo(4500), sortOrder: 2, available: true },
          { name: 'Beef + Pounded Yam', price: toKobo(5000), sortOrder: 3, available: true },
          { name: 'Goat Meat + Pounded Yam', price: toKobo(5500), sortOrder: 4, available: true },
        ],
      },
    },
  });

  // AFANG SOUP
  const afangSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'Afang Soup',
      slug: 'afang-soup',
      description: 'Rich vegetable soup with protein and swallow',
      active: true,
      available: true,
      sortOrder: 5,
      variants: {
        create: [
          { name: 'Beef + Standard Swallow (Fufu/Garri/Semo)', price: toKobo(7500), sortOrder: 1, available: true },
          { name: 'Goat Meat + Standard Swallow (Fufu/Garri/Semo)', price: toKobo(8500), sortOrder: 2, available: true },
          { name: 'Beef + Pounded Yam', price: toKobo(8500), sortOrder: 3, available: true },
          { name: 'Goat Meat + Pounded Yam', price: toKobo(9500), sortOrder: 4, available: true },
        ],
      },
    },
  });

  // OHA SOUP / BUTTER LEAF
  const ohaSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'Oha Soup / Butter Leaf',
      slug: 'oha-soup-butter-leaf',
      description: 'Traditional Oha soup with protein and swallow',
      active: true,
      available: true,
      sortOrder: 6,
      variants: {
        create: [
          { name: 'Beef + Standard Swallow (Semo/Fufu/Garri)', price: toKobo(4000), sortOrder: 1, available: true },
          { name: 'Goat Meat + Standard Swallow (Semo/Fufu/Garri)', price: toKobo(4500), sortOrder: 2, available: true },
          { name: 'Beef + 2 wraps Pounded Yam', price: toKobo(5000), sortOrder: 3, available: true },
          { name: 'Goat Meat + 2 wraps Pounded Yam', price: toKobo(5500), sortOrder: 4, available: true },
        ],
      },
    },
  });

  // VEGETABLE SOUP
  const vegetableSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'Vegetable Soup',
      slug: 'vegetable-soup',
      description: 'Fresh vegetable soup with protein and swallow',
      active: true,
      available: true,
      sortOrder: 7,
      variants: {
        create: [
          { name: 'Beef + Standard Swallow (Fufu/Semo/Garri)', price: toKobo(4500), sortOrder: 1, available: true },
          { name: 'Goat Meat + Standard Swallow (Fufu/Semo/Garri)', price: toKobo(5000), sortOrder: 2, available: true },
          { name: 'Beef + Pounded Yam', price: toKobo(5500), sortOrder: 3, available: true },
          { name: 'Goat Meat + Pounded Yam', price: toKobo(6000), sortOrder: 4, available: true },
        ],
      },
    },
  });

  // EWEDU SOUP MIXED WITH GBEGIRI
  const eweduSoup = await prisma.menuItem.create({
    data: {
      categoryId: soupsCategory.id,
      name: 'Ewedu Soup Mixed With Gbegiri',
      slug: 'ewedu-soup-mixed-with-gbegiri',
      description: 'Yoruba delicacy with Amala',
      active: true,
      available: true,
      sortOrder: 8,
      variants: {
        create: [
          { name: 'Beef + 2 wraps Amala', price: toKobo(3000), sortOrder: 1, available: true },
          { name: 'Goat Meat + 2 wraps Amala', price: toKobo(3500), sortOrder: 2, available: true },
        ],
      },
    },
  });

  console.log('✓ Created soup items');

  // ============================================
  // 7. CREATE MENU ITEMS - RICE & COMBOS
  // ============================================
  console.log('Creating rice & combo menu items...');

  // JOLLOF RICE
  const jollofRice = await prisma.menuItem.create({
    data: {
      categoryId: riceCategory.id,
      name: 'Jollof Rice',
      slug: 'jollof-rice',
      description: 'Classic Nigerian jollof rice with protein',
      active: true,
      available: true,
      sortOrder: 1,
      variants: {
        create: [
          { name: 'Beef Full Combo', price: toKobo(4000), sortOrder: 1, available: true },
          { name: 'Beef Mini Combo', price: toKobo(3000), sortOrder: 2, available: true },
          { name: 'Goat Meat Full Combo', price: toKobo(4500), sortOrder: 3, available: true },
          { name: 'Goat Meat Mini Combo', price: toKobo(3500), sortOrder: 4, available: true },
        ],
      },
    },
  });

  // FRIED RICE
  const friedRice = await prisma.menuItem.create({
    data: {
      categoryId: riceCategory.id,
      name: 'Fried Rice',
      slug: 'fried-rice',
      description: 'Delicious fried rice with protein',
      active: true,
      available: true,
      sortOrder: 2,
      variants: {
        create: [
          { name: 'Beef', price: toKobo(4000), sortOrder: 1, available: true },
          { name: 'Chicken', price: toKobo(5500), sortOrder: 2, available: true },
          { name: 'Goat Meat', price: toKobo(4500), sortOrder: 3, available: true },
        ],
      },
    },
  });

  // FRIED RICE FULL COMBO
  const friedRiceFullCombo = await prisma.menuItem.create({
    data: {
      categoryId: riceCategory.id,
      name: 'Fried Rice Full Combo',
      slug: 'fried-rice-full-combo',
      description: 'Fried Rice + Chicken + Coleslaw',
      basePrice: toKobo(7000),
      active: true,
      available: true,
      sortOrder: 3,
    },
  });

  // WHITE RICE & STEW
  const whiteRiceStew = await prisma.menuItem.create({
    data: {
      categoryId: riceCategory.id,
      name: 'White Rice & Stew',
      slug: 'white-rice-and-stew',
      description: 'White rice with stew and protein',
      active: true,
      available: true,
      sortOrder: 4,
      variants: {
        create: [
          { name: 'White Rice + Stew + Beef', price: toKobo(4000), sortOrder: 1, available: true },
          { name: 'White Rice + Stew + Goat Meat', price: toKobo(4500), sortOrder: 2, available: true },
        ],
      },
    },
  });

  // WHITE RICE FULL COMBO
  const whiteRiceFullCombo = await prisma.menuItem.create({
    data: {
      categoryId: riceCategory.id,
      name: 'White Rice Full Combo',
      slug: 'white-rice-full-combo',
      description: 'White Rice + Chicken Sauce + Coleslaw',
      basePrice: toKobo(10000),
      active: true,
      available: true,
      sortOrder: 5,
    },
  });

  // WHITE RICE MINI COMBO
  const whiteRiceMiniCombo = await prisma.menuItem.create({
    data: {
      categoryId: riceCategory.id,
      name: 'White Rice Mini Combo',
      slug: 'white-rice-mini-combo',
      description: 'White Rice + Chicken Sauce',
      basePrice: toKobo(8500),
      active: true,
      available: true,
      sortOrder: 6,
    },
  });

  // RED OIL RICE
  const redOilRice = await prisma.menuItem.create({
    data: {
      categoryId: riceCategory.id,
      name: 'Red Oil Rice',
      slug: 'red-oil-rice',
      description: 'Local rice cooked in palm oil with fish',
      active: true,
      available: true,
      sortOrder: 7,
      variants: {
        create: [
          { name: 'Red Oil Rice + 1 Dried Catfish', price: toKobo(8000), sortOrder: 1, available: true },
          { name: 'Red Oil Rice + 1 Full Fresh Titus Fish', price: toKobo(9000), sortOrder: 2, available: true },
        ],
      },
    },
  });

  console.log('✓ Created rice & combo items');

  // ============================================
  // 8. CREATE MENU ITEMS - QUICK MEALS
  // ============================================
  console.log('Creating quick meal items...');

  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: quickMealsCategory.id,
        name: 'Yam & Egg Sauce',
        slug: 'yam-and-egg-sauce',
        description: 'Boiled yam with egg sauce',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 1,
      },
      {
        categoryId: quickMealsCategory.id,
        name: 'Yam Porridge',
        slug: 'yam-porridge',
        description: 'Delicious yam porridge',
        basePrice: toKobo(3000),
        active: true,
        available: true,
        sortOrder: 2,
      },
      {
        categoryId: quickMealsCategory.id,
        name: 'Porridge Beans',
        slug: 'porridge-beans',
        description: 'Well-cooked beans porridge',
        basePrice: toKobo(3000),
        active: true,
        available: true,
        sortOrder: 3,
      },
      {
        categoryId: quickMealsCategory.id,
        name: 'Spaghetti',
        slug: 'spaghetti',
        description: 'Spaghetti with sauce',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 4,
      },
      {
        categoryId: quickMealsCategory.id,
        name: 'Noodles',
        slug: 'noodles',
        description: 'Prepared noodles',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 5,
      },
      {
        categoryId: quickMealsCategory.id,
        name: 'Moi Moi',
        slug: 'moi-moi',
        description: 'Steamed bean pudding',
        basePrice: toKobo(1000),
        active: true,
        available: true,
        sortOrder: 6,
      },
    ],
  });

  console.log('✓ Created quick meal items');

  // ============================================
  // 9. CREATE MENU ITEMS - PEPPER SOUP
  // ============================================
  console.log('Creating pepper soup items...');

  // ASSORTED PEPPER SOUP
  const assortedPepperSoup = await prisma.menuItem.create({
    data: {
      categoryId: pepperSoupCategory.id,
      name: 'Assorted Pepper Soup',
      slug: 'assorted-pepper-soup',
      description: 'Goat Meat + Beef Intestine',
      basePrice: toKobo(7500),
      active: true,
      available: true,
      sortOrder: 1,
    },
  });

  // GOAT MEAT PEPPER SOUP
  const goatMeatPepperSoup = await prisma.menuItem.create({
    data: {
      categoryId: pepperSoupCategory.id,
      name: 'Goat Meat Pepper Soup',
      slug: 'goat-meat-pepper-soup',
      description: 'Hot goat meat pepper soup',
      basePrice: toKobo(10000),
      active: true,
      available: true,
      sortOrder: 2,
    },
  });

  // CATFISH PEPPER SOUP
  const catfishPepperSoup = await prisma.menuItem.create({
    data: {
      categoryId: pepperSoupCategory.id,
      name: 'Catfish Pepper Soup',
      slug: 'catfish-pepper-soup',
      description: 'Fresh catfish pepper soup',
      active: true,
      available: true,
      sortOrder: 3,
      variants: {
        create: [
          { name: 'Full', price: toKobo(10000), sortOrder: 1, available: true },
          { name: 'Middle Part', price: toKobo(4000), sortOrder: 2, available: true },
          { name: 'Head', price: toKobo(5000), sortOrder: 3, available: true },
          { name: 'Tail', price: toKobo(4000), sortOrder: 4, available: true },
        ],
      },
    },
  });

  console.log('✓ Created pepper soup items');

  // ============================================
  // 10. CREATE MENU ITEMS - PROTEINS
  // ============================================
  console.log('Creating protein items...');

  const pepperedMeat = await prisma.menuItem.create({
    data: {
      categoryId: proteinsCategory.id,
      name: 'Peppered Meat',
      slug: 'peppered-meat',
      description: 'Spicy peppered meat',
      active: true,
      available: true,
      sortOrder: 1,
      variants: {
        create: [
          { name: 'Beef', price: toKobo(4000), sortOrder: 1, available: true },
          { name: 'Goat Meat', price: toKobo(5000), sortOrder: 2, available: true },
        ],
      },
    },
  });

  console.log('✓ Created protein items');

  // ============================================
  // 11. CREATE MENU ITEMS - DRINKS (BEERS & WINES)
  // ============================================
  console.log('Creating drinks menu items...');

  // BEERS
  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: drinksCategory.id,
        name: 'Star Lager',
        slug: 'star-lager',
        description: 'Premium Nigerian lager beer',
        basePrice: toKobo(2500),
        active: true,
        available: true,
        sortOrder: 1,
      },
      {
        categoryId: drinksCategory.id,
        name: 'Heineken',
        slug: 'heineken',
        description: 'International premium lager',
        basePrice: toKobo(2500),
        active: true,
        available: true,
        sortOrder: 2,
      },
      {
        categoryId: drinksCategory.id,
        name: 'Gulder',
        slug: 'gulder',
        description: 'Ultimate lager beer',
        basePrice: toKobo(2500),
        active: true,
        available: true,
        sortOrder: 3,
      },
      {
        categoryId: drinksCategory.id,
        name: 'Trophy',
        slug: 'trophy',
        description: 'Extra special stout',
        basePrice: toKobo(2000),
        active: true,
        available: true,
        sortOrder: 4,
      },
      {
        categoryId: drinksCategory.id,
        name: 'Life Continental',
        slug: 'life-continental',
        description: 'Light and refreshing lager',
        basePrice: toKobo(2000),
        active: true,
        available: true,
        sortOrder: 5,
      },
      {
        categoryId: drinksCategory.id,
        name: 'Four Cousins',
        slug: 'four-cousins',
        description: 'Fruity sweet wine',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 6,
      },
      {
        categoryId: drinksCategory.id,
        name: 'Baron Romero',
        slug: 'baron-romero',
        description: 'Spanish red wine',
        basePrice: toKobo(4000),
        active: true,
        available: true,
        sortOrder: 7,
      },
      {
        categoryId: drinksCategory.id,
        name: 'Eva Wine',
        slug: 'eva-wine',
        description: 'Sweet sparkling wine',
        basePrice: toKobo(2500),
        active: true,
        available: true,
        sortOrder: 8,
      },
    ],
  });

  // CARLO ROSSI WINES (with variants)
  const carloRossiRed = await prisma.menuItem.create({
    data: {
      categoryId: drinksCategory.id,
      name: 'Carlo Rossi Red',
      slug: 'carlo-rossi-red',
      description: 'Sweet red wine',
      active: true,
      available: true,
      sortOrder: 9,
      variants: {
        create: [
          { name: 'Small (Glass)', price: toKobo(1500), sortOrder: 1, available: true },
          { name: 'Large (Bottle)', price: toKobo(4000), sortOrder: 2, available: true },
        ],
      },
    },
  });

  const carloRossiWhite = await prisma.menuItem.create({
    data: {
      categoryId: drinksCategory.id,
      name: 'Carlo Rossi White',
      slug: 'carlo-rossi-white',
      description: 'Crisp white wine',
      active: true,
      available: true,
      sortOrder: 10,
      variants: {
        create: [
          { name: 'Small (Glass)', price: toKobo(1500), sortOrder: 1, available: true },
          { name: 'Large (Bottle)', price: toKobo(4000), sortOrder: 2, available: true },
        ],
      },
    },
  });

  console.log('✓ Created drinks items');

  // ============================================
  // 12. CREATE MENU ITEMS - GRILLS
  // ============================================
  console.log('Creating grill menu items...');

  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: grillsCategory.id,
        name: 'Grilled Whole Chicken',
        slug: 'grilled-whole-chicken',
        description: 'Perfectly grilled whole chicken',
        basePrice: toKobo(8000),
        active: true,
        available: true,
        featured: true,
        sortOrder: 1,
      },
      {
        categoryId: grillsCategory.id,
        name: 'BBQ Ribs',
        slug: 'bbq-ribs',
        description: 'Tender BBQ pork ribs',
        basePrice: toKobo(6500),
        active: true,
        available: true,
        sortOrder: 2,
      },
      {
        categoryId: grillsCategory.id,
        name: 'Grilled Fish',
        slug: 'grilled-fish',
        description: 'Fresh grilled tilapia or catfish',
        basePrice: toKobo(5000),
        active: true,
        available: true,
        sortOrder: 3,
      },
      {
        categoryId: grillsCategory.id,
        name: 'Suya Platter',
        slug: 'suya-platter',
        description: 'Spicy grilled beef suya',
        basePrice: toKobo(4000),
        active: true,
        available: true,
        sortOrder: 4,
      },
      {
        categoryId: grillsCategory.id,
        name: 'Mixed Grill Platter',
        slug: 'mixed-grill-platter',
        description: 'Chicken, beef, and sausage',
        basePrice: toKobo(12000),
        active: true,
        available: true,
        featured: true,
        sortOrder: 5,
      },
      {
        categoryId: grillsCategory.id,
        name: 'Grilled Prawns',
        slug: 'grilled-prawns',
        description: 'Jumbo prawns with garlic butter',
        basePrice: toKobo(7500),
        active: true,
        available: true,
        sortOrder: 6,
      },
      {
        categoryId: grillsCategory.id,
        name: 'Asun (Spicy Goat Meat)',
        slug: 'asun',
        description: 'Spicy grilled goat meat',
        basePrice: toKobo(5500),
        active: true,
        available: true,
        sortOrder: 7,
      },
    ],
  });

  console.log('✓ Created grill items');

  // ============================================
  // 13. CREATE MENU ITEMS - COCKTAILS
  // ============================================
  console.log('Creating cocktail menu items...');

  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: cocktailsCategory.id,
        name: 'Chapman',
        slug: 'chapman-cocktail',
        description: 'Classic Nigerian cocktail mix',
        basePrice: toKobo(2500),
        active: true,
        available: true,
        featured: true,
        sortOrder: 1,
      },
      {
        categoryId: cocktailsCategory.id,
        name: 'Pina Colada',
        slug: 'pina-colada',
        description: 'Rum, coconut cream, and pineapple',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 2,
      },
      {
        categoryId: cocktailsCategory.id,
        name: 'Mojito',
        slug: 'mojito',
        description: 'Rum, mint, lime, and soda',
        basePrice: toKobo(3000),
        active: true,
        available: true,
        sortOrder: 3,
      },
      {
        categoryId: cocktailsCategory.id,
        name: 'Sex on the Beach',
        slug: 'sex-on-the-beach',
        description: 'Vodka, peach schnapps, and fruit juices',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 4,
      },
      {
        categoryId: cocktailsCategory.id,
        name: 'Mai Tai',
        slug: 'mai-tai',
        description: 'Rum and tropical fruit blend',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 5,
      },
      {
        categoryId: cocktailsCategory.id,
        name: 'Margarita',
        slug: 'margarita',
        description: 'Tequila, lime, and triple sec',
        basePrice: toKobo(3500),
        active: true,
        available: true,
        sortOrder: 6,
      },
    ],
  });

  console.log('✓ Created cocktail items');

  // ============================================
  // 14. CREATE MENU ITEMS - MOCKTAILS
  // ============================================
  console.log('Creating mocktail menu items...');

  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: mocktailsCategory.id,
        name: 'Virgin Mojito',
        slug: 'virgin-mojito',
        description: 'Refreshing mint and lime mocktail',
        basePrice: toKobo(2000),
        active: true,
        available: true,
        featured: true,
        sortOrder: 1,
      },
      {
        categoryId: mocktailsCategory.id,
        name: 'Fruit Punch',
        slug: 'fruit-punch',
        description: 'Mixed tropical fruit blend',
        basePrice: toKobo(1800),
        active: true,
        available: true,
        sortOrder: 2,
      },
      {
        categoryId: mocktailsCategory.id,
        name: 'Fresh Squeeze',
        slug: 'fresh-squeeze',
        description: 'Fresh orange or pineapple juice',
        basePrice: toKobo(2500),
        active: true,
        available: true,
        sortOrder: 3,
      },
      {
        categoryId: mocktailsCategory.id,
        name: 'Berry Blast',
        slug: 'berry-blast',
        description: 'Mixed berries smoothie',
        basePrice: toKobo(2200),
        active: true,
        available: true,
        sortOrder: 4,
      },
      {
        categoryId: mocktailsCategory.id,
        name: 'Tropical Paradise',
        slug: 'tropical-paradise',
        description: 'Mango, passion fruit, and coconut',
        basePrice: toKobo(2500),
        active: true,
        available: true,
        sortOrder: 5,
      },
    ],
  });

  console.log('✓ Created mocktail items');

  // ============================================
  // 15. CREATE MENU ITEMS - TEAS
  // ============================================
  console.log('Creating tea menu items...');

  await prisma.menuItem.createMany({
    data: [
      {
        categoryId: teasCategory.id,
        name: 'Lipton Hot Tea',
        slug: 'lipton-hot-tea',
        description: 'Classic hot tea',
        basePrice: toKobo(500),
        active: true,
        available: true,
        sortOrder: 1,
      },
      {
        categoryId: teasCategory.id,
        name: 'Green Tea',
        slug: 'green-tea',
        description: 'Antioxidant-rich green tea',
        basePrice: toKobo(800),
        active: true,
        available: true,
        sortOrder: 2,
      },
      {
        categoryId: teasCategory.id,
        name: 'Herbal Tea',
        slug: 'herbal-tea',
        description: 'Soothing herbal infusion',
        basePrice: toKobo(1000),
        active: true,
        available: true,
        sortOrder: 3,
      },
      {
        categoryId: teasCategory.id,
        name: 'Iced Tea',
        slug: 'iced-tea',
        description: 'Refreshing cold brewed tea',
        basePrice: toKobo(1200),
        active: true,
        available: true,
        sortOrder: 4,
      },
    ],
  });

  console.log('✓ Created tea items');

  console.log('\n✅ Database seed completed successfully!\n');
  console.log('Default admin credentials:');
  console.log('Email: admin@greatdelight.com');
  console.log('Password: admin123');
  console.log('\nRestaurant: GREAT DELIGHT');
  console.log('Branch: Main Branch');
  console.log(`Tables: ${tableCount} tables created (TABLE 01 - TABLE ${String(tableCount).padStart(2, '0')})`);
  console.log('\nMenu Categories:');
  console.log('- Soups');
  console.log('- Rice & Combos');
  console.log('- Quick Meals');
  console.log('- Pepper Soup');
  console.log('- Proteins');
  console.log('- Drinks (Beers & Wines)');
  console.log('- Grills');
  console.log('- Cocktails');
  console.log('- Mocktails');
  console.log('- Teas');}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
